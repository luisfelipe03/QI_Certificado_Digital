package br.com.gerenciadorcertificadoapi.services;

import br.com.gerenciadorcertificadoapi.data.vo.CertificadoPFVO;
import br.com.gerenciadorcertificadoapi.data.vo.CertificadoPJVO;
import br.com.gerenciadorcertificadoapi.excepions.ResourceNotFoundException;
import br.com.gerenciadorcertificadoapi.excepions.UniqueDocumentException;
import br.com.gerenciadorcertificadoapi.mapper.ModelMapper;
import br.com.gerenciadorcertificadoapi.models.CertificadoPJ;
import br.com.gerenciadorcertificadoapi.models.enums.TipoCertificado;
import br.com.gerenciadorcertificadoapi.repositories.CertificadoPJRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class CertificadoPJServiceImpl implements CertificadoPJService {

    private Logger logger = Logger.getLogger(CertificadoPJServiceImpl.class.getName());

    @Autowired
    CertificadoPJRepository repository;


    @Override
    public List<CertificadoPJVO> findAll(TipoCertificado tipoCertificado) {
        List<CertificadoPJ> pj = repository.findAllOrderByDataVencimentoAscAndTipoCertificado(tipoCertificado);
        return ModelMapper.parseListObjects(pj, CertificadoPJVO.class);
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
        if (repository.findByCnpj(certificadoVO.getCnpj()) != null) {
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
    public CertificadoPJVO findByCnpj(String cnpj) {
        CertificadoPJ certificado = repository.findByCnpj(cnpj);
        if(certificado == null) {
            throw new ResourceNotFoundException("Não existe certificado cadastrado com CNPJ: " + cnpj);
        }
        return ModelMapper.parseObject(certificado, CertificadoPJVO.class);
    }

    @Override
    public List<CertificadoPJVO> findByRazaoSocial(String razaoSocial) {
        List<CertificadoPJ> certificados = repository.findByRazaoSocialContaining(razaoSocial);
        if (certificados.isEmpty()) {
            throw new ResourceNotFoundException("Não existe certificado cadastrado com razão social: " + razaoSocial);
        }
        return ModelMapper.parseListObjects(certificados, CertificadoPJVO.class);
    }
}
