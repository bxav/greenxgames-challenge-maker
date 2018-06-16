#!/usr/bin/env bash

set -e

export $(egrep -v '^#' .env | xargs)

# Deploy the infrastructure

cd infrastructure;

terraform init;

terraform plan;

terraform apply;