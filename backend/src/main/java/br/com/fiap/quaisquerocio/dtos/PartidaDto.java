package br.com.fiap.quaisquerocio.dtos;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import br.com.fiap.quaisquerocio.deserializetor.EntityDeserializer;
import br.com.fiap.quaisquerocio.entities.Partida;


public class PartidaDto implements BaseDto {

	public PartidaDto() {}
	
	public PartidaDto(Integer id) {
		this.id = id;
	}

	private Integer id;
	
	@NotNull(message = "O campo dataPartida da partida é necessária.")
	@DateTimeFormat(pattern = "YYYY-MM-DD'T'hh:mm")
	private LocalDateTime dataPartida;
	
	private Integer placarEquipeMandante;
	
	private Integer placarEquipeVisitante;
	
	private String status;
	
	private EquipeDto mandante;
	
	private EquipeDto visitante;
	
	@NotNull(message = "O campo localPartida é necessário")
	@JsonDeserialize(using = EntityDeserializer.class)
	private LocalPartidaDto localPartida;
	
	@Override
	public Integer getId() {
		return id;
	}
	@Override
	public void setId(Integer id) {
		this.id = id;
	}

	public LocalDateTime getDataPartida() {
		return dataPartida;
	}

	public void setDataPartida(LocalDateTime dataPartida) {
		this.dataPartida = dataPartida;
	}

	public Integer getPlacarEquipeMandante() {
		return placarEquipeMandante;
	}

	public void setPlacarEquipeMandante(Integer placarEquipeMandante) {
		this.placarEquipeMandante = placarEquipeMandante;
	}

	public Integer getPlacarEquipeVisitante() {
		return placarEquipeVisitante;
	}

	public void setPlacarEquipeVisitante(Integer placarEquipeVisitante) {
		this.placarEquipeVisitante = placarEquipeVisitante;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public EquipeDto getMandante() {
		return mandante;
	}

	public void setMandante(EquipeDto mandante) {
		this.mandante = mandante;
	}

	public EquipeDto getVisitante() {
		return visitante;
	}

	public void setVisitante(EquipeDto visitante) {
		this.visitante = visitante;
	}

	public LocalPartidaDto getLocalPartida() {
		return localPartida;
	}

	public void setLocalPartida(LocalPartidaDto localPartida) {
		this.localPartida = localPartida;
	}
	
	@JsonIgnore
	public static PartidaDto parteToDto(Partida partida) {
		if (partida != null) {
			PartidaDto dto = new PartidaDto();
			dto.setId(partida.getId());
			dto.setLocalPartida(LocalPartidaDto.parseToDto(partida.getLocalPartida()));
			dto.setDataPartida(partida.getDataPartida());
			dto.setMandante(EquipeDto.parteToDto(partida.getMandante()));
			dto.setVisitante(EquipeDto.parteToDto(partida.getVisitante()));
			dto.setPlacarEquipeMandante(partida.getPlacarEquipeMandante());
			dto.setPlacarEquipeVisitante(partida.getPlacarEquipeVisitante());
			dto.setStatus(partida.getStatus().toString());
			return dto;
		}
		
		return null;
	}
	
	@JsonIgnore
	public static List<PartidaDto> parteToListDto(List<Partida> listaPartida) {
		List<PartidaDto> listaDto = new ArrayList<PartidaDto>();
		for (Partida partida : listaPartida) {
			listaDto.add(parteToDto(partida));
		}
		return listaDto;
	}

}
