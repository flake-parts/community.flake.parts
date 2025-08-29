<!-- LLM PROMPT: This document contains all notes from an Emanote notebook.
Each note is separated by '===' delimiters and includes metadata headers.
- Source: The original file path in the notebook
- URL: The full URL where this note can be accessed
- Title: The note's title
- Wikilinks: All possible ways to reference this note using [[wikilink]] syntax

When referencing notes, you can use any of the wikilinks provided.
The base URL is: 
-->

<!-- Source: haskell-flake.md -->
<!-- URL: /haskell-flake -->
<!-- Title: Haskell development using haskell-flake -->
<!-- Wikilinks: [[haskell-flake]] -->

---
short-title: haskell-flake
template:
  sidebar:
    collapsed: true
emanote:
  folder-folgezettel: false
---

# Haskell development using `haskell-flake`

[haskell-flake](https://github.com/srid/haskell-flake) is a [flake-parts](https://flake.parts/) module to make Haskell development [[under-the-hood|simpler]] with [Nix](https://nixos.asia/en/nix).

To get started, see [[start]]# and thereon see [[guide]]#. To get inspired, see [[examples]]#. For reference, see [[ref]]#.

[![[haskell-flake.webp]]]{.w-32}

===

<!-- Source: haskell-flake/debugging.md -->
<!-- URL: /haskell-flake/debugging -->
<!-- Title: Debugging logs -->
<!-- Wikilinks: [[haskell-flake/debugging]], [[debugging]] -->

# Debugging logs

>[!warning]
> This feature is available only in Nix versions 2.10 or later.

Passing `--trace-verbose` to Nix commands causes haskell-flake to print verbose logging of its activity. To enable it:

>[!tip] Timestamps in logs
> `moreutils` provides the `ts` command that you can pipe your nix command output to in order to get timestamps in the logs.

The below is a sample output when building [haskell-multi-nix](https://github.com/srid/haskell-multi-nix/tree/debug) with `--trace-verbose`:

```text
$ nix --no-eval-cache build -L --trace-verbose github:srid/haskell-multi-nix 2>&1 | ts '[%H:%M:%S]'
[22:45:38] trace: DEBUG[haskell-flake] [haskell-multi-nix#haskellProjects.default]: default.findPackagesInCabalProject = {"bar":"/nix/store/5zvwxw2n801bbjcz3685dp20y8afjmld-source/./bar","foo":"/nix/store/5zvwxw2n801bbjcz3685dp20y8afjmld-source/./foo"}
[22:45:38] trace: DEBUG[haskell-flake] [haskell-multi-nix#haskellProjects.default]: defaults.packages = {"bar":{"imports":[{"_file":"/nix/store/sv90dpz2fgn93kvzc14szqn77wvjssv0-source/nix/modules/project/defaults.nix, via option perSystem.aarch64-darwin.haskellProjects.default.defaults.packages.bar","imports":[{"source":"/nix/store/5zvwxw2n801bbjcz3685dp20y8afjmld-source/./bar"}]}]},"foo":{"imports":[{"_file":"/nix/store/sv90dpz2fgn93kvzc14szqn77wvjssv0-source/nix/modules/project/defaults.nix, via option perSystem.aarch64-darwin.haskellProjects.default.defaults.packages.foo","imports":[{"source":"/nix/store/5zvwxw2n801bbjcz3685dp20y8afjmld-source/./foo"}]}]}}
[22:45:38] trace: DEBUG[haskell-flake] [haskell-multi-nix#haskellProjects.default]: bar.getCabalExecutables = bar
[22:45:38] trace: DEBUG[haskell-flake] [haskell-multi-nix#haskellProjects.default]: foo.getCabalExecutables = 
[22:45:38] trace: DEBUG[haskell-flake] [haskell-multi-nix#haskellProjects.default]: default.packages:apply {"bar":{"cabal":{"executables":["bar"]},"local":{"toCurrentProject":true,"toDefinedProject":true},"source":"/nix/store/5zvwxw2n801bbjcz3685dp20y8afjmld-source/./bar"},"foo":{"cabal":{"executables":[]},"local":{"toCurrentProject":true,"toDefinedProject":true},"source":"/nix/store/5zvwxw2n801bbjcz3685dp20y8afjmld-source/./foo"}}
[22:45:40] trace: DEBUG[haskell-flake] [haskell-multi-nix#haskellProjects.default]: settings.bar {"haddock":false,"libraryProfiling":false}
[22:45:40] trace: DEBUG[haskell-flake] [haskell-multi-nix#haskellProjects.default]: bar.callCabal2nix /nix/store/5zvwxw2n801bbjcz3685dp20y8afjmld-source/./bar
[22:45:40] trace: DEBUG[haskell-flake] [haskell-multi-nix#haskellProjects.default]: bar.mkNewStorePath /nix/store/hr0a6v8wwwvw323clv9x28zknd5fqz84-source-bar
[22:45:41] trace: DEBUG[haskell-flake] [haskell-multi-nix#haskellProjects.default]: bar.cabal2nixDeriver /nix/store/pxcqizj7mvmwflx7hxlq7ll5bdmcis2a-cabal2nix-bar
[22:45:41] trace: DEBUG[haskell-flake] [haskell-multi-nix#haskellProjects.default]: settings.foo {"haddock":false,"libraryProfiling":false}
[22:45:41] trace: DEBUG[haskell-flake] [haskell-multi-nix#haskellProjects.default]: foo.callCabal2nix /nix/store/5zvwxw2n801bbjcz3685dp20y8afjmld-source/./foo
[22:45:41] trace: DEBUG[haskell-flake] [haskell-multi-nix#haskellProjects.default]: foo.mkNewStorePath /nix/store/bpybsny4gd5jnw0lvk5khpq7md6nwg5f-source-foo
[22:45:41] trace: DEBUG[haskell-flake] [haskell-multi-nix#haskellProjects.default]: foo.cabal2nixDeriver /nix/store/i36x01zcdpm7c3m3fjjq1qa4slv61jpw-cabal2nix-foo
[22:45:41] trace: DEBUG[haskell-flake] [haskell-multi-nix#haskellProjects.default]: foo.fromSdist /nix/store/qrsy0bm4khcs1hxy0rhb6m3g2bvi15sm-foo-0.1.0.0
[22:45:41] trace: DEBUG[haskell-flake] [haskell-multi-nix#haskellProjects.default]: bar.fromSdist /nix/store/anyx51rm5gjdclafcz5is7jpqgfq2i4w-bar-0.1.0.0
```

## See also

- Read more about [the `traceVerbose` function](https://nixos.asia/en/traceVerbose) which haskell-flake uses to produce the above logs.

===

<!-- Source: haskell-flake/defaults.md -->
<!-- URL: /haskell-flake/defaults -->
<!-- Title: Default options -->
<!-- Wikilinks: [[haskell-flake/defaults]], [[defaults]] -->


# Default options

haskell-flake provides sensible defaults for various options. See [defaults.nix].

[defaults.nix]: https://github.com/srid/haskell-flake/blob/master/nix/modules/project/defaults.nix

{#override}
## Overriding defaults

{#packages}
### Overriding default local packages

This example shows how to specify [[local]] manually.

```nix
{
  haskellProjects.default = {
    # Specify local packages manually
    defaults.packages = {
      foo.source = ./foo;
    };
  };
}
```


===

<!-- Source: haskell-flake/dependency.md -->
<!-- URL: /haskell-flake/dependency -->
<!-- Title: Overriding dependencies -->
<!-- Wikilinks: [[haskell-flake/dependency]], [[dependency]] -->

---
order: -10
---

# Overriding dependencies

Haskell libraries ultimately come from [Hackage](https://hackage.haskell.org/), and [nixpkgs] contains [most of these](https://nixpkgs.haskell.page/). Adding a library to your project involves modifying the `.cabal` file and restarting the nix shell. The process is typically as follows:

1. Identify the package name from Hackage. Let's say you want to use [`ema`](https://hackage.haskell.org/package/ema)
2. Add the package, `ema`, to the `.cabal` file under [the `build-depends` section](https://cabal.readthedocs.io/en/3.4/cabal-package.html#pkg-field-build-depends).
3. Exit and restart the nix shell (`nix develop`). 

Step (3) above will try to fetch the package from the Haskell package set in [nixpkgs] (`pkgs.haskellPackages` by default). For various reasons, this package may be either missing or marked as "broken". In such cases, you will have to override the package locally in the project (see the next section).

## Overriding a Haskell package source {#source}

In Nix, it is possible to use an exact package built from an arbitrary source - which can be a Git repo, local directory or a Hackage version. 

### Using a Git repo {#path}

If you want to use the `master` branch of the [ema](https://hackage.haskell.org/package/ema) library, for instance, you can do it as follows:

1. Add a flake input pointing to the ema Git repo in `flake.nix`: 
    ```nix
    {
      inputs = {
        ema.url = "github:srid/ema";
        ema.flake = false;
      };
    }
    ```
1. Build it using `callCabal2nix` and assign it to the `ema` name in the Haskell package set by adding it to the `packages` argument of your `flake.nix` that is using haskell-flake:
    ```nix
    {
      perSystem = { self', config, pkgs, ... }: {
        haskellProjects.default = {
          packages = {
            ema.source = inputs.ema;
          };
        };
      };
    }
    ```
1. Re-run the nix shell (`nix develop`).

### Using a multi-package Haskell Git repo {#multi-path}

If you want to override multiple dependencies whose source exist in the same mono repo (for e.g., `foo` and `bar` in [haskell-multi-nix](https://github.com/srid/haskell-multi-nix), you can do so as follows:

1. Add a flake input pointing to the monorepo (eg., `haskell-multi-nix` Git repo) in `flake.nix`:
    ```nix
    {
      inputs = {
        haskell-multi-nix.url = "github:srid/haskell-multi-nix";
        haskell-multi-nix.flake = false;
      };
    }
    ```
1. Add a separate entry in `haskellProjects.<name>.packages` for each of the package in the subdirectories:
    ```nix
    {
      perSystem = { self', config, pkgs, ... }: {
        haskellProjects.default = {
          packages = {
            foo.source = inputs.haskell-multi-nix + /foo;
            bar.source = inputs.haskell-multi-nix + /bar;
          };
        };
      };
    }
    ```

### Using a Hackage version {#hackage}

`packages.<name>.source` also supports Hackage versions. So the following works to pull [ema 0.8.2.0](https://hackage.haskell.org/package/ema-0.8.2.0):

```nix
{
  perSystem = { self', config, pkgs, ... }: {
    haskellProjects.default = {
      packages = {
        ema.source = "0.8.2.0";
      };
    };
  };
}
```

### Using a nixpkgs version {#nixpkgs}

```nix
haskellProjects.default = {
  settings = {
    fourmolu = { super, ...}: { custom = _: super.fourmolu_0_13_1_0; };
  };
};
```

## Overriding a Haskell package settings {#settings}

See [[settings]]

## Sharing dependency overrides {#share}

[[modules]] export both `packages` and `settings` options for reuse in downstream Haskell projects.


[nixpkgs]: https://nixos.asia/en/nixpkgs


===

<!-- Source: haskell-flake/devshell.md -->
<!-- URL: /haskell-flake/devshell -->
<!-- Title: DevShell -->
<!-- Wikilinks: [[haskell-flake/devshell]], [[devshell]] -->

---
order: -8
---

# DevShell

haskell-flake uses the [`shellFor`][shellFor] function to provide a Haskell development shell. `shellFor` in turn uses the standard [`mkShell`][mkShell] function to create a Nix shell environment. The `mkShellArgs` option can be used to pass custom arguments to `mkShell`.

```nix
{
  haskellProjects.default = {
    devShell = {
      mkShellArgs = {
        shellHook = ''
          export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:${pkgs.flint}/lib
        ''
      };
    }
  }
}
```

## Composing devShells

While `mkShellArgs` is a convenient way to extend the Haskell devShell, sometimes you want to compose multiple devShell environments in a way you want.

The devShell of a haskell-flake project is exposed in the `config.haskellProjects.<name>.outputs.devShell` attribute. You can pass this devShell to the `inputsFrom` argument of a [`mkShell`][mkShell] function in order to include the Haskell devShell in another devShell. The same technique can be used to compose devShells created by other flake-parts modules. 

For example, [in haskell-template](https://github.com/srid/haskell-template/blob/fc263b19e4ef02710ffc61fc656aec6c1a873974/flake.nix#L96-L102), we create a top-level devShell that merges the devShell of the haskell-flake project, the devShell of [mission-control](https://community.flake.parts/mission-control) and the devShell of [flake-root](https://github.com/srid/flake-root) as follows::

```nix
{
  devShell = pkgs.mkShell {
    inputsFrom = [
      config.haskellProjects.default.outputs.devShell
      config.flake-root.devShell
      config.mission-control.devShell
    ];
  };
}
```

This sort of composition is either impossible or very complex to do with the `mkShellArgs` approach.


[shellFor]: https://nixos.org/manual/nixpkgs/unstable/#haskell-shellFor
[mkShell]: https://nixos.org/manual/nixpkgs/stable/#sec-pkgs-mkShell



===

<!-- Source: haskell-flake/docker.md -->
<!-- URL: /haskell-flake/docker -->
<!-- Title: Building a docker image -->
<!-- Wikilinks: [[haskell-flake/docker]], [[docker]] -->


# Building a docker image

Building a docker image is much simpler with Nix compared to writing `Dockerfile`. Since the entire build process is handled by Nix flakes, most of what's left to do for docker image creation is copying of the derivations and configuration.

## Writing the Nix to build the docker image

Consider a haskell-flake project "foo". To copy the binaries generated by the `default` package to `/bin` on the image,  one can use `copyToRoot` attribute offered by [`dockerTools.buildImage`](https://nixos.org/manual/nixpkgs/stable/#sec-pkgs-dockerTools). For example:

```nix
{
  # Inside perSystem
  packages.dockerImage = pkgs.dockerTools.buildImage {
    name = "foo";
    copyToRoot = pkgs.buildEnv {
      paths = with pkgs; [
        self'.packages.default
      ];
      name = "foo-root";
      pathsToLink = [ "/bin" ];
    };
  };
}
```

In addition to copying over the flake `packages`, we may also copy *paths* in the project. `self` can be added to `paths` to expose the project directory. 
```nix
{
  copyToRoot = pkgs.buildEnv {
    paths = with pkgs; [
      coreutils
      bash
      self
    ];
    name = "foo-root";
    pathsToLink = [ "/foo_sub" "/bin" ];
  };
}
```
If you'd like your docker image to run your haskell project's default package when the container starts, use the following config:
```nix
{
  # Inside dockerImage's `buildImage`
  config = {
    Cmd = [ "${pkgs.lib.getExe self'.packages.default}" ];
  };
}
```

## Build the docker image

To build the docker image *as a Nix derivation*, run:

```bash
nix build .#dockerImage
```

To load this image into your local docker image registry, run:

```bash
docker load -i $(nix build .#dockerImage --print-out-paths)
```

## Tips

### Size

Docker images including Haskell packages can be optimized using the methods described [[size|here]].

### Time

If you don't want `docker images` showing that the image was created several decades ago, use the following:
```nix
{
  # Inside perSystem.packages' `dockerImage`:
  pkgs.dockerTools.buildImage {
    name = "foo";
    created = "now";
  };
}
```

### Tag

If you want to tag the images with the commit id of the working copy:

```nix
{
  # Inside perSystem.packages' `dockerImage`:
  pkgs.dockerTools.buildImage {
    name = "foo";
    tag = builtins.substring 0 9 (self.rev or "dev");
  };
}
```
[`builtins.substring 0 9 self.rev`](https://nixos.org/manual/nix/stable/language/builtins.html#builtins-substring) is the same as `git rev-parse --short HEAD`. `self.rev` is non-null only on a clean working copy and hence the tag is set to `dev` when the working copy is dirty.

### SSL certs

In order to be able to make https connections from inside of the docker image, you must expose the cacert Nix package via the relevant environment variable:

```nix
{
  # Inside dockerTools.buildImage
  config = {
    Env = [ 
      "SSL_CERT_FILE=${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt" 
      # Ref: https://hackage.haskell.org/package/x509-system-1.6.7/docs/src/System.X509.Unix.html#getSystemCertificateStore
      "SYSTEM_CERTIFICATE_PATH=${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt"
    ];
  };
}
```


## Example

- [Sample flake-parts module for docker](https://github.com/nammayatri/nammayatri/pull/14/files#diff-18ea3dd9a6a84702796b8dac608d0cad8e396a7c2e8c52732fcb7e5f52d1b0b9)


===

<!-- Source: haskell-flake/examples.md -->
<!-- URL: /haskell-flake/examples -->
<!-- Title: Examples -->
<!-- Wikilinks: [[haskell-flake/examples]], [[examples]] -->

# Examples

- [srid/haskell-template](https://github.com/srid/haskell-template/blob/master/flake.nix)
- [fpindia/fpindia-site](https://github.com/fpindia/fpindia-site/blob/master/flake.nix)
- [srid/haskell-multi-nix](https://github.com/srid/haskell-multi-nix/blob/master/flake.nix) - multiple [[local|local packages]]
- [srid/emanote](https://github.com/srid/emanote/blob/master/flake.nix)
- [srid/ema](https://github.com/srid/ema/blob/master/flake.nix)
- [nammayatri/nammayatri backend](https://github.com/nammayatri/nammayatri/blob/main/Backend/default.nix) - a polyglot flake
- [haskell/hackage-server](https://github.com/haskell/hackage-server/blob/master/flake.nix)
- [hercules-ci/warp-systemd](https://github.com/hercules-ci/warp-systemd/blob/master/flake.nix) - a library with a NixOS test
- [KovalevDima/ClickHaskell](https://github.com/KovalevDima/ClickHaskell) - ClickHouse driver for Haskell


===

<!-- Source: haskell-flake/gotchas.md -->
<!-- URL: /haskell-flake/gotchas -->
<!-- Title: Gotchas -->
<!-- Wikilinks: [[haskell-flake/gotchas]], [[gotchas]] -->

# Gotchas

{#libssh2}
## Overriding `libssh2` Haskell library

Overriding the package with `packages.libssh2.source = "0.2.0.9"` results in infinite recursion.

Possibly having to do with `cabal2nix` not understanding that [`libssh2` in `pkgconfig-depends` of `libssh2.cabal`](https://github.com/portnov/libssh2-hs/blob/bf7cbe643c7f4fb4fad3963705feb8351471eb01/libssh2/libssh2.cabal#L70)
is not self-referential.

Use the following [[settings]] configuration to override `libssh2`:

```nix
# In `haskellProjects.default`
{
  settings = {
    libssh2 = {
      broken = false;
      custom = (p: p.overrideAttrs (oa: rec {
        version = "0.2.0.9";
        src = pkgs.fetchzip {
          url = "mirror://hackage/${oa.pname}-${version}/${oa.pname}-${version}.tar.gz";
          sha256 = "sha256-/zzj11iOxkpEsKVwB4+IF8dNZwEuwUlgw+cZYguN8QI=";
        };
      }));
    };
  };
}
```



===

<!-- Source: haskell-flake/guide.md -->
<!-- URL: /haskell-flake/guide -->
<!-- Title: Guide -->
<!-- Wikilinks: [[haskell-flake/guide]], [[guide]] -->

---
order: -9
---

# Guide

- [[local]]#
- [[dependency]]#
- [[settings]]#
- [[defaults]]#
- [[devshell]]#
- [[package-set]]#
- [[modules]]#
- [[debugging]]#
- [[size]]#

===

<!-- Source: haskell-flake/hls.md -->
<!-- URL: /haskell-flake/hls -->
<!-- Title: IDE configuration (HLS) -->
<!-- Wikilinks: [[haskell-flake/hls]], [[hls]] -->

---
order: -8
---

# IDE configuration (HLS)

By default, #[[devshell]] of haskell-flake projects includes [haskell-language-server](https://github.com/haskell/haskell-language-server) and [a few other tools by default](https://github.com/srid/haskell-flake/blob/988a78590c158c5fa0b4893de793c9c783b9d7e9/nix/modules/project/defaults.nix#L23-L29).
{#disable}
## Disabling `haskell-language-server`

> [!tip] Default options
> Alternatively, disabling the [[defaults|default options]] (i.e., `haskellProjects.<proj-name>.defaults.enable = false;`) automatically removes HLS.

HLS is included as part of the default value of `devShell.tools` options. You can override this default by overriding it, for e.g.:

```nix
{
  haskellProjects.<proj-name> = {
    # NOTE: This is 'defaults.devShell.tools', not 'devShell.tools'
    defaults.devShell.tools = hp: with hp; {
      inherit
        cabal-install
        ghcid;
    };
  };
}
```

Alternatively, you can set it to `null` at a project-level:

```nix
{
  haskellProjects.<proj-name> = {
    # NOTE: This is 'devShell.tools', not 'defaults.devShell.tools'
    devShell.tools = {
      haskell-language-server = null;
    };
  };
}
```

{#disable-plugins}
## Disabling HLS plugins

>[!warning] TODO
> See here for current status: <https://github.com/srid/haskell-flake/issues/245>


===

<!-- Source: haskell-flake/local.md -->
<!-- URL: /haskell-flake/local -->
<!-- Title: Local packages -->
<!-- Wikilinks: [[haskell-flake/local]], [[local]] -->

---
order: -11
---

# Local packages

Local Haskell packages are defined in the `packages.*.source` option under `haskellProjects.<name>` module. They are automatically detected if you have a single top-level Cabal package, or multiple Cabal packages defined in a `cabal.project` file, via [[defaults|default settings]].

{#single}
## Single package

If your repository has a single top-level `.cabal` file, haskell-flake will use it by [[defaults|default]]. There is no need to specify `packages.*.source` yourself.

{#multi}
## Multiple packages

If you have multiple Haskell packages in sub-directories, you can refer to them in a `cabal.project` file to have haskell-flake automatically use them as local packages by [[defaults|default]]:

See https://github.com/srid/haskell-multi-nix for example:

```sh
$ cat cabal.project
packages:
    ./foo
    ./bar
```

The `cabal.project` file must begin with a `packages:` key, followed by a list of directories containing the cabal files.

```sh
$ ls */*.cabal
bar/bar.cabal  foo/foo.cabal
```

{#source-filtering}
## Source filtering

When a local package is in a sub-directory, haskell-flake will create a new store path to avoid changes to parent files (using [`cleanSourceWith`]) triggering a rebuild.

When a local package is the only top-level one, however, any file in the repository will by default trigger a rebuild. This is because `haskellProjects.<name>.projectRoot` is set to `self` by default. 

{#rebuild}
### Avoiding rebuild of top-level package

To avoid rebuilding the top-level package whenever irrelevant files change, you can do one of the following:

- Put the top-level package in a sub-directory.
- Or, set `projectRoot` to a subset of your flake root using [`fileset.toSource`](https://nixos.org/manual/nixpkgs/stable/#function-library-example-lib.fileset.toSource). For [example](https://github.com/srid/haskell-template/blob/033913a6fe418ea0c25ec2c2604ab4030563ba2e/flake.nix#L28-L34):
    ```nix
    {
      haskellProjects.default = {
        projectRoot = builtins.toString (lib.fileset.toSource {
          root = ./.;
          fileset = lib.fileset.unions [
            ./src
            ./haskell-template.cabal
          ];
        });
      }
    }
    ```

[`cleanSourceWith`]: https://github.com/srid/haskell-flake/blob/67db46409b4c2e92abf27ddde7c75ae310d4068c/nix/build-haskell-package.nix#L15-L24


===

<!-- Source: haskell-flake/modules.md -->
<!-- URL: /haskell-flake/modules -->
<!-- Title: Project modules -->
<!-- Wikilinks: [[haskell-flake/modules]], [[modules]] -->

# Project modules

haskell-flake's per-project configuration can be modularized and shared among multiple repos. This is done using the `flake.haskellFlakeProjectModules` flake output. 

Let's say you have two repositories -- `common` and `myapp`. The `common` repository may expose some shared haskell-flake settings as follows:

```nix
{
  # Inside flake-parts' `mkFlake`:
  flake.haskellFlakeProjectModules.default = { pkgs, ... }: {
    devShell.tools = hp: {
      inherit (hp) 
        hlint
        cabal-fmt
        ormolu;
    };
    packages = {
      mylib.source = inputs.mylib;
    };
  };
}
```

This module can then be imported in multiple projects, such as the `myapp` project:

```nix
{
  # Inside flake-parts' `perSystem`:
  haskellProjects.default = {
    imports = [
      inputs.common.haskellFlakeProjectModules.default
    ];
    packages = {
      myapp.root = ./.;
    };
  };
}
```

This way your `app` project knows how to find "mylib" library as well as includes the default tools you want to use in the dev shell.

## Module arguments {#args}

A haskell-flake project module takes the following arguments:

| Argument | Description |
| --- | --- |
| `pkgs` | The perSystem's `pkgs` argument |
| `self` | The flake's `self` |

## Default modules {#default}

By default, haskell-flake will generate the following modules for the "default" `haskellProject`:

| Module | Contents |
| -- | -- |
| `haskellFlakeProjectModules.output` | [[local\|Local packages]] & dependency overrides |

The idea here being that you can "connect" two Haskell projects such that they depend on one another while reusing the overrides -- `packages` (see [[dependency]]) and `settings` (see [[settings]]) -- from one place. For example, if you have a project "foo" that depends on "bar" and if "foo"'s flake.nix has "bar" as its input, then in "foo"'s `haskellProject.default` entry you can import "bar" as follows:

```nix
# foo's flake.nix's perSystem
{ 
  haskellProjects.default = {
    imports = [
      inputs.bar.haskellFlakeProjectModules.output
    ];
    packages = {
      foo.root = ./.;
    };
  };
}
```

By importing "bar"'s `output` project module, you automatically get the overrides from "bar" as well as the [[local|local packages]]. This way you don't have to duplicate the `settings` and manually specify the `packages.<name>.source` in "foo"'s flake.nix.

## Export non-default project modules {#non-default}

The flake output `haskellFlakeProjectModules.output` exports `packages` and [[settings]] options of `haskellProject.default`, but you could create custom flake output that does the same for an arbitrary project, let's say `bar`, as follows:

```nix
# Inside foo/flake.nix's outputs
{
  flake-parts.lib.mkFlake { inherit inputs; } ({ withSystem, ... }: {
    flake.haskellFlakeProjectModules = {
      bar = { pkgs, lib, ... }: withSystem pkgs.system ({ config, ... }:
        config.haskellProjects.bar.defaults.projectModules.output
      );
    };
  });
}
```

The flake output `haskellFlakeProjectModules.bar` of `foo` can be imported in another project, let's say `baz`, as:

```nix
# baz/flake.nix's perSystem
{ 
  haskellProjects.default = {
    imports = [
      inputs.foo.haskellFlakeProjectModules.bar
    ];
  };
}
```

## Examples

- https://github.com/nammayatri/nammayatri (imports `shared-kernel` which in turn imports `euler-hs`)


===

<!-- Source: haskell-flake/package-set.md -->
<!-- URL: /haskell-flake/package-set -->
<!-- Title: Creating package sets -->
<!-- Wikilinks: [[haskell-flake/package-set]], [[package-set]] -->

# Creating package sets

While haskell-flake is generally used to develop and build individual Haskell projects, you can also use it to create a custom Haskell package set that you can use in other projects. This is useful if you want to create a common package set to be shared across multiple projects.

A "project" in haskell-flake primarily serves the purpose of developing Haskell projects. Additionally, a project also exposes the final *package set* via the readonly option `outputs.finalPackages`. This package set includes the base packages (`basePackages`), the [[local|local packages]] as well as any [[dependency|dependency overrides]] you set. Since we are are only interested in creating a new package set, we can use empty local packages and disable the dev shell:

```nix
{
  haskellProjects.ghc810 = {
    defaults.packages = {};  # Disable scanning for local package
    devShell.enable = false; # Disable devShells
    autoWire = [ ];          # Don't wire any flake outputs

    # Start from nixpkgs's ghc8107 package set
    basePackages = pkgs.haskell.packages.ghc8107;
  };
}
```

You can access this package set as `config.haskellProjects.ghc810.outputs.finalPackages`. But this is not terribly interesting, because it is the exact same as the package set `pkgs.haskell.packages.ghc8107` from nixpkgs. So let's add and override some packages in this set:

```nix
{
  haskellProjects.ghc810 = {
    defaults.packages = {};  # No local packages
    devShell.enable = false;

    basePackages = pkgs.haskell.packages.ghc8107;

    packages = {
      # New packages from flake inputs
      mylib.source = inputs.mylib;
      # Dependencies from Hackage
      aeson.source = "1.5.6.0";
      dhall.source = "1.35.0";
    };
    settings = {
       aeson.jailbreak = true;
    };
  };
}
```

This will create a package set that overrides the `aeson` and `dhall` packages using the specified versions from Hackage, but with the `aeson` package having the `jailbreak` flag set (which relaxes its Cabal constraints).  It also adds the `mylib` package which exists neither in nixpkgs nor in Hackage, but comes from somewhere arbitrary and specified as flake input.

In your *actual* haskell project, you can use this package set (`config.haskellProjects.ghc810.outputs.finalPackages`) as its base package set:

```nix
{
  haskellProjects.myproject = {
    packages.mypackage.source = ./.;

    basePackages = config.haskellProjects.ghc810.outputs.finalPackages;
  };
}
```

Finally, you can externalize this `ghc810` package set as either a flake-parts module or as a [[modules|haskell-flake module]], and thereon import it from multiple repositories.

## Examples

- https://github.com/nammayatri/common/pull/11/files

## See also

- [[gotchas]]



===

<!-- Source: haskell-flake/ref.md -->
<!-- URL: /haskell-flake/ref -->
<!-- Title: Reference -->
<!-- Wikilinks: [[haskell-flake/ref]], [[ref]] -->

---
order: -8
---

# Reference

- [Module options](https://flake.parts/options/haskell-flake)
- [[docker]]#

===

<!-- Source: haskell-flake/settings.md -->
<!-- URL: /haskell-flake/settings -->
<!-- Title: Package Settings -->
<!-- Wikilinks: [[haskell-flake/settings]], [[settings]] -->

---
order: -9
---

# Package Settings

Settings for individual Haskell packages can be specified in the `settings` attribute of a `haskellProjects` module.

```nix
haskellProjects.default = {
  settings = {
    ema = {  # This module can take `{self, super, ...}` args, optionally.
      # Disable running tests
      check = false;

      # Disable building haddock (documentation)
      haddock = false;

      # Ignore Cabal version constraints
      jailbreak = true;

      # Extra non-Haskell dependencies
      extraBuildDepends = [ pkgs.stork ];

      # Source patches
      patches = [ ./patches/ema-bug-fix.patch ];

      # Enable/disable Cabal flags
      cabalFlags.with-generics = true;

      # Allow building a package marked as "broken"
      broken = false;
    };
  };
};
```

> [!info] Note
>
> ### [nixpkgs] functions
>
> - The `pkgs.haskell.lib` module provides various utility functions that you can use to override Haskell packages. The canonical place to find documentation on these is [the source](https://github.com/NixOS/nixpkgs/blob/master/pkgs/development/haskell-modules/lib/compose.nix). haskell-flake provides a `settings` submodule for convenience. For eg., the `dontCheck` function translates to `settings.<name>.check`; the full list of options can be seen [here](https://github.com/srid/haskell-flake/blob/master/nix/modules/project/settings/all.nix).

## Sharing package settings {#share}

[[modules]] export both `packages` and `settings` options for reuse in downstream Haskell projects.

## Custom settings {#custom}

You can provide custom settings for use in multiple packages (even across multiple repos). For example, see [this Emanote change](https://github.com/srid/emanote/commit/5b24bd04f94e03afe66ee01da723e4a05d854953) which demonstrates how to add a _new_ setting option (`removeReferencesTo`).

## Extra settings {#extra}

haskell-flake provides the following settings on top of those provided by [nixpkgs].

### `generateOptparseApplicativeCompletions`

Generate and install shell completion files for executables.
The executables need to be using `optparse-applicative` for this to work.
Note that this feature is automatically disabled when cross-compiling, since it requires executing the binaries in question.

### `removeReferencesTo`

Remove references to other packages from this Haskell package. This is useful to eliminate unnecessary data dependencies from your Haskell executable so as to reduce its closure size.

> [!info] For more, see
>
> - https://github.com/NixOS/nixpkgs/pull/204675
> - https://srid.ca/remove-references-to

### `buildFromSdist`

Newer versions of [nixpkgs] provide `buildFromSdist` to build your package from the `cabal sdist` tarball. This is enabled by default, to help with checking release-worthiness of your packages.

> [!warning] Issues with `buildFromSdist`
> If you encounter issues with `buildFromSdist` you can disable it by setting `settings.<name>.buildFromSdist` to `true`.

[nixpkgs]: https://nixos.asia/en/nixpkgs

### `stan`

Run **ST**atic **AN**alysis on the package using [stan] and generate an HTML report. The report is created in the `/nix/store` path alongside your package outputs.

> [!note] stan configuration  
> This setting looks for a `.stan.toml` file in the root of the package source. See a sample [.stan.toml] configuration for reference.

[stan]: https://github.com/kowainik/stan
[.stan.toml]: https://github.com/kowainik/stan/blob/main/.stan.toml


===

<!-- Source: haskell-flake/size.md -->
<!-- URL: /haskell-flake/size -->
<!-- Title: Optimize package size -->
<!-- Wikilinks: [[haskell-flake/size]], [[size]] -->

# Optimize package size

Haskell package derivations created by `haskell-flake` are shipped with symlinks to other store paths, like `$out/lib`, `$out/nix-support` and `$out/share/doc`. In addition, enabling profiling or haddock can increase the size of these packages. If your Haskell application is end-user software, you will want to strip all but the executables. This can be achieved using `justStaticExecutables`:

```nix title="flake.nix"
  # Inside perSystem
  packages.default = pkgs.haskell.lib.justStaticExecutables self'.packages.foo;
```

## Removing unnecessary Nix dependencies


There can be cases where `justStaticExecutables` doesn't work. In such cases, you can manually remove references to the store paths that you don't want to ship. Let's say you have a haskell project `foo` that is dependendent on `bar` and `bar`
relies on `data-files` in its cabal (which data-files can be, for instance, `js` or `html` files). Considering you are using `cabal-install < 3.10.1.0` the final executable of `foo` will have a reference to `bar` and `bar` will depend on `ghc`, thus increasing the overal size of the docker image. 

But how do you arrive at this point in the first place? i.e how do you pin point the exact store paths that are causing the increase in size? These are the rough steps that you can follow, if you are packaging it as part of a docker image:

- Build and scan [[docker|the docker image]] for store paths that are taking up the most space:
  ```bash
  nix build .#dockerImage
  docker load -i < result
  docker run --rm -it <name:tag> sh -c 'du -sh /nix/store/*' | sort -h | tail
  ```
- After the scan you will notice that `bar` will be present and its quite obvious it shouldn't be present because all of that will be packaged in the executable of `foo`. 

- It might not be obvious to you that `bar` is causing the increase in size. In such cases you can use `nix why-depends` to find out why `ghc` is present in the docker image:
  ```bash
  nix why-depends /nix/store/...-foo /nix/store/...-ghc-x.x.x
  ```

- Now that you know that `bar` is causing the increase in size, let's wrap the executable of `foo` [removing references to](https://srid.ca/remove-references-to) `bar`:
  ```nix title="flake.nix"
  {
    # Inside `haskellProjects`
    haskellProjects.default = 
      let
        # Forked from: https://github.com/srid/emanote/blob/24c7e5e29a91ec201a48fad1ac028a123b82a402/flake.nix#L52-L62
        # We shouldn't need this after https://github.com/haskell/cabal/pull/8534
        removeReferencesTo = disallowedReferences: drv:
          drv.overrideAttrs (old: rec {
            inherit disallowedReferences;
            # Ditch data dependencies that are not needed at runtime.
            # cf. https://github.com/NixOS/nixpkgs/pull/204675
            # cf. https://srid.ca/remove-references-to
            postInstall = (old.postInstall or "") + ''
              ${lib.concatStrings (map (e: "echo Removing reference to: ${e}\n") disallowedReferences)}
              ${lib.concatStrings (map (e: "remove-references-to -t ${e} $out/bin/*\n") disallowedReferences)}
            '';
          });
      in
      {
        # ...
        settings = {
          foo = {self, super, ... }: {
            justStaticExecutables = true;
            removeReferencesTo = [
              self.bar
            ];
          };
        };
        # ...
      };
  }
  ```
- Voila! Now you have a docker image that is much smaller than before.


===

<!-- Source: haskell-flake/start.md -->
<!-- URL: /haskell-flake/start -->
<!-- Title: Getting Started -->
<!-- Wikilinks: [[haskell-flake/start]], [[start]] -->

---
order: -10
---

# Getting Started

Before using `haskell-flake` you must first [install Nix](https://flakular.in/install).

## Existing projects

To use `haskell-flake` in an *existing* Haskell project, run:

```bash
nix flake init -t github:srid/haskell-flake
```

Open the generated `flake.nix` and change `self'.packages.example` to use your package name. For example, if your package is named `my-package` (with a `my-package.cabal` file), change `example` to `my-package`. Follow the comments along the `flake.nix` to make any necessary changes to the project configuration.

## New projects

To create a *new* Haskell project, instead, run:

```bash
mkdir example && cd ./example
nix flake init -t github:srid/haskell-flake#example
```

### Template

You may also use https://github.com/srid/haskell-template which already uses `haskell-flake` along with other opinionated defaults.

## Under the hood

![[under-the-hood]]

## Next steps

Visit [[guide]] for more details, and [[ref]] for module options.


===

<!-- Source: haskell-flake/under-the-hood.md -->
<!-- URL: /haskell-flake/under-the-hood -->
<!-- Title: Under the hood -->
<!-- Wikilinks: [[haskell-flake/under-the-hood]], [[under-the-hood]] -->


# Under the hood

>[!tip] Under the hood
> See [this tutorial](https://nixos.asia/en/nixify-haskell-nixpkgs) to understand what it takes to package a Haskell application without haskell-flake.

When nixifying a Haskell project without flake-parts (thus without haskell-flake) you would generally use the [raw Haskell infrastructure from nixpkgs](https://nixos.asia/en/nixify-haskell-nixpkgs). haskell-flake uses these functions, while exposing a simpler [modular](https://flake.parts) API on top: your `flake.nix` becomes more [declarative] and less [imperative].

[declarative]: https://github.com/srid/haskell-template/blob/033913a6fe418ea0c25ec2c2604ab4030563ba2e/flake.nix#L22-L59
[imperative]: https://github.com/srid/haskell-template/blob/3fc6858830ecee3d2fe1dfe9a8bfa2047cf561ac/flake.nix#L20-L79

In addition, compared to using plain nixpkgs, haskell-flake supports:

- Auto-detection of [[local|local packages]] based on `cabal.project` file (via [haskell-parsers](https://github.com/srid/haskell-flake/tree/master/nix/haskell-parsers))
- Parse executables from `.cabal` file, to create Flake apps.
- Modular interface to `pkgs.haskell.lib.compose.*` (via `packages` and `settings` submodules)
- Composition of dependency overrides, and other project settings, via [[modules]]

See #[[start]] for getting started with haskell-flake.


===

<!-- Source: index.md -->
<!-- URL: // -->
<!-- Title: community.flake.parts -->
<!-- Wikilinks: [[index]] -->

---
emanote:
  folder-folgezettel: false
---

# community.flake.parts

This is a place to document the various [[mods|flake modules]]# created using [flake-parts](https://flake.parts/). See [NixOS Asia](https://nixos.asia/en/nix-tutorial) for general tutorials on Nix and the module system itself, as a stepping stone to using flake-parts.

If you'd like to contribute to docs or add your own module, see [the Github README](https://github.com/flake-parts/community.flake.parts).


===

<!-- Source: mission-control.md -->
<!-- URL: /mission-control -->
<!-- Title: Devshell scripts using mission-control -->
<!-- Wikilinks: [[mission-control]] -->

---
short-title: mission-control
template:
  sidebar:
    collapsed: true
emanote:
  folder-folgezettel: false
---

# Devshell scripts using `mission-control`

>[!info] Alternative
> As a simpler alternative to `mission-control`, you may also use [just](https://just.systems/man/en/) (see [example use](https://github.com/srid/haskell-template/pull/111)).

The [mission-control](https://github.com/Platonic-Systems/mission-control) flake-parts module enables creating a set of scripts or commands to run in the Nix dev shell. This makes it possible for the project's user to locate all of the commands they need (to get started) in one place, often replacing the likes of `Makefile` or `bin/` scripts.

## Usage

To use this module, add `mission-control` to `inputs`,

```nix
{
  # Inside inputs
  mission-control.url = "github:Platonic-Systems/mission-control";
}
```

and import its flakeModule:

```nix
{
  # Inside mkFlake
  imports = [
    inputs.mission-control.flakeModule
  ];
}
```

## Add a script (Haskell)

Here we'll show a sample of scripts that are particular useful when developing `[Haskell](/haskell-flake)` projects.

### Docs (Hoogle)

We can add a convenient script to start Hoogle on project dependencies as follows. As a result, typing `, docs` in the dev shell will start Hoogle.

```nix
{
  # Inside perSystem
  mission-control.scripts = {
    docs = {
      description = "Start Hoogle server for project dependencies";
      exec = ''
        echo http://127.0.0.1:8888
        hoogle serve -p 8888 --local
      '';
      category = "Dev Tools";
    };
  };
}
```
The `exec` option can be either a shell script (string) or a Nix package. The `category` option defines the group that this script belongs to, when displayed in the menu.

### Cabal repl

To start a cabal repl from your devShell on running  `, repl`, use:

```nix
{
  # Inside perSystem
  mission-control.scripts = {
    repl = {
      description = "Start the cabal repl";
      exec = ''
        cabal repl "$@"
      '';
      category = "Dev Tools";
    };
  };
}
```

[`"$@"`](https://www.gnu.org/software/bash/manual/html_node/Special-Parameters.html) represents the command-line arguments passed to `, repl`. This allows us to pass custom arguments to `cabal repl`. For example, if you wish to run an executable `foo` from your project in cabal repl, you'd run `, repl exe:foo`. Similarly, to get into the repl for a library `bar` you'd run `, run lib:bar`.

### treefmt

If you use the [treefmt](https://nixos.asia/en/treefmt) module for autoformatting the source tree, you can alias it as `, fmt`:

```nix
{ 
  # Inside perSystem
  mission-control.scripts = {
    fmt = {
      description = "Format the source tree";
      exec = config.treefmt.build.wrapper;
      category = "Dev Tools";
    };
  };
}
```

Note that `exec` in this example is a Nix package.

## Tips

### wrapperName

If you don't wish to run your command using `, <command>` you can change the `,` to be any string of your choice by setting the option `wrapperName`, as follows:
```nix
{
  # Inside perSystem
  mission-control = {
    wrapperName = "s";
  };
}
```

## Example

- [haskell-template's flake.nix](https://github.com/srid/haskell-template/blob/7e4d9c630204c2b64bb071837a5a63f35cfac5d8/flake.nix#L83-L112)

[mission-control]: https://github.com/Platonic-Systems/mission-control


===

<!-- Source: mods.md -->
<!-- URL: /modules -->
<!-- Title: Modules -->
<!-- Wikilinks: [[mods]] -->

---
slug: modules
template:
  sidebar:
    collapsed: false
---

# Modules

- [[haskell-flake]]#
- [[services-flake]]#
- [[process-compose-flake]]#
- [[mission-control]]#


===

<!-- Source: process-compose-flake.md -->
<!-- URL: /process-compose-flake -->
<!-- Title: Process management using process-compose-flake -->
<!-- Wikilinks: [[process-compose-flake]] -->

---
short-title: process-compose-flake
template:
  sidebar:
    collapsed: true
emanote:
  folder-folgezettel: false
---

# Process management using `process-compose-flake`

[process-compose-flake](https://github.com/Platonic-Systems/process-compose-flake) is a [flake-parts](https://flake.parts/) module for [process-compose](https://github.com/F1bonacc1/process-compose).

This `flake-parts` module allows you to declare one or more `process-compose` configurations using Nix attribute sets. It will generate corresponding `packages` that wrap the `process-compose` binary with the given configuration.

This module is practical for local development e.g. if you have a lot of runtime dependencies that depend on each other. Stop executing these programs imperatively over and over again in a specific order, and stop the need to write complicated shell scripts to automate this. `process-compose` gives you a process dashboard for monitoring, inspecting logs for each process, and much more, all of this in a TUI.

## Quick Example

See [`example/flake.nix`](https://github.com/Platonic-Systems/process-compose-flake/blob/main/example/flake.nix) for an example flake. This example shows a demo of [sqlite-web](https://github.com/coleifer/sqlite-web) using the sample [chinhook-database](https://github.com/lerocha/chinook-database).

To run this example locally,

```bash
mkdir example && cd example
nix flake init -t github:Platonic-Systems/process-compose-flake
nix run
```

This should open http://127.0.0.1:8213/ in your web browser. If not, navigate to the logs for the `sqlite-web` process and access the URL. Use `demo` as the password to access sqlite-web. The interface should look like this:

![](https://github.com/Platonic-Systems/process-compose-flake/assets/3998/254443fa-f3c2-4675-9ced-2a39ac23591d)


## Usage
Let's say you want to have a `devShell` that makes a command `watch-server` available, that you can use to spin up your projects `backend-server`, `frontend-server`, and `proxy-server`.

To achieve this using `process-compose-flake` you can simply add the following code to the `perSystem` function in your `flake-parts` flake.
```nix
process-compose.watch-server = {
  settings.processes = {
    backend-server.command = "${self'.apps.backend-server.program} --port 9000";
    frontend-server.command = "${self'.apps.frontend-server.program} --port 9001";
    proxy-server.command =
      let
        proxyConfig = pkgs.writeTextFile {
          name = "proxy.conf";
          text = ''
            ...
          '';
        };
      in
      "${self'.apps.proxy-server.program} -c ${proxyConfig} -p 8000";
  };
};
```

`process-compose-flake` will generate the `packages.${system}.watch-server` output for you.

You can then spin up the processes by running `nix run .#watch-server`.

The `package` output in turn can be used to make the `watch-server` command available in your `devShell`:

```nix
devShells = {
  default = pkgs.mkShell {
    name = "my-shell";
    nativeBuildInputs = [
      self'.packages.watch-server
    ];
  };
};
```

You can enter your devShell by running `nix develop` and run `watch-server` to run your processes.

### preHook

If you'd like to run certain commands before starting the processes, you can add them to `preHook`:

```nix
process-compose.watch-server = {
  preHook = ''
    # Cleanup on EXIT, this runs irrespective of exit-code of process-compose
    trap "rm -rf ./data" EXIT
    export USER=foo
  '';
};
```

### postHook

Or if you'd like to run certain commands upon successful execution of `process-compose`, i.e exits with `exit-code: 0`, then add them to `postHook`:

```nix
process-compose.watch-server = {
  postHook = ''
    cat foo.txt
  '';
};
```

## Module API

Our submodule mirrors the [process-compose YAML schema](https://github.com/F1bonacc1/process-compose/blob/main/process-compose.yaml). A few things to remember:

- `process-compose.<name>.environment`: In the YAML config, a list of environment strings are specified. While this is supported, you can also specify the env vars as a Nix attrset
- `process-compose.<name>.processes.<name>.command`: The command string does not have access to the process environment, so if your command becomes shellscript-like you probably want to wrap it in a `pkgs.writeShellApplication` (see [\#22](https://github.com/Platonic-Systems/process-compose-flake/issues/22)).
- `process-compose.<name>.shell`: This is set to `pkgs.bash` by default, obviating reproducibility issues due to depending on globally available bash.

## See also

- [process-compose docs](https://f1bonacc1.github.io/process-compose/launcher/)

## Related projects

- [`services-flake`](https://community.flake.parts/services-flake): NixOS-like services built on top of process-compose-flake. Use this if you want to run popular services (like postgres).
- [`proc-flake`](https://github.com/srid/proc-flake): A similar module that uses a `Procfile`-based runner. It is less feature-rich, but [at times more reliable](https://github.com/Platonic-Systems/process-compose-flake/issues/30) than process-compose.



===

<!-- Source: services-flake.md -->
<!-- URL: /services-flake -->
<!-- Title: Running services using services-flake -->
<!-- Wikilinks: [[services-flake]] -->

---
short-title: services-flake
template:
  sidebar:
    collapsed: true
emanote:
  folder-folgezettel: false
---

# Running services using `services-flake`

[services-flake][gh] provides declarative, composable, and reproducible services for Nix development environment, as a [process-compose-flake](https://github.com/Platonic-Systems/process-compose-flake) module (based on [flake-parts](https://flake.parts)). It enables users to have NixOS-like services on MacOS and Linux.

It builds on top of the [process-compose-flake](https://community.flake.parts/process-compose-flake) module which allows running arbitrary processes declared in Nix.

See:

- [[start]]#
- [[examples]]#
- [[services]]#
- [[contributing]]#
- [[guide]]#

## Demo

This is how running a service with `services-flake` looks like[^demo]:
:::{.max-w-2xl .h-auto .mx-auto .p-4}
![[demo.gif]]
:::

[^demo]: The commands used in the demo are available [[start]].

[gh]: https://github.com/juspay/services-flake


===

<!-- Source: services-flake/apache-kafka.md -->
<!-- URL: /services-flake/apache-kafka -->
<!-- Title: Apache Kafka -->
<!-- Wikilinks: [[services-flake/apache-kafka]], [[apache-kafka]] -->

# Apache Kafka

[Apache Kafka](https://kafka.apache.org/) is a distributed event streaming platform used by thousands of companies for high-performance data pipelines, streaming analytics, data integration, and mission-critical applications.

## Usage example

<https://github.com/juspay/services-flake/blob/main/nix/services/apache-kafka_test.nix>


===

<!-- Source: services-flake/azurite.md -->
<!-- URL: /services-flake/azurite -->
<!-- Title: Azurite -->
<!-- Wikilinks: [[services-flake/azurite]], [[azurite]] -->

# Azurite

[Azurite](https://github.com/Azure/Azurite) is an open-source emulator that provides a local environment for testing your Azure Blob, Queue Storage, and Table Storage applications.

## Getting Started

```nix
# In `perSystem.process-compose.<name>`
{
  services.azurite."instance-name" = {
    enable = true;
  };
}
```

===

<!-- Source: services-flake/cassandra.md -->
<!-- URL: /services-flake/cassandra -->
<!-- Title: Cassandra -->
<!-- Wikilinks: [[services-flake/cassandra]], [[cassandra]] -->

# Cassandra

[Cassandra] is a free and open-source, distributed, wide-column store, NoSQL database management system designed to handle large amounts of data across many commodity servers, providing high availability with no single point of failure.

[Cassandra]: https://cassandra.apache.org/_/index.html

## Getting Started

```nix
# In `perSystem.process-compose.<name>`
{
  services.cassandra."cass1".enable = true;
}
```

{#tips}
## Tips & Tricks

{#change-port}
### Change the default port

By default, the Cassandra server is started on port `9042`. To change the port, we can use the following config:

```nix
{
  services.cassandra."cass1" = {
    enable = true;
    nativeTransportPort = 9043;
  };
}
```


===

<!-- Source: services-flake/clickhouse.md -->
<!-- URL: /services-flake/clickhouse -->
<!-- Title: Clickhouse -->
<!-- Wikilinks: [[services-flake/clickhouse]], [[clickhouse]] -->

# Clickhouse

ClickHouse is an open-source column-oriented DBMS (columnar database management system) for online analytical processing (OLAP) that allows users to generate analytical reports using SQL queries in real-time.

## Getting Started

```nix
# In `perSystem.process-compose.<name>`
{
  services.clickhouse."clickhouse-1".enable = true;
}
```

{#tips}
## Tips & Tricks

{#change-port}
### Change the HTTP default port

Clickhouse has [HTTP Interface](https://clickhouse.com/docs/en/interfaces/http) that is enabled by default on port 8123. To change the default port, use the `extraConfig` option:

```nix
{
  services.clickhouse."clickhouse-1" = {
    enable = true;
    extraConfig = {
      http_port = 9050
    };
  };
}
```

{#initial-database}
### Initial database schema

To load a database schema, you can use the `initialDatabases` option:

```nix
{
  services.clickhouse."clickhouse-1" = {
    enable = true;
    initialDatabases = [
      {
        name = "sample_db";
        schemas = [ ./test.sql ];
      }
      # or just create the database:
      {
        name = "sample_db_without_schema";
      }
    ];
  };
}
```


===

<!-- Source: services-flake/contributing.md -->
<!-- URL: /services-flake/contributing -->
<!-- Title: Contributing -->
<!-- Wikilinks: [[services-flake/contributing]], [[contributing]] -->

---
order: -9
---

# Contributing

{#devshell}
## Development Shell

A Nix dev shell is available, providing `nixpkgs-fmt` and `just`. To enter the dev shell, run:

```sh
nix develop ./dev
```

An `.envrc` is also provided, so it is recommended to use `direnv` to automatically enter the dev shell when you `cd` into the project directory. See [this tutorial](https://nixos.asia/en/direnv).

{#new-service}
## Adding a new service

The project repository is structure to make addition of new services easy. Here's how to add a new service:

> [!info]
> See <https://github.com/cachix/devenv/tree/main/src/modules/services> for inspiration.
>
> If you don't find a new service there, see <https://github.com/NixOS/nixpkgs/tree/master/nixos/modules/services>.

- Create a new file `./nix/services/<service-name>.nix` file (see [./nix/services/redis.nix](https://github.com/juspay/services-flake/blob/main/nix/services/redis.nix) for inspiration)
- Add the service to the list in [./nix/services/default.nix](https://github.com/juspay/services-flake/blob/main/nix/services/default.nix).
- Create a new test file `./nix/services/<service-name>_test.nix` (see [./nix/services/redis_test.nix](https://github.com/juspay/services-flake/blob/main/nix/services/redis_test.nix)).
- Add the test to [./test/flake.nix](https://github.com/juspay/services-flake/blob/main/test/flake.nix).

{#run-service}
### Run the service

```sh
just run <service-name>
```

{#run-tests}
### Run the tests for the service

The previous command will run the services but not the tests. To run the tests, use:

```sh
just test <service-name>
```

or test all services:

```sh
just test-all
```

{#service-doc}
### Add documentation for the new service

It is important to add documentation along with any new services you are contributing. Create a new file `./doc/<service-name>.md` (see [[clickhouse]] for example) and add the service to the list in [[services]].

> [!note]
> It is recommended to add documentation for non-trivial tasks. For example, grafana documentation mentions [how to change the default database backend](https://community.flake.parts/services-flake/grafana#change-database).



{#docs}
## Documentation

For contributing to docs, see <https://github.com/flake-parts/community.flake.parts#guidelines-for-writing-docs>

We use [emanote](https://emanote.srid.ca/) to render our documentation. The source files are in the `doc` directory. To run the docs, use:

```sh
just doc # Or, `cd doc && nix run`
```


===

<!-- Source: services-flake/custom-service.md -->
<!-- URL: /services-flake/custom-service -->
<!-- Title: Custom service -->
<!-- Wikilinks: [[services-flake/custom-service]], [[custom-service]] -->

---
page:
  image: multi-instance-hello.png
---

# Custom service

When using `services-flake` you are not just limited to the [[services|builtin services]]. You can also define your own service.

By default, `services-flake` supports multiple instances for each service, allowing you to run several instances of the same service simultaneously. However, you also have the option to create custom single-instance services. In the following sections, we’ll explore how to define custom services of both types.

{#single-instance}
## Single instance service

We will create a `hello` service that will return a greeting message:

```nix
{ config, lib, pkgs, ... }:
{
  options = {
    services.hello = {
      enable = lib.mkEnableOption "Enable hello service";
      package = lib.mkPackageOption pkgs "hello" { };
      message = lib.mkOption {
        type = lib.types.str;
        default = "Hello, world!";
        description = "The message to be displayed";
      };
    };
  };
  config =
    let
      cfg = config.services.hello;
    in
    lib.mkIf cfg.enable {
      settings.processes.hello = {
        command = "${lib.getExe cfg.package} --greeting='${cfg.message}'";
      };
    };
}
```

Let's call this file `hello.nix`.

Now, we can import this service in our flake. In this example, we will configure an existing service, [[ollama]], and our custom service from above:

```nix
{
  description = "A demo of importing a single instance custom service";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    systems.url = "github:nix-systems/default";
    process-compose-flake.url = "github:Platonic-Systems/process-compose-flake";
    services-flake.url = "github:juspay/services-flake";
  };
  outputs = inputs:
    inputs.flake-parts.lib.mkFlake { inherit inputs; } {
      systems = import inputs.systems;
      imports = [
        inputs.process-compose-flake.flakeModule
      ];
      perSystem = { self', pkgs, lib, ... }: {
        process-compose."default" = { config, ... }: {
          imports = [
            inputs.services-flake.processComposeModules.default
            ./hello.nix
          ];

          services.ollama."ollama1".enable = true;
          services.hello.enable = true;
        };
      };
    };
}
```

Finally, `nix run`:
![[single-instance-hello.png]]

{#multi-instance}
## Multi-instance service

For this purpose, `services-flake` exports a [multiService](https://github.com/juspay/services-flake/blob/647bff2c44b42529461f60a7fe07851ff93fb600/nix/lib.nix#L1-L34) library function. It aims to provide an interface wherein the user just writes the configuration like they would for a single instance service, and the library takes care of creating multiple instances of the service.

Let's write the same `hello` service as above, in `hello.nix`, but this time as a multi-instance service:

```nix
{ config, lib, name, pkgs, ... }:
{
  options = {
    package = lib.mkPackageOption pkgs "hello" { };
    message = lib.mkOption {
      type = lib.types.str;
      default = "Hello, world!";
      description = "The message to be displayed";
    };
  };
  config = {
    outputs.settings = {
      processes.${name} = {
        command = "${lib.getExe config.package} --greeting='${config.message}'";
      };
    };
  };
}
```

The primary differences from the single instance service are:

- The module now takes an additional argument `name`, which is the name of the instance of the service.
- We no longer have to write the `config` block, as it is now handled by the library by importing the `outputs.settings` option.
- And we don't have to write `options.services."${name}"` or define `enable` and `dataDir` options, as that is abstracted away by the library.

Now that we have defined the multi-instance service, we can import it in our flake:

```nix
{
  description = "A demo of importing a multi-instance custom service";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    systems.url = "github:nix-systems/default";
    process-compose-flake.url = "github:Platonic-Systems/process-compose-flake";
    services-flake.url = "github:juspay/services-flake";
  };
  outputs = inputs:
    inputs.flake-parts.lib.mkFlake { inherit inputs; } {
      systems = import inputs.systems;
      imports = [
        inputs.process-compose-flake.flakeModule
      ];
      perSystem = { self', pkgs, lib, ... }: {
        process-compose."default" = 
        let
          inherit (inputs.services-flake.lib) multiService;
        in
        {
          imports = [
            inputs.services-flake.processComposeModules.default
            (multiService ./hello.nix)
          ];

          services.ollama."ollama1".enable = true;
          services.hello = {
            hello1 = {
              enable = true;
              message = "Hello, world!";
            };
            hello2 = {
              enable = true;
              message = "Hello, Nix!";
            };
          };
        };
      };
    };
}
```

And finally, `nix run`:
![[multi-instance-hello.png]]

## See also

- [Postgres with replica](https://github.com/nammayatri/nammayatri/blob/main/Backend/nix/services/postgres-with-replica.nix)
- [Passetto (A custom encryption service)](https://github.com/nammayatri/passetto/blob/nixify/process-compose.nix), is [imported](https://github.com/nammayatri/nammayatri/blob/e8032f1fac3581b9062e2469dfc778d2913d3665/Backend/nix/services/nammayatri.nix#L32) and [configured in the Nammayatri flake](https://github.com/nammayatri/nammayatri/blob/e8032f1fac3581b9062e2469dfc778d2913d3665/Backend/nix/services/nammayatri.nix#L285-L297).


===

<!-- Source: services-flake/datadir.md -->
<!-- URL: /services-flake/datadir -->
<!-- Title: Data directory -->
<!-- Wikilinks: [[services-flake/datadir]], [[datadir]] -->

# Data directory

`dataDir` is a an option present in all the services, allowing users to specify the directory where a given service will store its data files. Essentially, it is to persist the state of the service even when you exit the `process-compose` window.

The `dataDir` of these services tend to take *relative* paths, which are usually relative to the project root. As such, when you run these services using `nix run`, their data files are created relative to whichever directory you are in. If you want these data files to always reside relative to the project directory, instead of using `nix run` consider wrapping the process-compose packages in script, via either [mission-control](https://community.flake.parts/mission-control) module or a [justfile](https://just.systems/). `services-flake` uses the latter.

{#default-structure}
## Default data directory structure

Let's say your project defines the following services:

```nix
{
    # Inside `perSystem.process-compose.<name>`
    services.postgres.pg.enable = true;
    services.redis.rd.enable = true;
}
```

The data directory structure will look like this:

```sh
|-- data
|   |-- pg
|   |-- rd
```

## Reset state

`dataDir` of a service is where the service persists its state. Resetting the state will not only give the service a fresh start but in some cases, like [[clickhouse]] or other database services, it loads the updated schema/database-init-scripts. To reset the state of an instance of a service, `x`, where `x` is declared in your configuration like `services.<name>.x`, follow:
- Close the `process-compose` process
- `rm -rf $PWD/data/x`
- Start the `process-compose` process

## Gotchas

{#socket-path}
### Unix-domain socket path is too long

Some services create unix domain socket files under the data directory. As the unix socket length is limited to [about 100 chars](https://linux.die.net/man/7/unix), if your data directory is nested too deep, you will have to set `dataDir` option of the service to a shorter path as a workaround.


===

<!-- Source: services-flake/devshell.md -->
<!-- URL: /services-flake/devshell -->
<!-- Title: DevShell -->
<!-- Wikilinks: [[services-flake/devshell]], [[devshell]] -->

# DevShell

`services-flake` uses [mkShell](https://nixos.org/manual/nixpkgs/stable/#sec-pkgs-mkShell) function to provide a shell with packages of all the enabled services.

```nix
# Inside `perSystem`
{
  process-compose."my-pc" = { ... };
  devShells.default = pkgs.mkShell {
    inputsFrom = [
      config.process-compose."my-pc".services.outputs.devShell;
    ];
    # ...
  };
}
```



===

<!-- Source: services-flake/elasticsearch.md -->
<!-- URL: /services-flake/elasticsearch -->
<!-- Title: Elasticsearch -->
<!-- Wikilinks: [[services-flake/elasticsearch]], [[elasticsearch]] -->

# Elasticsearch

[Elasticsearch](https://www.elastic.co/elasticsearch/) is a distributed, RESTful search and analytics engine capable of performing real-time search and analytics.

## Usage example

<https://github.com/juspay/services-flake/blob/main/nix/services/elasticsearch_test.nix>


===

<!-- Source: services-flake/examples.md -->
<!-- URL: /services-flake/examples -->
<!-- Title: Examples -->
<!-- Wikilinks: [[services-flake/examples]], [[examples]] -->

# Examples

- [[share-services]]#
- [[llm]]#
- [[without-flake-parts]]#



===

<!-- Source: services-flake/grafana.md -->
<!-- URL: /services-flake/grafana -->
<!-- Title: Grafana -->
<!-- Wikilinks: [[services-flake/grafana]], [[grafana]] -->

# Grafana

[Grafana open source](https://grafana.com/docs/grafana/latest/) is open source visualization and analytics software. It allows you to query, visualize, alert on, and explore your metrics, logs, and traces no matter where they are stored. It provides you with tools to turn your time-series database (TSDB) data into insightful graphs and visualizations.

## Getting Started

```nix
# In `perSystem.process-compose.<name>`
{
  services.grafana."gf1".enable = true;
}
```

{#tips}
## Tips & Tricks

{#change-database}
### Changing Grafana database

By default, Grafana stores data in the `sqlite3` [database](https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/#database). It also supports `mysql` and `postgres`.

To change the database to `postgres`, we can use the following config:

```nix
{
  services.postgres.pg1 = {
    enable = true;
    listen_addresses = "127.0.0.1";
    initialScript.after = "CREATE USER root SUPERUSER;";
  };
  services.grafana.gf1 = {
    enable = true;
    extraConf.database = with config.services.postgres.pg1; {
      type = "postgres";
      host = "${listen_addresses}:${builtins.toString port}";
      name = "postgres"; # database name
    };
  };
  settings.processes."gf1".depends_on."pg1".condition = "process_healthy";
  };
}
```


===

<!-- Source: services-flake/guide.md -->
<!-- URL: /services-flake/guide -->
<!-- Title: Guide -->
<!-- Wikilinks: [[services-flake/guide]], [[guide]] -->


# Guide

- [[datadir]]#
- [[devshell]]#
- [[custom-service]]#


===

<!-- Source: services-flake/llm.md -->
<!-- URL: /services-flake/llm -->
<!-- Title: Local AI chatbot -->
<!-- Wikilinks: [[services-flake/llm]], [[llm]] -->

---
page:
  image: llm.png
template:
  toc:
    enable: false
---

# Local AI chatbot

The [`llm` example][source] allows you to run advanced AI chatbots and services on your own computer with just one command. Once you've downloaded the model, you can use it without needing a constant internet connection.

![[llm.png]]

> [!tip] On dev vs app mode
>
> **services-flake** provides two main uses:
> 
> 1. Running services in development projects with source code access.
> 1. Creating end-user *apps* that run multiple services.
> 
> Our example is based on the second use. These *apps* can be launched with `nix run` or installed using `nix profile install`.

{#run}
## Running the app

To run the local AI chatbot and launch the Web UI,

```sh
# You can also use `nix profile install` on this URL, and run `services-flake-llm`
nix run "github:juspay/services-flake?dir=example/llm"
```

Before launching the Web UI, this will download the [`phi3`] model, which is about 2.4GB. To reduce or avoid this delay, you can:

1.  Choose a different model, or
2.  Use no model at all

See further below for more options.

### Demo

<center>
<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="en" dir="ltr">Want to run your own AI chatbot (like ChatGPT) locally? You can do that with Nix.<br><br>Powered by services-flake (<a href="https://twitter.com/hashtag/NixOS?src=hash&amp;ref_src=twsrc%5Etfw">#NixOS</a>), using <a href="https://twitter.com/OpenWebUI?ref_src=twsrc%5Etfw">@OpenWebUI</a> and <a href="https://twitter.com/ollama?ref_src=twsrc%5Etfw">@ollama</a>. <br><br>See example: <a href="https://t.co/dyItC93Pya">https://t.co/dyItC93Pya</a> <a href="https://t.co/DeDow8bEPw">pic.twitter.com/DeDow8bEPw</a></p>&mdash; NixOS Asia (@nixos_asia) <a href="https://twitter.com/nixos_asia/status/1803065244568244578?ref_src=twsrc%5Etfw">June 18, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</center>

{#default-config}
## Default configuration & models

The [example][source] runs two processes [[ollama]] and [[open-webui]]

Key points:

1.  **Data storage:**
    -   Ollama data is stored in `$HOME/.services-flake/llm/ollama`
    -   To change this location, edit the `dataDir` option in `flake.nix`
2.  **Model management**:
    -   By default, the [`phi3`] model is automatically downloaded
    -   To change or add [more models](https://ollama.com/library): a. Edit the `models` option in `flake.nix`, or b. Use the open-webui interface to download additional models.

[`phi3`]: https://ollama.com/library/phi3
[source]: https://github.com/juspay/services-flake/tree/main/example/llm


===

<!-- Source: services-flake/memcached.md -->
<!-- URL: /services-flake/memcached -->
<!-- Title: Memcached -->
<!-- Wikilinks: [[services-flake/memcached]], [[memcached]] -->

# Memcached

[memcached](https://www.memcached.org/) is a high-performance, distributed memory object caching system, generic in nature, but originally intended for use in speeding up dynamic web applications by alleviating database load.

You can think of it as a short-term memory for your applications.

## Usage example

<https://github.com/juspay/services-flake/blob/main/nix/services/memcached_test.nix>


===

<!-- Source: services-flake/minio.md -->
<!-- URL: /services-flake/minio -->
<!-- Title: MinIO -->
<!-- Wikilinks: [[services-flake/minio]], [[minio]] -->

# MinIO

[MinIO](https://min.io/) is an open-source object storage system that is compatible with the Amazon S3 API. It is capable of working with unstructured data such as photos, videos, log files, backups, and container images.

## Usage example

<https://github.com/juspay/services-flake/blob/main/nix/services/minio_test.nix>

===

<!-- Source: services-flake/mongodb.md -->
<!-- URL: /services-flake/mongodb -->
<!-- Title: MongoDB -->
<!-- Wikilinks: [[services-flake/mongodb]], [[mongodb]] -->

# MongoDB

[MongoDB](https://www.mongodb.com/) is a popular document database that is available. It comes in a variety of flavors, but the version packaged by NixPkgs is generally the community edition.

Because of the licensing of MongoDB, the Nixpkgs derivation that provides the binaries of this database are generally not built and cached by the public nixpkgs cache. Because of this, the initial launch time can be very slow, the first time you use this service locally. On a laptop this time ran to about 3 hours for the initial compile. After the initial build, the start up should be very fast, as with other services, provided you do not update your flake.lock.

If you are using this for your own development, you should either put in place a [local binary cache](https://nixos.wiki/wiki/Binary_Cache) to match your flake, or be aware that the first time you spin up the service it could possibly take a long time to build.

## Pre-built binaries

[mongodb-ce](https://github.com/NixOS/nixpkgs/blob/e58a261efb95afd52fb4a1cf35185a017327a96d/pkgs/by-name/mo/mongodb-ce/package.nix) package from [nixpkgs](https://github.com/NixOS/nixpkgs) fetches pre-built binaries[^why-pre-built]. You can also build the binary from scratch using [mongodb](https://github.com/NixOS/nixpkgs/blob/924e8aa12419c6ac57690ed47c1d9af580c818a2/pkgs/servers/nosql/mongodb/mongodb.nix) package:

```nix
# Inside `process-compose.<name>`
{
  services.mongodb."m1" = {
    enable = true;
    package = pkgs.mongodb;
  };
}
```

[why-pre-built]: For more context on why pre-built binary is used, see: https://github.com/juspay/services-flake/pull/360

## Usage example

<https://github.com/juspay/services-flake/blob/main/nix/services/mongodb_test.nix>


===

<!-- Source: services-flake/mysql.md -->
<!-- URL: /services-flake/mysql -->
<!-- Title: MySQL -->
<!-- Wikilinks: [[services-flake/mysql]], [[mysql]] -->

# MySQL

[MySQL](https://github.com/mysql/mysql-server) is a popular open-source relational database management system (RDBMS).

{#start}

## Getting started

```nix
# In `perSystem.process-compose.<name>`
{
  services.mysql."mysql1".enable = true;
}
```

{#tips}

## Tips & Tricks

{#port}

### Use a different port

```nix
{
  services.mysql."mysql1" = {
    enable = true;
    settings.mysqld.port = 3307;
  };
}
```

{#schema}

### Multiple `.sql` files for schema

The `schema` can be a path to a single `.sql` file or a directory containing multiple `.sql` files.

```nix
{
  services.mysql."mysql1" = {
    enable = true;
    initialDatabases = [{ name = "test_database"; schema = ./test_schemas; }];
  };
}
```


===

<!-- Source: services-flake/nats-server.md -->
<!-- URL: /services-flake/nats-server -->
<!-- Title: nats-server -->
<!-- Wikilinks: [[services-flake/nats-server]], [[nats-server]] -->

# nats-server

[NATS](https://nats.io) is a simple, secure and performant communications system for digital systems, services and devices.

## Usage example

<https://github.com/juspay/services-flake/blob/main/nix/services/nats-server_test.nix>


===

<!-- Source: services-flake/nginx.md -->
<!-- URL: /services-flake/nginx -->
<!-- Title: Nginx -->
<!-- Wikilinks: [[services-flake/nginx]], [[nginx]] -->

# Nginx

[Nginx](https://nginx.org/en/) is a web server that can be used to serve static files and as a reverse proxy.

## Usage example

<https://github.com/juspay/services-flake/blob/main/nix/services/nginx/nginx_test.nix>


===

<!-- Source: services-flake/ollama.md -->
<!-- URL: /services-flake/ollama -->
<!-- Title: Ollama -->
<!-- Wikilinks: [[services-flake/ollama]], [[ollama]] -->

# Ollama

[Ollama](https://github.com/ollama/ollama) enables you to easily run large language models (LLMs) locally. It supports Llama 3, Mistral, Gemma and [many others](https://ollama.com/library).

<center>
<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="en" dir="ltr">❄️You can now perform LLM inference with Ollama in services-flake!<a href="https://t.co/rtHIYdnPfb">https://t.co/rtHIYdnPfb</a> <a href="https://t.co/1hBqMyViEm">pic.twitter.com/1hBqMyViEm</a></p>&mdash; NixOS Asia (@nixos_asia) <a href="https://twitter.com/nixos_asia/status/1800855562072322052?ref_src=twsrc%5Etfw">June 12, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</center>

## Getting Started

```nix
# In `perSystem.process-compose.<name>`
{
  services.ollama."ollama1".enable = true;
}
```

## Acceleration

By default Ollama uses the CPU for inference. To enable GPU acceleration:

> [!note]
> NixOS provides documentation for configuring both [Nvidia](https://nixos.wiki/wiki/Nvidia) and [AMD GPUs](https://nixos.wiki/wiki/AMD_GPU) drivers. However, if you are using any other distribution, refer to their respective documentation.

### CUDA

For NVIDIA GPUs.

Firstly, allow unfree packages:

```nix
# Inside perSystem = { system, ... }: { ...
{
  imports = [
    "${inputs.nixpkgs}/nixos/modules/misc/nixpkgs.nix"
  ];
  nixpkgs = {
    hostPlatform = system;
    # Required for CUDA
    config.allowUnfree = true;
  };
}
```

And then enable CUDA acceleration:

```nix
# In `perSystem.process-compose.<name>`
{
  services.ollama."ollama1" = {
    enable = true;
    acceleration = "cuda";
  };
}
```

### ROCm

For Radeon GPUs.

```nix
# In `perSystem.process-compose.<name>`
{
  services.ollama."ollama1" = {
    enable = true;
    acceleration = "rocm";
  };
}
```


===

<!-- Source: services-flake/open-webui.md -->
<!-- URL: /services-flake/open-webui -->
<!-- Title: Open WebUI -->
<!-- Wikilinks: [[services-flake/open-webui]], [[open-webui]] -->

# Open WebUI

[Open WebUI](https://github.com/open-webui/open-webui) is a user-friendly WebUI for LLMs. It supports various LLM runners, including [[ollama]] and OpenAI-compatible APIs.

See the demo with [[ollama]] backend:
<center>
<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="en" dir="ltr">Want to run your own AI chatbot (like ChatGPT) locally? You can do that with Nix.<br><br>Powered by services-flake (<a href="https://twitter.com/hashtag/NixOS?src=hash&amp;ref_src=twsrc%5Etfw">#NixOS</a>), using <a href="https://twitter.com/OpenWebUI?ref_src=twsrc%5Etfw">@OpenWebUI</a> and <a href="https://twitter.com/ollama?ref_src=twsrc%5Etfw">@ollama</a>. <br><br>See example: <a href="https://t.co/dyItC93Pya">https://t.co/dyItC93Pya</a> <a href="https://t.co/DeDow8bEPw">pic.twitter.com/DeDow8bEPw</a></p>&mdash; NixOS Asia (@nixos_asia) <a href="https://twitter.com/nixos_asia/status/1803065244568244578?ref_src=twsrc%5Etfw">June 18, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</center>

{#start}
## Getting Started

```nix
# In `perSystem.process-compose.<name>`
{
  services.open-webui."open-webui1".enable = true;
}
```

## Examples

{#ollama}
### Open WebUI with ollama backend

```nix
{
  services = {
    # Backend service to perform inference on LLM models
    ollama."ollama1" = {
      enable = true;
      # The models are usually huge, downloading them in every project directory can lead to a lot of duplication
      dataDir = "$HOME/.services-flake/ollama1";
      models = [ "llama2-uncensored" ];
    };
    # Get ChatGPT like UI, but open-source, with Open WebUI
    open-webui."open-webui1" = {
      enable = true;
      environment =
        let
          inherit (pc.config.services.ollama.ollama1) host port;
        in
        {
          OLLAMA_API_BASE_URL = "http://${host}:${toString port}";
          WEBUI_AUTH = "False";
        };
    };
  };
  # Start the Open WebUI service after the Ollama service has finished initializing and loading the models
  settings.processes.open-webui1.depends_on.ollama1-models.condition = "process_completed_successfully";
}
```

See [[ollama]] for more customisation of the backend.

{#browser}
## Open browser on startup

```nix
{
  services.open-webui."open-webui1".enable = true;
  # Open the browser after the Open WebUI service has started
  settings.processes.open-browser = {
    command =
      let
        inherit (pc.config.services.open-webui.open-webui1) host port;
        opener = if pkgs.stdenv.isDarwin then "open" else lib.getExe' pkgs.xdg-utils "xdg-open";
        url = "http://${host}:${toString port}";
      in
      "${opener} ${url}";
    depends_on.open-webui1.condition = "process_healthy";
  };
}
```


===

<!-- Source: services-flake/pgadmin.md -->
<!-- URL: /services-flake/pgadmin -->
<!-- Title: pgAdmin -->
<!-- Wikilinks: [[services-flake/pgadmin]], [[pgadmin]] -->

# pgAdmin

[pgAdmin] is a feature rich Open Source administration and development platform for #[[postgresql]].

[pgAdmin]: https://www.pgadmin.org/

## Getting Started

```nix
# In `perSystem.process-compose.<name>`
{
  services.pgadmin."pgad1" = {
    enable = true;
    initialEmail = "email@gmail.com";
    initialPassword = "password";
  };
}
```

## Guide

### Visualize system statistics

`pgAdmin` uses the functions exposed by [system_stats](https://github.com/EnterpriseDB/system_stats) [[postgresql]] extension to monitor the system metrics such as CPU, memory and disk information. Use this in your config:

```nix
# In `perSystem.process-compose.<name>`
{
  services.postgres."pg1" = {
    enable = true;
    extensions = exts: [
      exts.system_stats
    ];
    # This creates the extensions for the `postgres` database, if you need it for a custom database,
    # ensure to add the below script in `schemas` of the database of your choice under `initialDatabses`.
    initialScript.before = ''
      CREATE EXTENSION system_stats;
    '';
  };
  services.pgadmin."pgad1" = {
    enable = true;
    initialEmail = "email@gmail.com";
    initialPassword = "password";
  };
}
```

Open the pgAdmin dashboard, establish a connection with your database and you will see:
![[pgadmin-system-stats.png]]


===

<!-- Source: services-flake/phpfpm.md -->
<!-- URL: /services-flake/phpfpm -->
<!-- Title: PHP FastCGI Process Manager -->
<!-- Wikilinks: [[services-flake/phpfpm]], [[phpfpm]] -->

# PHP FastCGI Process Manager

[PHP FPM](https://www.php.net/manual/en/book.fpm.php) (FastCGI Process Manager) is a primary PHP FastCGI implementation containing some features (mostly) useful for heavy-loaded sites.

## Unix socket

PHP FPM supports the usage of [Unix socket](https://man7.org/linux/man-pages/man2/socket.2.html) to listen to connections. By default, the socket `phpfpm.sock` will be used.

```nix
# Inside `process-compose.<name>`
{
  services.phpfpm."php1" = {
    enable = true;
    extraConfig = {
      "pm" = "ondemand";
      "pm.max_children" = 1;
    };
  };
}
```

## TCP port

```nix
# Inside `process-compose.<name>`
{
  services.phpfpm."php1" = {
    enable = true;
    listen = 9000;
    extraConfig = {
      "pm" = "ondemand";
      "pm.max_children" = 1;
    };
  };
}
```

## Usage example

<https://github.com/juspay/services-flake/blob/main/nix/services/phpfpm_test.nix>


===

<!-- Source: services-flake/plantuml.md -->
<!-- URL: /services-flake/plantuml -->
<!-- Title: Plantuml -->
<!-- Wikilinks: [[services-flake/plantuml]], [[plantuml]] -->

# Plantuml

[Plantuml](https://plantuml.com/) is a tool that allows users to create diagrams from plain text descriptions. It supports various diagram types, including sequence diagrams, use case diagrams, class diagrams, activity diagrams, component diagrams, state diagrams, and more.

## Getting Started

```nix
# In `perSystem.process-compose.<name>`
{
  services.plantuml."instance-name" = {
    enable = true;
    port = 1234;
    host = "127.0.0.1";
  };
}
```


===

<!-- Source: services-flake/postgresql.md -->
<!-- URL: /services-flake/postgresql -->
<!-- Title: PostgreSQL -->
<!-- Wikilinks: [[services-flake/postgresql]], [[postgresql]] -->

# PostgreSQL

[PostgreSQL](https://www.postgresql.org/) is a powerful, open source object-relational database system with over 35 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.

## Getting Started

```nix
# In `perSystem.process-compose.<name>`
{
  services.postgres."pg1".enable = true;
}
```

## Examples

- Run postgres server initialised with a sample database and graphically interact with it using [pgweb](https://github.com/sosedoff/pgweb): <https://github.com/juspay/services-flake/tree/main/example/simple>

## Guide

{#init}
### Creating users & tables

Assuming your initial schema is defined in `./scripts/db.sql`:

```nix
# In `perSystem.process-compose.<name>`
{
  services.postgres."pg1" = {
    enable = true;
    initialScript.before = ''
      CREATE USER myuser WITH password 'mypasswd';
    '';
    initialDatabases = [
      {
        name = "mydb";
        schemas = [ ./scripts/db.sql ];
      }
    ];
  };
}
```

## Gotchas

{#socket-path}
### Unix-domain socket path is too long

> [!warning]
> Only relevant if `socketDir` is set. If not, postgres uses TCP/IP by default.

We already talk about this in the [data directory guide](datadir.md#socket-path). In case of postgres, you can set `socketDir` while keeping the `dataDir` unchanged.

>[!note]
> The `socketDir` must be set to a shorter path (less than 100 chars) as a workaround.

```nix
{
  services.postgres."pg1" = {
    enable = true;
    socketDir = "/tmp/pg1";
  };
}
```


===

<!-- Source: services-flake/prometheus.md -->
<!-- URL: /services-flake/prometheus -->
<!-- Title: Prometheus -->
<!-- Wikilinks: [[services-flake/prometheus]], [[prometheus]] -->

# Prometheus

[Prometheus] is a systems and service monitoring system. It collects metrics from configured targets at given intervals, evaluates rule expressions, displays the results, and can trigger alerts when specified conditions are observed.

[Prometheus]: https://github.com/prometheus/prometheus

## Getting Started

```nix
# In `perSystem.process-compose.<name>`
{
  services.prometheus."pro1".enable = true;
}
```

{#tips}
## Tips & Tricks

{#scrape-configs}
### Adding Scrape Configs

`scrape_configs` controls what resources Prometheus monitors.

Since Prometheus also exposes data about itself as an HTTP endpoint it can scrape and monitor its own health. In the [default example configuration](https://github.com/prometheus/prometheus/blob/3f686cad8bee405229b2532584ef181ce9f6a8b3/documentation/examples/prometheus.yml) there is a single job, called prometheus. We can add it to `scrape_configs` using the following config:

```nix
{
  services.prometheus."pro1" = {
    enable = true;
    # scrape prometheus
    extraConfig = {
      scrape_configs = [{
        job_name = "prometheus";
        static_configs = [{
          targets = [ "localhost:9090" ];
        }];
      }];
    };
  };
}
```


===

<!-- Source: services-flake/pubsub-emulator.md -->
<!-- URL: /services-flake/pubsub-emulator -->
<!-- Title: Pubsub Emulator -->
<!-- Wikilinks: [[services-flake/pubsub-emulator]], [[pubsub-emulator]] -->


# Pubsub Emulator

[Pubsub Emulator](https://cloud.google.com/pubsub/docs/emulator#using_the_emulator) is an emulator for googles pubsub which is a fully-managed real-time messaging service that allows you to send and receive messages between independent applications

## Usage example

<https://github.com/juspay/services-flake/blob/main/nix/services/pubsub-emulator_test.nix>


===

<!-- Source: services-flake/redis-cluster.md -->
<!-- URL: /services-flake/redis-cluster -->
<!-- Title: Redis Cluster -->
<!-- Wikilinks: [[services-flake/redis-cluster]], [[redis-cluster]] -->

# Redis Cluster

Cluster of #[[redis]] nodes.

## Usage example

<https://github.com/juspay/services-flake/blob/main/nix/services/redis-cluster_test.nix>


===

<!-- Source: services-flake/redis.md -->
<!-- URL: /services-flake/redis -->
<!-- Title: Redis -->
<!-- Wikilinks: [[services-flake/redis]], [[redis]] -->

# Redis

[Redis](https://redis.io/) is an in-memory data structure store used as a database, cache, and message broker.

## Unix socket

Redis supports the usage of [Unix socket](https://man7.org/linux/man-pages/man2/socket.2.html) to listen to connections. By default, Redis listens to connections over TCP on port `6379`. When using Unix socket, you can decide to either enable listening on both or disable listening on TCP by setting port to `0` (recommended).

```nix
# Inside `process-compose.<name>`
{
  services.redis."r1" = {
    enable = true;
    port = 0;
    # relative paths are relative to the data directory, which is `$PWD/data/r1` by default
    unixSocket = "./redis.sock";
  };
}
```
## Usage example

<https://github.com/juspay/services-flake/blob/main/nix/services/redis_test.nix>


===

<!-- Source: services-flake/searxng.md -->
<!-- URL: /services-flake/searxng -->
<!-- Title: Searxng -->
<!-- Wikilinks: [[services-flake/searxng]], [[searxng]] -->

# Searxng

[Searxng](https://github.com/searxng/searxng) is a free internet metasearch engine which aggregates results from various search services and databases. Users are neither tracked nor profiled.

## Getting Started

```nix
# In `perSystem.process-compose.<name>`
{
  services.searxng."instance-name" = {
    enable = true;
    port = 1234;
    host = "127.0.0.1";
    secret_key = "my-secret-key";
    settings = {
      doi_resolvers."dummy" = "http://example.org";
      default_doi_resolver = "dummy";
    };
  };
}
```


===

<!-- Source: services-flake/services.md -->
<!-- URL: /services-flake/services -->
<!-- Title: Supported services -->
<!-- Wikilinks: [[services-flake/services]], [[services]] -->

---
short-title: Services
---

# Supported services

- [[apache-kafka]]#
- [[azurite]]#
- [[cassandra]]#
- [[clickhouse]]#
- [[elasticsearch]]#
- [[grafana]]#
  - [[tempo]]
- [[memcached]]#
- [[minio]]#
- [[mongodb]]#
- [[mysql]]#
- [[nats-server]]#
- [[nginx]]#
- [[ollama]]#
- [[open-webui]]#
- [[phpfpm]]#
- [[plantuml]]#
- [[postgresql]]#
  - [[pgadmin]]
- [[prometheus]]#
- [[pubsub-emulator]]#
- [[redis]]#
  - [[redis-cluster]]
- [[searxng]]#
- [[tika]]#
- [[weaviate]]#
- [[zookeeper]]#


===

<!-- Source: services-flake/share-services.md -->
<!-- URL: /services-flake/share-services -->
<!-- Title: Share services -->
<!-- Wikilinks: [[services-flake/share-services]], [[share-services]] -->

# Share services

Let's say you have two projects: `foo` and `bar`. `foo` defines a service that needs to be used by `bar`. Both `foo` and `bar`, being separate projects, have their own `flake.nix`. In order for `bar` to reuse `foo` service instead of redefining it, `foo` can export `processComposeModules` in its flake `outputs`. `processComposeModules` is not a reserved output; it can be named anything, but the naming is appropriate for this scenario.

Next, we will see basic `flake.nix` for `foo` and `bar`. You can find a more real-world example at <https://github.com/juspay/services-flake/tree/main/example/share-services>.

## foo (Exports its service)

```nix
# foo/flake.nix
{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    process-compose-flake.url = "github:Platonic-Systems/process-compose-flake";
    services-flake.url = "github:juspay/services-flake";
  };
  outputs = inputs:
    inputs.flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [ "x86_64-linux" "aarch64-darwin" ];
      imports = [
        inputs.process-compose-flake.flakeModule
      ];
      flake.processComposeModules.default = ./services.nix;
      perSystem = { pkgs, lib, ... }: {
        process-compose."default" = {
          imports = [
            inputs.services-flake.processComposeModules.default
            inputs.self.processComposeModules.default
          ];
        };
      };
    };
}
```

[[custom-service]] exported by `foo` as `processComposeModules.default`:

```nix
# foo/services.nix
{ pkgs, lib, ... }: {
    options = {
    services.foo = {
      enable = lib.mkEnableOption "Enable foo service";
      package = lib.mkPackageOption pkgs "foo" { };
    };
  };
  config = let cfg = config.services.foo; in
    lib.mkIf cfg.enable {
        settings.processes.foo = {
            command = "${lib.getExe cfg.foo}";
        };
    };
}
```

## bar (Imports foo service)

`bar` wants to reuse `foo`'s service.

```nix
# bar/flake.nix
{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
    process-compose-flake.url = "github:Platonic-Systems/process-compose-flake";
    services-flake.url = "github:juspay/services-flake";
    foo.url = "<foo-source>";
  };
  outputs = inputs:
    inputs.flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [ "x86_64-linux" "aarch64-darwin" ];
      imports = [
        inputs.process-compose-flake.flakeModule
      ];
      flake.processComposeModules.default = ./services.nix;
      perSystem = { pkgs, lib, ... }: {
        process-compose."default" = {
          imports = [
            inputs.services-flake.processComposeModules.default
            inputs.foo.processComposeModules.default
          ];
          services.foo.enable = true;
          
          # The rest of bar's services goes here...
        };
      };
    };
}

```


===

<!-- Source: services-flake/start.md -->
<!-- URL: /services-flake/start -->
<!-- Title: Getting started -->
<!-- Wikilinks: [[services-flake/start]], [[start]] -->

---
order: -10
---

# Getting started


## New project

Use the [template flake](https://github.com/juspay/services-flake/blob/main/example/simple/flake.nix) provided by `services-flake`:
```sh
mkdir example && cd ./example
nix flake init -t github:juspay/services-flake
nix run
```

## Existing project

services-flake uses [process-compose-flake](https://community.flake.parts/process-compose-flake) to manage the services. Let's first import the `flake-parts` modules provided by `process-compose-flake` and `services-flake` in your flake:

```nix
{
  # 1. Add the inputs
  inputs.process-compose-flake.url = "github:Platonic-Systems/process-compose-flake";
  inputs.services-flake.url = "github:juspay/services-flake";
  ...
  outputs = inputs:
    inputs.flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [
        # 2. Import the flake-module
        inputs.process-compose-flake.flakeModule
      ];
      perSystem = { ... }: {
        # 3. Create the process-compose configuration, importing services-flake
        process-compose."myservices" = {
          imports = [
            inputs.services-flake.processComposeModules.default
          ];
        };
      }
    };
}
```

As an example, let's add the `redis` service to your flake:

```nix
# Inside `perSystem.process-compose."myservices"`
{
  services.redis."r1".enable = true;
}
```

Time to run the service:

```sh
nix run .#myservices
```

## Under the hood

- The `services-flake` module configures [process settings](https://community.flake.parts/process-compose-flake#usage) for a service. In simple terms, it handles stuff like health checks, restart policies, setup scripts, etc. by using the easy to configure APIs provided by `process-compose-flake`.
- The `process-compose-flake` module uses these settings to generate `packages.${system}.myservices`[^how-default] (`nix run .#myservices` above, [runs](https://nixos.asia/en/nix-first#run) this package by default), which runs [process-compose](https://github.com/F1bonacc1/process-compose) with the generated YAML configuration[^sample-config].

[^how-default]: `myservices` is the name of the process group that is derived from `process-compose.<name>` in `perSystem.process-compose`.

[^sample-config]: See the example configuration from the [getting started](https://f1bonacc1.github.io/process-compose/intro/) section of the process-compose docs.

## Examples

- In [Nammayatri](https://github.com/nammayatri/nammayatri), services-flakes is used to run the local services stack (which used to be run with docker-compose). Read about it [in this blog post](https://nixos.asia/en/blog/replacing-docker-compose).


===

<!-- Source: services-flake/tempo.md -->
<!-- URL: /services-flake/tempo -->
<!-- Title: Grafana Tempo -->
<!-- Wikilinks: [[services-flake/tempo]], [[tempo]] -->

# Grafana Tempo

[Grafana Tempo](https://grafana.com/docs/tempo/latest/) is an open-source, easy-to-use, and high-scale distributed tracing backend. Tempo lets you search for traces, generate metrics from spans, and link your tracing data with logs and metrics.

## Getting Started

```nix
# In `perSystem.process-compose.<name>`
{
  services.tempo."tp1".enable = true;
}
```

{#tips}
## Tips & Tricks

{#usage-with-grafana}
### Usage with Grafana

To add tempo as a datasource to #[[grafana]], we can use the following config:

```nix
{
  services.tempo.tp1.enable = true;
  services.grafana.gf1 = {
    enable = true;
    datasources = with config.services.tempo.tp1; [{
      name = "Tempo";
      type = "tempo";
      access = "proxy";
      url = "http://${httpAddress}:${builtins.toString httpPort}";
    }];
  };
  settings.processes."gf1".depends_on."tp1".condition = "process_healthy";
}
```


===

<!-- Source: services-flake/tika.md -->
<!-- URL: /services-flake/tika -->
<!-- Title: Tika -->
<!-- Wikilinks: [[services-flake/tika]], [[tika]] -->

# Tika

[Tika](https://tika.apache.org/) is a content analysis toolkit as a service that can detect and extract metadata and
text from over a thousand different file types.

## Getting Started

```nix
# In `perSystem.process-compose.<name>`
{
  services.tika."instance-name" = {
    enable = true;
    port = 9998;
    host = "127.0.0.1";
  };
}
```


===

<!-- Source: services-flake/weaviate.md -->
<!-- URL: /services-flake/weaviate -->
<!-- Title: Weaviate -->
<!-- Wikilinks: [[services-flake/weaviate]], [[weaviate]] -->

# Weaviate

[Weaviate] is an open-source vector database that stores both objects and vectors, allowing for the combination of vector search with structured filtering with the fault tolerance and scalability of a cloud-native database.

[Weaviate]: https://github.com/weaviate/weaviate

{#start}

## Getting started

```nix
# In `perSystem.process-compose.<name>`
{
  services.weaviate."weaviate1".enable = true;
}
```

{#tips}

## Tips & Tricks

{#envs}

### Environment variables

To see list of environment variables, see [this link](https://weaviate.io/developers/weaviate/config-refs/env-vars).

```nix
{
  services.weaviate."weaviate1" = {
    enable = true;
    environment = {
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED = true;
      QUERY_DEFAULTS_LIMIT = 100;
      DISABLE_TELEMETRY = true;
      LIMIT_RESOURCES = true;
      ENABLE_MODULES = ["text2vec-openai" "generative-openai"];
    };
  };
}
```

{#port}

### Use a different port

```nix
{
  services.weaviate."weaviate1" = {
    enable = true;
    port = 8080;
  };
}
```

{#dataDir}

### Use a different data path

```nix
{
  services.weaviate."weaviate1" = {
    enable = true;
    dataDir = "./data";
  };
}
```


===

<!-- Source: services-flake/without-flake-parts.md -->
<!-- URL: /services-flake/without-flake-parts -->
<!-- Title: Services for flakes without flake-parts -->
<!-- Wikilinks: [[services-flake/without-flake-parts]], [[without-flake-parts]] -->

---
short-title: Without flake-parts
---

# Services for flakes without flake-parts

`process-compose-flake` provides the [`makeProcessCompose`](https://github.com/Platonic-Systems/process-compose-flake/blob/644a8a129f17d23df9e6cf58c9bb1097a0959ab1/nix/lib.nix#L48-L53) function, which accepts custom configurations and returns the [process-compose](https://github.com/F1bonacc1/process-compose) package.

For usage, refer to <https://github.com/juspay/services-flake/tree/main/example/without-flake-parts>.



===

<!-- Source: services-flake/zookeeper.md -->
<!-- URL: /services-flake/zookeeper -->
<!-- Title: Zookeeper -->
<!-- Wikilinks: [[services-flake/zookeeper]], [[zookeeper]] -->

# Zookeeper

[Zookeeper](https://zookeeper.apache.org/) is a centralized service for maintaining configuration information, naming, providing distributed synchronization, and providing group services.

## Usage example

<https://github.com/juspay/services-flake/blob/main/nix/services/zookeeper_test.nix>
