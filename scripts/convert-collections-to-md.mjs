#!/usr/bin/env node
/**
 * One-time migration: Convert landing, contact, legal-notice YAML to Markdown.
 * Usage: node scripts/convert-collections-to-md.mjs
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

turndown.addRule('nbsp-paragraph', {
  filter: (node) =>
    node.nodeName === 'P' &&
    (node.textContent.trim() === '\u00a0' || node.textContent.trim() === ''),
  replacement: () => '\n',
})

turndown.addRule('br-tags', {
  filter: 'br',
  replacement: () => '\n',
})

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

function htmlToMarkdown(html) {
  if (!html || html.trim() === '') return ''
  let decoded = decodeEntities(html)
  let md = turndown.turndown(decoded)
  md = md.replace(/\n{3,}/g, '\n\n')
  return md.trim()
}

function htmlToPlainText(html) {
  if (!html || html.trim() === '') return ''
  let decoded = decodeEntities(html)
  decoded = decoded.replace(/<[^>]+>/g, '')
  return decoded.trim()
}

function buildFrontmatter(data) {
  return yaml
    .dump(data, {
      lineWidth: -1,
      quotingType: '"',
      forceQuotes: false,
      noRefs: true,
    })
    .trim()
}

// Collection definitions
const collections = [
  {
    name: 'landing',
    yamlFile: 'landing.yaml',
    mdFile: 'landing.md',
    bodyField: 'about_me_short',
    transformFrontmatter: (data) => {
      const { about_me_short, ...rest } = data
      return rest
    },
  },
  {
    name: 'contact',
    yamlFile: 'contact.yaml',
    mdFile: 'contact.md',
    bodyField: 'gdpr_info',
    transformFrontmatter: (data) => {
      const {
        gdpr_info,
        contact_introduction,
        direct_message_introduction,
        socials,
        ...rest
      } = data
      return {
        ...rest,
        contact_introduction: htmlToPlainText(contact_introduction),
        direct_message_introduction: htmlToPlainText(direct_message_introduction),
        socials: (socials || []).filter(
          (s) => s && Object.keys(s).length > 0
        ),
      }
    },
  },
  {
    name: 'legal-notice',
    yamlFile: 'legal-notice.yaml',
    mdFile: 'legal-notice.md',
    bodyField: 'text',
    transformFrontmatter: (data) => {
      const { text, ...rest } = data
      return rest
    },
  },
]

// Main
console.log('Converting YAML collections to Markdown...\n')

let converted = 0
let errors = 0

for (const locale of LOCALES) {
  for (const collection of collections) {
    const yamlPath = path.join(CONTENT_DIR, locale, collection.yamlFile)
    const mdPath = path.join(CONTENT_DIR, locale, collection.mdFile)

    if (!fs.existsSync(yamlPath)) {
      console.warn(`  File not found: ${yamlPath}`)
      continue
    }

    try {
      const raw = fs.readFileSync(yamlPath, 'utf-8')
      const data = yaml.load(raw)

      if (!data) {
        console.warn(`  Skipping empty file: ${yamlPath}`)
        continue
      }

      const bodyHtml = data[collection.bodyField] || ''
      const bodyMd = htmlToMarkdown(bodyHtml)

      const frontmatterData = collection.transformFrontmatter(data)
      const frontmatter = buildFrontmatter(frontmatterData)

      const result = `---\n${frontmatter}\n---\n\n${bodyMd}\n`
      fs.writeFileSync(mdPath, result, 'utf-8')

      console.log(`  [OK] ${locale}/${collection.mdFile}`)
      converted++
    } catch (err) {
      console.error(
        `  [ERROR] ${locale}/${collection.yamlFile}: ${err.message}`
      )
      errors++
    }
  }
}

console.log(`\nDone. Converted: ${converted}, Errors: ${errors}`)
