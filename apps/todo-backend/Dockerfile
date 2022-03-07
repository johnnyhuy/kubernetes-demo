FROM maven:3.8.4-openjdk-11-slim AS build

WORKDIR /opt/app

COPY src /opt/app/src
COPY pom.xml /opt/app/

RUN mvn -Dmaven.test.skip=true clean package

FROM openjdk:11-jre-slim-buster

WORKDIR /opt/app

COPY --from=build target/k8s-todo-backend.jar /opt/app/

CMD [ "java", "-jar", "/opt/app/target/k8s-todo-backend.jar" ]