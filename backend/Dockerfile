FROM maven:3.9.9-amazoncorretto-23-alpine AS builder
COPY . /app
RUN rm -f /app/src/main/resources/application.properties
RUN mv /app/src/main/resources/application-local.properties /app/src/main/resources/application.properties
RUN mvn -f /app/pom.xml clean package -DskipTests

FROM amazoncorretto:23 AS runner
COPY --from=builder /app/target/backend*.jar /app/backend.jar
ENTRYPOINT ["java","-jar","/app/backend.jar"]