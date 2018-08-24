#! /bin/bash

echo "Deploying Accounts service"
kubectl apply -f  accounts.yaml

echo "Deploying Shipping service"
kubectl apply -f  shipping.yaml

echo "Deploying Users service"
kubectl apply -f  users.yaml