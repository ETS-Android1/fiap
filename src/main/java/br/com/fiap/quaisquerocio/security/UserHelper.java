package br.com.fiap.quaisquerocio.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import br.com.fiap.quaisquerocio.entities.Usuario;
import br.com.fiap.quaisquerocio.repositories.UsuarioRepository;

@Component
public class UserHelper {

	@Autowired UsuarioRepository usuarioRepository;
	
	public Usuario getUserLogged() {
		
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		String username;
		if (principal instanceof UserDetails) {
		  username = ((UserDetails)principal).getUsername();
		} else {
		  username = principal.toString();
		}
		
		Usuario usuario = usuarioRepository.findByEmail(username);
		return usuario;
	}
}
