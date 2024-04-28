package br.com.gerenciadorcertificadoapi.repositories;

import br.com.gerenciadorcertificadoapi.models.CertificadoPF;
import br.com.gerenciadorcertificadoapi.models.CertificadoPJ;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CertificadoPJRepository extends JpaRepository<CertificadoPJ, String> {

    CertificadoPJ findByCnpj(String cnpj);
    CertificadoPJ findByRazaoSocial(String razaoSocial);
    List<CertificadoPJ> findByTipoCertificado(String tipoCertificado);
    @Query("SELECT c FROM CertificadoPJ c ORDER BY c.dataVencimento DESC")
    List<CertificadoPF> findAllOrderByDataVencimentoAsc();

}
