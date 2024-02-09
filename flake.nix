{
  nixConfig = {
    extra-substituters = "https://srid.cachix.org";
    extra-trusted-public-keys = "srid.cachix.org-1:3clnql5gjbJNEvhA/WQp7nrZlBptwpXnUk6JAv8aB2M=";
  };

  inputs = {
    emanote.url = "github:srid/emanote/index-notes"; # https://github.com/srid/emanote/pull/512
    nixpkgs.follows = "emanote/nixpkgs";
    flake-parts.follows = "emanote/flake-parts";
    hercules-ci-effects.url = "github:hercules-ci/hercules-ci-effects";

    # Individual flake-parts modules go here
    haskell-flake.url = "github:srid/haskell-flake/index-notes";
    haskell-flake.flake = false;
    nixos-flake.url = "github:srid/nixos-flake/index-notes";
    nixos-flake.flake = false;
    services-flake.url = "github:juspay/services-flake/index-notes";
    services-flake.flake = false;
    process-compose-flake.url = "github:Platonic-Systems/process-compose-flake/index-notes";
    process-compose-flake.flake = false;
    mission-control.url = "github:Platonic-Systems/mission-control/index-notes";
    mission-control.flake = false;
  };

  outputs = inputs@{ self, flake-parts, nixpkgs, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = nixpkgs.lib.systems.flakeExposed;
      imports = [
        inputs.emanote.flakeModule
        inputs.hercules-ci-effects.flakeModule
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
      perSystem = { config, self', pkgs, lib, system, ... }:
        let
          getDocDir = moduleName:
            pkgs.runCommand "${moduleName}-docs-shifted" { } ''
              mkdir -p $out/
              cp -r ${inputs.${moduleName}}/doc $out/${moduleName}
            '';
          moduleDocs = builtins.map getDocDir modules;
          modules = [
            "haskell-flake"
            "nixos-flake"
            "services-flake"
            "process-compose-flake"
            "mission-control"
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
