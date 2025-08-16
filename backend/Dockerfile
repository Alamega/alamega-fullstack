# syntax=docker/dockerfile:1.4
FROM ghcr.io/graalvm/native-image-community:24.0.1 AS builder
WORKDIR /app

RUN microdnf install -y maven ca-certificates && microdnf clean all

COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2 mvn -B dependency:go-offline

COPY src ./src
RUN mvn -B -Pnative -DskipTests native:compile

FROM debian:bookworm-slim AS runtime
WORKDIR /app

RUN apt-get update && apt-get install -y libstdc++6 && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/target/backend .
EXPOSE 8080

CMD ["./backend"]
