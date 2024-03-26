#FROM container-registry.oracle.com/graalvm/native-image:21 AS build
#WORKDIR /app
#COPY . .
#RUN mvn -f /app/pom.xml clean package

##FROM openjdk:21-jdk
##COPY --from=build /app/target/backend-1.0.0.jar app.jar
##ENTRYPOINT ["java","-jar","/app.jar"]

#FROM container-registry.oracle.com/graalvm/native-image:21 AS build
#WORKDIR /app
#COPY . .
#RUN curl -L https://dlcdn.apache.org/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.tar.gz | tar xz
#ENV PATH="/app/apache-maven-3.9.6/bin:${PATH}"
##RUN mvn -Pnative clean package
##RUN mvn native:compile-no-fork
#RUN mvn clean
#RUN mvn -Pnative -DskipTests package
#ENTRYPOINT ["/app/target/backend"]

FROM vegardit/graalvm-maven:latest-java21 as builder
WORKDIR /app
COPY pom.xml /app/
COPY src /app/src/
RUN mvn -Pnative native:compile

FROM mirekphd/jenkins-jdk17-on-ubuntu2204:latest
COPY --from=builder /app/target/backend /app/
CMD ["/app/backend"]