# lukapuka

## Introduction

Hey! Welcome to my website codebase. This is a personal project to build a digital portfolio and surface content and projects I create to the interwebs. It's also an excuse to use a lot of different technologies along the way (*still iterating too, will continuously implement new technologies*).

---

## **Technologies**
* **Framework:** Nextjs
    * using for static site generation as well as to test out ISR and server rendered components
    * additionally am a fan of Next's routing which may have helped influence my choice
* **CMS for Blogs:** Contentful
    * using as my headless CMS, primarly to manage my blog and asset content and to power the `/blogs` route in my website
    * contentful has really easy api's to use, or so was my conclusion through initial testing
    * perhaps may move content to leverage mdx with react (*mdx mixed with components, stored in project file system instead of remotely in a headless cms, but that is to be determined*)
* **CMS for Projects:** Notion
    * I use Notion as my CMS for managing development projects, additionally I use it for planning as well
    * using Notions new public api to surface project information in the `/projects` route of my website
    * I have found Notion's naming conventions in their api to be a bit confusing to follow at first and the structure of their responses hard to understand initially. That said they contain a lot of rich text data which I am pulling through in a custom `Text` component inspired by [Samuel Kraft's](https://samuelkraft.com/blog/building-a-notion-blog-with-public-api) blog post on Notion and Next.
* **Visualization:** Recharts
    * Using Recharts as the visualization library for the spotify listening history on the `/home` route in my website

---
## **Styles & Design**

Currently my website is leveraging global styling, Next's module specific styling, as well as inline styles. **Global styles contains:**
* global font-families
* page container styling
* media formatting
* currently using a dark mode hook that doesn't work at the moment with Next's module styling, so a lot of component styling has been moved into global styles to take advantage of `.dark-mode` & `.light-mode`.

### **To-Do's:**
* implement `Tailwind`
    * implement for a certain page/route then reconfigure the entire site to use Tailwind (*currently not using module based styling to it's fullest so will likely replace with Tailwind and keep global styles*)
    * research how Tailwind handles dark mode and whether or not to replace the darkMode hook in production