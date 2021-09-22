package br.com.fiap.quaisquerocio.security;

import javax.naming.AuthenticationException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.fiap.quaisquerocio.dtos.JwtAuthenticationDto;
import br.com.fiap.quaisquerocio.dtos.TokenDto;
import br.com.fiap.quaisquerocio.entities.Usuario;
import br.com.fiap.quaisquerocio.repositories.UsuarioRepository;
import br.com.fiap.quaisquerocio.utils.Response;

@RestController
@RequestMapping("/api/login")
public class AuthenticationController {
	
	private static final String TOKEN_HEADER = "Authorization";
	private static final String BEARER_PREFIX = "Bearer ";
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@PostMapping
	public ResponseEntity<Response<TokenDto>> gerarTokenJwt(@Valid @RequestBody JwtAuthenticationDto authenticationDto,
																										BindingResult result) throws AuthenticationException {
		Response<TokenDto> response = new Response<TokenDto>();
		
		Usuario usuario = usuarioRepository.findByEmail(authenticationDto.getEmail());
		
		if (usuario == null) {
			result.addError(new ObjectError("Login", "E-mail não cadastrado no sistema."));
		} else {
			if (!usuario.getAtivo()) {
				result.addError(new ObjectError("Login", "Usuário nao está ativo."));
			}
		}
		
		if (result.hasErrors()) {
			result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
			return ResponseEntity.badRequest().body(response);
		}
		
		Authentication authentication = 
				authenticationManager.authenticate(
						new UsernamePasswordAuthenticationToken(authenticationDto.getEmail(), authenticationDto.getSenha()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationDto.getEmail());
		
		String token = jwtTokenUtil.obterToken(userDetails);
		response.setData(new TokenDto(token));
		return ResponseEntity.ok(response);
	}

}
