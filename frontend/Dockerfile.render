FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:22-alpine AS runner
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app .

CMD ["npm", "start"]