FROM maven:3.9.5-amazoncorretto-21 AS build
COPY . .
RUN mvn clean package

FROM openjdk:21
COPY --from=build ./target/*.jar ./app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]