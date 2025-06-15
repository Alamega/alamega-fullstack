#FROM maven:3.9.9-amazoncorretto-24-alpine AS builder
#WORKDIR /app
#COPY pom.xml ./
#RUN mvn dependency:go-offline
#COPY . .
#RUN mvn clean package -DskipTests
#
#FROM amazoncorretto:24-alpine AS runner
#WORKDIR /app
#COPY --from=builder /app/target/backend-1.0.0.jar ./backend.jar
#ENTRYPOINT ["java", "-jar", "./backend.jar"]

FROM ghcr.io/graalvm/native-image-community:24.0.1 AS native-builder
WORKDIR /project
RUN microdnf install -y maven && \
    microdnf install -y curl ca-certificates && \
    update-ca-trust
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src

ARG JDBC_URL
ARG JWT_SECRET
ARG ADMIN_USERNAME
ENV JDBC_URL=${JDBC_URL}
ENV JWT_SECRET=${JWT_SECRET}
ENV ADMIN_USERNAME=${ADMIN_USERNAME}

RUN mvn clean -Pnative -DskipTests -e -X native:compile

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y libstdc++6 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=native-builder /project/target/backend .
EXPOSE 8080

ARG JDBC_URL
ARG JWT_SECRET
ARG ADMIN_USERNAME
ENV JDBC_URL=${JDBC_URL}
ENV JWT_SECRET=${JWT_SECRET}
ENV ADMIN_USERNAME=${ADMIN_USERNAME}

CMD ["./backend"]