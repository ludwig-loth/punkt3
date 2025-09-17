# Contributing to PUNKT3

Thank you for your interest in contributing to PUNKT3! This guide will help you get started with contributing to the project, especially creating new backend adapters.

## 🤝 Ways to Contribute

- **Backend Adapters**: Create adapters for new CMSs (Strapi, Contentful, Sanity, etc.)
- **Bug Fixes**: Fix issues or improve existing functionality
- **Documentation**: Improve docs, add examples, or create tutorials
- **Features**: Enhance the core functionality
- **Testing**: Add or improve tests

## 🚀 Getting Started

### 1. Fork and Clone

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/punkt3.git
   cd punkt3
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your contribution:
   ```bash
   git checkout -b feature/your-adapter-name
   # or
   git checkout -b fix/issue-description
   ```

### 2. Set Up Development Environment

1. Copy the example environment file:
   ```bash
   cp example.env .env
   ```
2. Configure your environment variables
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🔌 Contributing a New Backend Adapter

This is the most common and valuable contribution to PUNKT3!

### Step 1: Create Your Working Adapter

1. **Create your adapter file**: `server/services/your-cms.adapter.ts`
2. **Implement all required methods** (see [README.md](README.md#creating-a-new-backend-adapter))
3. **Test thoroughly** with your own CMS instance
4. **Make sure all pages work** and data displays correctly

### Step 2: Create a Template Version

Once your adapter works with your real CMS data, create a clean template version:

1. **Copy your working adapter** to `server/services/your-cms.adapter.template.ts`
2. **Replace real API calls** with template placeholders:

```typescript
// ❌ Don't include your real endpoints
const response = await fetch(`${this.apiUrl}/api/my-real-collection`)

// ✅ Use template placeholders instead
const response = await fetch(`${this.apiUrl}/api/<your-collection-name>`)
```

3. **Add TODO comments** for configuration steps:

```typescript
// TODO: Replace '<your-collection-name>' with your actual collection name
// TODO: Configure your CMS fields to match this structure
// TODO: Set up the following environment variables: NUXT_PUBLIC_API_URL, YOUR_CMS_API_KEY
```

4. **Include example data structures** in comments:

```typescript
// Expected CMS response structure:
// {
//   data: {
//     id: 1,
//     attributes: {
//       title: "Homepage",
//       // ... your fields
//     }
//   }
// }
```

### Step 3: Keep Your Real Implementation Private

**Important**: Your working adapter with real API endpoints should NOT be included in the PR.

**Option A: Use .gitignore (Recommended)**
1. Add your working adapter to `.gitignore`:
   ```
   # Personal CMS configurations
   server/services/*.local.ts
   server/services/*-personal.adapter.ts
   ```
2. Rename your working file: `your-cms-personal.adapter.ts`

**Option B: Use a separate branch**
1. Keep your working adapter in a private branch
2. Only submit the template version in your PR

### Step 4: Update Core Files

Update these files to register your adapter:

**1. Update `server/services/index.ts`:**
```typescript
// Add your adapter to available types
const AVAILABLE_ADAPTERS = [..., 'your-cms'] as const

// Add case in loadAdapter() function  
case 'your-cms':
    const { default: YourCMSAdapter } = await import('./your-cms.adapter')
    adapterCache = new YourCMSAdapter()
    break
```

**2. Create documentation:**
Create `docs/adapters/your-cms.md` with:
- CMS setup instructions
- Required collections/content types
- Field mapping guide
- Environment variables needed

### Step 5: Submit Pull Request

1. **Test everything** works with the template
2. **Write clear commit messages**:
   ```
   feat: add Strapi adapter template
   
   - Implements all required adapter methods
   - Includes setup documentation
   - Provides example field mappings
   ```
3. **Create pull request** with:
   - Clear title: `feat: Add [CMS Name] adapter template`
   - Description of what CMS this supports
   - Link to CMS documentation
   - Any special setup requirements

## 📋 Pull Request Template

When creating a PR, please include:

```markdown
## Description
Brief description of your changes.

## Type of Change
- [ ] Bug fix
- [ ] New adapter
- [ ] Feature enhancement
- [ ] Documentation update

## For Adapter Contributions:
- [ ] All required methods implemented
- [ ] Template version created (no real API endpoints)
- [ ] Documentation added in `docs/adapters/`
- [ ] `server/services/index.ts` updated
- [ ] Tested with development server
- [ ] Real implementation kept private

## Testing
- [ ] Tested locally
- [ ] All pages load correctly
- [ ] No console errors
- [ ] Builds successfully (`npm run build`)

## Additional Notes
Any additional information or context.
```

## 🧪 Testing Guidelines

### For Adapter Development

1. **Test all methods**:
   - `getLandingPageData()`
   - `getContactData()`
   - `getProjectData()` 
   - `getCVData()`
   - `getLegalNoticeData()`
   - `submitContactForm()`

2. **Test error handling**:
   - Invalid API URLs
   - Network failures
   - Missing environment variables

3. **Test data conversion**:
   - All required fields present
   - Translations properly formatted
   - Media URLs working

### Running Tests

```bash
# Run linting
npm run lint

# Build project (catches TypeScript errors)
npm run build

# Start production build
npm run start
```

## 📝 Code Style Guidelines

- **TypeScript**: Use strict typing, no `any` types except for CMS response data
- **Naming**: Use clear, descriptive names for methods and variables
- **Comments**: Add comments explaining CMS-specific logic
- **Error handling**: Always include try/catch blocks and meaningful error messages
- **Environment**: Validate required environment variables in constructor

## 📚 Adapter Documentation Template

Create `docs/adapters/your-cms.md`:

```markdown
# [CMS Name] Adapter

Integration guide for [CMS Name] with PUNKT3.

## Prerequisites
- [CMS Name] instance (version X.X+)
- API access credentials

## CMS Setup

### Collections Required
1. **Landing Page**
   - Fields: title, description, profile_image, menu_items
   - Relations: translations, menu_items

2. **Projects** 
   - Fields: title, slug, description, featured_image
   - Relations: tags, content_blocks, translations

[Continue with all required collections...]

## Environment Variables

```env
NUXT_BACKEND_ADAPTER=your-cms-name
NUXT_PUBLIC_API_URL=https://your-cms-instance.com
YOUR_CMS_API_KEY=your-api-key
```

## Field Mapping

### Landing Page
| PUNKT3 Field | Your CMS Field | Notes |
|-------------|----------------|--------|
| `my_name` | `full_name` | User's full name |
| `initials` | `user_initials` | Display initials |

[Continue mapping all fields...]

## Troubleshooting

Common issues and solutions...
```

## 🐛 Reporting Issues

When reporting bugs:

1. **Use issue templates** provided in GitHub
2. **Include environment info**: Node version, OS, CMS version
3. **Provide reproduction steps**
4. **Include error messages** and console output
5. **Test with latest version** first

## 🎉 Recognition

Contributors who create working adapter templates will be:
- Listed in project contributors
- Mentioned in release notes
- Added to adapter documentation as maintainer

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general help
- **Documentation**: Check README.md and docs/ folder first

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for making PUNKT3 better! 🚀