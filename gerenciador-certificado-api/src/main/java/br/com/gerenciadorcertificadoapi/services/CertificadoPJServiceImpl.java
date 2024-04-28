package br.com.gerenciadorcertificadoapi.services;

import br.com.gerenciadorcertificadoapi.repositories.CertificadoPJRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CertificadoPJServiceImpl {

    @Autowired
    CertificadoPJRepository repository;

}
