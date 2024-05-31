package br.com.gerenciadorcertificadoapi.controllers;

import br.com.gerenciadorcertificadoapi.data.vo.CertificadoPJVO;
import br.com.gerenciadorcertificadoapi.data.vo.PaginatedResponse;
import br.com.gerenciadorcertificadoapi.mapper.ModelMapper;
import br.com.gerenciadorcertificadoapi.models.CertificadoPJ;
import br.com.gerenciadorcertificadoapi.models.enums.TipoCertificado;
import br.com.gerenciadorcertificadoapi.services.CertificadoPJService;
import br.com.gerenciadorcertificadoapi.utils.CertificadoUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.cert.X509Certificate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/certificado-pj")
public class CertificadoPJController {

    @Autowired
    CertificadoPJService service;

    @GetMapping("/{tipoCertificado}/validos")
    @ResponseStatus(code = HttpStatus.OK)
    public PaginatedResponse<CertificadoPJVO> findAll(@PathVariable("tipoCertificado") String tipoCertificado,
                                                      @RequestParam(value = "page", required = false, defaultValue = "0") int page,
                                                      @RequestParam(value = "limit", required = false, defaultValue = "10") int limit) {
        List<CertificadoPJVO> certificados = service.findAllPaginado(TipoCertificado.valueOf(tipoCertificado.toUpperCase()), page, limit);
        long total = service.countAllByTipo(TipoCertificado.valueOf(tipoCertificado.toUpperCase())); // Método no serviço que retorna o total de registros
        return new PaginatedResponse<>(certificados, total);
    }

    @GetMapping("/{tipoCertificado}/vencidos")
    @ResponseStatus(code = HttpStatus.OK)
    public List<CertificadoPJVO> findAllExpired(@PathVariable("tipoCertificado") String tipoCertificado) {
        return service.findAllExpired(TipoCertificado.valueOf(tipoCertificado.toUpperCase()));
    }

    @GetMapping("/id/{uuid}")
    @ResponseStatus(code = HttpStatus.OK)
    public CertificadoPJVO getById(@PathVariable("uuid") String uuid) {
        return service.getById(uuid);
    }

    @GetMapping("/find-cnpj")
    @ResponseStatus(code = HttpStatus.OK)
    public CertificadoPJVO getByCnpj(@RequestParam("cnpj") String cnpj, @RequestParam("tipoCertificado") String tipoCertificado) {
        if (cnpj.length() != 18) {
            throw new IllegalArgumentException("CNPJ inválido: " + cnpj);
        }
        return service.findByCnpj(cnpj, TipoCertificado.valueOf(tipoCertificado.toUpperCase()));
    }

    @GetMapping("/find-razao-social")
    @ResponseStatus(code = HttpStatus.OK)
    public List<CertificadoPJVO> getByRazaoSocial(@RequestParam("razaoSocial") String razaoSocial, @RequestParam("tipoCertificado") String tipoCertificado) {
        return service.findByRazaoSocial(razaoSocial.toUpperCase(), TipoCertificado.valueOf(tipoCertificado.toUpperCase()));
    }

    @PostMapping("/upload")
    @ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity<?> create(@RequestParam("certificado") MultipartFile arquivoPfx, @RequestParam("senha") String senha, @RequestParam("tipoCertificado") String tipoCertificado) {
        try {
            // Verificar se o arquivo é nulo ou vazio
            if (arquivoPfx == null || arquivoPfx.isEmpty()) {
                Map<String, String> json = Map.of("error", "O arquivo não foi enviado.");
                return ResponseEntity.badRequest().body(json);
            }

            // Carregar o certificado digital a partir do arquivo PFX
            X509Certificate certificado = CertificadoUtils.carregarCertificado(arquivoPfx.getBytes(), senha);

            // Verificar se o certificado é de pessoa física
            if (!CertificadoUtils.isCertificadoPessoaJuridica(certificado)) {
                Map<String, String> json = Map.of("error", "O certificado fornecido não é de pessoa jurídica.");
                return ResponseEntity.badRequest().body(json);
            }

            // Crianção de um objeto para armazenar as informações do certificado
            CertificadoPJVO informacoes = new CertificadoPJVO();
            informacoes.setCnpj(CertificadoUtils.extrairCNPJ(certificado));
            informacoes.setRazaoSocial(CertificadoUtils.extrairRazaoSocial(certificado));
            informacoes.setDataEmissao(CertificadoUtils.extrairDataEmissao(certificado));
            informacoes.setDataVencimento(CertificadoUtils.extrairDataVencimento(certificado));
            informacoes.setTipoCertificado(TipoCertificado.valueOf(tipoCertificado.toUpperCase()));
            informacoes.setValido(CertificadoUtils.isValido(certificado));

            if(!CertificadoUtils.isValidoPJ(ModelMapper.parseObject(informacoes, CertificadoPJ.class))) {
                Map<String, String> json = Map.of("error", "O certificado fornecido está expirado.");
                return ResponseEntity.badRequest().body(json);
            }

            // Retornar as informações do certificado
            return ResponseEntity.status(HttpStatus.CREATED).body(service.create(informacoes));
        } catch (IOException e) {
            Map<String, String> json = Map.of("error", "Erro ao ler o arquivo PFX.");
            return ResponseEntity.badRequest().body(json);
        } catch (Exception e) {
            Map<String, String> json = Map.of("error", e.getMessage());
            return ResponseEntity.badRequest().body(json);
        }
    }

    @DeleteMapping("/{uuid}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public ResponseEntity<?> delete(@PathVariable("uuid") String uuid) {
        service.delete(uuid);
        return ResponseEntity.ok().build();
    }

}
