package br.com.gerenciadorcertificadoapi.data.vo;

import br.com.gerenciadorcertificadoapi.models.enums.TipoCertificado;

public class CertificadoPJVO {

    private String UUID;
    private String razaoSocial;
    private String cnpj;
    private String dataEmissao;
    private String dataVencimento;
    private TipoCertificado tipoCertificado;

    public CertificadoPJVO() {
    }

    public CertificadoPJVO(String UUID, String razaoSocial, String cnpj, String dataEmissao, String dataVencimento, TipoCertificado tipoCertificado) {
        this.UUID = UUID;
        this.razaoSocial = razaoSocial;
        this.cnpj = cnpj;
        this.dataEmissao = dataEmissao;
        this.dataVencimento = dataVencimento;
        this.tipoCertificado = tipoCertificado;
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

    public void setDataEmissao(String dataEmissao) {
        this.dataEmissao = dataEmissao;
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
