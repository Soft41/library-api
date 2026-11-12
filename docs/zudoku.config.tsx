import type { ZudokuConfig } from "zudoku";

const config: ZudokuConfig = {
  // Сайт публікується на https://soft41.github.io/library-api/
  basePath: "/library-api",
  site: {
    title: "Library System API",
  },
  metadata: {
    title: "%s | Library System API",
    description: "Документація REST API бібліотечної системи (Book, Author)",
  },
  navigation: [
    {
      // Ліве меню: Installation, Authorization, About
      type: "category",
      label: "Documentation",
      items: [
        { type: "doc", file: "installation", icon: "download" },
        { type: "doc", file: "authorization", icon: "key-round" },
        { type: "doc", file: "about-api", label: "About", icon: "info" },
      ],
    },
    {
      type: "link",
      to: "/api",
      label: "API Reference",
    },
    {
      // Пункт верхнього меню About з описом автора
      type: "doc",
      file: "about",
      label: "About",
    },
  ],
  redirects: [{ from: "/", to: "/installation" }],
  apis: [
    {
      type: "file",
      input: "../openapi/library-api.yaml",
      path: "/api",
    },
  ],
};

export default config;
