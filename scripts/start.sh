#!/usr/bin/env bash

pkgName="@firefly/auto-ignitor"

if [ "$1" ]; then
  pkgName="$1"
fi

lerna exec --scope $pkgName -- npm start
