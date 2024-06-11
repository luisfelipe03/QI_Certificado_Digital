package br.com.gerenciadorcertificadoapi.repositories;

import br.com.gerenciadorcertificadoapi.models.CertificadoPF;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CertificadoPFRepository extends JpaRepository<CertificadoPF, String> {

    @Query("SELECT c FROM CertificadoPF c ORDER BY c.dataVencimento ASC")
    List<CertificadoPF> findAllOrderByDataVencimentoAsc();

    @Query("SELECT c FROM CertificadoPF c ORDER BY c.dataVencimento ASC")
    List<CertificadoPF> findAllOrderByDataVencimentoAsc(Pageable pageable);

    CertificadoPF findByCpfOrderByDataVencimentoAsc(String cpf);

    List<CertificadoPF> findByNomeContainingOrderByDataVencimentoAsc(String nome);
}
