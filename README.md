# community.flake.parts

**This site has been retired.** It used to aggregate documentation for
community [flake-parts](https://flake.parts/) modules, but the module
documentation is better hosted by the individual projects, and that is
where it lives now:

- [services-flake](https://services.nixos.asia/)
- [process-compose-flake](https://github.com/Platonic-Systems/process-compose-flake#process-management-using-process-compose-flake)
- [haskell-flake](https://haskell.nixos.asia/)
- [mission-control](https://github.com/Platonic-Systems/mission-control)

See [#488](https://github.com/flake-parts/community.flake.parts/issues/488)
for the discussion.

<https://community.flake.parts/> now serves redirects to the new locations,
so that old links keep working.

## How it works

- `site/redirects.tsv` maps each old page to its new location.
- `site/generate.sh` turns that table into meta-refresh pages, alongside
  `site/index.html` (landing page) and `site/404.html` (a fallback that
  forwards unlisted URLs by prefix).
- `.github/workflows/deploy.yml` publishes the result to GitHub Pages on
  push to `main`.

To preview locally:

```bash
./site/generate.sh out
python3 -m http.server -d out
```
