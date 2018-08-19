# kubernetes-seed
A seed project to create an application deployment in this case I will use it to deploy the seed react project

## Initial Steps

1. Create a cluster
`$ gcloud container clusters create --preemptible --machine-type n1-standard-1 [cluster_name]`
2. Deploy the sample google app
`kubectl run web --image=gcr.io/google-samples/hello-app:1.0 --port=8080`

