// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require("prism-react-renderer");
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;
const fs = require("fs");
const path = require("path");

// Parse the .gitmodules file and return information of all modules.
//
// () => { { path: string, url: string, hash: string | undefined }[] }
const getGitSubModules = () => {
  const config = path.join(".gitmodules");
  const content = fs.readFileSync(config, "utf-8");

  const gitmodules = [];
  const regex = /\[submodule "(.+)"\][\s]*path = (.+)[\s]*url = (.+)/g;

  for (let match; (match = regex.exec(content)) !== null; ) {
    const [, mPath, , mUrl] = match;

    // For a git submodule `foo/bar', its HEAD locates at
    // `.git/modules/foo/bar/HEAD'.
    const headPath = path.join(".git", "modules", mPath, "HEAD");

    const mHash = (() => {
      try {
        const content = fs.readFileSync(headPath, "utf-8");
        return content.trim();
      } catch (error) {
        console.error(`Error reading ${headPath}: ${error.message}`);
        return undefined;
      }
    })();

    gitmodules.push({
      path: mPath,
      // example.forge/foo.git -> example.forge/foo
      url: mUrl.replace(/\.git$/, ""),
      hash: mHash,
    });
  }

  // In the absence of parsing outcomes, what should be taken?

  return gitmodules;
};

const gitmodules = getGitSubModules();

// Construct the link of a document back to its original repository.
//
// Persistently assume that links within the original repository use the
// following format:
//
//   example.forge/blob/COMMIT_HASH/path/to/doc
//
// (docPath: string) => { url: string | undefined }
const getDocOriginUrl = (docPath) => {
  let rp = fs.realpathSync(docPath);
  let m = undefined;

  for (const gitmodule of gitmodules) {
    if (rp.includes(gitmodule["path"])) {
      m = gitmodule;
      break;
    }
  }

  if (m != undefined) {
    const u = m["url"];
    const p = path.relative(m["path"], rp);
    const h = m["hash"];
    // TODO: Change "blob" to "edit" such that it will work with master or
    // main branch. Incidentally, "master" automatically redirects to "main" if
    // the URL prefix is /blob/, but this doesn't happen for /edit/. So much for
    // the virtue signalling of git default branch renaming.
    return `${u}/blob/master/${p}`;
  } else {
    return undefined;
  }
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "community.flake.parts",
  tagline:
    "flake-parts community: a place to document the various flake modules",
  favicon: "img/logo.svg",

  trailingSlash: false,

  // Set the production url of your site here
  url: "https://community.flake.parts",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "flake-parts", // Usually your GitHub org/user name.
  projectName: "community.flake.parts", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: ({ docPath, versionDocsDirPath }) => {
            const versionDocPath = path.join(versionDocsDirPath, docPath);
            const docOriginUrl = getDocOriginUrl(versionDocPath);
            if (docOriginUrl) {
              return docOriginUrl;
            } else {
              return `https://github.com/flake-parts/community.flake.parts/edit/main/${versionDocPath}`;
            }
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  plugins: [require.resolve(path.join(__dirname, "/plugins/symlink-resolver"))],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      // image: 'img/docusaurus-social-card.jpg',
      image: "img/logo.svg",
      /*
      announcementBar: {
        id: 'wip',
        content: 'Flakular is a <a href="/about">work in progress</a>.',
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: true,
      },
      */
      navbar: {
        title: "flake-parts community",
        logo: {
          alt: "flake-parts Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Content",
          },
          {
            to: "about",
            position: "left",
            label: "About",
          },
          {
            href: "https://github.com/flake-parts/community.flake.parts",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Get Started",
                to: "/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/nix",
              },
              {
                label: "Zulip",
                href: "https://nixos.zulipchat.com/",
              },
              {
                label: "Matrix",
                href: "http://app.element.io/#/room/%23hercules-ci:matrix.org",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/hercules_ci",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/flake-parts/community.flake.parts",
              },
            ],
          },
        ],
        // copyright: `Copyright © ${new Date().getFullYear()} Juspay, Inc.`,
      },
      prism: {
        defaultLanguage: "nix",
        additionalLanguages: ["haskell", "nix", "rust"],
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
