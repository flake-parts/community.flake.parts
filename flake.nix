{
  nixConfig = {
    extra-substituters = "https://cache.garnix.io";
    extra-trusted-public-keys = "cache.garnix.io:CTFPyKSLcx5RMJKfLo5EEPUObbA78b0YQ2DTCJXqr9g=";
  };

  inputs = {
    emanote.url = "github:srid/emanote";
    nixpkgs.follows = "emanote/nixpkgs";
    flake-parts.follows = "emanote/flake-parts";
    hercules-ci-effects.url = "github:hercules-ci/hercules-ci-effects";

    # Individual flake-parts modules go here
    haskell-flake.url = "github:srid/haskell-flake";
    haskell-flake.flake = false;
    nixos-flake.url = "github:srid/nixos-flake";
    nixos-flake.flake = false;
    services-flake.url = "github:juspay/services-flake";
    services-flake.flake = false;
    process-compose-flake.url = "github:Platonic-Systems/process-compose-flake";
    process-compose-flake.flake = false;
    mission-control.url = "github:Platonic-Systems/mission-control";
    mission-control.flake = false;
  };

  outputs = inputs@{ self, flake-parts, nixpkgs, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = nixpkgs.lib.systems.flakeExposed;
      imports = [
        inputs.hercules-ci-effects.flakeModule
        (import ./nix/flake-module.nix { inherit inputs; })
      ];
      hercules-ci.flake-update = {
        enable = true;
        autoMergeMethod = "merge";
        baseMerge.enable = true;
        createPullRequest = true;
        when = {
          hour = [ 8 20 ];
        };
      };
      herculesCI.ciSystems = [ "x86_64-linux" ];
      flake.flakeModules.default = import ./nix/flake-module.nix { inherit inputs; };
      perSystem = { config, self', pkgs, lib, system, ... }: {
        flake-parts-docs.enable = true;
        apps.preview.program = pkgs.writeShellApplication {
          name = "emanote-static-preview";
          meta.description = ''
            Run a locally running preview of the statically generated docs.
          '';
          runtimeInputs = [ pkgs.static-web-server ];
          text = ''
            set -x
            static-web-server -d ${self'.packages.default} -p ${builtins.toString (1 + config.emanote.sites.default.port)} "$@"
          '';
        };
        devShells.default = pkgs.mkShell {
          buildInputs = [
            pkgs.nixpkgs-fmt
            pkgs.just
          ];
        };
        formatter = pkgs.nixpkgs-fmt;
      };
    };
}
