## Create Stateful Set
* Create cluster
`$ gcloud container clusters create "test-cluster"`
* Authenticate into the cluster
`$ gcloud container clusters get-credentials test-cluster`
* Create the storage
`$ kubectl apply -f StorageClass.yaml`
* Create Statefull Set
`$ kubectl apply -f StatefulSet.yaml`

## Cleanup
* Delete the cluster
`$ gcloud container clusters delete "test-cluster"`
