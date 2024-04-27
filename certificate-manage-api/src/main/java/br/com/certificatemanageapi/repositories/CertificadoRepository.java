package br.com.certificatemanageapi.repositories;

import br.com.certificatemanageapi.models.Certificado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CertificadoRepository extends JpaRepository<Certificado, Long> {

    Certificado findByCnpj(String cnpj);
    Certificado findByRazaoSocial(String razaoSocial);
}
