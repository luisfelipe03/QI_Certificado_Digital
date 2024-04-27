package br.com.certificatemanageapi.data.vo;

import br.com.certificatemanageapi.utils.TipoCertificado;

import java.time.LocalDate;
import java.util.Objects;

public class CertificadoVO {

    private Long id;
    private String razaoSocial;
    private String cnpj;
    private LocalDate dataEmissao;
    private LocalDate dataValidade;
    private TipoCertificado tipoCertificado;

    public CertificadoVO() {}

    public CertificadoVO(Long id, String razaoSocial, String cnpj, LocalDate dataEmissao, LocalDate dataValidade, TipoCertificado tipoCertificado) {
        this.id = id;
        this.razaoSocial = razaoSocial;
        this.cnpj = cnpj;
        this.dataEmissao = dataEmissao;
        this.dataValidade = dataValidade;
        this.tipoCertificado = tipoCertificado;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDate getDataValidade() {
        return dataValidade;
    }

    public void setDataValidade(LocalDate dataValidade) {
        this.dataValidade = dataValidade;
    }

    public TipoCertificado getTipoCertificado() {
        return tipoCertificado;
    }

    public void setTipoCertificado(TipoCertificado tipoCertificado) {
        this.tipoCertificado = tipoCertificado;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CertificadoVO that)) return false;
        return Objects.equals(id, that.id) && Objects.equals(razaoSocial, that.razaoSocial) && Objects.equals(cnpj, that.cnpj) && Objects.equals(dataEmissao, that.dataEmissao) && Objects.equals(dataValidade, that.dataValidade) && tipoCertificado == that.tipoCertificado;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, razaoSocial, cnpj, dataEmissao, dataValidade, tipoCertificado);
    }

    @Override
    public String toString() {
        return "CertificadoVO{" +
                "id='" + id + '\'' +
                ", razaoSocial='" + razaoSocial + '\'' +
                ", cnpj='" + cnpj + '\'' +
                ", dataEmissao='" + dataEmissao + '\'' +
                ", dataValidade='" + dataValidade + '\'' +
                ", tipoCertificado=" + tipoCertificado +
                '}';
    }
}
