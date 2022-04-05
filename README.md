[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
    <a href="https://github.com/johnnyhuy/todo-app-kubernetes">
    <img src="https://raw.githubusercontent.com/kubernetes/kubernetes/master/logo/logo.svg" alt="Logo" width="80" height="80">
    </a>
    <h3 align="center">Todo App Kubernetes</h3>
    <p align="center">
    A demonstration of a todo application in a container orchestration environment.
    <br />
    <br />
    <a href="#getting-started">Getting Started</a>
    <br />
    <a href="#monitoring">Monitoring</a>
    ·
    <a href="#load-testing">Load testing</a>
    ·
    <a href="#chaos-testing">Chaos testing</a>
    <br />
    <a href="./FINDINGS.md">Findings</a>
    ·
    <a href="#acknowledgments">Acknowledgments</a>
</div>

## Background

![Todo App][product-screenshot]

This project was made to solve the problem of introducing new team members into Kubernetes. Demonstrating tool to host a microservices app in Kubernetes along with testing and monitoring capabilities.

We're using Minikube as a baseline to deploy services into Kubernetes. However, this can be compatible with Managed Kubernetes Services give or take some modification to adapt to cloud providers.

### Built With

Notable tools including, but not limited to:

* [Node.js](https://nodejs.org/en/)
  * [Vue.js 3](https://vuejs.org/) - frontend
  * [NestJS](https://nestjs.com/) - backend
  * [Vite](https://vitejs.dev/)
* [MongoDB](https://www.mongodb.com/) - database
* [Kubernetes](https://kubernetes.io/)
  * [Helm](https://helm.sh/)
  * [Skaffold](https://skaffold.dev/)

## Getting Started

### Prerequisites

- NodeJS v17+
- Docker
- Minikube

#### MacOS

Use Homebrew to install required tools.

```sh
brew bundle

# Install NodeJS
nvm use 16
```

#### Windows

Use Chocolatey to install required tools. Run the PowerShell script as admin.

```ps1
.\Install-ChocoTools.ps1

# Install NodeJS
nvm use 16
```

#### Multi-platform

Alternatively, we can use VSCode dev containers to open a cluster environment. This only requires Docker.

Open this project in VSCode, `ctrl + p` and enter `Remote-Containers: Rebuild and Reopen in Container`.

### Usage

> Feel free to inspect `make` commands in the [`Makefile`](./Makefile)

```sh
# Start local cluster
make local-cluster

# Create a tunnel between Minikube and our local machine (localhost)
make tunnel
```

## Monitoring

```sh
make deploy-monitoring
```

## Load Testing

We can run load tests locally. This requires `k6` and NodeJS with Yarn.

```sh
make load-test
```

## Chaos Testing

> TODO

## Contributing

```bash
# Start local cluster
make local-cluster

# Build images, deploy, port-forward and watch for changes
skaffold dev

# OR

# Do everything `skaffold dev` except watching & port-forwarding
skaffold build -q | skaffold deploy --build-artifacts -
```

## Findings

Little tid bits can me found in [`FINDINGS.md`](./FINDINGS.md)

## Acknowledgments

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.

> TODO

[contributors-shield]: https://img.shields.io/github/contributors/johnnyhuy/todo-app-kubernetes.svg?style=for-the-badge
[contributors-url]: https://github.com/johnnyhuy/todo-app-kubernetes/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/johnnyhuy/todo-app-kubernetes.svg?style=for-the-badge
[forks-url]: https://github.com/johnnyhuy/todo-app-kubernetes/network/members
[stars-shield]: https://img.shields.io/github/stars/johnnyhuy/todo-app-kubernetes.svg?style=for-the-badge
[stars-url]: https://github.com/johnnyhuy/todo-app-kubernetes/stargazers
[issues-shield]: https://img.shields.io/github/issues/johnnyhuy/todo-app-kubernetes.svg?style=for-the-badge
[issues-url]: https://github.com/johnnyhuy/todo-app-kubernetes/issues
[license-shield]: https://img.shields.io/github/license/johnnyhuy/todo-app-kubernetes.svg?style=for-the-badge
[license-url]: https://github.com/johnnyhuy/todo-app-kubernetes/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/johnnyhuy/
[product-screenshot]: ./images/project-image.png
