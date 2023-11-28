default:
    @just --list

# Autoformat project tree
fmt:
    treefmt

# Run local server
run:
    npm start

# Build static site
build:
    npm run build

# Update all submodules to latest HEAD
update:
    git submodule update --recursive --remote