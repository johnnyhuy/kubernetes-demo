[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
    <a href="https://github.com/johnnyhuy/todo-app-kubernetes">
    <img src="https://raw.githubusercontent.com/kubernetes/kubernetes/master/logo/logo.svg" alt="Logo" width="80" height="80">
    </a>
    <h3 align="center">Todo App Kubernetes</h3>
    <p align="center">
    A demonstration of a todo application in a container orhestration environment.
    <br />
    <br />
    <a href="#getting-started">Getting Started</a>
    ·
    <a href="#deployment">Usage</a>
    <br />
    <a href="#deployment">Load testing</a>
    ·
    <a href="#deployment">Chaos testing</a>
</div>

## Background

![Todo App][product-screenshot]

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

```sh
brew bundle
```

#### Windows

> Work in progress - open to suggestions

## Usage

```sh
# Start local cluster
minikube start --memory 4096m --cpus 2

# Build images, deploy, port-forward and watch for changes
skaffold dev

# OR

# Do everything `skaffold dev` except watching & port-forwarding
skaffold build -q | skaffold deploy --build-artifacts -
```

## License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.

## Acknowledgments

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
