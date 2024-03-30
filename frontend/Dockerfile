FROM node:20-alpine as builder
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:20-alpine as runner
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV production
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
EXPOSE 3000
CMD ["npm", "start"]