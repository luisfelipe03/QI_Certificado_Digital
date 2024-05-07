package br.com.gerenciadorcertificadoapi.controllers;

import br.com.gerenciadorcertificadoapi.data.vo.CertificadoPJVO;
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

@RestController
@RequestMapping("api/certificado-pj")
@CrossOrigin(origins = "*")
public class CertificadoPJController {

    @Autowired
    CertificadoPJService service;

    @GetMapping("/{tipoCertificado}")
    public List<CertificadoPJVO> findAll(@PathVariable("tipoCertificado") String tipoCertificado) {
        return service.findAll(TipoCertificado.valueOf(tipoCertificado.toUpperCase()));
    }

    @GetMapping("/id/{uuid}")
    public CertificadoPJVO getById(@PathVariable("uuid") String uuid) {
        return service.getById(uuid);
    }

    @GetMapping("/find-cnpj")
    public CertificadoPJVO getByCnpj(@RequestParam("cnpj") String cnpj) {
        if (cnpj.length() != 14) {
            throw new IllegalArgumentException("CNPJ inválido: " + cnpj);
        }
        // Formatar o CNPJ no estilo xx.xxx.xxx/xxxx-xx
        cnpj = String.format("%s.%s.%s/%s-%s", cnpj.substring(0, 2), cnpj.substring(2, 5),
                cnpj.substring(5, 8), cnpj.substring(8, 12), cnpj.substring(12));
        return service.findByCnpj(cnpj);
    }

    @GetMapping("/find-razao-social")
    public List<CertificadoPJVO> getByRazaoSocial(@RequestParam("razaoSocial") String razaoSocial) {
        return service.findByRazaoSocial(razaoSocial.toUpperCase());
    }

    @PostMapping("/upload")
    public ResponseEntity<?> create(@RequestParam("certificado") MultipartFile arquivoPfx, @RequestParam("senha") String senha, @RequestParam("tipoCertificado") String tipoCertificado) {
        try {
            // Verificar se o arquivo é nulo ou vazio
            if (arquivoPfx == null || arquivoPfx.isEmpty()) {
                return ResponseEntity.badRequest().body("O arquivo não foi enviado.");
            }

            // Carregar o certificado digital a partir do arquivo PFX
            X509Certificate certificado = CertificadoUtils.carregarCertificado(arquivoPfx.getBytes(), senha);

            // Verificar se o certificado é de pessoa física
            if (!CertificadoUtils.isCertificadoPessoaJuridica(certificado)) {
                return ResponseEntity.badRequest().body("O certificado fornecido não é de pessoa jurídica.");
            }

            // Crianção de um objeto para armazenar as informações do certificado
            CertificadoPJVO informacoes = new CertificadoPJVO();
            informacoes.setCnpj(CertificadoUtils.extrairCNPJ(certificado));
            informacoes.setRazaoSocial(CertificadoUtils.extrairRazaoSocial(certificado));
            informacoes.setDataEmisao(CertificadoUtils.extrairDataEmissao(certificado));
            informacoes.setDataVencimento(CertificadoUtils.extrairDataVencimento(certificado));
            informacoes.setTipoCertificado(TipoCertificado.valueOf(tipoCertificado.toUpperCase()));

            // Retornar as informações do certificado
            return ResponseEntity.status(HttpStatus.CREATED).body(service.create(informacoes));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao ler o arquivo PFX.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao processar o certificado: " + e.getMessage());
        }
    }

    @DeleteMapping("/{uuid}")
    public ResponseEntity<?> delete(@PathVariable("uuid") String uuid) {
        service.delete(uuid);
        return ResponseEntity.ok().build();
    }

}