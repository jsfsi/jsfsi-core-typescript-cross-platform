# JSFSI Core Typescript Cross Platform

Typescript libraries cross platform for jsfsi developments

## Requirements

### Visual Studio Code latest

### NodeJS 12.11.1

#### NodeJS Installation

- MAC OS X

```sh
brew install node
sudo npm install -g n
sudo n 12.11.1
```

## Setup project

```sh
npm run setup
npm run build
```

## Build

```sh
npm run build
```

## Lint

```sh
npm run lint
```

## Add dependencies

```sh
# Development dependency
npm install --save-dev <package_name>
# Production dependency
npm install --save-dev <package_name>
```

## Include as a dependency in your project

```sh
npm install --save ssh://git@github.com:joaosousafranco/jsfsi-core-typescript-cross-platform.git
```

## Publish to npm

```sh
npm login
npm run build
git tag <semantic version>
npm publish --access public
```
