#!/usr/bin/env node
/**
 * One-time migration: Convert ::project-block MDC to standard prose markdown.
 * Usage: node scripts/convert-projects-to-prose.mjs
 */
import fs from 'fs'
import path from 'path'

const CONTENT_DIR = path.resolve('content')
const LOCALES = ['de', 'en']

/**
 * Parse inline props from ::project-block{...}
 * Handles: key="value" pairs and bare boolean flags
 */
function parseInlineProps(propsStr) {
  const props = {}
  const kvRegex = /([\w-]+)="([^"]*)"/g
  let m
  while ((m = kvRegex.exec(propsStr)) !== null) {
    props[m[1]] = m[2]
  }
  const remaining = propsStr.replace(kvRegex, '').trim()
  if (remaining) {
    const words = remaining.split(/\s+/).filter(w => w.length > 0)
    for (const word of words) {
      props[word] = true
    }
  }
  return props
}

/**
 * Parse YAML-style props inside a block (between --- delimiters)
 * Simple key: value parsing (no nesting needed)
 */
function parseYamlBlockProps(yamlLines) {
  const props = {}
  for (const line of yamlLines) {
    const match = line.match(/^([\w-]+):\s*(.*)$/)
    if (match) {
      let value = match[2].trim()
      if (value === 'true') value = true
      else if (value === 'false') value = false
      else if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }
      props[match[1]] = value
    }
  }
  return props
}

/**
 * Convert a single block's props + content to standard markdown
 */
function blockToMarkdown(props, content) {
  const parts = []

  if (props.heading) {
    parts.push(`## ${props.heading}`)
    parts.push('')
  }

  if (props.image) {
    const caption = props['image-caption'] || ''
    parts.push(`![${caption}](${props.image})`)
    parts.push('')
  }

  if (content) {
    parts.push(content)
    parts.push('')
  }

  if (props.divider === true || props.divider === 'true') {
    parts.push('---')
    parts.push('')
  }

  return parts.join('\n').trim()
}

/**
 * Process a single .md file: parse blocks, convert to prose
 */
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')

  // Split frontmatter from body
  const fmMatch = content.match(/^(---\n[\s\S]*?\n---)\n([\s\S]*)$/)
  if (!fmMatch) {
    console.warn(`  No frontmatter found: ${filePath}`)
    return null
  }

  const frontmatter = fmMatch[1]
  const body = fmMatch[2]
  const lines = body.split('\n')
  const outputParts = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    const inlineMatch = line.match(/^::project-block\{(.+)\}\s*$/)
    const bareMatch = line.match(/^::project-block\s*$/)

    if (inlineMatch || bareMatch) {
      let props = {}
      i++

      if (inlineMatch) {
        props = parseInlineProps(inlineMatch[1])
      } else {
        // Check for YAML frontmatter inside block
        if (i < lines.length && lines[i].trim() === '---') {
          i++ // skip opening ---
          const yamlLines = []
          while (i < lines.length && lines[i].trim() !== '---') {
            yamlLines.push(lines[i])
            i++
          }
          i++ // skip closing ---
          props = parseYamlBlockProps(yamlLines)
        }
      }

      // Read content until closing ::
      const contentLines = []
      while (i < lines.length && lines[i].trim() !== '::') {
        contentLines.push(lines[i])
        i++
      }
      if (i < lines.length) i++ // skip ::

      const blockContent = contentLines.join('\n').trim()
      const md = blockToMarkdown(props, blockContent)
      if (md) outputParts.push(md)
    } else {
      // Non-block lines (blank lines between blocks) - skip empties
      if (line.trim() !== '') {
        outputParts.push(line)
      }
      i++
    }
  }

  const newBody = outputParts.join('\n\n')
  return `${frontmatter}\n\n${newBody}\n`
}

// Main
console.log('Converting project MDC blocks to standard prose markdown...\n')

let converted = 0
let errors = 0

for (const locale of LOCALES) {
  const portfolioDir = path.join(CONTENT_DIR, locale, 'portfolio')

  if (!fs.existsSync(portfolioDir)) {
    console.warn(`  Directory not found: ${portfolioDir}`)
    continue
  }

  const mdFiles = fs.readdirSync(portfolioDir).filter(f => f.endsWith('.md'))

  for (const mdFile of mdFiles) {
    const filePath = path.join(portfolioDir, mdFile)

    try {
      const result = processFile(filePath)
      if (result) {
        fs.writeFileSync(filePath, result, 'utf-8')
        console.log(`  [OK] ${locale}/portfolio/${mdFile}`)
        converted++
      }
    } catch (err) {
      console.error(`  [ERROR] ${locale}/portfolio/${mdFile}: ${err.message}`)
      errors++
    }
  }
}

console.log(`\nDone. Converted: ${converted}, Errors: ${errors}`)
