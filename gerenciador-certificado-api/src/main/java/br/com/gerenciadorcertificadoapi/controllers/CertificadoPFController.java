package br.com.gerenciadorcertificadoapi.controllers;

import br.com.gerenciadorcertificadoapi.data.vo.CertificadoPFVO;
import br.com.gerenciadorcertificadoapi.data.vo.PaginatedResponse;
import br.com.gerenciadorcertificadoapi.models.enums.TipoCertificado;
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
import java.util.Map;

@RestController
@RequestMapping("api/certificado-pf")
public class CertificadoPFController {

    @Autowired
    CertificadoPFService service;

    @GetMapping("/validos")
    @ResponseStatus(code = org.springframework.http.HttpStatus.OK)
    public PaginatedResponse<CertificadoPFVO> findAll(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "10") int limit) {
        List<CertificadoPFVO> certificados = service.findAllPaginado(page, limit);
        long total = service.countAll(); // Método no serviço que retorna o total de registros
        return new PaginatedResponse<>(certificados, total);
    }

    @GetMapping("/vencidos")
    @ResponseStatus(code = org.springframework.http.HttpStatus.OK)
    public List<CertificadoPFVO> findAllExpired() {
        return service.findAllExpired();
    }

    @GetMapping("/id/{uuid}")
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
    public CertificadoPFVO getByCpf(@RequestParam("cpf") String cpf) {
        if (cpf.length() != 14) {
            throw new IllegalArgumentException("CPF inválido: " + cpf);
        }
        return service.findByCpf(cpf.toUpperCase());
    }

    @PostMapping("/upload")
    public ResponseEntity<?> obterInformacaoCertificado(@RequestParam("certificado") MultipartFile arquivoPfx, @RequestParam("senha") String senha){
        try {
            // Verificar se o arquivo é nulo ou vazio
            if (arquivoPfx == null || arquivoPfx.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("O arquivo não foi enviado.");
            }

            // Carregar o certificado digital a partir do arquivo PFX
            X509Certificate certificado = CertificadoUtils.carregarCertificado(arquivoPfx.getBytes(), senha);

            if (!CertificadoUtils.isCertificadoPessoaFisica(certificado)) {
                Map<String, String> json = Map.of("error", "O certificado fornecido não é de pessoa física.");
                return ResponseEntity.badRequest().body(json);
            }

            // Crianção de um objeto para armazenar as informações do certificado
            CertificadoPFVO informacoes = new CertificadoPFVO();
            informacoes.setNome(CertificadoUtils.extrairNomePF(certificado));
            informacoes.setCpf(CertificadoUtils.extrairCPF(certificado));
            informacoes.setDataEmissao(CertificadoUtils.extrairDataEmissao(certificado));
            informacoes.setDataVencimento(CertificadoUtils.extrairDataVencimento(certificado));
            informacoes.setValido(CertificadoUtils.isValido(certificado));
            informacoes.setTipoCertificado(TipoCertificado.PF);

            // Retornar as informações do certificado
            return ResponseEntity.status(HttpStatus.CREATED).body(service.create(informacoes));
        } catch (IOException e) {
            Map<String, String> json = Map.of("error", "Erro ao ler o arquivo PFX.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(json);
        } catch (Exception e) {
            Map<String, String> json = Map.of("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(json);
        }
    }

    @DeleteMapping("/{uuid}")
    @ResponseStatus(code = org.springframework.http.HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("uuid") String uuid) {
        service.delete(uuid);
    }
}
