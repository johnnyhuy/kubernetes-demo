# Findings

## Creating databases in MongoDB

We don't need to create databases, we just need a user to be logged into the `admin` database.

### Connection string

```bash
# mongodb://{ROOT}:{PASSWORD}@{HOST}/{DATABASE}
mongodb://root:root@localhost/my-database
```
