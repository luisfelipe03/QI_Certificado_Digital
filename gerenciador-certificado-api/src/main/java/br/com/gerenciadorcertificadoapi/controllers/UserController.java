package br.com.gerenciadorcertificadoapi.controllers;

import br.com.gerenciadorcertificadoapi.data.vo.CredentialsDTO;
import br.com.gerenciadorcertificadoapi.data.vo.UserDTO;
import br.com.gerenciadorcertificadoapi.exception.DuplicatedTupleException;
import br.com.gerenciadorcertificadoapi.mapper.UserMapper;
import br.com.gerenciadorcertificadoapi.models.User;
import br.com.gerenciadorcertificadoapi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserService service;
    @Autowired
    UserMapper mapper;

    @PostMapping
    public ResponseEntity save(@RequestBody UserDTO dto) {
        try {
            User user = mapper.mapToUser(dto);
            user.setCreatedAt(LocalDateTime.now());
            service.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (DuplicatedTupleException e) {
            Map<String, String> json = Map.of("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(json);
        }
    }

    @PostMapping("/auth")
    public ResponseEntity authenticate(@RequestBody CredentialsDTO dto) {
        System.out.println(dto);
        var token = service.authenticate(dto.getEmail(), dto.getSenha());
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(token);
    }
}
