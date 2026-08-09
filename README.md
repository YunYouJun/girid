# girid 印象表生成器

- ❤ 动画角色喜好表生成器 Lovely girls grid. Inspired by anime-grid.
- 👗 群友印象表

> Girid = Girl + Grid

## 地址

- 主站（EdgeOne Pages）：[girid.yunyoujun.cn](https://girid.yunyoujun.cn)
- 备用站（Vercel）：[girid.yyj.moe](https://girid.yyj.moe)

## Todo

- Random

## Dev

```bash
pnpm dev
pnpm build
pnpm -C apps/web start
```

The Nuxt application and its `/api/bgm/cors` server route are deployed together
on EdgeOne Makers. The connected project uses `apps/web` as its root directory
and reads deployment settings from `apps/web/edgeone.json`. Vercel provides the
fallback deployment at `girid.yyj.moe`. Use `pnpm generate` only when a
static-only build is needed.

## Thanks

- Data from [api | bangumi](https://bangumi.github.io/api/#/).
- Generated from [vitesse-h5](https://github.com/YunYouJun/vitesse-h5).
- Inspired by [anime-grid](https://github.com/itorr/anime-grid).
