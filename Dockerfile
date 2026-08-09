FROM node:24-alpine AS build-stage

WORKDIR /app
RUN corepack enable

COPY . .
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

RUN pnpm build

FROM nginx:stable-alpine AS production-stage

COPY --from=build-stage /app/apps/web/.output/public /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
