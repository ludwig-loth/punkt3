# PUNKT3

*PUNKT3 (Punkte) [ˈpʊŋktə]* is a template for your personal website built with Nuxt and Tailwind CSS.

Punkte is the german word for "points" or "dots".
The whole design philosophy of this frontend template is based on dots.
The number 3 represents the three main aspects of the framework:
- Portfolio
- About me
- Contact

This frontend template is designed to be backend-agnostic. Data access is handled through adapters (e.g., Directus). The UI is based on Tailwind CSS with a consistent dot/points design system.

You can see it in action at my personal website: [https://ludwigloth.de/](https://ludwigloth.de/)
---

## Features

- **Nuxt 4** with SSR, Pinia, SEO, i18n
- **Backend-agnostic** adapter system (Directus implemented, more coming)
- **Pages**:
  - Landing: [app/pages/index.vue](app/pages/index.vue)
  - Portfolio listing: [app/pages/portfolio/index.vue](app/pages/portfolio/index.vue)
  - Portfolio detail: [app/pages/portfolio/[slug].vue](app/pages/portfolio/%5Bslug%5D.vue)
  - About me: [app/pages/about-me.vue](app/pages/about-me.vue)
  - Contact: [app/pages/contact.vue](app/pages/contact.vue)
  - Blog (WIP): [app/pages/blog/index.vue](app/pages/blog/index.vue)
  - Other Projects (WIP): [app/pages/other-projects/index.vue](app/pages/other-projects/index.vue)
  - Legal Notice: [app/pages/legal-notice.vue](app/pages/legal-notice.vue)
- **Layouts** 
  - Default [app/layouts/default.vue](app/layouts/default.vue)
    - Layout for the Landing Page
    - honestly it is not used elsewhere
  - Sidebars [app/layouts/sidebars.vue](app/layouts/sidebars.vue)
    - layout for all Pages where a sidebar is needed
    - Projects/Portfolio
    - About me
    - Contact
    - Legal Notice
- **Submenus** for "sidebars" layout: [app/layouts/sidebars.vue](app/layouts/sidebars.vue)
- **Design system** via Tailwind and custom CSS: [app/assets/css/main.css](app/assets/css/main.css)
- **Interactive dots background**: [app/plugins/interactableDots.ts](app/plugins/interactableDots.ts) 
  - (just a little fun animation based on your mouse position)
- **SEO composables**: [app/composables/useSeo.ts](app/composables/useSeo.ts)
- **Translation helpers**: [app/composables/useTranslation.ts](app/composables/useTranslation.ts)

---

## Architecture Overview

**Data Flow (simplified):**
- **Server APIs** (Nitro) call the configured adapter:
  - Landing: [server/api/landingPage.get.ts](server/api/landingPage.get.ts)
  - Projects: [server/api/projects.get.ts](server/api/projects.get.ts)
  - CV: [server/api/cv.get.ts](server/api/cv.get.ts)
  - Contact: [server/api/contact.get.ts](server/api/contact.get.ts)
  - Legal Notice: [server/api/legalNotice.get.ts](server/api/legalNotice.get.ts)
- **Adapter selection**: [server/services/index.ts](server/services/index.ts) via `NUXT_BACKEND_ADAPTER` env
- **Directus adapter**: [server/services/directus.adapter.ts](server/services/directus.adapter.ts)
- **Stores** (Pinia) initialize data at app level:
  - App bootstrap: [app/app.vue](app/app.vue) loads data via `useAsyncData()` and populates stores (Landing, CV, Projects, Contact, LegalNotice)
- **Rendering** via pages + components:
  - Timeline components: [app/components/stagesTimeline.vue](app/components/stagesTimeline.vue), [app/components/publicationsTimeline.vue](app/components/publicationsTimeline.vue)
  - Lightbox: [app/components/lightBox.vue](app/components/lightBox.vue)
  - Buttons: [app/components/linkButton.vue](app/components/linkButton.vue), [app/components/actionButton.vue](app/components/actionButton.vue)
  - and much more

---

## Configuration (.env)

Create a `.env` file (or use `example.env` as template):

```env
NUXT_BACKEND_ADAPTER=directus

# Public URLs (needed on client-side)
NUXT_PUBLIC_API_URL=https://your-directus.example.com
NUXT_PUBLIC_SITE_URL=https://your-site.example.com
NUXT_PUBLIC_SITE_NAME=Your Site Name
NUXT_PUBLIC_SITE_DESCRIPTION=This is your site description.

# Optional: Node/Host/Port for Docker/Server
NODE_ENV=production
HOST=0.0.0.0
PORT=3000
```

**Important:**
- `NUXT_BACKEND_ADAPTER` must be set. Available values: see [server/services/index.ts](server/services/index.ts) (`directus`, `supabase`, `nuxt_content`). Currently implemented: `directus`.
-  keep in mind that you can always implement new ones
-  for now you have to add them to the TypeScript interface by hand
- `NUXT_PUBLIC_API_URL` is required by the Directus adapter: [server/services/directus.adapter.ts](server/services/directus.adapter.ts).

---

## Backend Adapters

- **Selection & Loading**: [server/services/index.ts](server/services/index.ts)
- **Directus**:
  - Initialization: [server/services/directus.adapter.ts](server/services/directus.adapter.ts) (requires `NUXT_PUBLIC_API_URL`)
  - **Setup your Collections/Fields**:
    - Example for projects: [`getProjectData()`](server/services/directus.adapter.ts) (replace placeholder `<your project endpoint>` and adapt fields/relations)
    - Convert responses to shared types under `shared/types/*` (e.g., [shared/types/project.ts](shared/types/project.ts), [shared/types/cv.ts](shared/types/cv.ts), [shared/types/contact.ts](shared/types/contact.ts), [shared/types/legalNotice.ts](shared/types/legalNotice.ts))

---

## Creating a New Backend Adapter

PUNKT3's adapter system allows you to connect to any headless CMS or API backend. Here's how to create your own adapter:

### 1. Understanding the Adapter Interface

Every adapter must implement these methods:

**Get methods for fetching data from your CMS:**
- `getAdapterName()` - Returns adapter name
- `getLandingPageData()` - Returns [`Landing`](shared/types/landing.ts) data
- `getContactData()` - Returns [`Contact`](shared/types/contact.ts) data  
- `submitContactForm(formData)` - Handles contact form submissions
- `getProjectData()` - Returns [`Project[]`](shared/types/project.ts) array
- `getCVData()` - Returns [`CV`](shared/types/cv.ts) data
- `getLegalNoticeData()` - Returns [`LegalNotice`](shared/types/legalNotice.ts) data

**Private converter methods for transforming your CMS data to PUNKT3 structure:**
- `convertToLanding(backendData)` - Transforms raw CMS data to [`Landing`](shared/types/landing.ts) interface
- `convertToContact(backendData)` - Transforms raw CMS data to [`Contact`](shared/types/contact.ts) interface  
- `convertToProject(backendData)` - Transforms raw CMS data to [`Project`](shared/types/project.ts) interface
- `convertToCV(backendData)` - Transforms raw CMS data to [`CV`](shared/types/cv.ts) interface
- `convertToLegalNotice(backendData)` - Transforms raw CMS data to [`LegalNotice`](shared/types/legalNotice.ts) interface

**Why converter methods are important:**
- They isolate the data transformation logic from API calls
- Make your adapter easier to test and debug
- Handle field mapping between your CMS structure and PUNKT3's expected types
- Manage translation/i18n data formatting
- Convert date formats, nested relationships, and media URLs

**Example converter pattern:**
```typescript
private convertToLanding(cmsData: any): Landing {
    return {
        id: cmsData.id,
        status: cmsData.status || 'published',
        date_updated: cmsData.updatedAt,
        initials: cmsData.user_initials,
        my_name: cmsData.full_name,
        image: cmsData.profile_image?.url,
        menu_items: cmsData.navigation?.map(item => ({
            slug: item.page_slug,
            icon: item.icon_name,
            sort: item.order,
                translations: item.localizations?.map(loc => ({
                    languages_code: loc.locale,
                    heading: loc.title,
                    description: loc.description
                })) || []
        })) || [],
        translations: cmsData.localizations?.map(translation => ({
            languages_code: translation.locale,
            about_me_short: translation.bio_text,
            opening_line: translation.intro_text,
            seo: {
                title: translation.meta_title,
                meta_description: translation.meta_description,
                keywords: translation.meta_keywords,
                no_index: translation.no_index || false,
                no_follow: translation.no_follow || false,
                og_image: translation.social_image?.url
            }
        })) || []
    }
}
```

### 2. Create Your Adapter File

Create a new file in [`server/services/`](server/services/) (e.g., `strapi.adapter.ts`):

```typescript
import type { Landing, Contact, Project, CV, LegalNotice } from '~/shared/types'

class StrapiAdapter {
    private apiUrl: string
    
    constructor() {
        if (!process.env.NUXT_PUBLIC_API_URL) {
            throw new Error('NUXT_PUBLIC_API_URL environment variable is required')
        }
        this.apiUrl = process.env.NUXT_PUBLIC_API_URL
    }

    async getAdapterName() {
        return 'strapi'
    }

    async getLandingPageData(): Promise<Landing> {
        // Fetch from your backend
        const response = await fetch(`${this.apiUrl}/api/landing-page?populate=*`)
        const data = await response.json()
        
        // Convert to PUNKT3's Landing type
        return this.convertToLanding(data.data)
    }

    private convertToLanding(backendData: any): Landing {
        // Transform your backend's data structure to PUNKT3's Landing interface
        return {
            id: backendData.id,
            status: backendData.attributes.status,
            // ... map all required Landing fields
        }
    }

    // Implement all other required methods...
}

export default StrapiAdapter
```

### 3. Register Your Adapter

Update [`server/services/index.ts`](server/services/index.ts):

```typescript
// Add your adapter to available types
const AVAILABLE_ADAPTERS = ['directus', 'supabase', 'nuxt_content', 'strapi'] as const

// Add case in loadAdapter() function
case 'strapi':
    const { default: StrapiAdapter } = await import('./strapi.adapter')
    adapterCache = new StrapiAdapter()
    break
```

### 4. Data Type Mapping

The most crucial part is mapping your backend's data to PUNKT3's types. Study these interfaces:

- [`Landing`](shared/types/landing.ts) - Homepage content with menu items
- [`Project`](shared/types/project.ts) - Portfolio projects with content blocks  
- [`CV`](shared/types/cv.ts) - Career stages, education, skills, publications
- [`Contact`](shared/types/contact.ts) - Contact info and social links
- [`LegalNotice`](shared/types/legalNotice.ts) - Legal information

### 5. Multilingual Support

PUNKT3 expects translations in this format:
```typescript
translations: [
    {
        languages_code: 'en-US',
        title: 'English Title',
        description: 'English description'
    },
    {
        languages_code: 'de-DE', 
        title: 'German Title',
        description: 'German description'
    }
]
```

Map your CMS's i18n structure to this format in your conversion methods.

### 6. Environment Configuration

Update your `.env` file:
```env
NUXT_BACKEND_ADAPTER=strapi
NUXT_PUBLIC_API_URL=https://your-strapi-instance.com
# Add any adapter-specific environment variables
```

### 7. Testing Your Adapter

1. Set your adapter in `.env`: `NUXT_BACKEND_ADAPTER=your-adapter`
2. Run `npm run dev` 
3. Check console output shows: `Using adapter: your-adapter`
4. Verify all pages load with your backend data

### 8. Error Handling Best Practices

```typescript
async getLandingPageData(): Promise<Landing> {
    try {
        const response = await fetch(`${this.apiUrl}/api/landing-page`)
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`)
        }
        const data = await response.json()
        return this.convertToLanding(data)
    } catch (error) {
        console.error('Error fetching landing page:', error)
        throw error // Re-throw to let API endpoint handle it
    }
}
```

### 9. Common Pitfalls

- **Missing environment variables** - Always validate required env vars in constructor
- **Incorrect type mapping** - Ensure your conversion methods return exactly what PUNKT3 expects
- **Missing translations** - All content should have proper language code mappings
- **Async/await issues** - All adapter methods should be properly async
- **Error boundaries** - Handle API failures gracefully

### Example Adapters

Check the existing implementations for guidance:
- [`server/services/directus.adapter.ts`](server/services/directus.adapter.ts) - Full Directus implementation
- more to follow

### Getting Help

If you create an adapter for a popular CMS, consider contributing it back to the project! See our [Contributing Guide](CONTRIBUTING.md) for detailed instructions.

---

## Contributing

We welcome contributions! Whether you're fixing bugs, adding features, or creating new backend adapters, your help is appreciated.

**Quick start for adapter contributions:**
1. Fork the repository
2. Create your working adapter
3. Make a clean template version (no real API endpoints)
4. Submit a PR with the template only

See our detailed [Contributing Guide](CONTRIBUTING.md) for complete instructions.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

MIT License allows you to:
- ✅ Use commercially 
- ✅ Modify and distribute
- ✅ Include in private projects
- ✅ Sublicense

The only requirement is to include the original copyright notice.
---
