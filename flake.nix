{
  nixConfig = {
    extra-substituters = "https://srid.cachix.org";
    extra-trusted-public-keys = "srid.cachix.org-1:3clnql5gjbJNEvhA/WQp7nrZlBptwpXnUk6JAv8aB2M=";
  };

  inputs = {
    emanote.url = "github:srid/emanote/amb";
    nixpkgs.follows = "emanote/nixpkgs";
    flake-parts.follows = "emanote/flake-parts";

    # Individual flake-parts modules go here
    haskell-flake.url = "github:srid/haskell-flake/cfp";
    haskell-flake.flake = false;
    nixos-flake.url = "github:srid/nixos-flake/cfp";
    nixos-flake.flake = false;
    services-flake.url = "github:juspay/services-flake/docs-init";
    services-flake.flake = false;
  };

  outputs = inputs@{ self, flake-parts, nixpkgs, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = nixpkgs.lib.systems.flakeExposed;
      imports = [ inputs.emanote.flakeModule ];
      perSystem = { config, self', pkgs, lib, system, ... }:
        let
          getDocDir = moduleName:
            lib.cleanSourceWith {
              name = "${moduleName}-docs";
              src = inputs.${moduleName} + /doc;
            };
          moduleDocs = builtins.map getDocDir modules;
          modules = [
            "haskell-flake"
            "nixos-flake"
            "services-flake"
          ];
        in
        {
          emanote = {
            sites."default" = {
              layers = [ ./doc ] ++ moduleDocs;
              layersString = [ "./doc" ] ++ builtins.map builtins.toString moduleDocs;
              port = 5566;
              prettyUrls = true;
            };
          };
          apps.preview.program = pkgs.writeShellApplication {
            name = "emanote-static-preview";
            runtimeInputs = [ pkgs.static-web-server ];
            text = ''
              set -x
              static-web-server -d ${self'.packages.default} -p ${builtins.toString (1 + config.emanote.sites.default.port)} "$@"
            '';
          };
          devShells.default = pkgs.mkShell {
            buildInputs = [
              pkgs.nixpkgs-fmt
            ];
          };
          formatter = pkgs.nixpkgs-fmt;
        };
    };
}
