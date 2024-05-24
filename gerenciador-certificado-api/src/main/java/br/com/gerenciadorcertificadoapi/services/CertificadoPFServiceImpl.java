package br.com.gerenciadorcertificadoapi.services;

import br.com.gerenciadorcertificadoapi.data.vo.CertificadoPFVO;
import br.com.gerenciadorcertificadoapi.excepions.ResourceNotFoundException;
import br.com.gerenciadorcertificadoapi.excepions.UniqueDocumentException;
import br.com.gerenciadorcertificadoapi.mapper.ModelMapper;
import br.com.gerenciadorcertificadoapi.models.CertificadoPF;
import br.com.gerenciadorcertificadoapi.repositories.CertificadoPFRepository;
import br.com.gerenciadorcertificadoapi.utils.CertificadoUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Service
public class CertificadoPFServiceImpl implements CertificadoPFService {

    private Logger logger = Logger.getLogger(CertificadoPFServiceImpl.class.getName());

    @Autowired
    CertificadoPFRepository repository;


    @Override
    public List<CertificadoPFVO> findAll() {
        logger.info("Listando todos os certificados PF.");
        List<CertificadoPF> pf =  repository.findAllOrderByDataVencimentoAsc();
        return ModelMapper.parseListObjects(pf, CertificadoPFVO.class);
    }

    @Override
    public List<CertificadoPFVO> findAllPaginado(int page, int itens) {
        logger.info("Listando todos os certificados PF.");
        List<CertificadoPF> pf =  repository.findAllOrderByDataVencimentoAsc(PageRequest.of(page, itens));
        return ModelMapper.parseListObjects(pf, CertificadoPFVO.class);
    }

    public long countAll() {
        return repository.countByValidoTrue();
    }

    @Override
    public List<CertificadoPFVO> findAllExpired() {
        logger.info("Listando todos os certificados PF vencido.");
        List<CertificadoPF> pf = repository.findAllExpiredOrderByDataVencimentoDesc();
        return ModelMapper.parseListObjects(pf, CertificadoPFVO.class);
    }

    @Override
    public CertificadoPFVO getById(String uuid) {
        logger.info("Listando certificado PF pelo id.");
        var entity = repository.findById(uuid)
                .orElseThrow(() -> new ResourceNotFoundException("Não existe certificado PF cadastrado com id: " + uuid));
        return ModelMapper.parseObject(entity, CertificadoPFVO.class);
    }

    @Override
    public CertificadoPFVO create(CertificadoPFVO certificadoVO) {
        if (repository.findByCpfOrderByDataVencimentoAsc(certificadoVO.getCpf()) != null && repository.findByCpfOrderByDataVencimentoAsc(certificadoVO.getCpf()).isValido()) {
            throw new UniqueDocumentException("Já existe certificado cadastrado com esse CPF: " + certificadoVO.getCpf() + ".");
        }
        logger.info("Cadastrando um certificado PF.");
        CertificadoPF savedCertificado = repository.save(ModelMapper.parseObject(certificadoVO, CertificadoPF.class));
        return ModelMapper.parseObject(savedCertificado, CertificadoPFVO.class);
    }

    @Override
    public void delete(String uuid) {
        logger.info("Deletando certificado PF.");
        CertificadoPF entity = repository.findById(uuid)
                .orElseThrow(() -> new ResourceNotFoundException("Não existe certificado cadastrado com id: " + uuid));
        repository.delete(entity);
    }

    @Override
    public CertificadoPFVO findByCpf(String cpf) {
        CertificadoPF certificado = repository.findByCpfOrderByDataVencimentoAsc(cpf);
        if (certificado == null) {
            throw new ResourceNotFoundException("Não existe certificado cadastrado com CPF: " + cpf);
        }
        return ModelMapper.parseObject(certificado, CertificadoPFVO.class);
    }

    @Override
    public List<CertificadoPFVO> findByNome(String nome) {
        List<CertificadoPF> certificados = repository.findByNomeContainingOrderByDataVencimentoAsc(nome);
        if (certificados.isEmpty()) {
            throw new ResourceNotFoundException("Não existe certificado cadastrado com nome: " + nome);
        }
        return ModelMapper.parseListObjects(certificados, CertificadoPFVO.class);
    }
}
