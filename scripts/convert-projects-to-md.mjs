#!/usr/bin/env node
/**
 * One-time migration script: Convert project YAML files to Markdown with MDC components.
 * Usage: node scripts/convert-projects-to-md.mjs
 */
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import TurndownService from 'turndown'

const CONTENT_DIR = path.resolve('content')
const LOCALES = ['de', 'en']

// Setup turndown for HTML -> Markdown conversion
const turndown = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  emDelimiter: '*',
  strongDelimiter: '**',
})

// Custom rule: strip empty paragraphs with &nbsp;
turndown.addRule('nbsp-paragraph', {
  filter: (node) => {
    return (
      node.nodeName === 'P' &&
      (node.textContent.trim() === '\u00a0' || node.textContent.trim() === '')
    )
  },
  replacement: () => '\n',
})

// Custom rule: handle <br> tags as line breaks
turndown.addRule('br-tags', {
  filter: 'br',
  replacement: () => '\n',
})

/**
 * Decode common HTML entities that turndown might miss
 */
function decodeEntities(text) {
  return text
    .replace(/&uuml;/g, 'ü')
    .replace(/&Uuml;/g, 'Ü')
    .replace(/&ouml;/g, 'ö')
    .replace(/&Ouml;/g, 'Ö')
    .replace(/&auml;/g, 'ä')
    .replace(/&Auml;/g, 'Ä')
    .replace(/&szlig;/g, 'ß')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&bdquo;/g, '„')
    .replace(/&ldquo;/g, '\u201C')
    .replace(/&rdquo;/g, '\u201D')
    .replace(/&#39;/g, "'")
}

/**
 * Convert HTML text to clean Markdown
 */
function htmlToMarkdown(html) {
  if (!html || html.trim() === '') return ''

  // First decode HTML entities before turndown processes it
  let decoded = decodeEntities(html)

  // Convert with turndown
  let md = turndown.turndown(decoded)

  // Clean up: remove excessive blank lines (more than 2 consecutive)
  md = md.replace(/\n{3,}/g, '\n\n')

  // Trim leading/trailing whitespace
  md = md.trim()

  return md
}

/**
 * Escape special characters in MDC prop values
 */
function escapePropsValue(val) {
  if (!val) return ''
  return val.replace(/"/g, '\\"')
}

/**
 * Build MDC props string for a content block
 */
function buildMdcProps(block) {
  const props = []

  // heading prop (only if show_heading is true and heading exists)
  if (block.show_heading && block.heading) {
    props.push(`heading="${escapePropsValue(block.heading)}"`)
  }

  // image props
  if (block.image && block.image.trim() !== '') {
    props.push(`image="${escapePropsValue(block.image)}"`)
  }
  if (block.image_position && block.image_position.trim() !== '') {
    props.push(`image-position="${block.image_position}"`)
  }
  if (block.image_caption && block.image_caption.trim() !== '') {
    props.push(`image-caption="${escapePropsValue(block.image_caption)}"`)
  }

  // divider boolean
  if (block.divider_at_bottom) {
    props.push('divider')
  }

  return props.length > 0 ? `{${props.join(' ')}}` : ''
}

/**
 * Build frontmatter YAML from project data (everything except content_blocks)
 */
function buildFrontmatter(data) {
  const frontmatter = {}

  // Copy all fields except content_blocks
  for (const [key, value] of Object.entries(data)) {
    if (key === 'content_blocks') continue
    frontmatter[key] = value
  }

  return yaml.dump(frontmatter, {
    lineWidth: -1, // no line wrapping
    quotingType: '"',
    forceQuotes: false,
    noRefs: true,
  }).trim()
}

/**
 * Convert a single project YAML to Markdown
 */
function convertProject(yamlPath) {
  const raw = fs.readFileSync(yamlPath, 'utf-8')
  const data = yaml.load(raw)

  if (!data) {
    console.warn(`  Skipping empty file: ${yamlPath}`)
    return null
  }

  // Build frontmatter
  const frontmatter = buildFrontmatter(data)

  // Build body from content_blocks
  const blocks = data.content_blocks || []
  const bodyParts = []

  for (const block of blocks) {
    const mdcProps = buildMdcProps(block)
    const textMd = htmlToMarkdown(block.text || '')

    bodyParts.push(`::project-block${mdcProps}`)
    bodyParts.push(textMd)
    bodyParts.push('::')
    bodyParts.push('') // blank line between blocks
  }

  const body = bodyParts.join('\n').trim()

  return `---\n${frontmatter}\n---\n\n${body}\n`
}

// Main execution
console.log('Converting project YAML files to Markdown...\n')

let converted = 0
let errors = 0

for (const locale of LOCALES) {
  const projectsDir = path.join(CONTENT_DIR, locale, 'projects')

  if (!fs.existsSync(projectsDir)) {
    console.warn(`  Directory not found: ${projectsDir}`)
    continue
  }

  const yamlFiles = fs.readdirSync(projectsDir).filter((f) => f.endsWith('.yaml'))

  for (const yamlFile of yamlFiles) {
    const yamlPath = path.join(projectsDir, yamlFile)
    const mdFile = yamlFile.replace('.yaml', '.md')
    const mdPath = path.join(projectsDir, mdFile)

    try {
      const result = convertProject(yamlPath)
      if (result) {
        fs.writeFileSync(mdPath, result, 'utf-8')
        console.log(`  [OK] ${locale}/projects/${mdFile}`)
        converted++
      }
    } catch (err) {
      console.error(`  [ERROR] ${locale}/projects/${yamlFile}: ${err.message}`)
      errors++
    }
  }
}

console.log(`\nDone. Converted: ${converted}, Errors: ${errors}`)
if (converted > 0) {
  console.log('\nNext steps:')
  console.log('  1. Review the generated .md files')
  console.log('  2. Delete the old .yaml files:')
  console.log('     rm content/de/projects/*.yaml content/en/projects/*.yaml')
}
