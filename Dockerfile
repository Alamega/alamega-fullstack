FROM openjdk:18
EXPOSE 8080
ADD ./target/*.jar ./app.jar


#ENTRYPOINT ["java","-jar","app.jar"]

#docker build -t alamega .
#docker run -p 8080:8080 alamega