# Amiearth Blog

A modern, high-performance personal blog built with Next.js 15, TypeScript, and Tailwind CSS. This blog focuses on web development, programming, and technology insights.

## 🚀 Features

### SEO & Performance

- **Advanced SEO Optimization**: Comprehensive meta tags, Open Graph, Twitter Cards
- **Structured Data**: JSON-LD schema markup for better search engine understanding
- **Core Web Vitals Monitoring**: Built-in performance tracking and optimization
- **Progressive Web App (PWA)**: Installable web app with manifest.json
- **Image Optimization**: WebP/AVIF support with automatic format selection
- **Performance Monitoring**: Real-time Core Web Vitals tracking

### Content Management

- **Markdown Support**: Write content in Markdown with frontmatter
- **Dynamic Routing**: Automatic page generation for blog posts and projects
- **RSS Feed**: Comprehensive RSS feed with categories and metadata
- **Sitemap Generation**: Automatic XML sitemap with priority and change frequency

### User Experience

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode Ready**: CSS variables for easy theming
- **Accessibility**: ARIA labels and semantic HTML
- **Fast Navigation**: Optimized routing and preloading

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: Markdown with gray-matter
- **Performance**: Vercel Speed Insights, Core Web Vitals
- **Analytics**: Google Analytics 4
- **Deployment**: Vercel (optimized)

## 📁 Project Structure

```
next-blog/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── components/         # Reusable components
│   │   ├── blog/              # Blog pages and components
│   │   ├── project/           # Project showcase
│   │   └── about/             # About page
│   ├── content/               # Markdown content
│   │   ├── posts/             # Blog posts
│   │   └── projects/          # Project descriptions
│   └── lib/                   # Utility functions
├── public/                    # Static assets
└── config files              # Next.js, Tailwind, etc.
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/earth774/next-blog.git
cd next-blog
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Content Management

### Adding Blog Posts

1. Create a new directory in `src/content/posts/[post-name]/`
2. Add a markdown file with frontmatter:

```markdown
---
title: "Your Post Title"
date: "2024-01-01"
image: "/images/posts/post-name/hero.webp"
excerpt: "Brief description of your post"
---

Your content here...
```

3. Add images to the corresponding directory in `public/images/posts/`

### Adding Projects

1. Create a markdown file in `src/content/projects/`
2. Add frontmatter:

```markdown
---
title: "Project Name"
description: "Project description"
link: "https://project-url.com"
date: "2024-01-01"
status: "active"
---
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### SEO Configuration

Update metadata in `src/app/layout.tsx` and individual pages for:

- Site title and description
- Open Graph tags
- Twitter Cards
- Structured data

## 📊 Performance Features

### Core Web Vitals

- **LCP (Largest Contentful Paint)**: Optimized with priority images
- **FID (First Input Delay)**: Minimal JavaScript execution
- **CLS (Cumulative Layout Shift)**: Stable layouts with proper image sizing

### Optimization Techniques

- **Image Optimization**: Automatic WebP/AVIF conversion
- **Code Splitting**: Dynamic imports for better performance
- **Caching**: Aggressive caching headers for static assets
- **Compression**: Gzip compression enabled

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. Deploy automatically on push to main branch

### Other Platforms

The app is optimized for Vercel but can be deployed to any Node.js hosting platform.

## 📈 Analytics & Monitoring

- **Google Analytics 4**: User behavior tracking
- **Vercel Speed Insights**: Performance monitoring
- **Core Web Vitals**: Real-time performance metrics
- **Custom Performance Monitoring**: Built-in performance tracking

## 🔍 SEO Features

### Search Engine Optimization

- **Meta Tags**: Comprehensive meta tag management
- **Structured Data**: JSON-LD schema markup
- **Sitemap**: Automatic XML sitemap generation
- **RSS Feed**: Rich RSS feed with categories
- **Robots.txt**: Search engine crawling instructions

### Social Media

- **Open Graph**: Facebook, LinkedIn sharing optimization
- **Twitter Cards**: Twitter sharing optimization
- **Rich Snippets**: Enhanced search result display

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and performance tools
- Tailwind CSS for the utility-first CSS framework
- The open-source community for inspiration

## 📞 Contact

- **Website**: [https://amiearth.com](https://amiearth.com)
- **Email**: contact@amiearth.com
- **GitHub**: [@earth774](https://github.com/earth774)

---

Built with ❤️ by [Sutthiphong Nuanma](https://amiearth.com) in Chiang Rai, Thailand 🇹🇭
