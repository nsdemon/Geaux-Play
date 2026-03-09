# Geaux Play

Events in Baton Rouge & LSU, Louisiana.

---

## After making changes — run these

**Test locally**
```bash
npm run dev
```
Then open http://localhost:5173 (or the URL Vite prints).

**Build for production**
```bash
npm run build
```
Output is in the `dist` folder. Optional: `npm run preview` to test the build locally.

**Push to the web (update live site on Vercel)**
```bash
git add .
git commit -m "Your short description of the change"
git push origin main
```
If the repo is connected to Vercel, the site at geaux-play.vercel.app updates automatically.

---

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
