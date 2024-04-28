package br.com.gerenciadorcertificadoapi.services;

import br.com.gerenciadorcertificadoapi.data.vo.CertificadoPFVO;
import br.com.gerenciadorcertificadoapi.excepions.ResourceNotFoundException;
import br.com.gerenciadorcertificadoapi.excepions.UniqueDocumentException;
import br.com.gerenciadorcertificadoapi.mapper.ModelMapper;
import br.com.gerenciadorcertificadoapi.models.CertificadoPF;
import br.com.gerenciadorcertificadoapi.repositories.CertificadoPFRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        return ModelMapper.parseListObjects(repository.findAllOrderByDataVencimentoAsc(), CertificadoPFVO.class);
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
        if (repository.findByCpf(certificadoVO.getCpf()) != null) {
            throw new UniqueDocumentException("Já existe certificado cadastrado com esse CPF: " + certificadoVO.getCpf() + ".");
        }
        logger.info("Cadastrando um certificado PF.");
        CertificadoPF savedCertificado = repository.save(ModelMapper.parseObject(certificadoVO, CertificadoPF.class));
        return ModelMapper.parseObject(savedCertificado, CertificadoPFVO.class);
    }

    @Override
    public CertificadoPFVO update(CertificadoPFVO certificadoVO) {
        logger.info("Atualizando cadastro do certificado PF.");

        var entity = repository.findById(certificadoVO.getUUID()).orElseThrow(
                () -> new ResourceNotFoundException("Não existe certificado cadastrado com id: " + certificadoVO.getUUID()));

        entity.setNome(certificadoVO.getNome());
        entity.setCpf(certificadoVO.getCpf());
        entity.setDataEmisao(certificadoVO.getDataEmisao());
        entity.setDataVencimento(certificadoVO.getDataVencimento());

        return ModelMapper.parseObject(repository.save(entity), CertificadoPFVO.class);

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
        return ModelMapper.parseObject(repository.findByCpf(cpf), CertificadoPFVO.class);
    }

    @Override
    public CertificadoPFVO findByNome(String nome) {
        return ModelMapper.parseObject(repository.findByNome(nome), CertificadoPFVO.class);
    }
}
