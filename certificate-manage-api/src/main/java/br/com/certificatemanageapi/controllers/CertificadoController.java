package br.com.certificatemanageapi.controllers;

import br.com.certificatemanageapi.data.vo.CertificadoVO;
import br.com.certificatemanageapi.models.Certificado;
import br.com.certificatemanageapi.services.CertificadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/certificados")
@CrossOrigin(origins = "*")
public class CertificadoController {

    @Autowired
    CertificadoService certificadoService;

    @GetMapping
    public List<CertificadoVO> findAll() {
        return certificadoService.findAll();
    }

    @GetMapping("/{id}")
    public CertificadoVO getById(@PathVariable("id") Long id){
        return certificadoService.getById(id);
    }

    @PostMapping
    public CertificadoVO create(@RequestBody CertificadoVO certificadoVO) {
        return certificadoService.create(certificadoVO);
    }

    @PutMapping
    public CertificadoVO update(@RequestBody CertificadoVO certificadoVO) {
        return certificadoService.update(certificadoVO);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        certificadoService.delete(id);
    }
}
