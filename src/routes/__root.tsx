import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "AgentPacks - Pre-built AI Agent Teams for Clawdbot",
      },
      {
        name: "description",
        content:
          "Premium pre-configured Clawdbot agent setups. Get battle-tested AI teams for content creation, development, and business. $19/month.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html className="dark" lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
