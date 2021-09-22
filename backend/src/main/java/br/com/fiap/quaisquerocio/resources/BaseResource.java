package br.com.fiap.quaisquerocio.resources;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import br.com.fiap.quaisquerocio.utils.Response;

public class BaseResource<T> {

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<Object> handleValidationExceptions(
			HttpMessageNotReadableException ex) {
		final Response<T> response = new Response<T>();
		
		Throwable mostSpecificCause = ex.getMostSpecificCause();
        if (mostSpecificCause != null) {
            String message = mostSpecificCause.getMessage();
            response.getErrors().add(message);
        } else {
        	response.getErrors().add(ex.getMessage());
        }
	    return ResponseEntity.badRequest().body(response);
	}
}
