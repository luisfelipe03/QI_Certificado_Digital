package br.com.gerenciadorcertificadoapi.data.vo;

import br.com.gerenciadorcertificadoapi.models.enums.TipoCertificado;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.time.LocalDate;
import java.util.Objects;

@JsonPropertyOrder({"UUID", "nome", "cpf", "dataEmisao", "dataVencimento", "tipoCertificado"})
public class CertificadoPFVO {


    private String UUID;
    private String nome;
    private String cpf;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataEmissao;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataVencimento;
    private TipoCertificado tipoCertificado;
    private boolean isValido = false;

    public CertificadoPFVO() {
        this.tipoCertificado = TipoCertificado.PF;
    }

    public CertificadoPFVO(String UUID, String nome, String cpf, LocalDate dataEmissao, LocalDate dataVencimento, boolean isValido) {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CertificadoPFVO that)) return false;
        return isValido == that.isValido && Objects.equals(UUID, that.UUID) && Objects.equals(nome, that.nome) && Objects.equals(cpf, that.cpf) && Objects.equals(dataEmissao, that.dataEmissao) && Objects.equals(dataVencimento, that.dataVencimento) && tipoCertificado == that.tipoCertificado;
    }

    @Override
    public int hashCode() {
        return Objects.hash(UUID, nome, cpf, dataEmissao, dataVencimento, tipoCertificado, isValido);
    }
}
