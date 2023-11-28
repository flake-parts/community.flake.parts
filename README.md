# community.flake.parts

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
