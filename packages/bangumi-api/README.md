# bangumi-api

## FAQ

### Set `User-Agent`

> [User Agent 建议](https://github.com/bangumi/api/blob/master/docs-raw/user%20agent.md)

```ts
const bangumiApi = createBangumiApi()
bangumiApi.axios.defaults.headers.common['User-Agent'] = `YunYouJun/girid + (${pkg.repository.url})`
```
