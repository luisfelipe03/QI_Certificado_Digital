package br.com.gerenciadorcertificadoapi.data.vo;

import br.com.gerenciadorcertificadoapi.models.enums.TipoCertificado;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CertificadoPJVO {

    private String UUID;
    private String razaoSocial;
    private String cnpj;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataEmissao;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataVencimento;
    private TipoCertificado tipoCertificado;
    private boolean isValido = false;
}
