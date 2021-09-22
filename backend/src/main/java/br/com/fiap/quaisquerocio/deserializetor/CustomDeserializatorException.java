package br.com.fiap.quaisquerocio.deserializetor;

import com.fasterxml.jackson.core.JsonProcessingException;

public class CustomDeserializatorException extends JsonProcessingException {
	public CustomDeserializatorException(String message) {
        super(message);
    }
}
