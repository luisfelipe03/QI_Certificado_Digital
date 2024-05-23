package br.com.gerenciadorcertificadoapi.repositories;

import br.com.gerenciadorcertificadoapi.models.CertificadoPJ;
import br.com.gerenciadorcertificadoapi.models.enums.TipoCertificado;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CertificadoPJRepository extends JpaRepository<CertificadoPJ, String> {

    @Query("SELECT c FROM CertificadoPJ c WHERE c.cnpj = :cnpj ORDER BY c.dataVencimento ASC")
    CertificadoPJ findByCnpjOrderByDataVencimentoAsc(String cnpj);

    @Query("SELECT c FROM CertificadoPJ c WHERE c.cnpj = :cnpj  AND c.tipoCertificado = :tipo ORDER BY c.dataVencimento ASC")
    CertificadoPJ findByCnpjAndTipoCertificadoOrderByDataVencimentoAsc(String cnpj, TipoCertificado tipo);

    @Query("SELECT c FROM CertificadoPJ c WHERE c.razaoSocial LIKE %:razaoSocial% AND c.tipoCertificado = :tipo ORDER BY c.dataVencimento ASC")
    List<CertificadoPJ> findByRazaoSocialContainingAndTipoCertificadoOrderByDataVencimentoAsc(String razaoSocial, TipoCertificado tipo);

    @Query("SELECT c FROM CertificadoPJ c WHERE c.tipoCertificado = :tipo ORDER BY c.dataVencimento ASC")
    List<CertificadoPJ> findAllValidOrderByDataVencimentoAscAndTipoCertificado(@Param("tipo") TipoCertificado tipo);

    @Query("SELECT c FROM CertificadoPJ c WHERE c.tipoCertificado = :tipo ORDER BY c.dataVencimento ASC")
    List<CertificadoPJ> findAllValidOrderByDataVencimentoAscAndTipoCertificado(@Param("tipo") TipoCertificado tipo, Pageable pageable);
    
    @Query("SELECT c FROM CertificadoPJ c WHERE c.tipoCertificado = :tipo ORDER BY c.dataVencimento DESC")
    List<CertificadoPJ> findAllExpiredOrderByDataVencimentoDescAndTipoCertificado(@Param("tipo") TipoCertificado tipo);


}
