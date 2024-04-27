package br.com.certificatemanageapi.excepions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.UNAUTHORIZED)
public class AutenticacaoException extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	public AutenticacaoException(String message) {
		super(message);
	}

}
