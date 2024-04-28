package br.com.gerenciadorcertificadoapi.data.vo;

import br.com.gerenciadorcertificadoapi.models.enums.TipoCertificado;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"UUID", "nome", "cpf", "dataEmisao", "dataVencimento", "tipoCertificado"})
public class CertificadoPFVO {


    private String UUID;
    private String nome;
    private String cpf;
    private String dataEmisao;
    private String dataVencimento;
    private TipoCertificado tipoCertificado;

    public CertificadoPFVO() {
        this.tipoCertificado = TipoCertificado.PF;
    }

    public CertificadoPFVO(String UUID, String nome, String cpf, String dataEmisao, String dataVencimento) {
        this.UUID = UUID;
        this.nome = nome;
        this.cpf = cpf;
        this.dataEmisao = dataEmisao;
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

    public TipoCertificado getTipoCertificado() {
        return tipoCertificado;
    }

    public void setTipoCertificado(TipoCertificado tipoCertificado) {
        this.tipoCertificado = tipoCertificado;
    }
}
