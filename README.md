# 📸 MyGram (Instagram Clone – Frontend Only)

MyGram is a **frontend-only Instagram-like web application** built as a learning and portfolio project. It mimics core social media features such as feeds, posts, likes, comments, profiles, and follows — all running **entirely in the browser** with no backend server.

The goal of this project is to demonstrate modern frontend architecture, state management, UI patterns, and client-side data handling using current tools and best practices.

---

## 🚀 Live Demo

👉 **Live App:** [https://JuanAlvin03.github.io/instagram-clone/](https://JuanAlvin03.github.io/instagram-clone/)

---

## 🧩 Features

* User login (mocked, seeded users)
* Home feed with **All / Following** toggle
* Create posts with captions
* Like & unlike posts
* Comment system with live updates
* User profiles with editable bio & avatar
* Follow / unfollow users
* Responsive layout (sidebar + bottom navigation)
* Skeleton loaders for better UX
* Fully client-side persistence

---

## 🛠 Tech Stack & Tools

### Core

* **React** (with Hooks)
* **TypeScript**
* **Vite** (build & dev tooling)

### UI & Styling

* **Tailwind CSS**
* **shadcn/ui** components
* Lucide icons

### Data & State

* **Dexie.js (IndexedDB)** for client-side database
* React Context for authentication state
* Custom hooks for likes, comments, follows, etc.

### Routing & Deployment

* **React Router**
* **GitHub Pages** for deployment

---

## ⚠️ Important Disclaimer

> **This application has NO backend server.**

* All data (users, posts, likes, comments, follows) is stored **locally in your own browser** using IndexedDB.
* Data is **NOT shared** between users or devices.
* Clearing browser data or switching browsers/devices will reset the app.
* This project is for **demonstration and learning purposes only**.

---

## 📂 Project Structure (Simplified)

```
src/
├── app/            # Providers, auth context, routing
├── components/     # UI components (Feed, Post, CommentSheet, etc.)
├── hooks/          # Custom hooks (useLike, useCommentsCount, etc.)
├── db/             # Dexie database schema & seed data
├── pages/          # Route pages (Login, Profile, About, etc.)
├── types/          # TypeScript models
```

---

## 🧪 Local Development

```bash
npm install
npm run dev
```

---

## 📦 Build & Deploy

```bash
npm run build
npm run deploy
```

Deployment is handled via **gh-pages** to GitHub Pages.

---

## 🔗 Source Code

👉 **GitHub Repository:** [https://github.com/JuanAlvin03/instagram-clone](https://github.com/JuanAlvin03/instagram-clone)

---

## 🙌 Notes

This project is intentionally built without a backend to focus on:

* Frontend architecture
* Client-side persistence
* UX patterns found in real social media apps

Feedback and suggestions are welcome!

---

© 2025 Juan Alvin
