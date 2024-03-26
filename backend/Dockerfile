#FROM container-registry.oracle.com/graalvm/native-image:21 AS build
#WORKDIR /app
#COPY . .
#RUN mvn -f /app/pom.xml clean package

##FROM openjdk:21-jdk
##COPY --from=build /app/target/backend-1.0.0.jar app.jar
##ENTRYPOINT ["java","-jar","/app.jar"]

#FROM container-registry.oracle.com/graalvm/native-image:21 as graalvm
#COPY --from=build /app/target /app
#WORKDIR /app
#RUN ./mvnw -Pnative native:compile
#
#FROM frolvlad/alpine-glibc
#COPY --from=graalvm /app/backend-1.0.0 /app/backend-1.0.0
#ENTRYPOINT ["/app/backend-1.0.0"]

FROM container-registry.oracle.com/graalvm/native-image:21 AS build
WORKDIR /app
COPY . .

RUN curl -L https://dlcdn.apache.org/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.tar.gz | tar xz
ENV PATH="/app/apache-maven-3.9.6/bin:${PATH}"
RUN mvn -Pnative clean package
WORKDIR /app/target
RUN ls
ENTRYPOINT ["/app/target/backend"]

#FROM frolvlad/alpine-glibc
#COPY --from=build /app/target/backend /app/backend
#ENTRYPOINT ["/app/backend"]