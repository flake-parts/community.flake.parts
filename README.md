# community.flake.parts

A place to host documentation for [flake modules](/modules) created using [flake-parts](https://flake.parts/).

We use [Emanote](https://emanote.srid.ca/) to serve the documentation from their individual repos.

## How to add documentation for a new module

>[!CAUTION] 
> We are working to simplify the documentation setup for new modules. See https://github.com/flake-parts/community.flake.parts/issues/6

1. Put your Markdown docs in a sub-folder, eg: `./doc`:
    - Use `[[..]]` style wiki-links to link between pages.
    - Add the following YAML meta[^imp] to your `index.md` page, replacing `NAME` with your module name:
        
        ```yaml
        short-title: NAME
        template:
          sidebar:
            collapsed: true
        emanote:
          folder-folgezettel: false
        ```
    - Add a file `index.yaml` containing the following, replacing `NAME` with your module name, and `USER/REPO` with your GitHub repo info:
        ```yaml
        page:
          siteTitle: NAME
        headHtml: |
          <snippet var="js.highlightjs" />
        template:
          editBaseUrl: https://github.com/USER/REPO/edit/main/doc
        sidebar:
            collapsed: false
        ```
1. Create a `doc/flake.nix` file with the following content, replacing `NAME` with your module name:

    ```nix
    {
        inputs = {
          cfp.url = "github:flake-parts/community.flake.parts/mod";
          nixpkgs.follows = "cfp/nixpkgs";
          flake-parts.follows = "cfp/flake-parts";
        };

        outputs = inputs:
          inputs.flake-parts.lib.mkFlake { inherit inputs; } {
            systems = inputs.nixpkgs.lib.systems.flakeExposed;
            imports = [
                inputs.cfp.flakeModules.default
            ];
            perSystem = {
              flake-parts-docs = {
                enable = true;
                modules."NAME" = {
                  path = ./.;
                  pathString = "./.";
                };
              };
            };
        };
    }
    ```
1. Run `nix run ./doc` to live preview the docs
1. Run `nix build ./doc` to build statically generated website of the docs

This will give you a local copy of <https://community.flake.parts/> but using your local module docs (overriding the upstream one if any).

[^imp]: These organizational clutches will be fixed in future versions of Emanote (see https://github.com/srid/emanote/issues/494), such that you can just write all docs under `./doc`.

For further information, see [Emanote guide](https://emanote.srid.ca/guide).


## Publishing a module to this repository

- In `flake.nix`,
  - Add an flake input pointing to your module's repo
  - Add your module input to the default value of `flake-parts-docs.modules` option.
- In `doc/mods.md`, add a link to your module's documentation
- Run `nix run` to test the site locally. You can run `nix run .#preview` to preview the statically generated site.
- Open a PR

## Local

In nix shell,

```bash
just run
```
