package br.com.gerenciadorcertificadoapi.controllers;

import br.com.gerenciadorcertificadoapi.data.vo.CertificadoPFVO;
import br.com.gerenciadorcertificadoapi.services.CertificadoPFService;
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
@RequestMapping("api/certificado-pf")
public class CertificadoPFController {

    @Autowired
    CertificadoPFService service;

    @GetMapping
    @ResponseStatus(code = org.springframework.http.HttpStatus.OK)
    public List<CertificadoPFVO> findAll() {
        return service.findAll();
    }

    @GetMapping("/{uuid}")
    @ResponseStatus(code = org.springframework.http.HttpStatus.OK)
    public CertificadoPFVO getById(@PathVariable("uuid") String uuid) {
        return service.getById(uuid);
    }

    @PostMapping("/upload")
    public ResponseEntity<?> obterInformacaoCertificado(@RequestParam("certificado") MultipartFile arquivoPfx, @RequestParam("senha") String senha){
        try {
            // Verificar se o arquivo é nulo ou vazio
            if (arquivoPfx == null || arquivoPfx.isEmpty()) {
                return ResponseEntity.badRequest().body("O arquivo não foi enviado.");
            }

            // Carregar o certificado digital a partir do arquivo PFX
            X509Certificate certificado = CertificadoUtils.carregarCertificado(arquivoPfx.getBytes(), senha);

            // Crianção de um objeto para armazenar as informações do certificado
            CertificadoPFVO informacoes = new CertificadoPFVO();
            informacoes.setNome(CertificadoUtils.extrairNomePF(certificado));
            informacoes.setCpf(CertificadoUtils.extrairCPF(certificado));
            informacoes.setDataEmisao(CertificadoUtils.extrairDataEmissao(certificado));
            informacoes.setDataVencimento(CertificadoUtils.extrairDataVencimento(certificado));

            // Retornar as informações do certificado
            return ResponseEntity.ok(service.create(informacoes));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao ler o arquivo PFX.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao processar o certificado: " + e.getMessage());
        }
    }

    @PutMapping("/{uuid}")
    @ResponseStatus(code = org.springframework.http.HttpStatus.OK)
    public CertificadoPFVO update(@PathVariable("uuid") String uuid, @RequestBody CertificadoPFVO certificadoVO) {
        certificadoVO.setUUID(uuid);
        return service.update(certificadoVO);
    }

    @DeleteMapping("/{uuid}")
    @ResponseStatus(code = org.springframework.http.HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("uuid") String uuid) {
        service.delete(uuid);
    }
}
