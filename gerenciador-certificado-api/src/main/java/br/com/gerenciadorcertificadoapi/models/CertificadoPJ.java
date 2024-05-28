package br.com.gerenciadorcertificadoapi.models;

import br.com.gerenciadorcertificadoapi.models.enums.TipoCertificado;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CertificadoPJ {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String UUID;
    @Column(nullable = false, length = 100)
    private String razaoSocial;
    @Column(nullable = false, length = 18, unique = false)
    private String cnpj;
    @Column(nullable = false, length = 10)
    private LocalDate dataEmissao;
    @Column(nullable = false, length = 10)
    private LocalDate dataVencimento;
    @Enumerated(EnumType.STRING)
    private TipoCertificado tipoCertificado;
    @Column(nullable = false)
    private boolean isValido = false;

}
