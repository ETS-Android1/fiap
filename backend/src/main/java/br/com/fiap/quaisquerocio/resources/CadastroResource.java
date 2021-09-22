package br.com.fiap.quaisquerocio.resources;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.fiap.quaisquerocio.dtos.CriarUsuarioDto;
import br.com.fiap.quaisquerocio.entities.Usuario;
import br.com.fiap.quaisquerocio.repositories.UsuarioRepository;
import br.com.fiap.quaisquerocio.utils.Response;

@RestController
@RequestMapping("api/cadastro")
@CrossOrigin(origins = "*")
public class CadastroResource extends BaseResource<Usuario> {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@PostMapping
	public ResponseEntity<Response<CriarUsuarioDto>> createUsuario(@Valid @RequestBody 
																	CriarUsuarioDto criarUsuarioDto,
																	BindingResult result) {
		
		Response<CriarUsuarioDto> response = new Response<CriarUsuarioDto>();
		
		Usuario existUsuario = usuarioRepository.findByEmail(criarUsuarioDto.getEmail());
		if (existUsuario != null) {
			result.addError(
					new ObjectError("Cadastrar usuário", "Já existe um usuário cadastrado com este e-mail"));
		}
		
		if (result.hasErrors()) {
			result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
			return ResponseEntity.badRequest().body(response);
		}
		
		Usuario usuario = usuarioRepository.save(criarUsuarioDto.getUsuarioEntity());
		criarUsuarioDto.setId(usuario.getId());
		response.setData(criarUsuarioDto);
		
		return ResponseEntity.ok(response);
	}
	
	
}
