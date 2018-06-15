#!/usr/bin/env bash

set -e

export $(egrep -v '^#' .env | xargs)