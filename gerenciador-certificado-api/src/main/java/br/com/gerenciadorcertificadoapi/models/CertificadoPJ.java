package br.com.gerenciadorcertificadoapi.models;

import br.com.gerenciadorcertificadoapi.models.enums.TipoCertificado;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
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

    public CertificadoPJ() {
    }

    public CertificadoPJ(String UUID, String razaoSocial, String cnpj, LocalDate dataEmissao, LocalDate dataVencimento, TipoCertificado tipoCertificado, boolean isValido) {
        this.UUID = UUID;
        this.razaoSocial = razaoSocial;
        this.cnpj = cnpj;
        this.dataEmissao = dataEmissao;
        this.dataVencimento = dataVencimento;
        this.tipoCertificado = tipoCertificado;
        this.isValido = isValido;
    }

    public String getUUID() {
        return UUID;
    }

    public void setUUID(String UUID) {
        this.UUID = UUID;
    }

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
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
