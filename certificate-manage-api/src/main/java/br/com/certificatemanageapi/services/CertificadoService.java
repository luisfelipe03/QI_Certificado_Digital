package br.com.certificatemanageapi.services;

import br.com.certificatemanageapi.data.vo.CertificadoVO;
import br.com.certificatemanageapi.models.Certificado;

import java.util.List;

public interface CertificadoService {

    List<CertificadoVO> findAll();
    CertificadoVO getById(Long id);
    CertificadoVO create(CertificadoVO certificadoVO);
    CertificadoVO update(CertificadoVO certificadoVO);
    void delete(Long id);
    CertificadoVO findByCnpj(String cnpj);
    CertificadoVO findByRazaoSocial(String razaoSocial);

}
