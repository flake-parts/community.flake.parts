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
  imports = [
    current-flake.inputs.emanote.flakeModule
  ];
  options = {
    perSystem = mkPerSystemOption
      ({ config, self', pkgs, system, ... }: {
        options.flake-parts-docs = mkOption {
          type = types.submodule
            {
              options = {
                enable = lib.mkEnableOption "Enable flake-parts-docs";
                modules = lib.mkOption {
                  type = types.attrsOf (types.submodule ({ name, config, ... }: {
                    options = {
                      path = lib.mkOption {
                        type = types.path;
                        default = current-flake.inputs.${name} + /doc;
                      };
                      pathString = lib.mkOption {
                        type = types.str;
                        default = "${config.path}";
                      };
                      mountPoint = lib.mkOption {
                        type = types.str;
                        default = name;
                      };
                    };
                  }));
                  default = {
                    "".path = current-flake.inputs.self + /doc;
                    "haskell-flake" = { };
                    "nixos-flake" = { };
                    "services-flake" = { };
                    "process-compose-flake" = { };
                    "mission-control" = { };
                  };
                  description = "List of modules to generate documentation for";
                };
              };
            };
        };

        config = {
          emanote = lib.mkIf config.flake-parts-docs.enable {
            package = current-flake.inputs.emanote.packages.${system}.default;
            sites."docs" = {
              layers = lib.attrValues config.flake-parts-docs.modules;
              port = 5566;
              prettyUrls = true;
            };
          };
        };
      });
  };
}
