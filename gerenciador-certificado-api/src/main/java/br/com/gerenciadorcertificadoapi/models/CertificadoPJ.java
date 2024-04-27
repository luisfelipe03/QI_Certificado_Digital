package br.com.gerenciadorcertificadoapi.models;

import br.com.gerenciadorcertificadoapi.models.enums.TipoCertificado;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CertificadoPJ {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String UUID;
    private String razaoSocial;
    private String cnpj;
    private String dataEmisao;
    private String dataVencimento;
    private TipoCertificado tipoCertificado;

    public CertificadoPJ() {
    }

    public CertificadoPJ(String UUID, String razaoSocial, String cnpj, String dataEmisao, String dataVencimento) {
        this.UUID = UUID;
        this.razaoSocial = razaoSocial;
        this.cnpj = cnpj;
        this.dataEmisao = dataEmisao;
        this.dataVencimento = dataVencimento;
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

    public String getDataEmisao() {
        return dataEmisao;
    }

    public void setDataEmisao(String dataEmisao) {
        this.dataEmisao = dataEmisao;
    }

    public String getDataVencimento() {
        return dataVencimento;
    }

    public void setDataVencimento(String dataVencimento) {
        this.dataVencimento = dataVencimento;
    }
}
