package br.com.fiap.quaisquerocio.dtos;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.com.fiap.quaisquerocio.entities.LocalPartida;

public class LocalPartidaDto implements BaseDto {

	public LocalPartidaDto(Integer id) {
		this.id = id;
	}
	
	public LocalPartidaDto() {}
	
	private Integer id;
	
	@NotEmpty(message = "Campo nome não pode ser vazio.")
	private String nome;
	
	@NotEmpty(message = "Campo rua não pode ser vazio.")
	private String rua;
	
	@NotNull(message = "Campo numero não pode ser vazio.")
	private Integer numero;
	
	private String complemento;
	
	@NotEmpty(message = "Campo cep não pode ser vazio.")
	private String cep;
	
	@NotEmpty(message = "Campo bairro não pode ser vazio.")
	private String bairro;
	
	@NotEmpty(message = "Campo cidade não pode ser vazio.")
	private String cidade = "São Paulo";
	
	@NotEmpty(message = "Campo estado não pode ser vazio.")
	private String estado = "SP";
	
	@Override
	public Integer getId() {
		return id;
	}
	
	@Override
	public void setId(Integer id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getRua() {
		return rua;
	}

	public void setRua(String rua) {
		this.rua = rua;
	}

	public Integer getNumero() {
		return numero;
	}

	public void setNumero(Integer numero) {
		this.numero = numero;
	}

	public String getComplemento() {
		return complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}
	
	@JsonIgnore
	public LocalPartida getLocalPartidaEntity() {
		LocalPartida localPartida = new LocalPartida();
		localPartida.setNome(this.nome);
		localPartida.setRua(this.rua);
		localPartida.setNumero(this.numero);
		localPartida.setComplemento(this.complemento);
		localPartida.setCep(this.cep);
		localPartida.setBairro(this.bairro);
		localPartida.setCidade(this.cidade);
		localPartida.setEstado(this.estado);
		return localPartida;
	}
	
	@JsonIgnore
	public static List<LocalPartidaDto> parseToListDto(List<LocalPartida> lista) {
		
		List<LocalPartidaDto> listaDto = new ArrayList<LocalPartidaDto>();
		lista.forEach(local -> {
			listaDto.add(parseToDto(local));
		});
		return listaDto;
	}
	
	@JsonIgnore
	public static LocalPartidaDto parseToDto(LocalPartida local) {
		if (local != null) {
			LocalPartidaDto localPartidaDto = new LocalPartidaDto();
			localPartidaDto.setId(local.getId());
			localPartidaDto.setNome(local.getNome());
			localPartidaDto.setRua(local.getRua());
			localPartidaDto.setNumero(local.getNumero());
			localPartidaDto.setComplemento(local.getComplemento());
			localPartidaDto.setCep(local.getCep());
			localPartidaDto.setBairro(local.getBairro());
			localPartidaDto.setCidade(local.getCidade());
			localPartidaDto.setEstado(local.getEstado());
			
			return localPartidaDto;			
		}
		return null;
	}

}
