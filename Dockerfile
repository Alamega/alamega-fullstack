FROM 3.9.2-amazoncorretto-20 AS build
COPY . .
RUN mvn clean package -Pprod -DskipTests

FROM openjdk:20
COPY --from=build ./target/*.jar ./app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]