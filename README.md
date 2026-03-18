# Anagha Bhandare — Portfolio

Minimal, editorial portfolio site for Anagha Bhandare, Trend Analyst.

Built with Next.js 14 (App Router), Tailwind CSS, and Framer Motion.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How to Update Content

All editable content lives in the `config/` folder. No coding knowledge needed.

### Swap Hero Images (Google Drive)

1. Create a Google Drive folder with your images and set sharing to "Anyone with the link"
2. Copy `.env.local.example` to `.env.local`
3. Paste the folder URL into `NEXT_PUBLIC_IMAGES_FOLDER_URL`
4. Optionally add a Google API key in `NEXT_PUBLIC_GOOGLE_API_KEY`
5. Restart the dev server

### Replace the CV PDF

Drop your new PDF file into `public/cv.pdf` — it replaces automatically, no code changes.

### Add/Edit Insights Reports

Edit `config/reports.ts`:
- Each report has a `title` and a `link` (Google Slides/Drive URL)
- Add or remove entries from the array

### Add Clothing Items for the Mannequin

Edit `config/wardrobe.ts`:
- Add entries with `id`, `label`, `src` (image in `public/wardrobe/`), and `zone` (top/bottom/shoes/accessory)
- Place PNG images in `public/wardrobe/`

### Edit LinkedIn Bio

Edit `config/linkedin.ts` — update the `bio` field.

### Edit CV Bio

Edit `config/cv.ts` — update `sectionTitle` and `bio`.

### Edit Site Name, Buttons, Colors

Edit `config/site.ts`.

## Deploy to Vercel

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables in the Vercel dashboard (same as `.env.local`)
4. Deploy

## Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion
- @dnd-kit/core (drag and drop)
- @vercel/analytics
