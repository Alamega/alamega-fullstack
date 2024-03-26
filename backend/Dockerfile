FROM maven:3.9.6-amazoncorretto-21 AS build
WORKDIR /app
COPY . .
RUN mvn -f /app/pom.xml clean package

FROM openjdk:21-jdk
COPY --from=build /app/target/backend-1.0.0.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]

#RUN curl -L https://dlcdn.apache.org/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.tar.gz | tar xz
#ENV PATH="/app/apache-maven-3.9.6/bin:${PATH}"