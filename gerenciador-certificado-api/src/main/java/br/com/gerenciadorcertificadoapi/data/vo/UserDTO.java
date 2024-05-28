package br.com.gerenciadorcertificadoapi.data.vo;

import lombok.Builder;
import lombok.Data;

import java.util.Objects;
@Data
@Builder
public class UserDTO {
    private String nome;
    private String email;
    private String senha;
}
