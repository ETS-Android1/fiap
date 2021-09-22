package br.com.fiap.quaisquerocio.dtos;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import br.com.fiap.quaisquerocio.annotations.EnumValidator;
import br.com.fiap.quaisquerocio.entities.Equipe;
import br.com.fiap.quaisquerocio.entities.Usuario;
import br.com.fiap.quaisquerocio.enuns.CategoriaEnum;
import br.com.fiap.quaisquerocio.enuns.EsporteEnum;
import br.com.fiap.quaisquerocio.utils.PasswordUtils;

public class CriarUsuarioDto implements BaseDto {
	
	private static final long serialVersionUID = 1L;

	private Integer id;
	
	@EnumValidator(enumClass=EsporteEnum .class, ignoreCase=true, message = "Esporte inválido. (FUTEBOL, FUTSAL, SOCIETY)")
	private String esporte = "FUTEBOL";
	
	@EnumValidator(enumClass=CategoriaEnum.class, ignoreCase=true,  message = "Categoria inválida. (INFANTIL, INFANTO_JUVENI, JUVENIL, SPORT, VETEREANO, MASTER)")
	private String categoria = "SPORT";
	
	@NotEmpty(message = "Campo equipe não pode ser vazio.")
	private String equipe;
	
	@NotEmpty(message = "Campo nome não pode ser vazio.")
	private String nome;
	
	@NotEmpty(message = "Campo sobreNome não pode ser vazio.")
	private String sobreNome;
	
	@NotEmpty(message = "Campo email não pode ser vazio.")
	@Email(message = "Precisa de um e-mail valido")
	private String email;
	
	@NotEmpty(message = "Campo telefone não pode ser vazio.")
	private String telefone;
	
	@NotEmpty(message = "Campo senha não pode ser vazio.")
	@Length(min = 6, message = "E-mail deve conter mais que 6 caracteres.")
	@JsonProperty(access = Access.WRITE_ONLY)
	private String senha;
	
	@Override
	public Integer getId() {
		return id;
	}
	@Override
	public void setId(Integer id) {
		this.id = id;
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
	public String getEquipe() {
		return equipe;
	}
	public void setEquipe(String equipe) {
		this.equipe = equipe;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getSobreNome() {
		return sobreNome;
	}
	public void setSobreNome(String sobreNome) {
		this.sobreNome = sobreNome;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getTelefone() {
		return telefone;
	}
	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	
	@JsonIgnore
	public Usuario getUsuarioEntity() {
		Usuario usuario = new Usuario();
		usuario.setNome(this.nome);
		usuario.setEmail(this.email);
		usuario.setSobreNome(this.sobreNome);
		usuario.setTelefone(this.telefone);
		usuario.setSenha(PasswordUtils.gerarBCrypt(this.senha)); 
		
		Equipe equipe = new Equipe();
		equipe.setCategoria(CategoriaEnum.valueOf(this.categoria.toUpperCase()));
		equipe.setEsporte(EsporteEnum.valueOf(this.esporte.toUpperCase()));
		equipe.setNome(this.equipe);
		usuario.setEquipe(equipe);
		equipe.setUsuario(usuario);
		return usuario;
	}
}
