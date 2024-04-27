package br.com.certificatemanageapi.services;

import br.com.certificatemanageapi.data.vo.CertificadoVO;
import br.com.certificatemanageapi.mapper.ModelMapper;
import br.com.certificatemanageapi.models.Certificado;
import br.com.certificatemanageapi.repositories.CertificadoRepository;
import br.com.certificatemanageapi.excepions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class CertificadoServiceImpl implements CertificadoService {

    private Logger logger = Logger.getLogger(CertificadoServiceImpl.class.getName());

    @Autowired
    private CertificadoRepository repository;


    @Override
    public List<CertificadoVO> findAll() {
        logger.info("Listando todos os certificados");
        return ModelMapper.parseListObjects(repository.findAll(), CertificadoVO.class);
    }

    @Override
    public CertificadoVO getById(Long id) {
        logger.info("Listando certificado pelo id");
        var entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Não existe certificado cadastrado com id: " + id));
        return ModelMapper.parseObject(entity, CertificadoVO.class);
    }

    @Override
    public CertificadoVO create(CertificadoVO certificadoVO) {
        logger.info("Cadastrando um certificado");
        Certificado savedCertificado = repository.save(ModelMapper.parseObject(certificadoVO, Certificado.class));
        return ModelMapper.parseObject(savedCertificado, CertificadoVO.class);
    }

    @Override
    public CertificadoVO update(CertificadoVO certificadoVO) {
        logger.info("Atualizando cadastro do certificado");

        var entity = repository.findById(certificadoVO.getId()).orElseThrow(
                () -> new ResourceNotFoundException("Não existe certificado cadastrado com id: " + certificadoVO.getId()));

        entity.setRazaoSocial(certificadoVO.getRazaoSocial());
        entity.setCnpj(certificadoVO.getCnpj());
        entity.setDataEmissao(certificadoVO.getDataEmissao());
        entity.setDataValidade(certificadoVO.getDataValidade());
        entity.setTipoCertificado(certificadoVO.getTipoCertificado());

        return ModelMapper.parseObject(repository.save(entity), CertificadoVO.class);
    }

    @Override
    public void delete(Long id) {
        logger.info("Deletando certificado");
        Certificado entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Não existe certificado cadastrado com id: " + id));
        repository.delete(entity);
    }

    @Override
    public CertificadoVO findByCnpj(String cnpj) {
        return ModelMapper.parseObject(repository.findByCnpj(cnpj), CertificadoVO.class);
    }

    @Override
    public CertificadoVO findByRazaoSocial(String razaoSocial) {
        return ModelMapper.parseObject(repository.findByRazaoSocial(razaoSocial), CertificadoVO.class);
    }
}
