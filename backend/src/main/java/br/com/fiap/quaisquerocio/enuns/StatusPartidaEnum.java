package br.com.fiap.quaisquerocio.enuns;

public enum StatusPartidaEnum {

	CRIADA,
	AGUARDANDO_CONFIRMACAO,
	CONFIRMADA,
	REALIZADA,
	PLACAR_CONFIRMADO,
	CANCELADA;
	
	public static StatusPartidaEnum getByString(String value) {
		try {
			return StatusPartidaEnum.valueOf(value.toUpperCase());
		} catch (Exception e) {
			return null;
		}
	}
}
