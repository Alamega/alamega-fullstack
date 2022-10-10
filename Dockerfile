FROM openjdk:18
ADD target/alamega-spring-app-1.0.0.jar server.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","server.jar"]

#docker build -t alamega .
#docker run -p 8080:8080 alamega