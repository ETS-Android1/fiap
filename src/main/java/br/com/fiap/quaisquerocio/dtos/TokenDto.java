package br.com.fiap.quaisquerocio.dtos;

import java.io.Serializable;

public class TokenDto implements Serializable {

	private static final long serialVersionUID = 1L;

	public TokenDto () {};
	
	public TokenDto(String token) {
		this.token = token;
	}

	private String token;
	
	public void setToken(String token) {
		this.token = token;
	}
	
	public String getToken() {
		return token;
	}
}