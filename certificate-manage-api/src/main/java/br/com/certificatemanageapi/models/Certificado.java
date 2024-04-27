package br.com.certificatemanageapi.models;



import br.com.certificatemanageapi.utils.TipoCertificado;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Objects;

@Entity
public class Certificado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String razaoSocial;
    @Column(nullable = false)
    private String cnpj;
    @Column(nullable = false)
    private LocalDate dataEmissao;
    @Column(nullable = false)
    private LocalDate dataValidade;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TipoCertificado tipoCertificado;

    public Certificado() {}

    public Certificado(Long id, String razaoSocial, String cnpj, LocalDate dataEmissao, LocalDate dataValidade, TipoCertificado tipoCertificado) {
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

    public LocalDate getDataEmissao() {
        return dataEmissao;
    }

    public void setDataEmissao(LocalDate dataEmissao) {
        this.dataEmissao = dataEmissao;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
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
        if (!(o instanceof Certificado that)) return false;
        return Objects.equals(id, that.id) && Objects.equals(razaoSocial, that.razaoSocial) && Objects.equals(cnpj, that.cnpj) && Objects.equals(dataEmissao, that.dataEmissao) && Objects.equals(dataValidade, that.dataValidade) && tipoCertificado == that.tipoCertificado;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, razaoSocial, cnpj, dataEmissao, dataValidade, tipoCertificado);
    }

    @Override
    public String toString() {
        return "Certificado{" +
                "id='" + id + '\'' +
                ", razaoSocial='" + razaoSocial + '\'' +
                ", cnpj='" + cnpj + '\'' +
                ", dataEmissao=" + dataEmissao +
                ", dataValidade=" + dataValidade +
                ", tipoCertificado=" + tipoCertificado +
                '}';
    }
}
