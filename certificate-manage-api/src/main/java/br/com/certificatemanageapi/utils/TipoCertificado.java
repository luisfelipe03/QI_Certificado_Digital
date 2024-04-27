package br.com.certificatemanageapi.utils;

public enum TipoCertificado {
    MEI("Microempreendedor Individual"),
    LP("Lucro Presumido"),
    LR("Lucro Real"),
    SIMPLES("Simples Nacional"),
    PF("Pessoa Física");

    private final String descricao;

    TipoCertificado(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

    @Override
    public String toString() {
        return descricao;
    }
}
