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
  };

  outputs = inputs@{ self, flake-parts, nixpkgs, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = nixpkgs.lib.systems.flakeExposed;
      imports = [ inputs.emanote.flakeModule ];
      perSystem = { self', pkgs, system, ... }:
        let
          preProcess = { name, path }:
            pkgs.runCommandNoCC "${name}-preProcess" { } ''
              mkdir -p $out/
              cp -r ${path}/* $out/
              ls -l $out/
            '';
          moduleDocs = builtins.map preProcess [
            { name = "haskell-flake"; path = "${inputs.haskell-flake}/doc"; }
            { name = "nixos-flake"; path = "${inputs.nixos-flake}/doc"; }
          ];
        in
        {
          emanote = {
            sites."default" = {
              layers = [ ./. ] ++ moduleDocs;
              layersString = [ "." ] ++ builtins.map builtins.toString moduleDocs;
              port = 5566;
              prettyUrls = true;
            };
          };
          apps.preview.program = pkgs.writeShellApplication {
            name = "emanote-preview";
            runtimeInputs = [ pkgs.nodePackages.http-server ];
            text = ''
              set -x
              http-server -d false ${self'.packages.default} "$@"
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
