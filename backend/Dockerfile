FROM ghcr.io/graalvm/native-image-community:25 AS builder
WORKDIR /app

RUN microdnf install -y maven ca-certificates && microdnf clean all

COPY pom.xml .

RUN mvn dependency:go-offline -B

COPY src ./src

RUN mvn -B -Pnative -DskipTests native:compile

FROM debian:bookworm-slim AS runtime
WORKDIR /app

RUN apt-get update && apt-get install -y libstdc++6 && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/target/backend .
EXPOSE 8080

CMD ["./backend"]
