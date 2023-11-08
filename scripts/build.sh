#!/usr/bin/env bash

lerna run build \
  --scope @firefly/auto-editor-core \
  --scope @firefly/auto-editor-skeleton \
  --scope @firefly/auto-engine \
  --stream

lerna run build:umd \
  --scope @firefly/auto-engine \
  --stream