package br.com.fiap.quaisquerocio.dtos;

import java.time.LocalDateTime;

import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

public class FiltroDto {

	@NotNull(message = "O campo dataPartida da partida é necessária.")
	@DateTimeFormat(pattern = "YYYY-MM-DD'T'hh:mm")
	private LocalDateTime de;
	
	@NotNull(message = "O campo dataPartida da partida é necessária.")
	@DateTimeFormat(pattern = "YYYY-MM-DD'T'hh:mm")
	private LocalDateTime ate;
	
	public LocalDateTime getDe() {
		return de;
	}
	
	public void setDe(LocalDateTime de) {
		this.de = de;
	}
	
	public LocalDateTime getAte() {
		return ate;
	}
	
	public void setAte(LocalDateTime ate) {
		this.ate = ate;
	}
}
