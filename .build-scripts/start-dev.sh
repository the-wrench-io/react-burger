#!/usr/bin/env bash
cp ./.build-scripts/demo/index.tsx ./src/index.tsx
cp ./.build-scripts/demo/react-app-env.d.ts ./src/react-app-env.d.ts
rm -r ./public
mkdir ./public
cp -R ./.build-scripts/demo/public/* ./public
