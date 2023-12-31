# This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update both files!

FROM node:19-alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN corepack enable
RUN npm install -g turbo@1.10.12
COPY . .
RUN turbo prune --scope=car-insurance-company --docker


# Add lockfile and package.json's of isolated subworkspace
FROM node:19-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN corepack enable
RUN npm install -g turbo@1.10.12

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/full/ .
RUN pnpm install --no-frozen-lockfile

ARG TURBO_TEAM
ENV TURBO_TEAM=$TURBO_TEAM

ARG TURBO_TOKEN
ENV TURBO_TOKEN=$TURBO_TOKEN

# Build the project
RUN pnpm turbo run build --filter=car-insurance-company...


FROM node:19-alpine AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/car-insurance-company/next.config.js .
COPY --from=installer /app/apps/car-insurance-company/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/car-insurance-company/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/car-insurance-company/.next/static ./apps/car-insurance-company/.next/static

CMD node apps/car-insurance-company/server.js