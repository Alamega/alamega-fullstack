FROM maven:3.9.9-amazoncorretto-23-alpine AS builder
COPY . /app
WORKDIR /app
RUN mvn -f /app/pom.xml clean package -DskipTests

FROM amazoncorretto:23-alpine AS runner
COPY --from=builder /app/target/backend-1.0.0.jar /app/backend.jar
ENTRYPOINT ["java","-jar","/app/backend.jar"]