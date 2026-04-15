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
<!-- Title: haskell-flake -->
<!-- Wikilinks: [[haskell-flake]] -->

---
page:
  headHtml: |
    <meta http-equiv="refresh" content="0; url=https://haskell.nixos.asia/">
---

# haskell-flake

haskell-flake has moved to <https://haskell.nixos.asia/>.


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

- [haskell-flake](https://haskell.nixos.asia/)
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

### Default settings for all processes

You can define default settings that apply to all processes using `defaults.processSettings`. This is useful when you want to set common configuration like namespace, restart behavior, or other settings across all processes.

```nix
process-compose.watch-server = {
  defaults.processSettings = { name, ... }: {
    # Set default namespace for all processes
    namespace = lib.mkDefault "watch-server";
    # Set default restart behavior
    availability.restart = lib.mkDefault "on_failure";
    availability.max_restarts = lib.mkDefault 3;
    # Use the process name in log locations
    log_location = ".logs/${name}.log";
  };

  settings.processes = {
    backend-server.command = "...";
    frontend-server.command = "...";
    # This process overrides the default namespace
    proxy-server = {
      command = "...";
      namespace = "proxy"; # Overrides the default
    };
  };
};
```

**Important:** Use `lib.mkDefault` when setting defaults to ensure individual process settings can override them.

You can access the process `name` parameter to create dynamic defaults (e.g., per-process log files).

You can disable defaults entirely by setting `defaults.enable = false`.

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

<!-- Source: services-flake/chromadb.md -->
<!-- URL: /services-flake/chromadb -->
<!-- Title: ChromaDB -->
<!-- Wikilinks: [[services-flake/chromadb]], [[chromadb]] -->

# ChromaDB

[ChromaDB](https://github.com/chroma-core/chroma) is an AI-native open-source embedding database.

## Usage example

<https://github.com/juspay/services-flake/blob/main/nix/services/chromadb_test.nix>


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

## Packages of enabled services

`services-flake` uses [mkShell](https://nixos.org/manual/nixpkgs/stable/#sec-pkgs-mkShell) function to provide a shell with packages of all the enabled services.

```nix
# Inside `perSystem`
{
  process-compose."my-pc" = { ... };
  devShells.default = pkgs.mkShell {
    inputsFrom = [
      config.process-compose."my-pc".services.outputs.devShell
    ];
    # ...
  };
}
```

## process-compose app

Add the [process-compose](https://github.com/F1bonacc1/process-compose) app in the devShell environment and run the app with `my-pc` (example configuration below) instead of `nix run .#my-pc`.

This is useful when the process(es) assume the devShell environment. For example, see [here](https://github.com/nammayatri/nammayatri/blob/5321a1b9f74c9e27b6282c2c835fdd746c9e281a/Backend/nix/services/nammayatri.nix#L75), `cabal run` (instead of `nix run`) is used to start the Nammayatri process when `useCabal` option is `true`. Additionally, avoiding `nix run .#my-pc` on large monorepos saves on eval-time costs in dirty worktree.

> [!NOTE]
> Disallowing `nix run .#my-pc` in your flake requires <https://github.com/Platonic-Systems/process-compose-flake/issues/27>

```nix
{
  perSystem = { self', ... }: {
    process-compose."my-pc" = {
      # ...
    };

    devShells.default = pkgs.mkShell {
      packages = [
        self'.packages."my-pc"
      ];
      # ...
    };
  };
}
```


===

<!-- Source: services-flake/dynamodb-local.md -->
<!-- URL: /services-flake/dynamodb-local -->
<!-- Title: DynamoDB Local -->
<!-- Wikilinks: [[services-flake/dynamodb-local]], [[dynamodb-local]] -->

# DynamoDB Local

[DynamoDB Local](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html)
is a local version of AWS DynamoDB for testing and development without accessing the cloud.

## Usage example

<https://github.com/juspay/services-flake/blob/main/nix/services/dynamodb-local_test.nix>


===

<!-- Source: services-flake/elasticmq.md -->
<!-- URL: /services-flake/elasticmq -->
<!-- Title: ElasticMQ -->
<!-- Wikilinks: [[services-flake/elasticmq]], [[elasticmq]] -->

# ElasticMQ

[ElasticMQ](https://github.com/softwaremill/elasticmq) is a message queue system, offering an actor-based Scala and an SQS-compatible REST (query) interface.

## Usage example

<https://github.com/juspay/services-flake/blob/main/nix/services/elasticmq_test.nix>

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

<!-- Source: services-flake/loki.md -->
<!-- URL: /services-flake/loki -->
<!-- Title: Grafana Loki -->
<!-- Wikilinks: [[services-flake/loki]], [[loki]] -->

# Grafana Loki

[Grafana Loki](https://grafana.com/docs/loki/latest/) is a log aggregation system designed to store and query logs from all your applications and infrastructure.

## Getting Started

```nix
# In `perSystem.process-compose.<name>`
{
  services.loki."tp1".enable = true;
}
```

{#tips}
## Tips & Tricks

{#usage-with-grafana}
### Usage with Grafana

To add loki as a datasource to #[[grafana]], we can use the following config:

```nix
{
  services.loki.tp1.enable = true;
  services.grafana.gf1 = {
    enable = true;
    datasources = with config.services.loki.tp1; [{
      name = "Loki";
      type = "loki";
      access = "proxy";
      url = "http://${httpAddress}:${builtins.toString httpPort}";
    }];
  };
  settings.processes."gf1".depends_on."tp1".condition = "process_healthy";
}
```


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

<!-- Source: services-flake/neo4j.md -->
<!-- URL: /services-flake/neo4j -->
<!-- Title: Neo4j -->
<!-- Wikilinks: [[services-flake/neo4j]], [[neo4j]] -->

# Neo4j

[Neo4j](https://neo4j.com/) is a highly scalable, robust, native graph database.

Default credentials: `neo4j` / `neo4jadmin`

## Usage example

<https://github.com/juspay/services-flake/blob/main/nix/services/neo4j_test.nix>


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

<!-- Source: services-flake/qdrant.md -->
<!-- URL: /services-flake/qdrant -->
<!-- Title: Qdrant -->
<!-- Wikilinks: [[services-flake/qdrant]], [[qdrant]] -->

# Qdrant

[Qdrant](https://github.com/qdrant/qdrant) is a vector similarity search engine and database for AI applications.

## Usage example

<https://github.com/juspay/services-flake/blob/main/nix/services/qdrant_test.nix>


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
- [[chromadb]]#
- [[clickhouse]]#
- [[dynamodb-local]]#
- [[elasticmq]]#
- [[elasticsearch]]#
- [[grafana]]#
  - [[tempo]]
  - [[loki]]
- [[memcached]]#
- [[minio]]#
- [[mongodb]]#
- [[mysql]]#
- [[nats-server]]#
- [[neo4j]]#
- [[nginx]]#
- [[ollama]]#
- [[open-webui]]#
- [[phpfpm]]#
- [[plantuml]]#
- [[postgresql]]#
  - [[pgadmin]]
- [[prometheus]]#
- [[pubsub-emulator]]#
- [[qdrant]]#
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
