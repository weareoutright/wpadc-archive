# WPA DC Archive - System Architecture

This document provides a comprehensive overview of the Washington Project for the Arts DC Archive system architecture, design patterns, and structural decisions.

## Architecture Overview

The WPA DC Archive is built as a **headless WordPress application** using modern JAMstack principles, combining WordPress content management with a React-based frontend for optimal performance and developer experience.

### High-Level Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   WordPress     │    │   Next.js        │    │   Static Site   │
│   Content CMS   │◄──►│   Frontend       │───►│   (Production)  │
│   (WP Engine)   │    │   (Faust.js)     │    │   (WP Engine)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
       │                         │                        
       │                         │                        
   ┌───▼───┐                ┌────▼────┐                  
   │ WP    │                │ Apollo  │                  
   │ GraphQL│                │ Client  │                  
   │ API   │                │ Cache   │                  
   └───────┘                └─────────┘                  
```

## Technology Stack

### Core Technologies
- **Frontend Framework**: Next.js 12.3.4 with React 17
- **Headless CMS**: WordPress with WPGraphQL plugin
- **Integration Layer**: Faust.js 3.1.0 (WP Engine's headless framework)
- **Data Fetching**: Apollo Client 3.10.4 for GraphQL queries
- **Styling**: SASS/SCSS with CSS Modules
- **Hosting**: WP Engine Headless Platform

### Build & Development
- **Package Manager**: npm
- **Development Server**: Next.js dev server with hot reload
- **Build Process**: Static site generation (SSG) with preview mode
- **Local Development**: Local by Flywheel for WordPress backend

## System Components

### 1. Content Management Layer (WordPress)

**Purpose**: Content creation, editing, and management
**Location**: WP Engine managed WordPress instance
**Key Features**:
- Custom Post Types: Assets, People, Events, Story Blogs
- Advanced Custom Fields (ACF) for structured content
- WordPress admin interface for content creators
- WPGraphQL API endpoint for data access
- Preview functionality for draft content

### 2. Data Layer (GraphQL)

**Purpose**: API interface between WordPress and frontend
**Implementation**: WPGraphQL with custom schema extensions
**Key Features**:
- Strongly typed GraphQL schema
- Custom post type integration
- Advanced Custom Fields exposure
- Search functionality across content types
- Fragment-based query composition

### 3. Frontend Application Layer (Next.js + React)

**Purpose**: User interface and user experience
**Architecture**: Component-based React application
**Key Features**:
- Server-side rendering (SSR) and static generation (SSG)
- Dynamic routing with WordPress content
- Component-based architecture with modular styling
- Advanced search functionality
- Responsive design with mobile-first approach

### 4. Integration Layer (Faust.js)

**Purpose**: Seamless WordPress-to-Next.js integration
**Features**:
- WordPress template system integration
- Preview mode for draft content
- Authentication handling
- GraphQL query optimization
- Static site generation coordination

## Component Architecture

### Component Hierarchy

```
App
├── Layout Components
│   ├── Header (Navigation, Logo, Search)
│   ├── Main (Content wrapper)
│   └── Footer (Site info, Social links)
├── Page Components
│   ├── FrontPage (Homepage layout)
│   ├── SearchPage (Search interface)
│   ├── AssetPage (Individual asset display)
│   └── PersonPage (Artist/person profiles)
├── Content Components
│   ├── Carousel (Featured content)
│   ├── Cards (Asset, Person, Related items)
│   └── Search (SearchBar, Results, Filters)
└── Utility Components
    ├── SEO (Meta tags, structured data)
    ├── LoadingPage (Loading states)
    └── SkipNavigationLink (Accessibility)
