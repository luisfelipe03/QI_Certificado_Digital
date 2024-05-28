package br.com.gerenciadorcertificadoapi.data.vo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CredentialsDTO {
    private String email;
    private String senha;
}
