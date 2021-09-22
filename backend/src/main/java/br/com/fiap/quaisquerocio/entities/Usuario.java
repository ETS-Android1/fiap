package br.com.fiap.quaisquerocio.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import br.com.fiap.quaisquerocio.enuns.PerfilEnum;

@Entity
@Table(name = "tb_usuario")
public class Usuario implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id; 
	
	@Column(name = "nome")
	private String nome;
	
	@Column(name = "sobrenome")
	private String sobreNome;
	
	@Column(name = "senha")
	private String senha;
	
	@Column(name = "email")
	private String email;
	
	@Column(name =  "telefone")
	private String telefone;
	
	@Column(name = "ativo")
	private Boolean ativo = true;
	
	@Column(name =  "data_cadastro")
	private LocalDate dataCadastro;
	
	@Enumerated(EnumType.STRING)
	@Column(name =  "perfil")
	private PerfilEnum perfil = PerfilEnum.ROLE_USUARIO;
	
	@OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private Equipe equipe;
	
	@OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
	private List<LocalPartida> locaisPartidas = new ArrayList<LocalPartida>();

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public Boolean getAtivo() {
		return ativo;
	}

	public void setAtivo(Boolean ativo) {
		this.ativo = ativo;
	}

	public LocalDate getDataCadastro() {
		return dataCadastro;
	}

	public void setDataCadastro(LocalDate dataCadastro) {
		this.dataCadastro = dataCadastro;
	}

	public Equipe getEquipe() {
		return equipe;
	}
	
	public void setEquipe(Equipe equipe) {
		this.equipe = equipe;
	}
	
	public List<LocalPartida> getLocaisPartidas() {
		return locaisPartidas;
	}
	
	public void setLocaisPartidas(List<LocalPartida> locaisPartidas) {
		this.locaisPartidas = locaisPartidas;
	}
	
	public String getSenha() {
		return senha;
	}
	
	public void setSenha(String senha) {
		this.senha = senha;
	}
	
	public PerfilEnum getPerfil() {
		return perfil;
	}
	
	public void setPerfil(PerfilEnum perfil) {
		this.perfil = perfil;
	}

	@PrePersist
	public void prePersist() {
		this.dataCadastro = LocalDate.now();
	}
}
