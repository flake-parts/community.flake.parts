current-flake:
{ self, lib, flake-parts-lib, ... }:

let
  inherit (flake-parts-lib)
    mkPerSystemOption;
  inherit (lib)
    mkOption
    types;
  docLayerModule = types.submodule ({ name, config, ... }: {
    options = {
      path = lib.mkOption {
        type = types.path;
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
  });
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
                outputName = lib.mkOption {
                  type = types.str;
                  default = "default";
                  description = "Name of the flake outputs";
                };
                defaultModules = lib.mkOption {
                  type = types.attrsOf docLayerModule;
                  default = {
                    "".path = current-flake.inputs.self + /doc;
                    "haskell-flake".path = current-flake.inputs."haskell-flake" + /doc;
                    "services-flake".path = current-flake.inputs."services-flake" + /doc;
                    "process-compose-flake".path = current-flake.inputs."process-compose-flake" + /doc;
                    "mission-control".path = current-flake.inputs."mission-control" + /doc;
                  };
                  description = "List of modules to generate documentation for";
                };
                modules = lib.mkOption {
                  type = types.attrsOf docLayerModule;
                  default = { };
                  apply = x: config.flake-parts-docs.defaultModules // x;
                  description = "Modules to override on the default list";
                };
              };
            };
        };

        config = {
          emanote = lib.mkIf config.flake-parts-docs.enable {
            sites.${config.flake-parts-docs.outputName} = {
              package = current-flake.inputs.emanote.packages.${system}.default;
              check = false;
              layers = lib.attrValues config.flake-parts-docs.modules;
              port = 5566;
              extraConfig.template.urlStrategy = "pretty";
            };
          };
        };
      });
  };
}
