package br.com.gerenciadorcertificadoapi.mapper;

import br.com.gerenciadorcertificadoapi.data.vo.UserDTO;
import br.com.gerenciadorcertificadoapi.models.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User mapToUser(UserDTO dto) {
        return User.builder()
                .email(dto.getEmail())
                .senha(dto.getSenha())
                .nome(dto.getNome())
                .build();
    }

}
