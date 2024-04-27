package br.com.gerenciadorcertificadoapi.services;

import br.com.gerenciadorcertificadoapi.repositories.CertificadoPFRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CertificadoPFService {

    @Autowired
    CertificadoPFRepository repository;
}
