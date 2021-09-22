package br.com.fiap.quaisquerocio.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.fiap.quaisquerocio.entities.LocalPartida;
import br.com.fiap.quaisquerocio.entities.Usuario;

public interface LocalPartidaRepository extends JpaRepository<LocalPartida, Integer> {
	
	public List<LocalPartida> findByUsuario(Usuario usuario);
	
	@Query("SELECT l FROM LocalPartida l WHERE l.usuario = :usuario and l.id = :id")
	public LocalPartida findLocalPartida(@Param("id")Integer id, @Param("usuario") Usuario usuario);

}
