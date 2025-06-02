# Washington Project for the Arts (WPA) DC Archive

A digital archive showcasing the rich history of Washington DC's arts community. This headless WordPress site features searchable collections of artworks, artist profiles, public programs, and cultural stories from the Washington Project for the Arts.

## 🎨 About the Project

The WPA DC Archive preserves and presents decades of artistic work and cultural programming from Washington DC. Users can explore:

- **Assets**: Artworks, photographs, and cultural artifacts
- **People**: Artist profiles and collaborator information  
- **Public Programs**: Events, exhibitions, and educational initiatives
- **Stories**: Blog posts and historical narratives

## 🛠️ Tech Stack

- **Frontend**: Next.js 12 with React 17
- **Backend**: Headless WordPress with WPGraphQL
- **Framework**: Faust.js (WP Engine's headless WordPress solution)
- **Styling**: SASS/SCSS with CSS Modules
- **Data Fetching**: Apollo Client for GraphQL queries
- **Development**: Local by Flywheel
- **Hosting**: WP Engine

## ✨ Key Features

- **Advanced Search**: Full-text search across all content types with real-time results
- **Responsive Design**: Mobile-first approach with component-based architecture
- **Dynamic Content**: WordPress-powered content management with GraphQL API
- **SEO Optimized**: Built-in meta management and sitemap generation
- **Modular Components**: 40+ reusable React components with isolated styling

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥18 and npm ≥8
- **Local by Flywheel**: [Download here](https://localwp.com/)
- **Git**: For version control

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:weareoutright/wpadc-archive.git wpadc
   cd wpadc
   npm install
   ```

2. **Set up Local by Flywheel**
   - Install and open Local by Flywheel
   - In advanced settings, change Router Mode to "Site Domain" (not localhost)
   - Start your WordPress instance and note the Site domain

3. **Configure environment**
   - Copy the Site domain from Local into your `.env.local` file:
   ```bash
   NEXT_PUBLIC_WORDPRESS_URL={Site domain from Local}
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🏗️ Architecture Overview

This project uses a **headless WordPress architecture** with:

- **WordPress Backend**: Content management via WPGraphQL API
- **Next.js Frontend**: React-based static site generation and server-side rendering
- **Faust.js Integration**: Seamless WordPress-to-Next.js data flow
- **Component Architecture**: Modular SCSS components in `components/` directory
- **Custom Hooks**: GraphQL query management in `constants/customQueryHooks/`

## 🗂️ Project Structure

```
├── components/          # Reusable React components
├── constants/           # Utilities and custom hooks
│   └── customQueryHooks/    # GraphQL query hooks
├── docs/               # Comprehensive project documentation
├── fragments/          # GraphQL fragments
├── pages/              # Next.js pages and API routes
├── public/             # Static assets
├── styles/             # Global SCSS styles
└── wp-templates/       # WordPress template overrides
```

## 🔧 Troubleshooting

### GraphQL Connection Issues
```
error - Unable to find a GraphQL endpoint at https://wpadc-archive-dev.local/index.php?graphql
```
**Solutions:**
- Ensure WordPress instance in Local is running
- Verify WPGraphQL plugin is installed and activated
- Check Local Router Mode is set to "Site Domain"
- Validate `.env.local` variables

### Faust Configuration Error
```
error - Validation Failed: Your Faust front-end site URL value is misconfigured
```
**Solutions:**
- Frontend URL should be `localhost:3000` for local development
- Production URL should match your WP Engine deployment domain
- Ensure frontend URL ≠ `NEXT_PUBLIC_WORDPRESS_URL`

## 🚀 Deployment

This project is configured for **WP Engine Headless** hosting:
- WordPress backend: Managed WordPress instance
- Frontend: Automatically deployed Next.js application
- Environment variables configured in WP Engine dashboard

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](./docs/) directory:
- **Architecture**: System design and technical decisions
- **Development**: Setup guides and best practices  
- **Planning**: Feature roadmaps and completion plans

## 🔗 Resources

- [Faust.js Documentation](https://faustjs.org/tutorial/get-started-with-faust)
- [Local by Flywheel Help](https://localwp.com/help-docs/)
- [WP Engine Headless](https://developers.wpengine.com/docs/atlas/overview/)
- [WPGraphQL Documentation](https://www.wpgraphql.com/)

## 🤝 Contributing

Please review the documentation in `docs/development/` before contributing. For questions or support, contact the development team.

---

**Washington Project for the Arts DC Archive** - Preserving and sharing Washington DC's rich cultural heritage through digital innovation.
