package br.com.gerenciadorcertificadoapi.data.vo;

import br.com.gerenciadorcertificadoapi.models.enums.TipoCertificado;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.util.Objects;

public class CertificadoPJVO {

    private String UUID;
    private String razaoSocial;
    private String cnpj;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataEmissao;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataVencimento;
    private TipoCertificado tipoCertificado;
    private boolean isValido = false;

    public CertificadoPJVO() {
    }

    public CertificadoPJVO(String UUID, String razaoSocial, String cnpj, LocalDate dataEmissao, LocalDate dataVencimento, TipoCertificado tipoCertificado, boolean isValido) {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CertificadoPJVO that)) return false;
        return isValido == that.isValido && Objects.equals(UUID, that.UUID) && Objects.equals(razaoSocial, that.razaoSocial) && Objects.equals(cnpj, that.cnpj) && Objects.equals(dataEmissao, that.dataEmissao) && Objects.equals(dataVencimento, that.dataVencimento) && tipoCertificado == that.tipoCertificado;
    }

    @Override
    public int hashCode() {
        return Objects.hash(UUID, razaoSocial, cnpj, dataEmissao, dataVencimento, tipoCertificado, isValido);
    }
}
