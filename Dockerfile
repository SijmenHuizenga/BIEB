FROM openjdk:8-jre
MAINTAINER team-BIEB

COPY target/service.jar ./service.jar

EXPOSE 80 80

CMD java -jar service.jar