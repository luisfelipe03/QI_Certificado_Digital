package br.com.gerenciadorcertificadoapi.services;

import br.com.gerenciadorcertificadoapi.data.vo.CertificadoPJVO;
import br.com.gerenciadorcertificadoapi.excepions.ResourceNotFoundException;
import br.com.gerenciadorcertificadoapi.excepions.UniqueDocumentException;
import br.com.gerenciadorcertificadoapi.mapper.ModelMapper;
import br.com.gerenciadorcertificadoapi.models.CertificadoPJ;
import br.com.gerenciadorcertificadoapi.models.enums.TipoCertificado;
import br.com.gerenciadorcertificadoapi.repositories.CertificadoPJRepository;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class CertificadoPJServiceImpl implements CertificadoPJService {

    private static final org.slf4j.Logger log = LoggerFactory.getLogger(CertificadoPJServiceImpl.class);
    private Logger logger = Logger.getLogger(CertificadoPJServiceImpl.class.getName());

    @Autowired
    CertificadoPJRepository repository;


    @Override
    public List<CertificadoPJVO> findAll(TipoCertificado tipoCertificado) {
        logger.info("Listando todos os certificados PJ.");
        List<CertificadoPJ> pj = repository.findAllOrderByDataVencimentoAscAndTipoCertificado(tipoCertificado);
        return ModelMapper.parseListObjects(pj, CertificadoPJVO.class);
    }

    @Override
    public List<CertificadoPJVO> findAllPaginado(TipoCertificado tipoCertificado, int page, int itens) {
        logger.info("Listando todos os certificados PJ.");
        List<CertificadoPJ> pj = repository.findAllOrderByDataVencimentoAscAndTipoCertificado(tipoCertificado,
                PageRequest.of(page, itens));
        return ModelMapper.parseListObjects(pj, CertificadoPJVO.class);
    }

    public long countAllByTipo(TipoCertificado tipoCertificado) {
        return repository.countByTipo(tipoCertificado);
    }

    @Override
    public CertificadoPJVO getById(String uuid) {
        logger.info("Listando certificado PJ pelo id.");
        var entity = repository.findById(uuid)
                .orElseThrow(() -> new ResourceNotFoundException("Não existe certificado PJ cadastrado com id: " + uuid));
        return ModelMapper.parseObject(entity, CertificadoPJVO.class);
    }

    @Override
    public CertificadoPJVO create(CertificadoPJVO certificadoVO) {
        if (repository.findByCnpjOrderByDataVencimentoAsc(certificadoVO.getCnpj()) != null && repository.findByCnpjOrderByDataVencimentoAsc(certificadoVO.getCnpj()).isValido()) {
            throw new UniqueDocumentException("Já existe certificado cadastrado com esse CNPJ: " + certificadoVO.getCnpj() + ".");
        }
        logger.info("Cadastrando um certificado PJ.");
        CertificadoPJ savedCertificado = repository.save(ModelMapper.parseObject(certificadoVO, CertificadoPJ.class));
        return ModelMapper.parseObject(savedCertificado, CertificadoPJVO.class);
    }

    @Override
    public void delete(String uuid) {
        logger.info("Deletando certificado PF.");
        CertificadoPJ entity = repository.findById(uuid)
                .orElseThrow(() -> new ResourceNotFoundException("Não existe certificado cadastrado com id: " + uuid));
        repository.delete(entity);
    }

    @Override
    public CertificadoPJVO findByCnpj(String cnpj, TipoCertificado tipo) {
        CertificadoPJ certificado = repository.findByCnpjAndTipoCertificadoOrderByDataVencimentoAsc(cnpj, tipo);
        if(certificado == null) {
            throw new ResourceNotFoundException("Não existe certificado cadastrado com CNPJ: " + cnpj);
        }
        return ModelMapper.parseObject(certificado, CertificadoPJVO.class);
    }

    @Override
    public List<CertificadoPJVO> findByRazaoSocial(String razaoSocial, TipoCertificado tipo) {
        List<CertificadoPJ> certificados = repository.findByRazaoSocialContainingAndTipoCertificadoOrderByDataVencimentoAsc(razaoSocial, tipo);
        if (certificados.isEmpty()) {
            throw new ResourceNotFoundException("Não existe certificado cadastrado com razão social: " + razaoSocial);
        }
        return ModelMapper.parseListObjects(certificados, CertificadoPJVO.class);
    }
}
