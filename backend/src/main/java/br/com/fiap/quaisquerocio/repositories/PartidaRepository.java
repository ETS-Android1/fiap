package br.com.fiap.quaisquerocio.repositories;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.fiap.quaisquerocio.entities.Equipe;
import br.com.fiap.quaisquerocio.entities.Partida;
import br.com.fiap.quaisquerocio.entities.Usuario;
import br.com.fiap.quaisquerocio.enuns.StatusPartidaEnum;

public interface PartidaRepository extends JpaRepository<Partida, Integer> {

	@Query("SELECT p FROM Partida p WHERE"
			+ " p.mandante <> :mandante"
			+ " and p.status = :status"
			+ " and p.dataPartida BETWEEN :init AND :end")
	public List<Partida> burcarPartidasParaMarcar(@Param("mandante") Equipe mandante, 
													@Param("status") StatusPartidaEnum status,
													@Param("init") LocalDateTime init,
													@Param("end") LocalDateTime end);
	
	@Query("SELECT p FROM Partida p WHERE"
			+ " (p.mandante = :equipe OR p.visitante = :equipe)"
			+ " and (:status is null OR p.status = :status)")
	public List<Partida> filter(@Param("equipe") Equipe equipe, @Param("status") StatusPartidaEnum status);
	
	@Query("SELECT p FROM Partida p WHERE"
			+ " (p.mandante = :equipe OR p.visitante = :equipe)")
	public List<Partida> listaPorEquipe(@Param("equipe") Equipe equipe);
	
}
