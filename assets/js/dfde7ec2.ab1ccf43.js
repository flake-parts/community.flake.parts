"use strict";(self.webpackChunkcommunity_flake_parts=self.webpackChunkcommunity_flake_parts||[]).push([[57],{491:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>t,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>o});var a=s(5893),l=s(1151);const i={slug:"/haskell-flake/dependency"},t="Overriding dependencies",r={id:"modules/haskell-flake/guide/dependency",title:"Overriding dependencies",description:"Haskell libraries ultimately come from Hackage, and nixpkgs] contains [most of these. Adding a library to your project involves modifying the .cabal file and restarting the nix shell. The process is typically as follows:",source:"@site/docs/modules/haskell-flake/guide/dependency.md",sourceDirName:"modules/haskell-flake/guide",slug:"/haskell-flake/dependency",permalink:"/haskell-flake/dependency",draft:!1,unlisted:!1,editUrl:"https://github.com/srid/haskell-flake/blob/master/doc/guide/dependency.md",tags:[],version:"current",frontMatter:{slug:"/haskell-flake/dependency"},sidebar:"tutorialSidebar",previous:{title:"Guide",permalink:"/haskell-flake/guide"},next:{title:"DevShell",permalink:"/haskell-flake/devshell"}},c={},o=[{value:"Overriding a Haskell package source",id:"source",level:2},{value:"Using a Git repo",id:"path",level:3},{value:"Using a Hackage version",id:"hackage",level:3},{value:"Using a nixpkgs version",id:"nixpkgs",level:3},{value:"Overriding a Haskell package settings",id:"settings",level:2},{value:"nixpkgs functions",id:"nixpkgs-functions",level:3},{value:"Sharing settings",id:"settings-share",level:2},{value:"Examples",id:"examples",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,l.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"overriding-dependencies",children:"Overriding dependencies"}),"\n",(0,a.jsxs)(n.p,{children:["Haskell libraries ultimately come from ",(0,a.jsx)(n.a,{href:"https://hackage.haskell.org/",children:"Hackage"}),", and ",(0,a.jsx)(n.a,{href:"https://zero-to-nix.com/concepts/nixpkgs",children:"nixpkgs"})," contains ",(0,a.jsx)(n.a,{href:"https://nixpkgs.haskell.page/",children:"most of these"}),". Adding a library to your project involves modifying the ",(0,a.jsx)(n.code,{children:".cabal"})," file and restarting the nix shell. The process is typically as follows:"]}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsxs)(n.li,{children:["Identify the package name from Hackage. Let's say you want to use ",(0,a.jsx)(n.a,{href:"https://hackage.haskell.org/package/ema",children:(0,a.jsx)(n.code,{children:"ema"})})]}),"\n",(0,a.jsxs)(n.li,{children:["Add the package, ",(0,a.jsx)(n.code,{children:"ema"}),", to the ",(0,a.jsx)(n.code,{children:".cabal"})," file under ",(0,a.jsxs)(n.a,{href:"https://cabal.readthedocs.io/en/3.4/cabal-package.html#pkg-field-build-depends",children:["the ",(0,a.jsx)(n.code,{children:"build-depends"})," section"]}),"."]}),"\n",(0,a.jsxs)(n.li,{children:["Exit and restart the nix shell (",(0,a.jsx)(n.code,{children:"nix develop"}),")."]}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["Step (3) above will try to fetch the package from the Haskell package set in ",(0,a.jsx)(n.a,{href:"https://zero-to-nix.com/concepts/nixpkgs",children:"nixpkgs"})," (",(0,a.jsx)(n.code,{children:"pkgs.haskellPackages"}),' by default). For various reasons, this package may be either missing or marked as "broken". In such cases, you will have to override the package locally in the project (see the next section).']}),"\n",(0,a.jsx)(n.h2,{id:"source",children:"Overriding a Haskell package source"}),"\n",(0,a.jsx)(n.p,{children:"In Nix, it is possible to use an exact package built from an arbitrary source - which can be a Git repo, local directory or a Hackage version."}),"\n",(0,a.jsx)(n.h3,{id:"path",children:"Using a Git repo"}),"\n",(0,a.jsxs)(n.p,{children:["If you want to use the ",(0,a.jsx)(n.code,{children:"master"})," branch of the ",(0,a.jsx)(n.a,{href:"https://hackage.haskell.org/package/ema",children:"ema"})," library, for instance, you can do it as follows:"]}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsxs)(n.li,{children:["Add a flake input pointing to the ema Git repo in ",(0,a.jsx)(n.code,{children:"flake.nix"}),":","\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-nix",children:'{\n  inputs = {\n    ema.url = "github:srid/ema";\n    ema.flake = false;\n  };\n}\n'})}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["Build it using ",(0,a.jsx)(n.code,{children:"callCabal2nix"})," and assign it to the ",(0,a.jsx)(n.code,{children:"ema"})," name in the Haskell package set by adding it to the ",(0,a.jsx)(n.code,{children:"packages"})," argument of your ",(0,a.jsx)(n.code,{children:"flake.nix"})," that is using haskell-flake:","\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-nix",children:"{\n  perSystem = { self', config, pkgs, ... }: {\n    haskellProjects.default = {\n      packages = {\n        ema.source = inputs.ema;\n      };\n    };\n  };\n}\n"})}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["Re-run the nix shell (",(0,a.jsx)(n.code,{children:"nix develop"}),")."]}),"\n"]}),"\n",(0,a.jsx)(n.h3,{id:"hackage",children:"Using a Hackage version"}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"packages.<name>.source"})," also supports Hackage versions. So the following works to pull ",(0,a.jsx)(n.a,{href:"https://hackage.haskell.org/package/ema-0.8.2.0",children:"ema 0.8.2.0"}),":"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-nix",children:'{\n  perSystem = { self\', config, pkgs, ... }: {\n    haskellProjects.default = {\n      packages = {\n        ema.source = "0.8.2.0";\n      };\n    };\n  };\n}\n'})}),"\n",(0,a.jsx)(n.h3,{id:"nixpkgs",children:"Using a nixpkgs version"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-nix",children:"haskellProjects.default = {\n  settings = {\n    fourmolu = { super, ...}: { custom = _: super.fourmolu_0_13_1_0; };\n  };\n};\n"})}),"\n",(0,a.jsx)(n.h2,{id:"settings",children:"Overriding a Haskell package settings"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-nix",children:"haskellProjects.default = {\n  settings = {\n    ema = {  # This module can take `{self, super, ...}` args, optionally.\n      # Disable running tests\n      check = false;\n\n      # Disable building haddock (documentation)\n      haddock = false;\n\n      # Ignore Cabal version constraints\n      jailbreak = true;\n\n      # Extra non-Haskell dependencies\n      extraBuildDepends = [ pkgs.stork ];\n\n      # Source patches\n      patches = [ ./patches/ema-bug-fix.patch ];\n\n      # Enable/disable Cabal flags\n      cabalFlags.with-generics = true;\n    };\n  };\n};\n"})}),"\n",(0,a.jsxs)(n.admonition,{title:"Note",type:"info",children:[(0,a.jsxs)(n.h3,{id:"nixpkgs-functions",children:[(0,a.jsx)(n.a,{href:"https://zero-to-nix.com/concepts/nixpkgs",children:"nixpkgs"})," functions"]}),(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["The ",(0,a.jsx)(n.code,{children:"pkgs.haskell.lib"})," module provides various utility functions that you can use to override Haskell packages. The canonical place to find documentation on these is ",(0,a.jsx)(n.a,{href:"https://github.com/NixOS/nixpkgs/blob/master/pkgs/development/haskell-modules/lib/compose.nix",children:"the source"}),". haskell-flake provides a ",(0,a.jsx)(n.code,{children:"settings"})," submodule for convienience. For eg., the ",(0,a.jsx)(n.code,{children:"dontCheck"})," function translates to ",(0,a.jsx)(n.code,{children:"settings.<name>.check"}),"; the full list of options can be seen ",(0,a.jsx)(n.a,{href:"https://github.com/srid/haskell-flake/blob/master/nix/modules/project/settings/all.nix",children:"here"}),"."]}),"\n"]})]}),"\n",(0,a.jsx)(n.h2,{id:"settings-share",children:"Sharing settings"}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.a,{href:"/haskell-flake/modules",children:"Project modules"})," export both ",(0,a.jsx)(n.code,{children:"packages"})," and ",(0,a.jsx)(n.code,{children:"settings"})," options for reuse in downstream Haskell projects."]}),"\n",(0,a.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.a,{href:"https://github.com/srid/emanote/commit/5b24bd04f94e03afe66ee01da723e4a05d854953",children:"Emanote overrides"}),": also demonstrates how to add a ",(0,a.jsx)(n.em,{children:"new"})," setting option (",(0,a.jsx)(n.code,{children:"removeReferencesTo"}),")."]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>r,a:()=>t});var a=s(7294);const l={},i=a.createContext(l);function t(e){const n=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:t(e.components),a.createElement(i.Provider,{value:n},e.children)}}}]);