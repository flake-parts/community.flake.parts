# community.flake.parts

A place to host documentation for [flake modules](/modules) created using [flake-parts](https://flake.parts/).

Initially, we use Docusaurus (in conjunction with git submodules), which presents the following limitations:

- Harcoded slugs and links
    - For eg., `haskell-flake` uses `/haskell-flake/start` (rather than just `/start` or `start`) to link to one of its page.

In the long-run, we plan to switch to a new mdBook based system.

## Local

In nix shell,

```bash
just run
```

## Guidelines for writing docs

### Slugs

Slugs must in the form of either of the following:

- `/foo`: A single component slug for all docs by default
- `/<module>/foo`: Documentation for page "foo" under flake-parts module named "<module>".

### Linking

Unfortunately, [Docusaurus](https://docusaurus.io) is not great with cross-linking, so you must always link to pages using slugs (see section above) rather than file paths.  If a link is broken, then the Docusaurus build will fail.

### Preview & CI

When editing the docs of your flake-parts modules, if there is a git submodule reference to them, you can do those edits in that submodule checkout. The local server will pickup those changes.

### Submodules

Individual module's docs are stored as git submodules. Run `just update` to update them all.
