package br.com.fiap.quaisquerocio.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.com.fiap.quaisquerocio.entities.Equipe;
import br.com.fiap.quaisquerocio.enuns.CategoriaEnum;
import br.com.fiap.quaisquerocio.enuns.EsporteEnum;

public class EquipeDto implements BaseDto {

	public EquipeDto() {}
	public EquipeDto(Integer id) {
		this.id = id;
	}
	private Integer id;
	private String nome;
	private String esporte;
	private String  categoria;
	private String responsavel;
	private String telefone;
	private String nomeEscudo;
	private byte[] escudoByteArray;
	private String tipoByteArray;
	
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
	public String getEsporte() {
		return esporte;
	}
	public void setEsporte(String esporte) {
		this.esporte = esporte;
	}
	public String getCategoria() {
		return categoria;
	}
	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}
	public String getResponsavel() {
		return responsavel;
	}
	public String getTelefone() {
		return telefone;
	}
	public void setResponsavel(String responsavel) {
		this.responsavel = responsavel;
	}
	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}
	public String getNomeEscudo() {
		return nomeEscudo;
	}
	public void setNomeEscudo(String nomeEscudo) {
		this.nomeEscudo = nomeEscudo;
	}
	public byte[] getEscudoByteArray() {
		return escudoByteArray;
	}
	public void setEscudoByteArray(byte[] escudoByteArray) {
		this.escudoByteArray = escudoByteArray;
	}
	public String getTipoByteArray() {
		return tipoByteArray;
	}
	public void setTipoByteArray(String tipoByteArray) {
		this.tipoByteArray = tipoByteArray;
	}
	
	@JsonIgnore
	public Equipe getEquipeEntity() {
		Equipe equipe = new Equipe();
		equipe.setId(this.id);
		equipe.setCategoria(CategoriaEnum.valueOf(this.categoria));
		equipe.setEsporte(EsporteEnum.valueOf(this.esporte));
		equipe.setNome(this.nome);
		return equipe;
	}
	
	@JsonIgnore
	public static EquipeDto parteToDto(Equipe equipe) {
		if(equipe != null) {
			EquipeDto dto = new EquipeDto();
			dto.setId(equipe.getId());
			dto.setCategoria(equipe.getCategoria().toString());
			dto.setEsporte(equipe.getEsporte().toString());
			dto.setNome(equipe.getNome());
			dto.setResponsavel(equipe.getUsuario().getNome());
			dto.setTelefone(equipe.getUsuario().getTelefone());
			
			if (equipe.getEscudo() != null) {				
				dto.setEscudoByteArray(equipe.getEscudo().getData());
				dto.setTipoByteArray(equipe.getEscudo().getType());
				dto.setNomeEscudo(equipe.getEscudo().getName());
			}
			return dto;
		}
		
		return null;
	}
	
}
