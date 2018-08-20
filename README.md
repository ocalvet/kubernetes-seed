# kubernetes-seed
A seed project to create an application deployment in this case I will use it to deploy the seed react project

## Initial Steps

1. Create a cluster
`$ gcloud container clusters create --preemptible --machine-type n1-standard-1 [cluster_name]`
2. Deploy the sample google app
`$ kubectl run web --image=gcr.io/google-samples/hello-app:1.0 --port=8080`
3. Create a service
`$ kubectl expose deployment web --target-port=8080 --type=NodePort`
- Traefik
4. Create Traefik Role Bindings
`$ kubectl apply -f traefik-rbac.yaml`
  * If you encounter an error you migh need to give your user access: `$ kubectl create clusterrolebinding cluster-admin-binding --clusterrole=cluster-admin --user=[user@gmail.com]`
5. Create Traefik DaemonSet
`$ `


reference: [Traefik](https://docs.traefik.io/user-guide/kubernetes/)
