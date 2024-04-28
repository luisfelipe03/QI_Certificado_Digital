package br.com.gerenciadorcertificadoapi.excepions;

public class UniqueDocumentException extends RuntimeException {
    public UniqueDocumentException(String message) {
        super(message);
    }
}
