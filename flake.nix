{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    systems.url = "github:nix-systems/default";
    flake-parts.url = "github:hercules-ci/flake-parts";
    treefmt-nix.url = "github:numtide/treefmt-nix";
    treefmt-nix.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = inputs:
    inputs.flake-parts.lib.mkFlake { inherit inputs; } {
      systems = import inputs.systems;
      imports = [
        inputs.treefmt-nix.flakeModule
      ];
      perSystem = { self', system, lib, config, pkgs, ... }: {
        # Auto formatters. This also adds a flake check to ensure that the
        # source tree was auto formatted.
        treefmt.config = {
          projectRootFile = "docusaurus.config.js";
          package = pkgs.treefmt;
          programs.nixpkgs-fmt.enable = true;
        };

        # Default shell.
        devShells.default = pkgs.mkShell {
          name = "community.flake.parts";
          inputsFrom = [
            config.treefmt.build.devShell
          ];
          nativeBuildInputs = [
            pkgs.nodejs
            pkgs.just
          ];
        };
      };
    };
}
