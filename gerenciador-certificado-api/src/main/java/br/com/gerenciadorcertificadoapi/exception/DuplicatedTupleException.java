package br.com.gerenciadorcertificadoapi.exception;

public class DuplicatedTupleException extends RuntimeException{
    public DuplicatedTupleException(String message) {
        super(message);
    }
}
