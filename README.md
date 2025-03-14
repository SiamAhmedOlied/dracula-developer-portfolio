# 🧛‍♂️ Dracula Developer Portfolio

<div align="center">
  <img src="https://socialify.git.ci/SiamAhmedOlied/dracula-developer-portfolio/image?font=Source+Code+Pro&language=1&name=1&owner=1&pattern=Diagonal+Stripes&stargazers=1&theme=Dark" alt="Dracula Portfolio Banner" width="800px" />
  <p><em>A sleek, dark-themed developer portfolio with the iconic Dracula color scheme</em></p>
</div>

## ✨ Features

- 🎨 **Dracula Theme** - Beautiful dark theme based on the popular Dracula color palette
- 🚀 **Modern Stack** - Built with React, TypeScript, Tailwind CSS, and Framer Motion
- 📱 **Responsive Design** - Looks great on all devices, from mobile to desktop
- 🔥 **Animations** - Smooth animations and transitions powered by Framer Motion
- 🔍 **SEO Optimized** - Meta tags and structured data for better search engine visibility
- 📊 **Supabase Integration** - Contact form with Supabase backend (with localStorage fallback)
- 🌙 **Accessibility** - Designed with accessibility in mind
- 🛠️ **Customizable** - Easy to customize and make your own

## 🚀 Live Demo

Check out the live demo: [Dracula Developer Portfolio](https://siamahmedolied.vercel.app)

## 🛠️ Technologies Used

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS with custom Dracula theme
- **Animations**: Framer Motion
- **Backend**: Supabase
- **Build Tool**: Vite
- **UI Components**: Shadcn UI
- **Form Handling**: React Hook Form
- **Data Fetching**: TanStack Query
- **Routing**: React Router

## 📋 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/siamahmedolied/dracula-developer-portfolio.git
   cd dracula-developer-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Start the development server:
   ```bash
npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:8080](http://localhost:8080) in your browser.

## 🗂️ Project Structure

```
dracula-developer-portfolio/
├── public/                  # Static assets
│   ├── components/          # React components
│   │   ├── ui/              # UI components (buttons, cards, etc.)
│   │   └── ...              # Feature components
│   ├── hooks/               # Custom React hooks
│   ├── integrations/        # Third-party integrations
│   │   └── supabase/        # Supabase client and types
│   ├── lib/                 # Utility functions and data
│   ├── pages/               # Page components
│   ├── App.tsx              # Main App component
│   ├── index.css            # Global styles
│   └── main.tsx             # Entry point
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration
```

## 🎨 Customization

### Changing Content

Edit the data files in `src/lib/data.ts` to update your personal information, projects, skills, and more.

### Modifying the Theme

The Dracula theme colors are defined in `tailwind.config.ts`. You can modify these colors to match your preferences.

### Adding New Sections

1. Create a new component in the `src/components` directory
2. Import and add the component to the appropriate page in `src/pages`

## 📝 Contact Form Setup

The contact form uses Supabase as a backend. To set it up:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the following SQL in the Supabase SQL Editor:

```sql
-- Create the contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous users to insert messages
CREATE POLICY "Allow anonymous users to insert messages"
ON public.contact_messages
FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy to allow authenticated users to view messages
CREATE POLICY "Allow authenticated users to view messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (true);
```

3. Update your environment variables with your Supabase URL and anon key

## 🌐 Deployment

### Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Set the environment variables
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import your repository in Netlify
3. Set the environment variables
4. Deploy!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Dracula Theme](https://draculatheme.com/) for the color palette inspiration
- [Shadcn UI](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide Icons](https://lucide.dev/) for the icons
- [Framer Motion](https://www.framer.com/motion/) for the animations

---

<div align="center">
  <p>Made with ❤️ by Siam Ahmed Olied</p>
  <p>
    <a href="https://github.com/yourusername">GitHub</a> •
    <a href="https://linkedin.com/in/yourusername">LinkedIn</a> •
    <a href="https://twitter.com/yourusername">Twitter</a>
  </p>
</div>
