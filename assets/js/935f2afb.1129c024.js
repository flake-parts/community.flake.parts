"use strict";(self.webpackChunkcommunity_flake_parts=self.webpackChunkcommunity_flake_parts||[]).push([[53],{1109:e=>{e.exports=JSON.parse('{"pluginId":"default","version":"current","label":"Next","banner":null,"badge":false,"noIndex":false,"className":"docs-version-current","isLast":true,"docsSidebars":{"tutorialSidebar":[{"type":"link","label":"Welcome","href":"/intro","docId":"intro/intro","unlisted":false},{"type":"category","label":"Flake Modules","collapsible":true,"collapsed":false,"items":[{"type":"category","label":"Haskell","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Getting Started","href":"/haskell-flake/start","docId":"modules/haskell-flake/start/start","unlisted":false},{"type":"category","label":"Guide","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Overriding dependencies","href":"/haskell-flake/dependency","docId":"modules/haskell-flake/guide/dependency","unlisted":false},{"type":"link","label":"DevShell","href":"/haskell-flake/devshell","docId":"modules/haskell-flake/guide/devshell","unlisted":false},{"type":"link","label":"Project modules","href":"/haskell-flake/modules","docId":"modules/haskell-flake/guide/modules","unlisted":false},{"type":"link","label":"Creating package sets","href":"/haskell-flake/package-set","docId":"modules/haskell-flake/guide/package-set","unlisted":false},{"type":"link","label":"Optimize package size","href":"/haskell-flake/size","docId":"modules/haskell-flake/guide/size","unlisted":false}],"href":"/haskell-flake/guide"},{"type":"category","label":"Reference","collapsible":true,"collapsed":true,"customProps":{"description":"Documentation on all module options provided by `haskell-flake` can be found here: https://flake.parts/options/haskell-flake.html For documentation on nixpkgs library of functions, see https://nixos.org/manual/nixpkgs/unstable/#haskell"},"items":[{"type":"link","label":"Building a docker image","href":"/haskell-flake/docker","docId":"modules/haskell-flake/ref/docker","unlisted":false},{"type":"link","label":"Nixifying a Haskell project using nixpkgs","href":"/haskell-flake/nixpkgs-haskell","docId":"modules/haskell-flake/ref/nixpkgs-haskell","unlisted":false}],"href":"/haskell-flake/ref"},{"type":"link","label":"Examples","href":"/haskell-flake/examples","docId":"modules/haskell-flake/examples","unlisted":false}],"href":"/haskell-flake"},{"type":"link","label":"Scripts","href":"/mission-control","docId":"modules/mission-control","unlisted":false},{"type":"link","label":"Processes","href":"/process-compose-flake","docId":"modules/process-compose-flake/index","unlisted":false},{"type":"link","label":"Services","href":"/services-flake","docId":"modules/services-flake/index","unlisted":false},{"type":"link","label":"Auto formatting","href":"/treefmt-nix","docId":"modules/treefmt","unlisted":false},{"type":"category","label":"Systems","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Getting Started","href":"/nixos-flake/start","docId":"modules/nixos-flake/start","unlisted":false},{"type":"category","label":"Guide","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Module outputs","href":"/nixos-flake/module-outputs","docId":"modules/nixos-flake/guide/module-outputs","unlisted":false},{"type":"link","label":"Flake Templates","href":"/nixos-flake/templates","docId":"modules/nixos-flake/guide/templates","unlisted":false}],"href":"/nixos-flake/guide"},{"type":"link","label":"Examples","href":"/nixos-flake/examples","docId":"modules/nixos-flake/examples","unlisted":false}],"href":"/nixos-flake"}],"href":"/modules"}]},"docs":{"intro/intro":{"id":"intro/intro","title":"Welcome to community.flake.parts","description":"This is a place to document the various flake modules created using flake-parts.","sidebar":"tutorialSidebar"},"modules/haskell-flake/examples":{"id":"modules/haskell-flake/examples","title":"Examples","description":"- srid/haskell-template","sidebar":"tutorialSidebar"},"modules/haskell-flake/guide/dependency":{"id":"modules/haskell-flake/guide/dependency","title":"Overriding dependencies","description":"Haskell libraries ultimately come from Hackage, and nixpkgs] contains [most of these. Adding a library to your project involves modifying the .cabal file and restarting the nix shell. The process is typically as follows:","sidebar":"tutorialSidebar"},"modules/haskell-flake/guide/devshell":{"id":"modules/haskell-flake/guide/devshell","title":"DevShell","description":"haskell-flake uses the shellFor function to provide a Haskell development shell. shellFor in turn uses the standard mkShell function to create a Nix shell environment. The mkShellArgs option can be used to pass custom arguments to mkShell.","sidebar":"tutorialSidebar"},"modules/haskell-flake/guide/modules":{"id":"modules/haskell-flake/guide/modules","title":"Project modules","description":"haskell-flake\'s per-project configuration can be modularized and shared among multiple repos. This is done using the flake.haskellFlakeProjectModules flake output.","sidebar":"tutorialSidebar"},"modules/haskell-flake/guide/package-set":{"id":"modules/haskell-flake/guide/package-set","title":"Creating package sets","description":"While haskell-flake is generally used to develop and build individual Haskell projects, you can also use it to create a custom Haskell package set that you can use in other projects. This is useful if you want to create a common package set to be shared across multiple projects.","sidebar":"tutorialSidebar"},"modules/haskell-flake/guide/size":{"id":"modules/haskell-flake/guide/size","title":"Optimize package size","description":"Haskell package derivations created by haskell-flake are shipped with symlinks to other store paths, like $out/lib, $out/nix-support and $out/share/doc. In addition, enabling profiling or haddock can increase the size of these packages. If your Haskell application is end-user software, you will want to strip all but the executables. This can be achieved using justStaticExecutables:","sidebar":"tutorialSidebar"},"modules/haskell-flake/index":{"id":"modules/haskell-flake/index","title":"Haskell development using haskell-flake","description":"haskell-flake is a flake-parts module to make Haskell development simpler with Nix.","sidebar":"tutorialSidebar"},"modules/haskell-flake/ref/docker":{"id":"modules/haskell-flake/ref/docker","title":"Building a docker image","description":"Building a docker image is much simpler with Nix compared to writing Dockerfile. Since the entire build process is handled by Nix flakes, most of what\'s left to do for docker image creation is copying of the derivations and configuration.","sidebar":"tutorialSidebar"},"modules/haskell-flake/ref/nixpkgs-haskell":{"id":"modules/haskell-flake/ref/nixpkgs-haskell","title":"Nixifying a Haskell project using nixpkgs","description":"This tutorial enables you to write a flake using nothing but nixpkgs] to nixify an existing Haskell project. The tutorial serves a pedagogic purpose; in the real-world scenario, we recommend that you use [haskell-flake.","sidebar":"tutorialSidebar"},"modules/haskell-flake/start/start":{"id":"modules/haskell-flake/start/start","title":"Getting Started","description":"Before using haskell-flake you must first install Nix.","sidebar":"tutorialSidebar"},"modules/mission-control":{"id":"modules/mission-control","title":"Devshell scripts using mission-control","description":"As a simpler alternative to mission-control, you may also use just (see example use).","sidebar":"tutorialSidebar"},"modules/nixos-flake/examples":{"id":"modules/nixos-flake/examples","title":"Examples","description":"- https://github.com/srid/nixos-config (using #both template)","sidebar":"tutorialSidebar"},"modules/nixos-flake/guide/module-outputs":{"id":"modules/nixos-flake/guide/module-outputs","title":"Module outputs","description":"Importing the nixos-flake flake-parts module will autowire the following flake outputs in your flake:","sidebar":"tutorialSidebar"},"modules/nixos-flake/guide/templates":{"id":"modules/nixos-flake/guide/templates","title":"Flake Templates","description":"We provide four templates, depending on your needs:","sidebar":"tutorialSidebar"},"modules/nixos-flake/index":{"id":"modules/nixos-flake/index","title":"Managing OS and home configurations using nixos-flake","description":"nixos-flake a flake-parts module to unify NixOS + nix-darwin + [home-manager] configuration in a single flake, while providing a consistent interface (and enabling common modules) for both Linux and macOS.","sidebar":"tutorialSidebar"},"modules/nixos-flake/start":{"id":"modules/nixos-flake/start","title":"Getting Started","description":"Pick your desired operating system and follow the below instructions.","sidebar":"tutorialSidebar"},"modules/process-compose-flake/index":{"id":"modules/process-compose-flake/index","title":"Process management using process-compose-flake","description":"process-compose-flake is a flake-parts module for process-compose.","sidebar":"tutorialSidebar"},"modules/services-flake/index":{"id":"modules/services-flake/index","title":"Running services using services-flake","description":"services-flake is a flake-parts module providing NixOS-like services for Nix flakes. It builds on top of the process-compose-flake module which allows running arbitrary processes in the devShell environment.","sidebar":"tutorialSidebar"},"modules/treefmt":{"id":"modules/treefmt","title":"Auto formatting using treefmt-nix","description":"treefmt provides an interface to run multiple code formatters at once, so you don\'t have to run them manually for each file type.","sidebar":"tutorialSidebar"}}}')}}]);