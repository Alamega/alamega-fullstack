FROM maven:3.9.9-amazoncorretto-23 as builder
COPY . /app
WORKDIR /app/utils
RUN curl -L https://dlcdn.apache.org/maven/maven-3/3.9.9/binaries/apache-maven-3.9.9-bin.tar.gz | tar xz
ENV PATH="/app/utils/apache-maven-3.9.9/bin:${PATH}"
WORKDIR /app
RUN mvn -f /app/pom.xml clean package

FROM amazoncorretto:23-alpine as runner
COPY --from=builder /app/target/backend-1.0.0.jar /app/backend.jar
ENTRYPOINT ["java","-jar","/app/backend.jar"]

#Не в 2024
#FROM container-registry.oracle.com/graalvm/native-image:21
#COPY . /app
#WORKDIR /app/utils
#RUN curl -L https://dlcdn.apache.org/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.tar.gz | tar xz
#ENV PATH="/app/utils/apache-maven-3.9.6/bin:${PATH}"
#WORKDIR /app
#RUN ./mvnw clean -Pnative package
#RUN ./mvnw native:compile
#ENTRYPOINT ["/app/target/backend"]