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
      ({ config, self', inputs', pkgs, system, ... }: {
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
                    "haskell-flake".path = current-flake.inputs."haskell-flake" + /doc;
                    "nixos-flake".path = current-flake.inputs."nixos-flake" + /doc;
                    "services-flake".path = current-flake.inputs."services-flake" + /doc;
                    "process-compose-flake".path = current-flake.inputs."process-compose-flake" + /doc;
                    "mission-control".path = current-flake.inputs."mission-control" + /doc;
                  };
                  description = "List of modules to generate documentation for";
                };
              };
            };
        };

        config = {
          emanote = lib.mkIf config.flake-parts.enable {
            # TODO: to "docs"
            sites."default" = {
              layers = lib.attrValues config.flake-parts-docs.modules;
              port = 5566;
              prettyUrls = true;
            };
          };
        };
      });
  };
}
