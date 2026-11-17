/** Copy for the download page. Feeds src/pages/download.astro. */
import { product } from "../product";

export const download = {
  title: "Download",
  description: `Install ${product.name} on Debian, Ubuntu or Pop!_OS with one command, or download the .deb from GitHub releases.`,
  heading: "Download",
  lede: `${product.name} is built for Linux first. Install it with one command, or fetch the package yourself.`,
  install: {
    heading: "Install with one command",
    text: "The script finds the newest release, downloads its .deb, checks it against the published SHA256SUMS and installs it with apt. It asks for your password through sudo.",
    commandLabel: "Install command",
  },
  manual: {
    heading: "Install by hand",
    // The page links "releases page" and inserts debFileName().
    beforeReleases: "Open the",
    releasesLinkText: "releases page",
    afterReleases: "and download the file named",
    beforeInstall: "Then install it with",
    afterInstall: "Compare the file's checksum with the SHA256SUMS file on the same release before you install.",
  },
  requirements: {
    heading: "Requirements",
    items: [
      { term: "Operating system", detail: "Linux x64, with a Wayland or X11 session" },
      { term: "Package", detail: "A Debian or Ubuntu based system that installs .deb files" },
      { term: "Windows and macOS", detail: "Build targets are configured but untested" },
      { term: "Building from source", detail: "Node 24 and pnpm" },
    ],
  },
  bugReport: {
    before: "Something not working?",
    linkText: "Report it on GitHub",
    after: "with your distribution and version.",
  },
};
