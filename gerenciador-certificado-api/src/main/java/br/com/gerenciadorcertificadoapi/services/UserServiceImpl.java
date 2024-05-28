package br.com.gerenciadorcertificadoapi.services;

import br.com.gerenciadorcertificadoapi.config.jwt.AccessToken;
import br.com.gerenciadorcertificadoapi.config.jwt.JwtService;
import br.com.gerenciadorcertificadoapi.exception.DuplicatedTupleException;
import br.com.gerenciadorcertificadoapi.models.User;
import br.com.gerenciadorcertificadoapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;

    @Override
    public User getByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    @Transactional
    public User save(User user) {
        var existingUser = getByEmail(user.getEmail());
        if(existingUser != null) {
            throw new DuplicatedTupleException("Usuário já cadastrado");
        }
        user.setSenha(passwordEncoder.encode(user.getSenha()));
        return repository.save(user);
    }

    @Override
    public AccessToken authenticate(String email, String password) {
        var user = getByEmail(email);
        if(user == null || !passwordEncoder.matches(password, user.getSenha())) {
            return null;
        }

        return jwtService.generateToken(user);
    }
}
