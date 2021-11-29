FROM openjdk:11
COPY ./build/libs/*SNAPSHOT.jar ./app.jar
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=prod","./app.jar"]