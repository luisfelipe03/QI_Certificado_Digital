package br.com.gerenciadorcertificadoapi.services;

import br.com.gerenciadorcertificadoapi.data.vo.CertificadoPJVO;
import br.com.gerenciadorcertificadoapi.models.CertificadoPJ;
import br.com.gerenciadorcertificadoapi.models.enums.TipoCertificado;

import java.util.List;

public interface CertificadoPJService {

    List<CertificadoPJVO> findAll(TipoCertificado tipoCertificado);
    CertificadoPJVO getById(String uuid);
    CertificadoPJVO create(CertificadoPJVO certificadoVO);
    void delete(String uuid);
    CertificadoPJVO findByCnpj(String cnpj);
    List<CertificadoPJVO> findByRazaoSocial(String razaoSocial);

}