# Findings

## Minikube UDP tunneling

Minikube does not support UDP tunneling to our host machines. Recommendation here would be to use a different Minikube driver or local cluster environment tool.

[GitHub issue](https://github.com/kubernetes/minikube/issues/12362)

## Creating databases in MongoDB

We don't need to create databases, we just need a user to be logged into the `admin` database.

### Connection string

```bash
# mongodb://{ROOT}:{PASSWORD}@{HOST}/{DATABASE}
mongodb://root:root@localhost/my-database
```

## Don't need to use `useFetch` from VueUse

We can just use vanilla JS to make HTTP requests with the Fetch API. This API also supports async await functions.

## Docker builds failing due to out of space

When building Docker images, commands like `yarn` can fail due to no space left on the Docker daemon. This is caused by running `skaffold dev` since it tries to sync files through volumes and rebuild images.

By default, Docker for Desktop allocates 60 GB. We can either prune images & volumes (recommended) or extend the allocated space.

```bash
docker image prune -a -f
docker volume prune -f
```
