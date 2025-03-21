# Superbloom Design System Migration

This document outlines the migration plan for the Superbloom design system, transitioning from SCSS to TailwindCSS and Radix UI. It's structured to facilitate the systematic implementation of design tokens, typography, and components.

## Table of Contents

- [Design Tokens](#design-tokens)
  - [Colors](#colors)
  - [Typography](#typography)
  - [Spacing](#spacing)
  - [Borders and Shadows](#borders-and-shadows)
- [Typography System](#typography-system)
  - [Font Families](#font-families)
  - [Base Styles with @layer](#base-styles-with-layer)
- [Component System](#component-system)
  - [Component Inventory](#component-inventory)
  - [Primitive Components](#primitive-components)
  - [Card Components](#card-components)
  - [Layout Components](#layout-components)
  - [Navigation Components](#navigation-components)
- [Accessibility](#accessibility)
  - [Skip Links](#skip-links)
  - [ARIA Attributes](#aria-attributes)
  - [Keyboard Navigation](#keyboard-navigation)
- [Migration Strategy](#migration-strategy)
  - [Class Mapping](#class-mapping)
  - [Implementation Order](#implementation-order)
  - [Testing Strategy](#testing-strategy)

---

## Design Tokens

### Colors

#### SCSS Color Variables

```scss
// Base colors
$black: #000;
$nearblack: lighten($black, 20%); // #333
$grey-dark: lighten($black, 40%); // #666
$grey-default: lighten($black, 60%); // #999
$grey-light: lighten($black, 80%); // #ccc
$grey-extra-light: lighten($black, 93.33%); // #eee
$white: #fff;

$blue: #0072b9;
$red: #c00;
$green: #43a808;
$yellow: #fd0;

// Brand colors
$grey: #f7f6f4;
$orchid: #d7a0d8;
$sage: #C2D5BE;
$pumkin: #d66243;
$iris: #424faa;
$olive: #6e7e55;
$moss: #264a2c;
$rose: #7e102d;
$thistle: #6ba2c1;

// Color mapping
$colors: (
  brand: $moss,
  brand-accent: $pumkin,
  brand-accent2: $grey,
  brand2: $iris,
  brand2-accent: $sage,
  brand3: $sage,
  brand3-accent: $pumkin,
  brand4: $thistle,
  brand4-accent: $orchid,
  brand4-accent2: $rose,
  brand5: $pumkin,
  brand5-accent: $iris,
  brand6: $orchid,
  brand6-accent: $rose,

  text: $black,
  text-bg: $white,
  text-meta: $grey-dark,

  link: $iris,
  link-visited: $rose,
  link-hover: $pumkin,
  link-active: $green,

  border: $blue,
  border-accent: $pumkin,

  button: $pumkin,
  button-hover: $white,
  button-text: $white,
  button-text-hover: $grey,
  button-disabled: $grey-default,

  // Additional functional colors defined in original system
  form-error: $red,
  mark-highlight: $red,
  mark-bg: $yellow,
  status: $green,
  warning: $black,
  error: $red,
)
```

#### Tailwind Colors Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        black: '#000',
        nearblack: '#333',
        'grey-dark': '#666',
        'grey-default': '#999',
        'grey-light': '#ccc',
        'grey-extra-light': '#eee',
        white: '#fff',
        
        blue: '#0072b9',
        red: '#c00',
        green: '#43a808',
        yellow: '#fd0',
        
        grey: '#f7f6f4',
        orchid: '#d7a0d8',
        sage: '#C2D5BE',
        pumkin: '#d66243',
        iris: '#424faa',
        olive: '#6e7e55',
        moss: '#264a2c',
        rose: '#7e102d',
        thistle: '#6ba2c1',
        
        // Semantic colors
        brand: {
          DEFAULT: '#264a2c', // moss
          accent: '#d66243', // pumkin
          accent2: '#f7f6f4', // grey
        },
        brand2: {
          DEFAULT: '#424faa', // iris
          accent: '#C2D5BE', // sage
        },
        brand3: {
          DEFAULT: '#C2D5BE', // sage
          accent: '#d66243', // pumkin
        },
        brand4: {
          DEFAULT: '#6ba2c1', // thistle
          accent: '#d7a0d8', // orchid
          accent2: '#7e102d', // rose
        },
        brand5: {
          DEFAULT: '#d66243', // pumkin
          accent: '#424faa', // iris
        },
        brand6: {
          DEFAULT: '#d7a0d8', // orchid
          accent: '#7e102d', // rose
        },
        
        // Functional colors
        text: {
          DEFAULT: '#000', // black
          meta: '#666', // grey-dark
          bg: '#fff', // white
        },
        link: {
          DEFAULT: '#424faa', // iris
          visited: '#7e102d', // rose
          hover: '#d66243', // pumkin
          active: '#43a808', // green
        },
        border: {
          DEFAULT: '#0072b9', // blue
          accent: '#d66243', // pumkin
        },
        button: {
          DEFAULT: '#d66243', // pumkin
          hover: '#fff', // white
          text: '#fff', // white
          'text-hover': '#f7f6f4', // grey
          disabled: '#999', // grey-default
        },
        status: {
          DEFAULT: '#43a808', // green
          bg: '#ebf7e3', // light green
        },
        warning: {
          DEFAULT: '#000', // black
          bg: '#fff8de', // light yellow
          border: '#fd0', // yellow
        },
        error: {
          DEFAULT: '#c00', // red
          bg: '#fff0f0', // light red
        },
      }
    }
  }
}
```

### Typography

#### SCSS Typography Variables

```scss
/* Fluid font size variables, for browsers that support clamp */
@supports (font-size: clamp(1rem, 1vw, 1rem)) {
  :root {
    --type-size-xxxs: clamp(0.99rem, -1vw + 1.36rem, 0.8rem);
    --type-size-xxs: clamp(1.05rem, -0.29vw + 1.16rem, 1rem);
    --type-size-xs: clamp(1.13rem, 0.66vw + 0.88rem, 1.25rem);
    --type-size-s: clamp(1.2rem, 1.92vw + 0.48rem, 1.56rem);
    --type-size-m: clamp(1.28rem, 3.57vw + -0.06rem, 1.95rem);
    --type-size-l: clamp(1.37rem, 5.71vw + -0.77rem, 2.44rem);
    --type-size-xl: clamp(1.46rem, 8.47vw + -1.71rem, 3.05rem);
    --type-size-xxl: clamp(1.56rem, 12.01vw + -2.94rem, 3.81rem);
    --type-size-xxxl: clamp(1.66rem, 16.52vw + -4.53rem, 4.77rem);
    --type-size-xxxxl: clamp(1.77rem, 22.27vw + -6.57rem, 5.96rem);
  }
}

/* Fallback variables for browsers that don't support clamp */
@supports not (font-size: clamp(1rem, 1vw, 1rem)) {
  :root {
    --type-size-xxxs: 0.99rem;
    --type-size-xxs: 1.05rem;
    --type-size-xs: 1.13rem;
    --type-size-s: 1.2rem;
    --type-size-m: 1.28rem;
    --type-size-l: 1.37rem;
    --type-size-xl: 1.46rem;
    --type-size-xxl: 1.56rem;
    --type-size-xxxl: 1.66rem;
    --type-size-xxxxl: 1.77rem;
  }

  @media screen and (min-width: 900px) {
    :root {
      --type-size-xxxs: 0.8rem;
      --type-size-xxs: 1rem;
      --type-size-xs: 1.25rem;
      --type-size-s: 1.56rem;
      --type-size-m: 1.95rem;
      --type-size-l: 2.44rem;
      --type-size-xl: 3.05rem;
      --type-size-xxl: 3.81rem;
      --type-size-xxxl: 4.77rem;
      --type-size-xxxxl: 5.96rem;
    }
  }
}

// Variables for landing, section, list headings
$hero-title: var(--type-size-xxxxl);
$page-title: var(--type-size-xxxl);
$section-title: var(--type-size-xxl);
$descript-title: var(--type-size-xl);
$list-title: var(--type-size-l);
$sidebar-header: var(--type-size-m);
$bullet: var(--type-size-s);
$page-body: var(--type-size-xs);
$button: var(--type-size-xxs);
$small: var(--type-size-xxxs);

// Line height variables
:root {
  --line-height-normal: 100%;
  --line-height-medium: 120%;
  --line-height-prose: 160%;
}

$line-height-prose: var(--line-height-prose);
$line-height-medium: var(--line-height-medium);
$line-height-normal: var(--line-height-normal);

// Font weights
$font-weight: (
  'bold': 700,
  'semi-bold': 600,
  'medium': 500,
  'normal': 400,
  'light': 300,
  'lighter': 200
);
```

#### Tailwind Typography Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        // Fluid typography with clamp values
        'xxxs': ['clamp(0.99rem, -1vw + 1.36rem, 0.8rem)', { lineHeight: '1.5' }],
        'xxs': ['clamp(1.05rem, -0.29vw + 1.16rem, 1rem)', { lineHeight: '1.5' }],
        'xs': ['clamp(1.13rem, 0.66vw + 0.88rem, 1.25rem)', { lineHeight: '1.5' }],
        's': ['clamp(1.2rem, 1.92vw + 0.48rem, 1.56rem)', { lineHeight: '1.3' }],
        'm': ['clamp(1.28rem, 3.57vw + -0.06rem, 1.95rem)', { lineHeight: '1.3' }],
        'l': ['clamp(1.37rem, 5.71vw + -0.77rem, 2.44rem)', { lineHeight: '1.2' }],
        'xl': ['clamp(1.46rem, 8.47vw + -1.71rem, 3.05rem)', { lineHeight: '1.2' }],
        'xxl': ['clamp(1.56rem, 12.01vw + -2.94rem, 3.81rem)', { lineHeight: '1.1' }],
        'xxxl': ['clamp(1.66rem, 16.52vw + -4.53rem, 4.77rem)', { lineHeight: '1.1' }],
        'xxxxl': ['clamp(1.77rem, 22.27vw + -6.57rem, 5.96rem)', { lineHeight: '1' }],
      },
      lineHeight: {
        'normal': '100%',
        'medium': '120%',
        'prose': '160%'
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
}
```

### Spacing

#### SCSS Spacing Variables

```scss
:root {
  --space-3xs: clamp(0.31rem, calc(0.31rem + 0.00vw), 0.31rem);
  --space-2xs: clamp(0.56rem, calc(0.53rem + 0.17vw), 0.63rem);
  --space-xs: clamp(0.88rem, calc(0.84rem + 0.17vw), 0.94rem);
  --space-s: clamp(1.13rem, calc(1.06rem + 0.34vw), 1.25rem);
  --space-m: clamp(1.69rem, calc(1.59rem + 0.51vw), 1.88rem);
  --space-l: clamp(2.25rem, calc(2.13rem + 0.68vw), 2.50rem);
  --space-xl: clamp(3.38rem, calc(3.19rem + 1.02vw), 3.75rem);
  --space-2xl: clamp(4.50rem, calc(4.25rem + 1.36vw), 5.00rem);
  --space-3xl: clamp(6.75rem, calc(6.38rem + 2.05vw), 7.50rem);
}
```

#### Tailwind Spacing Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        '3xs': 'clamp(0.31rem, calc(0.31rem + 0.00vw), 0.31rem)',
        '2xs': 'clamp(0.56rem, calc(0.53rem + 0.17vw), 0.63rem)',
        'xs': 'clamp(0.88rem, calc(0.84rem + 0.17vw), 0.94rem)',
        's': 'clamp(1.13rem, calc(1.06rem + 0.34vw), 1.25rem)',
        'm': 'clamp(1.69rem, calc(1.59rem + 0.51vw), 1.88rem)',
        'l': 'clamp(2.25rem, calc(2.13rem + 0.68vw), 2.50rem)',
        'xl': 'clamp(3.38rem, calc(3.19rem + 1.02vw), 3.75rem)',
        '2xl': 'clamp(4.50rem, calc(4.25rem + 1.36vw), 5.00rem)',
        '3xl': 'clamp(6.75rem, calc(6.38rem + 2.05vw), 7.50rem)',
      }
    }
  }
}
```

### Borders and Shadows

#### SCSS Border and Shadow Variables

```scss
:root {
  --box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  --border-radius: 4px;
  --border-width: 1px;
  --border-style: solid;
  --border-color: var(--color-border);
}
```

#### Tailwind Border and Shadow Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        'full': '9999px',
      },
      boxShadow: {
        'none': 'none',
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      }
    }
  }
}
```

## Typography System

### Font Families

#### SCSS Font Definitions

```scss
@font-face {
    font-family: 'IBM Plex Sans';
    src: url('../fonts/IBMPlexSans-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'IBM Plex Sans';
    src: url('../fonts/IBMPlexSans-Bold.woff2') format('woff2');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}

// Multiple weights and styles defined...

@font-face {
    font-family: 'JetBrains Mono';
    src: url('../fonts/JetBrainsMono-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

// Multiple weights and styles defined...
```

#### Tailwind Typography Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
    }
  }
}
```

### Base Styles with @layer

```css
/* src/styles/global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1 {
    @apply text-xxxxl font-bold mb-4;
  }
  h2 {
    @apply text-xxxl font-semibold mb-3;
  }
  h3 {
    @apply text-xxl font-medium mb-2;
  }
  h4 {
    @apply text-xl font-medium mb-2;
  }
  h5 {
    @apply text-lg font-medium mb-1;
  }
  h6 {
    @apply text-base font-medium mb-1;
  }
  p {
    @apply text-xs mb-4;
  }
  a {
    @apply text-link hover:text-link-hover underline;
  }
  ul, ol {
    @apply pl-6 mb-4;
  }
  ul {
    @apply list-disc;
  }
  ol {
    @apply list-decimal;
  }
  blockquote {
    @apply pl-4 border-l-4 border-grey-300 italic;
  }
}
```

## Component System

### Component Inventory

Based on the existing SCSS components directory structure, the following components need to be implemented in Tailwind and Radix:

- Box
- Button
- Cards
- Clearfix
- Cookieconsent
- Divider
- Footer
- Form elements
- Header
- Hero
- Language selector
- Messages/alerts
- Navigation elements
- Projects
- Responsive video
- Tabs

### Primitive Components

#### 1. Buttons

```jsx
// Button.tsx
import React from 'react';

type ButtonVariant = 'primary' | 'alt' | 'outline' | 'clear';
type ButtonSize = 'small' | 'medium' | 'large' | 'featured';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  isFullWidth?: boolean;
}

const variantStyles = {
  primary: 'bg-pumkin text-white border-4 border-pumkin hover:bg-white hover:text-iris hover:border-pumkin hover:font-bold',
  alt: 'bg-white text-grey border-4 border-pumkin hover:bg-pumkin hover:text-white',
  outline: 'bg-white text-pumkin border-4 border-pumkin hover:bg-pumkin hover:text-white',
  clear: 'bg-transparent border-none text-iris hover:text-pumkin',
};

const sizeStyles = {
  small: 'text-xxs py-2xs px-xs',
  medium: 'text-xs py-xs px-s',
  large: 'text-s py-s px-m',
  featured: 'text-m py-m px-l mt-xl',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  icon,
  isFullWidth = false,
  className = '',
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${isFullWidth ? 'w-full' : ''}
        rounded-md font-semibold transition duration-230 ease-in-out
        flex items-center justify-center
        focus:ring-4 focus:ring-orchid
        active:ring-4 active:ring-iris active:bg-iris active:text-white
        ${disabled ? 'cursor-default text-grey-default bg-grey-extra-light border-grey-default' : ''}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {icon && <span className={`${children ? 'mr-2' : ''}`}>{icon}</span>}
      {children}
    </button>
  );
};
```

#### 2. Card

```jsx
// Card.tsx
import React from 'react';

interface CardProps {
  title?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  variant?: 'basic' | 'image' | 'horizontal';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  image,
  imageAlt,
  actions,
  children,
  variant = 'basic',
  className = '',
}) => {
  const renderContent = () => (
    <>
      {title && (
        <div className="px-s py-xs border-b border-grey-light">
          <h3 className="text-m font-medium">{title}</h3>
        </div>
      )}
      <div className="p-s">{children}</div>
      {actions && (
        <div className="px-s py-xs border-t border-grey-light flex justify-end space-x-xs">
          {actions}
        </div>
      )}
    </>
  );

  if (variant === 'horizontal' && image) {
    return (
      <div className={`overflow-hidden rounded-md shadow-md border border-grey-light flex ${className}`}>
        <div className="w-1/3">
          <img src={image} alt={imageAlt || ''} className="w-full h-full object-cover" />
        </div>
        <div className="w-2/3 flex flex-col">{renderContent()}</div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-md shadow-md border border-grey-light ${className}`}>
      {variant === 'image' && image && (
        <div className="aspect-w-16 aspect-h-9">
          <img src={image} alt={imageAlt || ''} className="w-full object-cover" />
        </div>
      )}
      {renderContent()}
    </div>
  );
};
```

### Card Components

#### Blog Card

The blog card is used to display blog posts in a list view. It includes an image, title, date, authors, and a short description.

```jsx
// React component using Tailwind classes
const BlogCard = ({ post }) => (
  <article 
    className="group cursor-pointer grid grid-cols-1 md:grid-cols-3 gap-4 bg-white hover:shadow-md transition-shadow duration-200"
    onClick={() => window.location.href = post.url}
  >
    <div className="md:col-span-2 p-4">
      <header>
        <div className="flex items-center gap-2 text-sm text-grey-dark mb-2">
          <time dateTime={post.date} className="text-grey-dark">
            {formatDate(post.date)}
          </time>
          <span className="text-grey-dark">
            {post.authors.join(', ')}
          </span>
        </div>
        <h3 className="text-xl font-medium mb-2">
          <a href={post.url} className="text-black hover:text-iris">
            {post.title}
          </a>
        </h3>
      </header>
      <div className="text-grey-dark">
        {post.description || post.excerpt}
      </div>
    </div>
    
    <div className="featured-image">
      {post.image ? (
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="bg-grey-light w-full h-full"></div>
      )}
    </div>
    
    <div className="md:col-span-3 p-4 flex flex-wrap gap-2">
      {post.topics.map(topic => (
        <span key={topic} className="bg-grey px-3 py-1 text-sm rounded-full">
          {topic}
        </span>
      ))}
    </div>
  </article>
);
```

#### People Card

The people card is used to display staff and alumni profiles. It includes a photo or an asterisk image, name, and job title.

```jsx
// React component using Tailwind classes
const PeopleCard = ({ person }) => (
  <article 
    className="cursor-pointer transition-all duration-200 hover:shadow-md bg-white"
    onClick={() => window.location.href = person.url}
  >
    <div className="relative overflow-hidden aspect-square">
      {person.photo ? (
        <img 
          src={person.photo}
          alt={person.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <img 
          src={`/images/about-us/asterisk${person.asterisk || '1'}.svg`}
          alt=""
          className="w-full h-full object-contain p-4"
        />
      )}
    </div>
    <h3 className="p-4 pb-1 text-lg font-medium lowercase">
      <a href={person.url} className="text-black hover:text-iris">
        {person.name.toLowerCase()}
      </a>
    </h3>
    <h4 className="p-4 pt-0 text-grey-dark lowercase">
      {person.jobtitle.toLowerCase()}
    </h4>
  </article>
);
```

### Layout Components

The Superbloom website uses several layout components that should be included in the migration:

#### Page Layout

The base layout template that defines the overall page structure:

```jsx
// React component using Tailwind classes
const PageLayout = ({ children, sidebar, isSinglePage, isHomePage, bodyClass }) => (
  <body className={`
    ${isSinglePage ? 'single-page' : 'list-page'} 
    ${isHomePage ? 'front' : ''} 
    ${bodyClass || ''}
    fade-in
  `}>
    <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white p-2 z-50">
      Skip to Content
    </a>
    
    <div className={`page w-full ${sidebar ? 'grid-cols-[1fr_300px] lg:grid' : ''}`}>
      <Header />
      
      <main id="main-content" className="px-4 md:px-8 py-6">
        {children}
      </main>
      
      {sidebar && (
        <aside className="px-4 md:px-8 py-6">
          {sidebar}
        </aside>
      )}
      
      <Footer />
    </div>
  </body>
);
```

#### Header Component

The header component that includes the logo and navigation:

```jsx
// React component using Tailwind classes
const Header = () => (
  <header className="bg-white shadow-sm">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <a href="/" className="flex-shrink-0">
        <img 
          src="/images/sb-logo-primary.svg" 
          alt="Superbloom"
          className="h-10 w-auto"
        />
      </a>
      
      <nav className="hidden md:flex gap-6">
        <a href="/about" className="text-black hover:text-iris">About</a>
        <a href="/services" className="text-black hover:text-iris">Services</a>
        <a href="/work" className="text-black hover:text-iris">Work</a>
        <a href="/blog" className="text-black hover:text-iris">Blog</a>
        <a href="/contact" className="text-black hover:text-iris">Contact</a>
      </nav>
      
      <button className="md:hidden">
        <span className="sr-only">Menu</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  </header>
);
```

### Navigation Components

#### Back Button

The back button component that allows users to navigate back to the parent page:

```jsx
// React component using Tailwind classes
const BackButton = ({ parent, section }) => {
  let url = '/';
  let text = 'Home';
  
  if (parent) {
    url = parent.url;
    text = parent.title;
  } else if (section) {
    url = `/${section}`;
    text = section.charAt(0).toUpperCase() + section.slice(1);
  }
  
  return (
    <nav className="my-4">
      <a 
        href={url}
        className="inline-flex items-center text-black hover:text-iris"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" className="mr-2">
          <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        return to {text}
      </a>
    </nav>
  );
};
```

#### Mobile Menu

The mobile menu component that is shown on smaller screens:

```jsx
// React component using Tailwind classes
const MobileMenu = ({ isOpen, onClose }) => (
  <div className={`
    fixed inset-0 bg-white z-50 transform transition-transform duration-300
    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
  `}>
    <div className="flex justify-between items-center p-4 border-b">
      <a href="/" className="flex-shrink-0">
        <img 
          src="/images/sb-logo-primary.svg" 
          alt="Superbloom"
          className="h-10 w-auto"
        />
      </a>
      
      <button onClick={onClose}>
        <span className="sr-only">Close</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
    <nav className="p-4 flex flex-col space-y-4">
      <a href="/about" className="text-xl text-black hover:text-iris py-2">About</a>
      <a href="/services" className="text-xl text-black hover:text-iris py-2">Services</a>
      <a href="/work" className="text-xl text-black hover:text-iris py-2">Work</a>
      <a href="/blog" className="text-xl text-black hover:text-iris py-2">Blog</a>
      <a href="/contact" className="text-xl text-black hover:text-iris py-2">Contact</a>
    </nav>
  </div>
);
```

## Accessibility

Ensuring that the migrated design system maintains and improves accessibility is critical. The following features should be included in the migration:

### Skip Links

Skip links allow keyboard users to bypass repetitive navigation elements.

- Provide a skip link to the main content area for screen readers and keyboard navigation
- Implement using the `sr-only` and `focus:not-sr-only` utility classes in Tailwind

### ARIA Attributes

- Use ARIA attributes to provide a clear and consistent navigation experience for screen readers
- Include proper role attributes on interactive elements
- Ensure form elements have appropriate labels and descriptions

### Keyboard Navigation

- Ensure that all interactive elements can be accessed using the keyboard
- Provide visible focus styles using Tailwind's focus variants
- Implement keyboard event handlers for custom interactive components

## Migration Strategy

### Class Mapping

The following table shows the mapping between SCSS classes and Tailwind utility classes:

| SCSS Class           | Tailwind Equivalent                               |
|----------------------|---------------------------------------------------|
| `.button`            | `.bg-pumkin text-white py-2 px-4 rounded hover:bg-white hover:text-grey hover:border-pumkin border-4 border-transparent` |
| `.button--alt`       | `.bg-white text-grey border-4 border-pumkin hover:bg-pumkin hover:text-white` |
| `.button--outline`   | `.bg-white text-pumkin border-4 border-pumkin hover:bg-pumkin hover:text-white` |
| `.hero-title`        | `.text-xxxxl`                                        |
| `.page-title`        | `.text-xxxl`                                        |
| `.section-title`     | `.text-xxl`                                        |

### Implementation Order

1. **Set up Tailwind and base configuration**
   - Install TailwindCSS and configure it
   - Set up the custom theme with design tokens
   - Configure typography plugin

2. **Implement global styles and typography**
   - Configure typography plugin
   - Set up base layer for HTML elements
   - Implement fluid typography

3. **Develop primitive components**
   - Buttons and form elements
   - Box and layout components
   - Typography components

4. **Integrate Radix UI components**
   - Tabs, accordion, dialog, etc.
   - Style with Tailwind utility classes

5. **Create composite components**
   - Cards, navigation, etc.
   - Page-specific components

6. **Refine responsive behavior**
   - Test and adjust breakpoints
   - Implement responsive variants

### Testing Strategy

1. **Visual comparison**
   - Create side-by-side comparisons of old vs. new components
   - Use Storybook for isolated component testing

2. **Component tests**
   - Unit tests for component behavior
   - Visual regression tests

3. **Accessibility testing**
   - Verify WCAG compliance
   - Test with screen readers

4. **Browser compatibility**
   - Test across major browsers
   - Ensure proper fallbacks for older browsers
