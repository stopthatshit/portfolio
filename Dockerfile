FROM oven/bun:latest AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install
COPY . .
ARG PUBLIC_POSTHOG_KEY
ENV PUBLIC_POSTHOG_KEY=${PUBLIC_POSTHOG_KEY}
RUN bun run build

FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx_site.conf /etc/nginx/conf.d/default.conf
