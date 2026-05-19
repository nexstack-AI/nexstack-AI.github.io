# 🚀 3D Portfolio

A jaw-dropping developer portfolio packed with interactive 3D animations, buttery smooth transitions, and a space-themed aesthetic. Not your average portfolio template! This one has a fully interactive 3D keyboard where each keycap is a skill.

> **Free to use!** This portfolio is open source. If you use it, a credit/link back would be really appreciated 🙏

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nexstack-AI/nexstack-AI.github.io)

![Portfolio Preview](public/assets/projects-screenshots/portfolio/landing.png)

## ✨ Features

- **Interactive 3D Keyboard** — Custom Spline keyboard where each keycap represents a skill, revealing titles and descriptions on hover/press
- **Buttery Animations** — GSAP + Framer Motion powered scroll, hover, and reveal animations
- **Space Theme** — Floating particles on a dark canvas for a cosmic vibe
- **Light & Dark Mode** — Full theme support with cheeky disclaimer toasts
- **Responsive** — Works across all screen sizes
- **Contact Form** — Email delivery via Resend
- **Analytics** _(optional)_ — Umami analytics integration

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | Next.js 14, React 18, TypeScript |
| **Styling** | Tailwind CSS, Shadcn UI, Aceternity UI |
| **Animation** | GSAP, Framer Motion |
| **3D** | Spline Runtime |
| **Email** | Resend |
| **Misc** | Lenis (smooth scroll), Zod, next-themes |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm (recommended), npm, or yarn

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/nexstack-AI/nexstack-AI.github.io.git
    cd nexstack-AI.github.io
    ```

2. **Install dependencies:**

    ```bash
    pnpm install
    ```

3. **Set up environment variables:**

    Copy `.env.example` to `.env.local` and fill in the values:

    ```bash
    cp .env.example .env.local
    ```

    | Variable | Required | Description |
    |---|---|---|
    | `RESEND_API_KEY` | Yes | API key from [Resend](https://resend.com) for the contact form |
    | `NEXT_PUBLIC_WS_URL` | No | WebSocket server URL for realtime features (cursors, chat, presence) |
    | `UMAMI_DOMAIN` | No | Umami analytics script URL |
    | `UMAMI_SITE_ID` | No | Umami website ID |

4. **Run the development server:**

    ```bash
    pnpm dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) and see the magic ✨

---

## 🎨 Make It Your Own

All personal info is centralized in [`src/data/config.ts`](src/data/config.ts). Edit this single file to rebrand the portfolio:

```ts
const config = {
  title: "Your Name | Your Title",
  description: {
    long: "Your long description for SEO...",
    short: "Your short description...",
  },
  keywords: ["your", "keywords"],
  author: "Your Name",
  email: "you@example.com",
  site: "https://yoursite.com",

  // GitHub stars button in the header
  githubUsername: "your-github-username",
  githubRepo: "your-repo-name",

  social: {
    twitter: "https://x.com/you",
    linkedin: "https://linkedin.com/in/you",
    instagram: "https://instagram.com/you",
    facebook: "https://facebook.com/you",
    github: "https://github.com/you",
  },
};
```

Other files you'll want to customize:

| File | What to change |
|---|---|
| `src/data/projects.tsx` | Your projects, screenshots, descriptions, and tech stacks |
| `src/data/constants.ts` | Skills list (name, description, icon) and work experience |
| `public/assets/` | Your images, OG image, and project screenshots |

---

## ⌨️ Customizing the 3D Keyboard Skills

The keyboard keycap icons and colors are fully customizable in code — no Spline membership required. The app injects custom SVG icons onto keycap surfaces at runtime by swapping texture data inside Spline's internal Three.js `NodeMaterial` uniforms.

### Custom Keycap Icons & Colors

If you don't have a Spline membership or prefer not to edit the `.splinecode` file, you can customize keycap icons and colors entirely in code:

**How it works** — The app injects custom SVG icons onto keycap surfaces at runtime by swapping texture data inside Spline's internal Three.js `NodeMaterial` uniforms. No Spline re-export needed.

**Files you need:**

| File | Purpose |
|---|---|
| `public/icons-keyboard/` | 29 SVG icons (one per skill). Replace any `.svg` to change its keycap icon. |
| `src/data/constants.ts` | Each skill's `color`, `label`, and `shortDescription`. |
| `src/components/animated-background.tsx` | Texture injection logic + Spline name mapping. |

**To change an icon:**
1. Drop a new SVG into `public/icons-keyboard/` with the same filename as the skill's `name` field (e.g. `react.svg`, `docker.svg`)
2. Rebuild and deploy — done.

**To change a keycap's display color:**
Edit `color` in `src/data/constants.ts` for the corresponding skill.

**To add a brand-new skill not in the Spline scene:**
You must edit the original `.splinecode` file in Spline to add the keycap object first. 5 skills (`Three`, `stablediffusion`, `comfyui`, `cursor`, `aitools`) currently have no matching keycap in the scene and only appear as skill cards, not on the 3D keyboard.

**Spline name mismatch?** If your `skill.name` doesn't match the Spline object name, update the `splineNameMap` in `animated-background.tsx`.

Full details in [`KEYCAP-CUSTOMIZATION.md`](KEYCAP-CUSTOMIZATION.md).

---

## 🔌 Realtime Features (Optional)

The portfolio supports optional realtime features powered by a **separate backend API**:

- 🖱️ **Live cursors** — See other visitors' cursors in realtime
- 👥 **Online presence** — Shows who's currently on the site
- 💬 **Chat** — Live chat between visitors

These features activate automatically when the `NEXT_PUBLIC_WS_URL` environment variable is set. Without it, the portfolio works perfectly fine as a static site — no realtime features, no backend dependency.

> [!NOTE]
> The backend API is **not open source**. This is intentional! Too many people have cloned the portfolio and claimed they built it from scratch. The realtime server stays private to keep the live experience unique and make it standout.


---

## 🚀 Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nexstack-AI/nexstack-AI.github.io)

This site is deployed on **Vercel**. To deploy your own:

1. Push your code to a GitHub repository
2. Connect the repository to [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Vercel handles the rest — automatic deployments on every push

