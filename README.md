# community.flake.parts

A place to host documentation for [flake modules](/modules) created using [flake-parts](https://flake.parts/).

We use [Emanote](https://emanote.srid.ca/) to serve the documentation from their individual repos.

## Conventions for documenting an individual module

In order to best host your flake-parts module's documentation in this site, please follow these conventions:

- Keep your docs under `./doc/NAME/` directory of yuour repo, where NAME is the URL slug for your module's name.
- Store all `.md` files under this directory, except the index page, which should reside in `./doc/NAME.md`. 
- Use `[[..]]` style wiki-links to link between pages.

For further information, see [Emanote guide](https://emanote.srid.ca/guide). You can test your docs locally by running `nix run github:srid/emanote` under the `./doc` directory of your repository.

## Publishing a module to this repository

- In `flake.nix`,
  - Add an flake input pointing to your module's repo
  - Add your module input name to `modules` list
- In `doc/mods.md`, add a link to your module's documentation
- Run `nix flake lock`
- Run `nix run` to test the site locally. You can run `nix run .#preview` to preview the statically generated site.
- Open a PR

## Local

In nix shell,

```bash
just run
```
