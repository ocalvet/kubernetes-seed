## Create Stateful Set
* Create cluster
`$ gcloud container clusters create --enable-legacy-authorization --preemptible "test-cluster"`
* Authenticate into the cluster
`$ gcloud container clusters get-credentials test-cluster`
* Create the storage for each service
`$ kubectl apply -f Service/StorageClass.yaml`
* Create Statefull Set for each service
`$ kubectl apply -f Service/StatefulSet.yaml`

## Cleanup
* Delete the cluster
`$ gcloud container clusters delete "test-cluster"`
