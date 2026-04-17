import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/kltng/dhq-wiki",
      "DHQ Journal": "http://www.digitalhumanities.org/dhq/",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      title: "DHQ Wiki",
      folderDefaultState: "collapsed",
      folderClickBehavior: "collapse",
      filterFn: (node) => {
        // Hide individual article files from Explorer (too many)
        // Only show folders and non-article files
        const slug = node.file?.slug
        if (slug && slug.startsWith("articles/")) {
          return false
        }
        return true
      },
      sortFn: (a, b) => {
        // Sort folders first, then alphabetically
        if ((!a.file) !== (!b.file)) {
          return a.file ? 1 : -1
        }
        return a.displayName.localeCompare(b.displayName)
      },
      mapFn: (node) => {
        // Don't show file extensions
        if (node.file) {
          node.displayName = node.displayName.replace(/\.md$/, "")
        }
      },
    }),
  ],
  right: [
    Component.Graph({
      localGraph: {
        drag: true,
        zoom: true,
        depth: 2,
        scale: 1.1,
        repelForce: 0.5,
        centerForce: 0.3,
        linkDistance: 30,
        fontSize: 0.6,
        opacityScale: 1,
        removeTags: [],
        showTags: false,
      },
      globalGraph: {
        drag: true,
        zoom: true,
        depth: -1,
        scale: 0.9,
        repelForce: 1,
        centerForce: 0.3,
        linkDistance: 30,
        fontSize: 0.6,
        opacityScale: 1,
        removeTags: [],
        showTags: false,
      },
    }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.RecentNotes({
      title: "Recent Articles",
      limit: 5,
      showTags: false,
    }),
  ],
}

// components for pages that display lists of pages (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      title: "DHQ Wiki",
      folderDefaultState: "collapsed",
      folderClickBehavior: "collapse",
      filterFn: (node) => {
        const slug = node.file?.slug
        if (slug && slug.startsWith("articles/")) {
          return false
        }
        return true
      },
      sortFn: (a, b) => {
        if ((!a.file) !== (!b.file)) {
          return a.file ? 1 : -1
        }
        return a.displayName.localeCompare(b.displayName)
      },
    }),
  ],
  right: [],
}
