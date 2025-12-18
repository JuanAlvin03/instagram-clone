// src/pages/AboutPage.tsx
import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const AboutPage: React.FC = () => {
  return (
    <div className="flex justify-center w-full px-4 py-8">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6 space-y-6">
          {/* Title */}
          <h1 className="text-2xl font-semibold text-center">
            About This Project
          </h1>

          {/* Intro */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>MyGram</strong> is a frontend-focused Instagram-style social
            media clone built to explore modern React patterns, client-side
            state management, and local-first data persistence. The app
            simulates core social features such as posts, likes, comments,
            profiles, and following — all without a traditional backend.
          </p>

          {/* Tech Stack */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Tech Stack</h2>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li><strong>React + TypeScript</strong> — component-driven UI</li>
              <li><strong>Vite</strong> — fast development & production builds</li>
              <li><strong>Dexie.js (IndexedDB)</strong> — local database & live updates</li>
              <li><strong>React Router</strong> — client-side routing</li>
              <li><strong>shadcn/ui + Tailwind CSS</strong> — modern UI components</li>
              <li><strong>GitHub Pages</strong> — static deployment</li>
            </ul>
          </div>

          {/* Purpose */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            This project was created as a learning and portfolio piece, focusing
            on realistic application architecture, UI/UX behavior, and
            TypeScript correctness — rather than production authentication or
            server-side APIs.
          </p>

          {/* GitHub Link */}
          <div className="flex justify-center">
            <Button asChild variant="outline">
              <a
                href="https://github.com/JuanAlvin03/instagram-clone"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Source on GitHub
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AboutPage
