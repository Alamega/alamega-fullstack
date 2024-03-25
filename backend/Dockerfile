FROM maven:3.9.6-amazoncorretto-21 AS build
WORKDIR /app
COPY . .
RUN mvn -f /app/pom.xml clean package

#FROM openjdk:21-jdk
#COPY --from=build /app/target/backend-1.0.0.jar app.jar
#ENTRYPOINT ["java","-jar","/app.jar"]

FROM container-registry.oracle.com/graalvm/native-image:21 as graalvm
COPY --from=build /app/target/backend-1.0.0.jar /app/backend-1.0.0.jar
RUN native-image -jar /app/backend-1.0.0.jar
ENTRYPOINT ["/app/backend-1.0.0"]
