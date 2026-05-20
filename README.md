# Portfolio — Manish Deotale

Personal portfolio built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

**Live site:** [https://manish-deotale.github.io/Portfolio/](https://manish-deotale.github.io/Portfolio/)

## Local development

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

This repo uses **GitHub Actions** to build and publish automatically when you push to `main`.

### First-time setup

1. Create a new repository on GitHub named **`Portfolio`** (must match the Vite `base` path).
2. In your project folder, run:

```bash
git init
git add .
git commit -m "Initial commit: portfolio for GitHub Pages"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Portfolio.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username (e.g. `manish-deotale`).

3. On GitHub, open the repo → **Settings** → **Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. After the workflow finishes, your site will be live at:

   `https://YOUR_USERNAME.github.io/Portfolio/`

### Updates

Push changes to `main`; GitHub Actions will rebuild and redeploy:

```bash
git add .
git commit -m "Update portfolio"
git push
```

### Manual deploy (optional)

```bash
npm run deploy
```

This uses the `gh-pages` package and pushes the `dist` folder to the `gh-pages` branch. You must enable Pages from the **`gh-pages`** branch in repo Settings if you use this method instead of Actions.
