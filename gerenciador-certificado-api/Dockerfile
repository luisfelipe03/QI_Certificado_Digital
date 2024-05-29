FROM maven:3.8.5-openjdk-17 as builder
WORKDIR /app
COPY . .
RUN mvn dependency:resolve
RUN mvn clean package -DskipTests

FROM amazoncorretto:17
WORKDIR /app
COPY --from=builder ./app/target/*.jar ./app.jar
EXPOSE 8080

ENV POSTGRES_HOST=localhost
ENV POSTGRES_PORT=5432
ENV SECURITY_PASSWORD=password
RUN echo "the env var POSTGRES_HOST value is $POSTGRES_HOST and POSTGRES_PORT value is $POSTGRES_PORT"

ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=production", "app.jar"]