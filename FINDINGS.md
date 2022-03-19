# Findings

## Creating databases in MongoDB

We don't need to create databases, we just need a user to be logged into the `admin` database.

### Connection string

```bash
# mongodb://{ROOT}:{PASSWORD}@{HOST}/{DATABASE}
mongodb://root:root@localhost/my-database
```

## Don't need to use `useFetch` from VueUse

We can just use vanilla JS to make HTTP requests with the Fetch API. This API also supports async await functions.
