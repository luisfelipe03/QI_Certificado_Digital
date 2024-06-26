package br.com.gerenciadorcertificadoapi.services;

import br.com.gerenciadorcertificadoapi.data.vo.CertificadoPFVO;
import br.com.gerenciadorcertificadoapi.models.CertificadoPF;

import java.util.List;

public interface CertificadoPFService {

    List<CertificadoPFVO> findAll();
    List<CertificadoPFVO> findAllPaginado(int page, int itens);
    CertificadoPFVO getById(String uuid);
    CertificadoPFVO create(CertificadoPFVO certificadoVO);
    void delete(String uuid);
    CertificadoPFVO findByCpf(String cpf);
    List<CertificadoPFVO> findByNome(String nome);
    long countAll();
}
