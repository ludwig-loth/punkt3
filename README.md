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
    - `menu`: Displays a submenu based on your main navigation, with options like `excludeCurrent`.
    - `custom`: Define your own submenu items with titles, slugs, and optional icons.

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

*Or for a top-level menu based submenu:*
```
definePageMeta({
  layout: 'sidebars',
  hasHeader: true,
  hasSubMenu: true,
  subMenu: {
    type: 'menu',
    excludeCurrent: true
  }
})
```

*Custom list:*
```
definePageMeta({
  layout: 'sidebars',
  hasHeader: true,
  hasSubMenu: true,
  subMenu: {
    type: 'custom',
    headingSlug: 'blog',
    items: [
      { slug: 'foo', title: 'Foo', icon: null },
      { slug: 'bar', title: 'Bar', icon: null }
    ]
  }
})
```