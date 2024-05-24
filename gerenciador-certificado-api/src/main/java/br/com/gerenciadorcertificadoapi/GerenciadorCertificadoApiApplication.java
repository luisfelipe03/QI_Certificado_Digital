package br.com.gerenciadorcertificadoapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class GerenciadorCertificadoApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(GerenciadorCertificadoApiApplication.class, args);
    }

}
