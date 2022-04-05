local-cluster:
	minikube start --memory 7936m --cpus 3 --apiserver-names=host.docker.internal

dev-todo:
	skaffold dev -m todo

dev-todo-helm:
	skaffold dev -f skaffold.helm.yaml -m todo

deploy-dev:
	skaffold build -q | skaffold deploy  -p dev --build-artifacts -

deploy-dev-helm:
	skaffold build -q | skaffold deploy -f skaffold.helm.yaml  -p dev --build-artifacts -

deploy-prod:
	skaffold build -q | skaffold deploy -p prod --build-artifacts -

deploy-prod-helm:
	skaffold build -q | skaffold deploy -f skaffold.helm.yaml -p prod --build-artifacts -

deploy-monitoring:
	skaffold deploy -f skaffold.helm.yaml -p prod -m kube-system

tunnel:
	minikube tunnel -c

load-test:
	yarn
	yarn workspace load-testing build
	k6 run load-testing/dist/get-200-status-test.js