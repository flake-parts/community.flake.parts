default:
    @just --list

# Autoformat project tree
fmt:
    nix fmt

# Run local server
run:
    nix run

# Build static site
build:
    nix build

# Preview the static site
preview:
    nix run .#preview
