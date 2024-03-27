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

#FROM ubuntu:latest
#RUN apt-get update && apt-get install -y curl openjdk-21-jdk docker.io
#RUN curl -sSL "https://github.com/buildpacks/pack/releases/download/v0.33.2/pack-v0.33.2-linux-arm64.tgz" | tar -C /usr/local/bin/ --no-same-owner -xzv pack
#COPY . /workspace/app
#WORKDIR /workspace/app/utils
#RUN curl -L https://dlcdn.apache.org/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.tar.gz | tar xz
#ENV PATH="/workspace/app/utils/apache-maven-3.9.6/bin:${PATH}"
#WORKDIR /workspace/app
#RUN mvn -f /workspace/app/pom.xml clean package
#WORKDIR /workspace/app/target
#RUN pack build backend --builder paketobuildpacks/builder:base --path ./backend-1.0.0.jar --env BP_NATIVE_IMAGE=true

#FROM container-registry.oracle.com/graalvm/native-image:21
#COPY . /workspace/app
#WORKDIR /workspace/app/utils
#RUN curl -L https://dlcdn.apache.org/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.tar.gz | tar xz
#ENV PATH="/workspace/app/utils/apache-maven-3.9.6/bin:${PATH}"
#WORKDIR /workspace/app
#RUN mvn -f /workspace/app/pom.xml clean package
#WORKDIR /workspace/app/target
#RUN jar -xvf backend-1.0.0.jar
#RUN native-image -H:Name=backend -cp .:BOOT-INF/classes:`find BOOT-INF/lib | tr '\n' ':'`
#ENTRYPOINT ["/workspace/app/target/backend"]