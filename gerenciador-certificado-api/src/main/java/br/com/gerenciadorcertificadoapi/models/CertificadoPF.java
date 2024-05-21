package br.com.gerenciadorcertificadoapi.models;

import br.com.gerenciadorcertificadoapi.models.enums.TipoCertificado;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class CertificadoPF {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String UUID;
    @Column(nullable = false, length = 100)
    private String nome;
    @Column(nullable = false, length = 14, unique = false)
    private String cpf;
    @Column(nullable = false, length = 10)
    private LocalDate dataEmissao;
    @Column(nullable = false, length = 10)
    private LocalDate dataVencimento;
    @Enumerated(EnumType.STRING)
    private TipoCertificado tipoCertificado;
    @Column(nullable = false)
    private boolean isValido = false;

    public CertificadoPF() {
    }

    public CertificadoPF(String UUID, String nome, String cpf, LocalDate dataEmissao, LocalDate dataVencimento, boolean isValido) {
        this.UUID = UUID;
        this.nome = nome;
        this.cpf = cpf;
        this.dataEmissao = dataEmissao;
        this.dataVencimento = dataVencimento;
        tipoCertificado = TipoCertificado.PF;
        this.isValido = isValido;
    }

    public String getUUID() {
        return UUID;
    }

    public void setUUID(String UUID) {
        this.UUID = UUID;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public LocalDate getDataEmissao() {
        return dataEmissao;
    }

    public void setDataEmissao(LocalDate dataEmissao) {
        this.dataEmissao = dataEmissao;
    }

    public LocalDate getDataVencimento() {
        return dataVencimento;
    }

    public void setDataVencimento(LocalDate dataVencimento) {
        this.dataVencimento = dataVencimento;
    }

    public TipoCertificado getTipoCertificado() {
        return tipoCertificado;
    }

    public void setTipoCertificado(TipoCertificado tipoCertificado) {
        this.tipoCertificado = tipoCertificado;
    }

    public boolean isValido() {
        return isValido;
    }

    public void setValido(boolean isValido) {
        this.isValido = isValido;
    }

}
