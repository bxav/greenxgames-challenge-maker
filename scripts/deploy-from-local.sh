#!/usr/bin/env bash

set -e

export $(egrep -v '^#' .env | xargs)

# Deploy the infrastructure

cd infrastructure;

terraform init;

terraform plan;

terraform apply;

export APIS_RG=`terraform output apis_resource_group_name`
export BACKEND_API_NAME=`terraform output backend_api_name`
export CONTAINER_REGISTRY_SERVER=`terraform output container_registry_server`
export CONTAINER_REGISTRY_USERNAME=`terraform output container_registry_username`
export CONTAINER_REGISTRY_PASSWORD=`terraform output container_registry_password`

# Deploy the backend api

cd ../backend;

docker build . -t $CONTAINER_REGISTRY_SERVER/adicode/product-api:$ENV;

docker login $CONTAINER_REGISTRY_SERVER --username $CONTAINER_REGISTRY_USERNAME --password $CONTAINER_REGISTRY_PASSWORD;

docker push $CONTAINER_REGISTRY_SERVER/greengame/backend-api:$ENV

az webapp config container set --name $BACKEND_API_NAME --resource-group $APIS_RG --docker-custom-image-name $CONTAINER_REGISTRY_SERVER/greengame/backend-api:$ENV --docker-registry-server-url https://$CONTAINER_REGISTRY_SERVER --docker-registry-server-user $CONTAINER_REGISTRY_USERNAME --docker-registry-server-password $CONTAINER_REGISTRY_PASSWORD
