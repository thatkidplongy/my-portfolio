# Modern Personal Portfolio Website

A beautiful, responsive personal portfolio website built with Next.js, TypeScript, and TailwindCSS. Features smooth animations, dark mode support, and a clean, professional design.

## ✨ Features

- **Modern Design**: Clean, minimal design with smooth animations
- **Responsive Layout**: Fully responsive design that works on all devices
- **Dark Mode**: Toggle between light, dark, and system themes
- **Smooth Scrolling**: Smooth navigation between sections
- **Accessibility**: ARIA labels, proper focus management, and semantic HTML
- **SEO Optimized**: Meta tags, Open Graph, and Twitter Card support
- **TypeScript**: Full type safety with strict mode enabled
- **Performance**: Optimized with Next.js App Router and Framer Motion

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout with theme provider
│   └── page.tsx             # Main page component
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── navigation.tsx   # Navigation with theme toggle
│   │   └── theme-provider.tsx # Theme context provider
│   └── sections/            # Page sections
│       ├── hero.tsx         # Hero section
│       ├── about.tsx        # About section
│       ├── skills.tsx       # Skills section
│       ├── projects.tsx     # Projects showcase
│       ├── experience.tsx   # Work experience timeline
│       └── contact.tsx      # Contact form and info
├── lib/                     # Utility functions
└── types/                   # TypeScript type definitions
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Personal Information

Update the following files with your information:

- **Hero Section** (`src/components/sections/hero.tsx`): Name, title, description
- **About Section** (`src/components/sections/about.tsx`): Personal details, bio
- **Skills Section** (`src/components/sections/skills.tsx`): Your skills and proficiency levels
- **Projects Section** (`src/components/sections/projects.tsx`): Your projects with links
- **Experience Section** (`src/components/sections/experience.tsx`): Work history
- **Contact Section** (`src/components/sections/contact.tsx`): Contact details and social links

### Styling

- **Colors**: Modify the color scheme in TailwindCSS classes
- **Fonts**: Change fonts in `src/app/layout.tsx`
- **Animations**: Adjust animation timings in Framer Motion components

### SEO

Update metadata in `src/app/layout.tsx`:
- Title and description
- Keywords
- Author information
- Open Graph and Twitter Card data

## 📱 Sections Overview

### Hero Section
- Animated introduction with your name and title
- Call-to-action buttons
- Smooth scroll indicator

### About Section
- Personal information grid
- Professional bio
- Profile image placeholder

### Skills Section
- Categorized skills with proficiency levels
- Animated progress bars
- Technology icons

### Projects Section
- Featured projects (large cards)
- Additional projects (smaller cards)
- Tech stack tags and project links

### Experience Section
- Timeline layout for work history
- Company details and achievements
- Technology stacks used

### Contact Section
- Contact form with validation
- Contact information
- Social media links
- Availability status

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

- TypeScript strict mode enabled
- ESLint configuration for Next.js
- Consistent code formatting
- Accessibility best practices

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Focus management
- Color contrast compliance
- Screen reader friendly

## 🌙 Dark Mode

- Light, dark, and system theme support
- Smooth theme transitions
- Persistent theme preference
- Automatic system theme detection

## 📊 Performance

- Next.js App Router optimization
- Image optimization with Next.js Image
- Lazy loading for animations
- Efficient re-renders with React hooks
- Optimized bundle size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev/) - Beautiful icons

## 📞 Support

If you have any questions or need help customizing your portfolio, feel free to:
- Open an issue on GitHub
- Contact me through the portfolio contact form
- Check the documentation

---

**Happy coding! 🚀**
