# Образ с JDK 21 и curl
FROM openjdk:21-jdk

# Копирование из папки с Dockerfile хоста в папку /app образа
COPY . /app

# Установка MAVEN
WORKDIR /app/utils
RUN curl -L https://dlcdn.apache.org/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.tar.gz | tar xz
ENV PATH="/app/utils/apache-maven-3.9.6/bin:${PATH}"

# Сборка jar
WORKDIR /app
RUN mvn -f /app/pom.xml clean package
# Точка входа
ENTRYPOINT ["java","-jar","/app/target/backend-1.0.0.jar"]

#FROM container-registry.oracle.com/graalvm/native-image:21
#COPY . /app
#WORKDIR /app/utils
#RUN curl -L https://dlcdn.apache.org/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.tar.gz | tar xz
#ENV PATH="/app/utils/apache-maven-3.9.6/bin:${PATH}"
#WORKDIR /app
#RUN ./mvnw clean -Pnative package
#RUN ./mvnw native:compile
#ENTRYPOINT ["/app/target/backend"]