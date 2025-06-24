# ngl-setup

A simple CLI tool that reads a configuration file and executes commands specified within it.

## Features

- Reads commands from a user-defined config file JS.
- Executes commands in sequence.

## Installation

```sh
npm install -g ngl-setup
```

## Usage

```sh
ngl-setup init
```


## Config File Format

Example (`.ngl/setup.config.cjs`):

```JavaScript
module.exports = {
  startup:  [
    "npm i",
    "npm run build",
    "npx ngl-setup run startup"
  ]
};
```

## Options

| Option         | Description                      |
| -------------- | --------------------------------|
| `--help, -h`   | Show help message                |
| `--version, -v`| Show version number              |
