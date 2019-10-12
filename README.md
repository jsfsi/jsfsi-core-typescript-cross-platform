# Rest Service

Mono repo to be used as a system implementation bootstrap.
It contains the following technologies:

- eslint for typescript linting
- prettier to apply eslint rules automatically
- lerna for configuring the monorepo
- typescript as the preferable language for implementation. This doesn't mean other languages can not be used.
- nodejs for backend implementation
- reactjs for frontend implementation
- react-native for cross-platform mobile implementation

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
