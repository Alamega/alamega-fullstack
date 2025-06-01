FROM maven:3.9.9-amazoncorretto-23-alpine AS builder
WORKDIR /app
COPY pom.xml ./
RUN mvn dependency:go-offline
COPY . .
RUN mvn clean package -DskipTests

FROM amazoncorretto:23-alpine AS runner
WORKDIR /app
COPY --from=builder /app/target/backend-1.0.0.jar ./backend.jar
ENTRYPOINT ["java", "-jar", "./backend.jar"]