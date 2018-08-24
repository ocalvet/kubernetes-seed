#! /bin/bash

echo "Deploying Accounts service"
kubectl apply -f  accounts/app-deployment.yaml

echo "Deploying Shipping service"
kubectl apply -f  shipping/app-deployment.yaml

echo "Deploying Users service"
kubectl apply -f  users/app-deployment.yaml