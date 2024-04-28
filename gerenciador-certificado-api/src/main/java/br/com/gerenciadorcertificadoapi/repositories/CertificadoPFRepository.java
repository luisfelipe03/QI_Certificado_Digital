package br.com.gerenciadorcertificadoapi.repositories;

import br.com.gerenciadorcertificadoapi.models.CertificadoPF;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CertificadoPFRepository extends JpaRepository<CertificadoPF, String> {

    CertificadoPF findByCpf(String cpf);
    CertificadoPF findByNome(String nome);
}
