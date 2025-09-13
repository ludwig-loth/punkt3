# PUNKT3

*PUNKT3 (Punkte) [ˈpʊŋktə]* is a template for your personal website built with Nuxt and Tailwind CSS.

Punkte is the german word for "points" or "dots".
The whole design philosophy of this frontend template is based on dots.
The number 3 represents the three main aspects of the framework:
- Personal website
- Portfolio
- Blog

## Configuration

### Backend Adapter
To configure PUNKT3, you can modify the environment variables in the `.env` file. Here are the available variables:

- `NUXT_BACKEND_ADAPTER`: Choose the backend service [directus] (more adapters in development)
- `NUXT_API_URL`: The URL of your API endpoint.

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
    - [ ] type: `menu`
    - [ ] type: `custom`
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
