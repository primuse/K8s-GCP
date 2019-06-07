# Deploy React App to GKE

This repo contains configuration files for the deployment of a React Application to the Google Kubernetes Engine (Infrastructure as a Service).

We will take the following steps to deploy the application:
- Dockerizing the application
- Kubernetes cluster creation
- Set up Kubernetes configuration
- Nginx installation and configuration
- DNS configuration
- Provisioning Secure Socket Layer (SSL) certificates

## Prerequisites
The tools we shall use for this task include the following:
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [gcloud](https://cloud.google.com/sdk/install)
- [docker](https://docs.docker.com/install/overview/)
- [A google cloud project](https://cloud.google.com/resource-manager/docs/creating-managing-projects)

## Getting started
1. Go ahead and install the necessarry tools and create a google cloud project. 

2. Clone this repo and cd into it by running `cd K8s-GCP`

3. Create a **service account** by clicking on **Service Accounts** under **IAM & admin** on the side navigation bar and make sure to assign it these roles:
- roles/storage.admin as stated [here](https://cloud.google.com/container-registry/docs/access-control)
- roles/project.owner. 

  After creating the service account, download the key to your device and save it as **account.json** in the **terraform** directory. 
  A service account is associated with a key pair, which is managed by Google Cloud Platform (GCP). It is used for service-to-service authentication within GCP.
  
  *If you do not have a **domain name**, go to sites like [freenom](freenom.com), [godaddy](https://www.godaddy.com/), etc to buy and register one.* 
 
 *After registering a domain name, go to the **ingress.yaml** file and replace the value of **host** or **hosts** wherever it appears with the domain name you just registered.**

4. Create a `.env` file in the root directory and populate it with these values:

```
export PROJECT=*******
export GCR_REGISTRY=*******
export DOCKER_IMAGE_NAME=*******
```
Make sure to fill in the correct values for each variable. 
  
`$PROJECT`: this is the ID of the **google cloud project** you created earlier. 

`$GCR_REGISTRY`: this is the gcr registry your container images would reside.

`$DOCKER_IMAGE_NAME`: this is the image name you wish your container image to have.

5. Next we use docker to build an **image** which would the image that we would use to spin up our container. In this image we would have the application that we want to deploy. To do this, 

- run `source .env` to populate the environment variables.

- `docker build -t $GCR_REGISTRY/$PROJECT/$DOCKER_IMAGE_NAME:v1 -f docker/Dockerfile .` to build the docker image.

    When this is done you should see a message that the image has been sucessfully built and tagged. However for *Google Kubernetes Engine* to be able to use these images, we have to make them accessible to it. One way of doing that is by pushing them to the **Google Container Registry**. This is Google Cloud Platform’s version of **docker hub**.
 
6. In your terminal run: `gcloud auth configure-docker`. This will configure docker to use google cloud's official docker image repositories, the likes of *gcr.io*, *eu.gcr.io*, *us.gcr.io*, so that to push a docker image to those repositories, you do it the same way as you do for docker.

7. Now run `docker push $GCR_REGISTRY/$PROJECT/$DOCKER_IMAGE_NAME:v1` to push the image to [Google Container Registry](https://cloud.google.com/container-registry/?utm_source=google&utm_medium=cpc&utm_campaign=emea-emea-all-en-dr-bkws-all-rsa-trial-e-gcp-1003963&utm_content=text-ad-none-any-DEV_c-CRE_167354242557-ADGP_Hybrid+%7C+AW+SEM+%7C+BKWS+~+EXA_M:1_EMEA_EN_Compute_Container+Registry_google+container+registry-KWID_43700038695385948-kwd-197849459819-userloc_1009824&utm_term=KW_google%20container%20registry-ST_google+container+registry&ds_rl=1242853&ds_rl=1245734&ds_rl=1245734&gclid=EAIaIQobChMI5eb-svDW3gIVT5PtCh2X3AwkEAAYASAAEgJqlvD_BwE).

  Hurray now we can use our image to spin up a container.
  
  Next on the list is to create a Kubernetes [Cluster](https://kubernetes.io/docs/tutorials/kubernetes-basics/create-cluster/cluster-intro/). A **cluster** is simply a group of highly available computers that are connected to work as a single unit. We would use terraform to automatically create this cluster in the GKE for the Google cloud project we created earlier.
  
## Kubernetes Cluster Creation
  
1. Move into the **gke** directory by running `cd k8s-configurations/terraform/gke`.

2. Create a `terraform.tfvars` file. This is the file which holds the values of the variables used by terraform. In the **terraform.tfvars** provide the values for the variables in the **variables.tf** file.

3. In the **gke** driectory run `terraform init`. This initializes terraform and downloads the google plugin needed to do the work.

4. Next run `terraform plan` and then `terraform apply`. This would take a few minutes to complete but when everything is done, you should see your newly created cluster on your GKE dashboard under **clusters**.

  Now that we have created our cluster, we would go on to create a kubernetes deployment, service and ingress in our cluster. A **deployment** is simply a “workload”. Although *pods* are the basic unit of computation in Kubernetes, they are not typically directly launched on a cluster. Instead, pods are usually managed by a **deployment**.

A **deployment’s** primary purpose is to declare *how many replicas of a pod* should be running at a time. When a deployment is added to the cluster, it will automatically spin up the requested number of pods, and then monitor them. If a pod dies, the deployment will automatically re-create it.

A **service** is used to expose a deployment. In kubernetes, services are the “glue” of the different “workloads”. These provide connectivity between containers in the kubernetes eco-system. This is because, the way kubernetes was created, a container, can not “talk” to another container if not in the same pod. That is why we have to use services.

An **ingress** is a set of rules that direct external internet traffic to services in a kubernetes cluster.

These configurations are in the **deployments.yaml**, **service.yaml** and **ingress.yaml** files respectively.

## Creating the Kubernetes deployment, sefvice and ingress

1. Cd into the **k8s-configurations** directory by running `cd k8s-configurations`.

2. To be able to create these kubernetes resources in our earlier created cluster, we need to get the credentials needed to talk with the cluster. Run 

`gcloud container clusters get-credentials YOUR_CLUSTER --zone=YOUR_CLUSTER_ZONE` 

replacing `YOUR_CLUSTER` and `YOUR_CLUSTER_ZONE` with the appropriate values.

*Before proceeding to the next step, go to the **deployments.yaml** file **k8s-configuration folder** and replace the **image** value with the name of the newly created docker image.

2. Next run 

`kubectl create -f services.yaml && kubectl create -f ingress.yaml && kubectl create -f deployments.yaml`

to create the respective kubernetes resources.

   With that command completing successfully, head over to your GCP [console](https://console.cloud.google.com/) under **kubernetes engine > workloads** section and there you will find the resources you just created.
    
At this point everything is good to go, except for one thing. An ingress controller, without which we can not access any part of our application through the browser.

An Ingress controller is responsible for fulfilling the Ingress, usually with a loadbalancer. Creating an ingress resource alone will not work without an ingress controller. 

## Creating the Ingress Controller

The easiest way to run and manage applications in a Kubernetes cluster is using **Helm**. Helm allows you to perform key operations for managing applications such as install, upgrade or delete. Helm is composed of two parts: **Helm (the client)** and **Tiller (the server)**.

1. Run 

`curl -o get_helm.sh https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get && chmod +x get_helm.sh && ./get_helm.sh`

to donwload and install the latest helm release.

2. Still in the **k8s-configurations** directory run `kubectl create -f clusterrole.yaml` to create the **ClusteRole**.

To install **tiller** in a Google Kubernetes cluster, we need to have a **service account** and **cluster role binding** configured for tiller. This will allow tiller to be able to install kubernetes resources inside our cluster.

3. Run `kubectl create serviceaccount -n kube-system tiller` to create a ServiceAccount and `kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller` to associate it with the ClusterRole.

4. Initialize Helm by running `helm init --service-account tiller`.

Now that we have helm and tiller installed and configured on both our local work-station and remote cluster, we can now go ahead and install an Ingress controller into our cluster.

5. Run `helm install --name nginx-ingress stable/nginx-ingress --set rbac.create=true`.

6. Run `kubectl get service nginx-ingress-controller` to confirm the installation. This will give you an output of the nginx controller service of type **loadBalancer** with an **external IP**.

    *This external IP takes a little while to get created, so if you see "pending", give it a few seconds/minutes for google to provision it for you.*
    
    Now that we can access our application through the external IP of the nginx ingress controller service, let's hook it up to a domain name so that we can access it through it.
    
 ## DNS Configuration
 
 1. Go to your domain dashboard and Create a **record set**. In the **value** field, copy and paste the **external IP address** of your **nginx-ingress-controller**.
 
    Now that we have configured our domain name, we need to get an **SSL certificate** to allow end-to-end encryption between our application and the user. To do this, we would use **let’s encrypt** which offers free SSL certificates valid for **3 months**. You can use any certificates if you have any, whether paid or free.
    
 2. Install **certbot** and **letsencrypt** by running `apt-get install letsencrypt` for ubuntu systems or `brew install certbot && pip install letsencrypt --user` for macOS systems.
 
 3. Run `certbot --manual --logs-dir certbot --config-dir certbot --work-dir certbot --preferred-challenges dns certonly` to begin the process of getting an SSL certificate. Follow the on-screen prompts to provision your domain’s SSL certificate.
 
 *When you reach the prompt that says: `Please deploy a DNS TXT record under the name
_acme-challenge.erpnext.EXAMPLE.COM with the following value: <value here>`, head over to your domain dashboard and create a **txt** record for **_acme-challenge.erpnext.EXAMPLE.COM** and fill in the value given on your terminal by certbot. **EXAMPLE.COM** should be your own domain name*.

**Give it a minute or two after creating the record and press enter on your keyboard to continue with the Certificate provisioning process**.

When all is done, certbot will have created a **cerbot** folder in your current working directory. And the onscreen output will direct you to where your **SSL certificate** is.

4. While in the directory with the **.pem** files, run: `cat cert.pem | base64 | pbcopy` and then head over to the **secrets.yaml** file in the **k8s-configurations** directory and use it to replace the value of **tls.crt**.

5. Also run: `cat privkey.pem | base64 | pbcopy` and then head over to the **secrets.yaml** file in the **k8s-configurations** directory and use it to replace the value of **tls.key**

*N/B: The above command: `cat privkey.pem | base64 | pbcopy` encodes **privkey.pem** to **base64** and copies the cert.pem encoded result output to the clipboard.*

6. With the **secrets.yaml** populated, run: `kubectl create -f secrets.yaml`. This will create a kubernetes resource of type **secret** which our ingress resource will use for SSL termination a.k.a secure browsing using HTTPS.

Now when we visit our domain name on a browser, it would be over **HTTPS** which means our site is secure.

If you have followed these steps, congratulations, you have just deployed an application to a Kubernetes cluster on GKE. Your application runs in containers (pods) that are spunned from an image built by docker.
    
