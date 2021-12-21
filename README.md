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
* implement view count component for blog posts
    * leverage backend database like planetscale with prisma, firebase or supabase to hold view counts for each blog slug
    * implement an api route in Next to grab views and increment views in backend db. Additionally use SWR for data fetching in component itself

---
## **Website Directory**

| Route      | Description |
| ----------- | ----------- |
| `/pages`      | Contains the pages that are used by next's routing system which include: the main app page, a blogs nested directory, as well as a project page. This also includes my api directory. Most of my data fetching is done at the page level with `getStaticProps` however I have found prototyping api calls via the api route to be really helpful in developing.|
| `/pages/blogs`   | Contains the nested routes within the blog page. These include: &nbsp; `/blogs/developer` (*which contains the template page to house my developer blogs for dynamic routing*), and `/blogs/short-story` (*which contains the template page to house my short story based blogs*). |
| `/pages/api` | Contains my api directory, focused on calls out to the contentful, github and notion services. Most of my data fetching is done at the page level with `getStaticProps` however I have found prototyping api calls via the api route to be really helpful in developing.|
| `/lib`| Contains modules where my third party service calls are defined. Currently those are contentful and notion.|
| `/context` | Contains a global context module. Currently only used for darkmode shared state. Don't anticipate needing any other globally shared state at the moment. |
| `/components` | Contains the functional components that are used throughout my website. |