package br.com.fiap.quaisquerocio;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import br.com.fiap.quaisquerocio.utils.Response;

@ControllerAdvice
public class FileUploadHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler(MaxUploadSizeExceededException.class)
	public ResponseEntity<Response<Object>> handleMaxSizeException(MaxUploadSizeExceededException exc) {
		Response<Object> response = new Response<Object>();
		response.getErrors().add("Necessário uma partida válida.");
		return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(response);
	}
}
