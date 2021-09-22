package br.com.fiap.quaisquerocio.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import br.com.fiap.quaisquerocio.enuns.StatusPartidaEnum;

@Entity
@Table(name = "tb_partida")
public class Partida implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@Column(name =  "data_partida")
	private LocalDateTime dataPartida;
	
	@Column(name = "placar_equipe_mandante")
	private Integer placarEquipeMandante;
	
	@Column(name = "placar_equipe_visitante")
	private Integer placarEquipeVisitante;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "status_partida")
	private StatusPartidaEnum status;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "equipe_mandante_id")
	private Equipe mandante;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "equipe_visitante_id")
	private Equipe visitante;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "local_partida_id")
	private LocalPartida localPartida;
	
	@Column(name =  "data_cadastro")
	private LocalDate dataCadastro;

	public Integer getId() {
		return id;
	}

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

	public StatusPartidaEnum getStatus() {
		return status;
	}

	public void setStatus(StatusPartidaEnum status) {
		this.status = status;
	}

	public Equipe getMandante() {
		return mandante;
	}

	public void setMandante(Equipe mandante) {
		this.mandante = mandante;
	}

	public Equipe getVisitante() {
		return visitante;
	}

	public void setVisitante(Equipe visitante) {
		this.visitante = visitante;
	}

	public LocalPartida getLocalPartida() {
		return localPartida;
	}

	public void setLocalPartida(LocalPartida localPartida) {
		this.localPartida = localPartida;
	}

	public LocalDate getDataCadastro() {
		return dataCadastro;
	}

	public void setDataCadastro(LocalDate dataCadastro) {
		this.dataCadastro = dataCadastro;
	}

	@PrePersist
	public void prePersist() {
		this.dataCadastro = LocalDate.now();
	}
}
