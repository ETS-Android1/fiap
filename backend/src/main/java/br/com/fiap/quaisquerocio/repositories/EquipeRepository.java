package br.com.fiap.quaisquerocio.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.fiap.quaisquerocio.entities.Equipe;
import br.com.fiap.quaisquerocio.entities.Usuario;

public interface EquipeRepository extends JpaRepository<Equipe, Integer> {

	//@Query("SELECT e FROM Equipe e WHERE e.usuario.id = :id")
	public Equipe findByUsuario(Usuario usuario);
}
