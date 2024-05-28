package br.com.gerenciadorcertificadoapi.services;

import br.com.gerenciadorcertificadoapi.config.jwt.AccessToken;
import br.com.gerenciadorcertificadoapi.models.User;

public interface UserService {

    User getByEmail(String email);
    User save(User user);
    AccessToken authenticate(String email, String password);
}
