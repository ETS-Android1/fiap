package br.com.fiap.quaisquerocio.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.fiap.quaisquerocio.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

	public Usuario findByEmail(String email);
}
