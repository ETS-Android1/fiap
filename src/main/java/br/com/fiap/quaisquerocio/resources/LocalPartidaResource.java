package br.com.fiap.quaisquerocio.resources;

import java.util.List;

import javax.validation.Valid;
import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.fiap.quaisquerocio.dtos.LocalPartidaDto;
import br.com.fiap.quaisquerocio.entities.LocalPartida;
import br.com.fiap.quaisquerocio.entities.Usuario;
import br.com.fiap.quaisquerocio.repositories.LocalPartidaRepository;
import br.com.fiap.quaisquerocio.security.UserHelper;
import br.com.fiap.quaisquerocio.utils.Response;

@RestController
@RequestMapping("api/local")
@CrossOrigin(origins = "*")
public class LocalPartidaResource  extends BaseResource<LocalPartida> {
	
	@Autowired
	private UserHelper userHelper;
	
	@Autowired
	private LocalPartidaRepository localPartidaRepository;
	
	@GetMapping
	public ResponseEntity<Response<List<LocalPartidaDto>>> getListByUsuario() {
	
		Response<List<LocalPartidaDto>> response = new Response<List<LocalPartidaDto>>();
		Usuario usuario = userHelper.getUserLogged();
		
		List<LocalPartida> locais = localPartidaRepository.findByUsuario(usuario);
		response.setData(LocalPartidaDto.parseToListDto(locais));
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Response<LocalPartidaDto>> getByUsuario(@PathVariable("id") Integer id) {
	
		Response<LocalPartidaDto> response = new Response<LocalPartidaDto>();
		Usuario usuario = userHelper.getUserLogged();
		
		LocalPartida local = localPartidaRepository.findLocalPartida(id, usuario);
		if (local == null) {
			response.getErrors().add("Não encontrado. Local de partida não encontrado");
			return ResponseEntity.badRequest().body(response);
		}
		
		response.setData(LocalPartidaDto.parseToDto(local));
		return ResponseEntity.ok(response);
	}
	
	@PostMapping
	public ResponseEntity<Response<LocalPartidaDto>> criar(@Valid @RequestBody LocalPartidaDto localPartidaDto, BindingResult result) {
	
		Response<LocalPartidaDto> response = new Response<LocalPartidaDto>();
		
		if (result.hasErrors()) {
			result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
			return ResponseEntity.badRequest().body(response);
		}
		
		Usuario usuario = userHelper.getUserLogged();
		
		LocalPartida localPartida = localPartidaDto.getLocalPartidaEntity();
		localPartida.setUsuario(usuario);
		localPartidaRepository.save(localPartida);
		
		localPartidaDto.setId(localPartida.getId());
		response.setData(localPartidaDto);
		return ResponseEntity.ok(response);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Response<LocalPartidaDto>> atualizar(@PathVariable("id") Integer id, @Valid @RequestBody LocalPartidaDto localPartidaDto, BindingResult result) {
	
		Response<LocalPartidaDto> response = new Response<LocalPartidaDto>();
		Usuario usuario = userHelper.getUserLogged();
		
		LocalPartida savedLocal = localPartidaRepository.findLocalPartida(id, usuario);
		if (savedLocal == null) {
			response.getErrors().add("Não encontrado! Local de partida não encontrado.");
			return ResponseEntity.badRequest().body(response);
		}
		
		LocalPartida localPartida = localPartidaDto.getLocalPartidaEntity();
		localPartida.setId(savedLocal.getId());
		localPartida.setDataCadastro(savedLocal.getDataCadastro());
		localPartida.setUsuario(usuario);
		localPartidaRepository.save(localPartida);
		
		response.setData(LocalPartidaDto.parseToDto(localPartida));
		return ResponseEntity.ok(response);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Response<String>> delete(@PathVariable("id") Integer id) {
	
		Response<String> response = new Response<String>();
		Usuario usuario = userHelper.getUserLogged();
		
		LocalPartida local = localPartidaRepository.findLocalPartida(id, usuario);
		if (local == null) {
			response.getErrors().add("Não encontrado. Local de partida não encontrado");
			return ResponseEntity.badRequest().body(response);
		}
		
		localPartidaRepository.delete(local);
		response.setData("Excluido com sucesso!");
		return ResponseEntity.ok(response);
	}

}
