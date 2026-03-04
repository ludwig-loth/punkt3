# PUNKT3

---
In this branch I experimented with vibe coding. 
I wanted to see how good Claude Code with Pous 4.6 is at rewriting this whole project to use Nuxt Content along with Nuxt Studio.

Turns out: it's ok, but it needs a lot of manual adjustments and fixes after the initial rewrite.

I will leave this branch here for myself as an inspiration and reference for the future, but I won't merge it into main because of the amount of manual fixes needed after the initial rewrite.

The goal is to rewrite the PUNKT3 manually to use Nuxt Content and Nuxt Studio. 
That means it will no longer be backend-agnostic. I found out that this is just too much work for a simple portfolio frontend. 

But the good news are: With the new Nuxt Content and Studio integration, the content management experience is much better and more intuitive than with Directus. Because Studio is a visual editor that works directly with the content files, you can edit your content in a more user-friendly way. We don't need a seperate backend server anymore, because Studio is a part of our Nuxt app and therefore it's hosted with the Nuxt app aswell. This simplifies the deployment and hosting of the project significantly.

---


*PUNKT3 (Punkte) [ˈpʊŋktə]* is a template for your personal website built with Nuxt and Tailwind CSS.

Punkte is the german word for "points" or "dots".
The whole design philosophy of this frontend template is based on dots.
The number 3 represents the three main aspects of the framework:
- Personal website
- Portfolio
- Blog

## Configuration

### Content Management
To configure PUNKT3, you can modify the environment variables in the `.env` file. Here are the available variables:

- `NUXT_PUBLIC_SITE_URL`: The public URL of your site.
- `NUXT_PUBLIC_SITE_NAME`: The name of your site.
- `NUXT_PUBLIC_SITE_DESCRIPTION`: A short description of your site.

Content is managed via YAML files in the `content/` directory and can be edited with Nuxt Studio.

### Sub menus

Submenus in PUNKT3 allow you to add contextual navigation to your pages with the layout `sidebars`, making it easier for users to explore related content. You can configure submenus to display project lists, top-level menus, or custom links, depending on your needs.

#### How to use submenus

1. **Enable the submenu:**  
    In your page component, set `hasSubMenu: true` in the `definePageMeta` block.

2. **Choose a submenu type:**  
    - `projects`: Shows a list of projects, optionally filtered by `headingSlug`.
    - blog: Shows a list of blog posts, optionally filtered by `headingSlug`.
3. **Customize as needed:**  
    Adjust the submenu configuration to fit the context of your page.

See the examples below for typical usage.

*Example usage in any page:*
```
// in a page component script
definePageMeta({
  layout: 'sidebars',
  hasHeader: true,
  hasSubMenu: true,
  subMenu: {
    type: 'projects',
    headingSlug: 'portfolio'
  }
})
```


---
# ToDos for the Docs

###  Environment Setup
- [ ] Define all environment variables

###  Backend Integration
- [ ] Explain how to add more backend adapters

###  PageMeta Functionality
- [ ] Explain how the whole `pageMeta` system works
  - [ ] `scrollToTop` (standard in Nuxt?)
  - [ ] `hasHeader`
  - [ ] `hasSubMenu`
  - [ ] `subMenu`
    - [ ] type: `projects`
    - [ ] type: `blog` (noot implemented yet)
  - [ ] `layout: sidebar`
  - [ ] `underConstruction`

###  HTML Click Handling
- [ ] Explain how `handleHtmlClick` works
  - [ ] On `landingPage` for now
  - [ ] Internal links in WYSIWYG content should be used (`/about-me`)
  - [ ] External links should start with `mailto`, `//`, or `www.`

### Internationalization
- [ ] localized URLs (Localized URLs and hreflang If/when you want language-prefixed URLs and automatic alternate links, switch strategy and update links)
  1. In nuxt.config.ts:
      - i18n.strategy: 'prefix_except_default'
      - i18n.defaultLocale: 'de-DE'
  2. Use localePath for internal links.
      ```typescript
      <script setup lang="ts">
        // ...
        const localePath = useLocalePath()
        // ...
        </script>
        <template>
          <!-- ... -->
          <div v-for="item in menuItems" :key="item.slug">
            <NuxtLink :to="localePath(`/${item.slug}`)">
              <!-- ... -->
            </NuxtLink>
          </div>
          <!-- ...-->
      </template>
      ```
  Also replace other hard-coded links like:
      - index.vue and index.vue NuxtLink to="/portfolio"
      - index.vue internal links created from WYSIWYG can map through localePath before router.push.
