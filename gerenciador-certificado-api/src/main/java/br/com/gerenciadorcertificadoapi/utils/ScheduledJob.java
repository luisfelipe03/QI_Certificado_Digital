package br.com.gerenciadorcertificadoapi.utils;

import br.com.gerenciadorcertificadoapi.repositories.CertificadoPFRepository;
import br.com.gerenciadorcertificadoapi.repositories.CertificadoPJRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledJob {

    @Autowired
    private CertificadoPFRepository pfRepository;

    @Autowired
    private CertificadoPJRepository pjRepository;

    @Scheduled(cron = "0 5 0 * * ?", zone = "America/Recife")
    public void checkValidCertificates() {
        pfRepository.findAll().forEach(certificado -> {
            certificado.setValido(CertificadoUtils.isValidoPF(certificado));
            pfRepository.save(certificado);
        });

        pjRepository.findAll().forEach(certificado -> {
            certificado.setValido(CertificadoUtils.isValidoPJ(certificado));
            pjRepository.save(certificado);
        });
    }
}

