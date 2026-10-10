# ==============================================================================
# HUMA HIJAB COLLECTION — NEXT.JS FRONTEND DOCKERFILE
# ==============================================================================

# Stage 1: Dependencies installation
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Next.js Production Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . ./

# Accept build-time public environment variables
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_STORE_NAME
ARG NEXT_PUBLIC_STORE_PHONE
ARG NEXT_PUBLIC_STORE_PHONE_FORMATTED
ARG NEXT_PUBLIC_WHATSAPP
ARG NEXT_PUBLIC_MAPS_URL
ARG NEXT_PUBLIC_ONLINE_LAUNCH_DATE

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# Stage 3: Production Runner
FROM node:20-alpine AS runner
WORKDIR /app

RUN apk add --no-cache curl

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

CMD ["npm", "run", "start"]
