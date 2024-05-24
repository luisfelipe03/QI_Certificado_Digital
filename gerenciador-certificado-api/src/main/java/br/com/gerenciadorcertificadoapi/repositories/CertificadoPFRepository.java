package br.com.gerenciadorcertificadoapi.repositories;

import br.com.gerenciadorcertificadoapi.models.CertificadoPF;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CertificadoPFRepository extends JpaRepository<CertificadoPF, String> {

    @Query("SELECT c FROM CertificadoPF c where c.isValido = true ORDER BY c.dataVencimento ASC")
    List<CertificadoPF> findAllOrderByDataVencimentoAsc();

    @Query("SELECT c FROM CertificadoPF c where c.isValido = false ORDER BY c.dataVencimento desc")
    List<CertificadoPF> findAllExpiredOrderByDataVencimentoDesc();

    @Query("SELECT c FROM CertificadoPF c where c.isValido = true ORDER BY c.dataVencimento ASC")
    List<CertificadoPF> findAllOrderByDataVencimentoAsc(Pageable pageable);

    @Query("SELECT count(c) FROM CertificadoPF c where c.isValido = true")
    long countByValidoTrue();

    CertificadoPF findByCpfOrderByDataVencimentoAsc(String cpf);

    List<CertificadoPF> findByNomeContainingOrderByDataVencimentoAsc(String nome);
}
