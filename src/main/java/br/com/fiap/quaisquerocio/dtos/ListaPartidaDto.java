package br.com.fiap.quaisquerocio.dtos;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class ListaPartidaDto implements Serializable {
	
	private List<PartidaDto> proximas = new ArrayList<PartidaDto>();
	private List<PartidaDto> realizadas = new ArrayList<PartidaDto>();
	
	public List<PartidaDto> getProximas() {
		return proximas;
	}
	
	public List<PartidaDto> getRealizadas() {
		return realizadas;
	}

}
