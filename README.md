## Overview

Simplecoin Explorer for coins created by a SimplecoinFactory. 

## Usage (for Users)

You must have a locally running Ethereum node, or use Metamask.

## Installation (for Developers)

Requirements:

* NodeJS

Clone and install:

```bash
git clone https://github.com/makerdao/simplecoin-explorer.git
cd simplecoin-explorer
git submodule update --init --recursive
npm install
```

## Usage (for Developers)

Build the project, start a local server and watch file changes for automatic recompilation:

```bash
npm start
```

It will open your browser pointing to [http://localhost:3000/](http://localhost:3000/)

 Create an optimized build for production:

 ```bash
 npm run build
 ```

 Run test suite:

 ```bash
 npm test
 ```
