package br.com.gerenciadorcertificadoapi.models;

import br.com.gerenciadorcertificadoapi.models.enums.TipoCertificado;
import jakarta.persistence.*;

@Entity
public class CertificadoPF {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String UUID;
    @Column(nullable = false, length = 100)
    private String nome;
    @Column(nullable = false, length = 14, unique = true)
    private String cpf;
    @Column(nullable = false, length = 10)
    private String dataEmissao;
    @Column(nullable = false, length = 10)
    private String dataVencimento;
    @Enumerated(EnumType.STRING)
    private TipoCertificado tipoCertificado;

    public CertificadoPF() {
    }

    public CertificadoPF(String UUID, String nome, String cpf, String dataEmissao, String dataVencimento) {
        this.UUID = UUID;
        this.nome = nome;
        this.cpf = cpf;
        this.dataEmissao = dataEmissao;
        this.dataVencimento = dataVencimento;
        tipoCertificado = TipoCertificado.PF;
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

    public String getDataEmissao() {
        return dataEmissao;
    }

    public void setDataEmissao(String dataEmisao) {
        this.dataEmissao = dataEmisao;
    }

    public String getDataVencimento() {
        return dataVencimento;
    }

    public void setDataVencimento(String dataVencimento) {
        this.dataVencimento = dataVencimento;
    }

    public TipoCertificado getTipoCertificado() {
        return tipoCertificado;
    }

    public void setTipoCertificado(TipoCertificado tipoCertificado) {
        this.tipoCertificado = tipoCertificado;
    }

}
