package br.com.fiap.quaisquerocio.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import br.com.fiap.quaisquerocio.enuns.CategoriaEnum;
import br.com.fiap.quaisquerocio.enuns.EsporteEnum;

@Entity
@Table(name = "tb_equipe")
public class Equipe {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id; 
	
	@Column(name = "nome")
	private String nome;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "esporte")
	private EsporteEnum esporte;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "categoria")
	private CategoriaEnum categoria;
	
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "usuario_id")
	private Usuario usuario;
	
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "escudo_id")
	private Escudo escudo;

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

	public EsporteEnum getEsporte() {
		return esporte;
	}

	public void setEsporte(EsporteEnum esporte) {
		this.esporte = esporte;
	}

	public CategoriaEnum getCategoria() {
		return categoria;
	}

	public void setCategoria(CategoriaEnum categoria) {
		this.categoria = categoria;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	
	public Escudo getEscudo() {
		return escudo;
	}
	
	public void setEscudo(Escudo escudo) {
		this.escudo = escudo;
	}

}