```

### Component Patterns

**Modular Structure**: Each component follows a consistent pattern:
```
ComponentName/
├── ComponentName.js          # Main component logic
├── ComponentName.module.scss # Scoped styling
└── index.js                 # Barrel export
```

**Data Requirements**: Components define their GraphQL data needs:
```javascript
Component.fragments = {
  entry: gql`
    fragment ComponentFragment on PostType {
      title
      slug
      featuredImage { ... }
    }
  `
};
```

### Styling Architecture

**CSS Modules**: Scoped component styling prevents conflicts
**SCSS Organization**:
- `_base.scss`: Reset and foundational styles
- `_css-variables.scss`: Design system tokens
- `_utilities.scss`: Reusable utility classes
- Page-specific styles: `_Search.scss`, `_Assets.scss`, etc.

**Design System**:
- **Typography**: Custom fonts (Flaviotte, Gotham)
- **Color Palette**: Branded colors (indigo, vermillion, coral, magenta)
- **Grid System**: Flexible container and content wrapper components
- **Responsive Breakpoints**: Mobile-first approach

## Data Flow Architecture

### Content Creation Flow
```
Content Creator → WordPress Admin → Custom Post Types → WPGraphQL API
```

### Data Consumption Flow
```
GraphQL API → Apollo Client → Custom Hooks → React Components → User Interface
```

### Search Flow
```
User Input → SearchBar Component → useSearch Hook → GraphQL Query → Results Display
```

## Custom Query Hooks

The application uses custom hooks for data fetching and state management:

- **`useSearch`**: Multi-type search across all content
- **`useAssets`**: Asset post management and filtering
- **`usePersonBySlug`**: Individual person/artist data
- **`useHomeBlocks`**: Homepage content blocks
- **`useHeaderMenu`**: Navigation menu data
- **`useGeneralSettings`**: Site-wide configuration

## Template System

### WordPress Template Integration
The application maps WordPress templates to React components:

```
WordPress Template → Next.js Template → React Component
├── front-page.php → front-page.js → FrontPage component
├── single.php → single.js → Post component
├── page.php → page.js → Page component
└── [custom-post-type] → [...wordpressNode].js → Dynamic routing
```

### Dynamic Routing
- **`[...wordpressNode].js`**: Catches all WordPress content URLs
- **Template Variables**: Dynamic data injection based on WordPress context
- **Preview Mode**: Live preview for draft and pending content

## Performance Architecture

### Optimization Strategies
- **Static Site Generation (SSG)**: Pre-built pages for optimal loading
- **Image Optimization**: Responsive images with Next.js Image component
- **Code Splitting**: Automatic bundle optimization
- **GraphQL Caching**: Apollo Client cache management
- **SCSS Compilation**: Optimized CSS output

### Caching Strategy
- **Static Assets**: Long-term caching for images and fonts
- **API Responses**: Apollo Client in-memory cache
- **Build Cache**: Next.js build optimization
- **CDN**: WP Engine's global content delivery network

## Security Architecture

### Content Security Policy (CSP)
- Configured via `next-secure-headers`
- Prevents XSS attacks
- Controls resource loading

### Data Validation
- GraphQL schema validation
- Input sanitization via WordPress
- Type safety through TypeScript-like patterns

## Deployment Architecture

### Development Environment
```
Local Machine → Local by Flywheel (WordPress) → Next.js Dev Server
```

### Production Environment
```
WordPress (WP Engine) → GraphQL API → Next.js Build → Static Site (WP Engine Headless)
```

### Build Process
1. **Content Sync**: WordPress content via GraphQL
2. **Static Generation**: Next.js builds static pages
3. **Asset Optimization**: Images, fonts, and CSS optimization
4. **Deployment**: Automated deployment to WP Engine Headless

## Key Architectural Decisions

### Why Headless WordPress?
- **Content Management**: Familiar WordPress admin for content creators
- **Performance**: Static site generation for fast loading
- **Flexibility**: Custom frontend without WordPress theme limitations
- **SEO**: Better control over meta tags and structured data

### Why Faust.js?
- **Integration**: Purpose-built for WordPress headless architecture
- **Preview Mode**: Seamless preview functionality
- **Authentication**: Built-in WordPress authentication handling
- **Community**: Official WP Engine support and documentation

### Why Component-Based Architecture?
- **Maintainability**: Isolated, testable components
- **Reusability**: Shared components across pages
- **Scalability**: Easy to add new features and content types
- **Developer Experience**: Modern React development patterns

## Future Considerations

### Scalability
- Component library development
- Micro-frontend architecture for large-scale growth
- Advanced caching strategies
- Performance monitoring integration

### Enhancement Opportunities
- TypeScript migration for better type safety
- Testing framework implementation
- Internationalization support
- Advanced search features (faceted search, filters)

---

This architecture provides a solid foundation for a modern, performant, and maintainable digital archive while preserving the content management benefits of WordPress.