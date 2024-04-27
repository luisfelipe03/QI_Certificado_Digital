package br.com.gerenciadorcertificadoapi.utils;

import java.security.cert.X509Certificate;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class CertificadoUtils {

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

        // Procurar pelo campo OU (Organizational Unit) contendo o CNPJ
        int posicaoOU = subject.indexOf("OU=CNPJ=");
        if (posicaoOU != -1) {
            int posicaoFim = subject.indexOf(",", posicaoOU); // Encontrar o fim do campo OU
            if (posicaoFim != -1) {
                // Extrair o CNPJ
                cnpj = subject.substring(posicaoOU + 8, posicaoFim); // +8 para ignorar o "OU=CNPJ="
                // Formatar o CNPJ no estilo xx.xxx.xxx/xxxx-xx
                cnpj = String.format("%s.%s.%s/%s-%s", cnpj.substring(0, 2), cnpj.substring(2, 5),
                        cnpj.substring(5, 8), cnpj.substring(8, 12), cnpj.substring(12));
            }
        }

        return cnpj;
    }

    public static String extrairRazaoSocial(X509Certificate certificado) {
        String razaoSocial = null;

        // Obter o campo Subject do certificado
        String subject = certificado.getSubjectX500Principal().getName();

        // Procurar pelo campo OU (Organizational Unit)
        int posicaoOU = subject.indexOf("OU="); // Encontrar o início do campo OU
        if (posicaoOU != -1) {
            int posicaoFim = subject.indexOf(",", posicaoOU); // Encontrar o fim do campo OU
            if (posicaoFim != -1) {
                // Extrair o campo OU
                razaoSocial = subject.substring(posicaoOU + 3, posicaoFim); // +3 para ignorar o "OU="
            }
        }

        return razaoSocial;
    }

    public static String extrairNomePF(X509Certificate certificado) {
        String nomePF = null;

        // Obter o campo Subject do certificado
        String subject = certificado.getSubjectX500Principal().getName();

        // Procurar pelo campo CN (Common Name)
        int posicaoInicio = subject.indexOf("CN="); // Encontrar o início do campo CN
        if (posicaoInicio != -1) {
            int posicaoFim = subject.indexOf(",", posicaoInicio); // Encontrar o fim do campo CN
            if (posicaoFim != -1) {
                // Extrair o campo CN
                String campoCN = subject.substring(posicaoInicio, posicaoFim);
                // Extrair o nome após os ":" e remover possíveis espaços em branco
                int posicaoDoisPontos = campoCN.indexOf(":");
                if (posicaoDoisPontos != -1) {
                    nomePF = campoCN.substring(posicaoDoisPontos + 1).trim();
                }
            }
        }

        return nomePF;
    }

    public static String extrairDataEmissao(X509Certificate certificado) {
        LocalDate dataEmissao = certificado.getNotBefore().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        return formatarData(dataEmissao);
    }

    public static String extrairDataVencimento(X509Certificate certificado) {
        LocalDate dataVencimento = certificado.getNotAfter().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        return formatarData(dataVencimento);
    }

    private static String formatarData(LocalDate data) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return data.format(formatter);
    }
}
