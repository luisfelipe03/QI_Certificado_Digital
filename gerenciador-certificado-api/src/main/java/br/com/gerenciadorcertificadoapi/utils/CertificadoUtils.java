package br.com.gerenciadorcertificadoapi.utils;

import br.com.gerenciadorcertificadoapi.data.vo.CertificadoPFVO;
import br.com.gerenciadorcertificadoapi.data.vo.CertificadoPJVO;
import br.com.gerenciadorcertificadoapi.models.CertificadoPF;
import br.com.gerenciadorcertificadoapi.models.CertificadoPJ;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class CertificadoUtils {

    public static X509Certificate carregarCertificado(byte[] arquivo, String senha) throws CertificateException, IOException, KeyStoreException, NoSuchAlgorithmException, UnrecoverableKeyException, CertificateException, IOException, NoSuchAlgorithmException, KeyStoreException {
        KeyStore keyStore = KeyStore.getInstance("PKCS12");
        ByteArrayInputStream inputStream = new ByteArrayInputStream(arquivo);
        keyStore.load(inputStream, senha.toCharArray());
        String alias = keyStore.aliases().nextElement();
        return (X509Certificate) keyStore.getCertificate(alias);
    }

    public static String extrairCPF(X509Certificate certificado) {
        String cpf = null;

        // Obter o campo Subject do certificado
        String subject = certificado.getSubjectX500Principal().getName();

        // Procurar pelo campo CN (Common Name)
        int posicaoInicio = subject.indexOf("CN="); // Encontrar o início do campo CN
        if (posicaoInicio != -1) {
            int posicaoFim = subject.indexOf(",", posicaoInicio); // Encontrar o fim do campo CN
            if (posicaoFim != -1) {
                // Extrair o campo CN
                String campoCN = subject.substring(posicaoInicio, posicaoFim);
                // Extrair o CPF após os ":"
                int posicaoDoisPontos = campoCN.indexOf(":");
                if (posicaoDoisPontos != -1) {
                    cpf = campoCN.substring(posicaoDoisPontos + 1).trim();

                    // Formatar o CPF no estilo xxx.xxx.xxx-xx
                    cpf = String.format("%s.%s.%s-%s", cpf.substring(0, 3), cpf.substring(3, 6),
                            cpf.substring(6, 9), cpf.substring(9));
                }
            }
        }

        return cpf;
    }

    public static String extrairCNPJ(X509Certificate certificado) {
        String cnpj = null;

        // Obter o campo Subject do certificado
        String subject = certificado.getSubjectX500Principal().getName();

        // Procurar pelo caractere ":" para identificar o início do CNPJ
        int posicaoDoisPontos = subject.indexOf(":");
        if (posicaoDoisPontos != -1) {
            // Extrair o CNPJ após os ":"
            cnpj = subject.substring(posicaoDoisPontos + 1).trim();

            // Encontrar a posição da primeira vírgula após o CNPJ
            int posicaoVirgula = cnpj.indexOf(",");
            if (posicaoVirgula != -1) {
                // Substring apenas até a primeira vírgula para remover informações adicionais
                cnpj = cnpj.substring(0, posicaoVirgula);
            }

            // Formatar o CNPJ
            cnpj = String.format("%s.%s.%s/%s-%s", cnpj.substring(0, 2), cnpj.substring(2, 5),
                    cnpj.substring(5, 8), cnpj.substring(8, 12), cnpj.substring(12));
        }

        return cnpj;
    }



    public static String extrairRazaoSocial(X509Certificate certificado) {
        String razaoSocial = null;

        // Obter o campo Subject do certificado
        String subject = certificado.getSubjectX500Principal().getName();

        // Procurar pelo campo CN (Common Name)
        int posicaoCN = subject.indexOf("CN="); // Encontrar o início do campo CN
        if (posicaoCN != -1) {
            int posicaoFim = subject.indexOf(":", posicaoCN); // Encontrar o fim do campo CN
            if (posicaoFim != -1) {
                // Extrair o campo CN
                razaoSocial = subject.substring(posicaoCN + 3, posicaoFim); // +3 para ignorar o "CN="
            }
        }

        return razaoSocial;
    }

    public static String extrairNomePF(X509Certificate certificado) {
        String nomeProprietario = null;
        String subjectDN = certificado.getSubjectX500Principal().getName();
        int posicaoInicio = subjectDN.indexOf("CN="); // Encontrar o início do campo CN
        if (posicaoInicio != -1) {
            int posicaoFim = subjectDN.indexOf(":", posicaoInicio); // Encontrar o fim do campo CN
            if (posicaoFim != -1) {
                // Extrair o campo CN
                nomeProprietario = subjectDN.substring(posicaoInicio + 3, posicaoFim).trim();
            } else {
                // Se não houver ":", significa que é o último campo
                nomeProprietario = subjectDN.substring(posicaoInicio + 3).trim();
            }
        }
        return nomeProprietario;
    }



    public static LocalDate extrairDataEmissao(X509Certificate certificado) {
        return certificado.getNotBefore().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    }

    public static LocalDate extrairDataVencimento(X509Certificate certificado) {
        return certificado.getNotAfter().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

    }

    public static boolean isCertificadoPessoaFisica(X509Certificate certificado) {
        String cpf = null;

        // Obter o campo Subject do certificado
        String subject = certificado.getSubjectX500Principal().getName();

        // Procurar pelo campo CN (Common Name)
        int posicaoInicio = subject.indexOf("CN="); // Encontrar o início do campo CN
        if (posicaoInicio != -1) {
            int posicaoFim = subject.indexOf(",", posicaoInicio); // Encontrar o fim do campo CN
            if (posicaoFim != -1) {
                // Extrair o campo CN
                String campoCN = subject.substring(posicaoInicio, posicaoFim);
                // Extrair o CPF após os ":"
                int posicaoDoisPontos = campoCN.indexOf(":");
                if (posicaoDoisPontos != -1) {
                    cpf = campoCN.substring(posicaoDoisPontos + 1).trim();
                }
            }
        }
        return cpf != null && cpf.length() == 11;
    }

    public static boolean isCertificadoPessoaJuridica(X509Certificate certificado) {
        String cnpj = null;

        // Obter o campo Subject do certificado
        String subject = certificado.getSubjectX500Principal().getName();

        // Procurar pelo caractere ":" para identificar o início do CNPJ
        int posicaoDoisPontos = subject.indexOf(":");
        if (posicaoDoisPontos != -1) {
            // Extrair o CNPJ após os ":"
            cnpj = subject.substring(posicaoDoisPontos + 1).trim();

            // Encontrar a posição da primeira vírgula após o CNPJ
            int posicaoVirgula = cnpj.indexOf(",");
            if (posicaoVirgula != -1) {
                // Substring apenas até a primeira vírgula para remover informações adicionais
                cnpj = cnpj.substring(0, posicaoVirgula);
            }
        }
        return cnpj != null && cnpj.length() == 14;
    }

    public static boolean isValido(X509Certificate certificado) {
        return certificado.getNotAfter().after(new Date());
    }

    public static  boolean isValidoPJ(CertificadoPJ certificado) {
        return certificado.getDataVencimento().isAfter(LocalDate.now());
    }

    public static  boolean isValidoPF(CertificadoPF certificado) {
        return certificado.getDataVencimento().isAfter(LocalDate.now());
    }
}
