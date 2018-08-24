## Create Stateful Set
* Create cluster
`$ gcloud container clusters create --enable-legacy-authorization --preemptible --num-nodes 8 "test-cluster"`
* Authenticate into the cluster
`$ gcloud container clusters get-credentials test-cluster`
### TODO
* Add instructions for building and pushing images to container registry
* Add instructions for deploying each endpoint

## Cleanup
* Delete the cluster
`$ gcloud container clusters delete "test-cluster"`
