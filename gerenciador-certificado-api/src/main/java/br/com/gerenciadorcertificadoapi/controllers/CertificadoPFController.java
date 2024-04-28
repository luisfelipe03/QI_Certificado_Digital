package br.com.gerenciadorcertificadoapi.controllers;

import br.com.gerenciadorcertificadoapi.data.vo.CertificadoPFVO;
import br.com.gerenciadorcertificadoapi.services.CertificadoPFService;
import br.com.gerenciadorcertificadoapi.utils.CertificadoUtils;
import jakarta.websocket.server.PathParam;
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
@CrossOrigin(origins = "*")
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

    @GetMapping("/find-nome")
    @ResponseStatus(code = HttpStatus.OK)
    public List<CertificadoPFVO> getByName(@RequestParam("nome") String nome) {
        return service.findByNome(nome.toUpperCase());
    }

    @GetMapping("/find-cpf")
    @ResponseStatus(code = HttpStatus.OK)
    public CertificadoPFVO getByCpf(@RequestParam("cpf") String cpf) throws Exception {
        if (cpf.length() != 11) {
            throw new Exception("CPF inválido: " + cpf);
        }
        // Formatar o CPF no estilo xxx.xxx.xxx-xx
        cpf = String.format("%s.%s.%s-%s", cpf.substring(0, 3), cpf.substring(3, 6),
                cpf.substring(6, 9), cpf.substring(9));
        return service.findByCpf(cpf.toUpperCase());
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
            return ResponseEntity.status(HttpStatus.CREATED).body(service.create(informacoes));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao ler o arquivo PFX.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao processar o certificado: " + e.getMessage());
        }
    }

    @DeleteMapping("/{uuid}")
    @ResponseStatus(code = org.springframework.http.HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("uuid") String uuid) {
        service.delete(uuid);
    }
}
