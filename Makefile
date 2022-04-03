local-cluster:
	minikube start --memory 4096m --cpus 2 --apiserver-names=host.docker.internal

dev:
	skaffold dev

dev-helm:
	skaffold dev -f skaffold.helm.yaml

up:
	skaffold build -q | skaffold deploy --build-artifacts -

up-helm:
	skaffold build -q | skaffold deploy -f skaffold.helm.yaml --build-artifacts -

tunnel:
	minikube tunnel -c