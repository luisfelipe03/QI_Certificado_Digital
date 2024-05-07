package br.com.gerenciadorcertificadoapi.repositories;

import br.com.gerenciadorcertificadoapi.models.CertificadoPJ;
import br.com.gerenciadorcertificadoapi.models.enums.TipoCertificado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CertificadoPJRepository extends JpaRepository<CertificadoPJ, String> {

    CertificadoPJ findByCnpj(String cnpj);
    List<CertificadoPJ> findByRazaoSocialContaining(String razaoSocial);
    @Query("SELECT c FROM CertificadoPJ c WHERE c.tipoCertificado = :tipo ORDER BY c.dataVencimento ASC")
    List<CertificadoPJ> findAllOrderByDataVencimentoAscAndTipoCertificado(@Param("tipo") TipoCertificado tipo);


}
