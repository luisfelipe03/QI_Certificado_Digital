package br.com.gerenciadorcertificadoapi.models;

import br.com.gerenciadorcertificadoapi.models.enums.TipoCertificado;
import jakarta.persistence.*;

@Entity
public class CertificadoPJ {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String UUID;
    @Column(nullable = false, length = 100)
    private String razaoSocial;
    @Column(nullable = false, length = 18, unique = true)
    private String cnpj;
    @Column(nullable = false, length = 10)
    private String dataEmissao;
    @Column(nullable = false, length = 10)
    private String dataVencimento;
    @Enumerated(EnumType.STRING)
    private TipoCertificado tipoCertificado;
    @Column(nullable = false)
    private boolean isValido = false;

    public CertificadoPJ() {
    }

    public CertificadoPJ(String UUID, String razaoSocial, String cnpj, String dataEmissao, String dataVencimento, TipoCertificado tipoCertificado, boolean isValido) {
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

    public boolean isValido() {
        return isValido;
    }

    public void setValido(boolean isValido) {
        this.isValido = isValido;
    }
}
