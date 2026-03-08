# Publish Geaux Play to the Web

Your app is a static site (HTML, CSS, JS). After building, you can host it for **free** on any of these platforms.

---

## Option 1: Vercel (recommended — free & fast)

1. **Create a Vercel account** at [vercel.com](https://vercel.com) (use GitHub, GitLab, or email).

2. **Push your project to GitHub** (if you haven’t already):
   ```bash
   git init
   git add .
   git commit -m "Geaux Play - Baton Rouge events"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/geaux-play.git
   git push -u origin main
   ```

3. **Import on Vercel**  
   - Go to [vercel.com/new](https://vercel.com/new).  
   - Import your `geaux-play` repo.  
   - Leave defaults (Build: `npm run build`, Output: `dist`).  
   - Click **Deploy**.

4. Your site will get a URL like **https://geaux-play-xxx.vercel.app**. You can add a custom domain in the project settings.

---

## Option 2: Netlify (free)

1. **Create a Netlify account** at [netlify.com](https://netlify.com).

2. **Deploy with Git**  
   - [Netlify: Add new site → Import from Git](https://app.netlify.com/start).  
   - Connect GitHub/GitLab and select the `geaux-play` repo.  
   - Netlify will use the existing `netlify.toml` (build: `npm run build`, publish: `dist`).  
   - Click **Deploy**.

   **Or deploy without Git (drag & drop):**  
   - In the project folder, run: `npm run build`  
   - At [app.netlify.com/drop](https://app.netlify.com/drop), drag the **`dist`** folder onto the page.

3. You’ll get a URL like **https://random-name-123.netlify.app**. You can change the name or add a custom domain in **Site settings → Domain management**.

---

## Option 3: GitHub Pages (free)

1. **Install the GitHub Pages deployer** (one time):
   ```bash
   npm install --save-dev gh-pages
   ```

2. **In `package.json`**, add a `homepage` and deploy scripts (use your GitHub username and repo name):
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/geaux-play",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **In `vite.config.js`**, set the base path for GitHub Pages:
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/geaux-play/',   // your repo name
   })
   ```

4. **Build and deploy**:
   ```bash
   npm run deploy
   ```

5. **Turn on GitHub Pages**  
   - Repo → **Settings → Pages**  
   - Source: **Deploy from a branch**  
   - Branch: **gh-pages** → Save  

   Your site will be at **https://YOUR_USERNAME.github.io/geaux-play**.

---

## Before you deploy

1. **Build locally** to confirm everything works:
   ```bash
   npm run build
   ```
   This creates the **`dist`** folder. You can test it with:
   ```bash
   npm run preview
   ```

2. **Optional: use Git**  
   Initializing a repo and pushing to GitHub (or GitLab) makes Vercel/Netlify deploys automatic on every push.

---

## Summary

| Platform     | Free tier | Custom domain | Best for              |
|-------------|-----------|---------------|------------------------|
| **Vercel**  | Yes       | Yes           | Easiest, auto SSL      |
| **Netlify** | Yes       | Yes           | Git or drag-and-drop   |
| **GitHub Pages** | Yes  | Yes (on your domain) | Already using GitHub |

After you deploy, share your live URL so others can use Geaux Play.
