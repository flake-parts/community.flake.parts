current-flake:
{ self, lib, flake-parts-lib, ... }:

let
  inherit (flake-parts-lib)
    mkPerSystemOption;
  inherit (lib)
    mkOption
    types;
in
{
  options = {
    perSystem = mkPerSystemOption
      ({ config, self', inputs', pkgs, system, ... }:
        let
          # Emanote sub-notebook layers for all modules
          moduleDocLayers = builtins.map
            (name: {
              path = current-flake.inputs.${name} + /doc;
              mountPoint = name;
            })
            modules;
          modules = [
            "haskell-flake"
            "nixos-flake"
            "services-flake"
            "process-compose-flake"
            "mission-control"
          ];
        in
        {
          options.flake-parts-docs = mkOption {
            type = types.submodule {
              options = {
                enable = lib.mkEnableOption "Enable flake-parts-docs";
              };
            };
          };

          config = {
            emanote = {
              # TODO: to "docs"
              sites."default" = {
                layers = [{ path = ./doc; pathString = "./doc"; }] ++ moduleDocLayers;
                port = 5566;
                prettyUrls = true;
              };
            };
          };
        });
  };
}
