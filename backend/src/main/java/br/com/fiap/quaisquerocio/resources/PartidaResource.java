package br.com.fiap.quaisquerocio.resources;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;
import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.fiap.quaisquerocio.annotations.EnumValidator;
import br.com.fiap.quaisquerocio.dtos.FiltroDto;
import br.com.fiap.quaisquerocio.dtos.ListaPartidaDto;
import br.com.fiap.quaisquerocio.dtos.LocalPartidaDto;
import br.com.fiap.quaisquerocio.dtos.PartidaDto;
import br.com.fiap.quaisquerocio.dtos.PlacarDto;
import br.com.fiap.quaisquerocio.entities.Equipe;
import br.com.fiap.quaisquerocio.entities.Partida;
import br.com.fiap.quaisquerocio.enuns.EsporteEnum;
import br.com.fiap.quaisquerocio.enuns.StatusPartidaEnum;
import br.com.fiap.quaisquerocio.repositories.EquipeRepository;
import br.com.fiap.quaisquerocio.repositories.LocalPartidaRepository;
import br.com.fiap.quaisquerocio.repositories.PartidaRepository;
import br.com.fiap.quaisquerocio.security.UserHelper;
import br.com.fiap.quaisquerocio.utils.Response;

@RestController
@RequestMapping("api/partida")
@CrossOrigin(origins = "*")
public class PartidaResource  extends BaseResource<Partida> {
	
	@Autowired
	private UserHelper userHelper;
	
	@Autowired
	private LocalPartidaRepository localPartidaRepository;
	
	@Autowired
	private PartidaRepository partidaRepository;
	
	@Autowired
	private EquipeRepository equipeRepository;
	
	@GetMapping
	public ResponseEntity<Response<List<PartidaDto>>> filter(@Valid
															 @PathParam("status") 
															 @EnumValidator(enumClass=StatusPartidaEnum .class, ignoreCase=true, message = "Status inválido. (CRIADA, AGUARDANDO_CONFIRMACAO, CONFIRMADA, REALIZADA, PLACAR_CONFIRMADO, CANCELADA)") 
															 String status) {
	
		Response<List<PartidaDto>> response = new Response<List<PartidaDto>>();
		
		List<Partida> filter = partidaRepository.filter(userHelper.getUserLogged().getEquipe(), StatusPartidaEnum.getByString(status));
		response.setData(PartidaDto.parteToListDto(filter));
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/lista/mandantes")
	public ResponseEntity<Response<List<PartidaDto>>> buscarPartidasDeMandantes(@RequestParam(required = false) LocalDate init, @RequestParam(required = false)  LocalDate end) {
	
		Response<List<PartidaDto>> response = new Response<List<PartidaDto>>();
		
		Equipe equipe = userHelper.getUserLogged().getEquipe();
		List<Partida> partidas = partidaRepository.burcarPartidasParaMarcar(equipe, StatusPartidaEnum.CRIADA, init != null ? init.atTime(0, 0) : LocalDateTime.of(2018, 1, 1, 0, 0), end != null ? end.atTime(23,59) : LocalDateTime.of(2040, 1, 1, 0, 0));
		response.setData(PartidaDto.parteToListDto(partidas));
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/lista")
	public ResponseEntity<Response<ListaPartidaDto>> filterList() {
	
		Response<ListaPartidaDto> response = new Response<ListaPartidaDto>();
		
		List<Partida> filter = partidaRepository.listaPorEquipe(userHelper.getUserLogged().getEquipe());
		
		ListaPartidaDto lista = new ListaPartidaDto();
		for (Partida partida : filter) {
			if (StatusPartidaEnum.REALIZADA.equals(partida.getStatus()) 
					|| StatusPartidaEnum.PLACAR_CONFIRMADO.equals(partida.getStatus())
						|| StatusPartidaEnum.CANCELADA.equals(partida.getStatus())) {
				lista.getRealizadas().add(PartidaDto.parteToDto(partida));
			} else {
				lista.getProximas().add(PartidaDto.parteToDto(partida));
			}
		}
		response.setData(lista);
		return ResponseEntity.ok(response);
	}
	
	@PostMapping
	public ResponseEntity<Response<PartidaDto>> criar(@Valid @RequestBody PartidaDto partidaDto, BindingResult result) {
		Response<PartidaDto> response = new Response<PartidaDto>();
		
		if (partidaDto.getDataPartida() == null) {
			result.addError(new ObjectError("Data de partida inválida!", "A data da partida precisa ser uma data valuda."));
		} else if (partidaDto.getDataPartida().isBefore(LocalDateTime.now())) {
			result.addError(new ObjectError("Data de partida inválida!", "A data da partida não pode ser uma data do passado."));
		}
		
		if (result.hasErrors()) {
			result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
			return ResponseEntity.badRequest().body(response);
		}
		
		Partida partida = new Partida();
		partida.setLocalPartida(localPartidaRepository.findLocalPartida(partidaDto.getLocalPartida().getId(), userHelper.getUserLogged()));
		partida.setDataPartida(partidaDto.getDataPartida());
		partida.setMandante(userHelper.getUserLogged().getEquipe());
		partida.setStatus(StatusPartidaEnum.CRIADA);
		partidaRepository.save(partida);
		
		response.setData(PartidaDto.parteToDto(partida));
		return ResponseEntity.ok(response);
		
	}
	
	@PutMapping("/{id}/marcar")
	public ResponseEntity<Response<PartidaDto>> marcar(@PathVariable("id") Integer id) {
		Response<PartidaDto> response = new Response<PartidaDto>();
		
		Optional<Partida> optional = partidaRepository.findById(id);
		Partida partida =  optional.isPresent() ? optional.get() : null;
		
		if (partida == null || 
				!StatusPartidaEnum.CRIADA.equals(partida.getStatus()) ||  
				partida.getMandante().getId() == userHelper.getUserLogged().getEquipe().getId()) {
			response.getErrors().add("Necessário uma partida válida.");
			return ResponseEntity.badRequest().body(response);
		}
		
		partida.setVisitante(userHelper.getUserLogged().getEquipe());
		partida.setStatus(StatusPartidaEnum.AGUARDANDO_CONFIRMACAO);
		partidaRepository.save(partida);
		
		response.setData(PartidaDto.parteToDto(partida));
		return ResponseEntity.ok(response);
		
	}
	
	@PutMapping("/{id}/cancelar")
	public ResponseEntity<Response<PartidaDto>> cancelar(@PathVariable("id") Integer id) {
		Response<PartidaDto> response = new Response<PartidaDto>();
		
		Optional<Partida> optional = partidaRepository.findById(id);
		Partida partida =  optional.isPresent() ? optional.get() : null;
		
		if (partida == null || 
				!StatusPartidaEnum.CRIADA.equals(partida.getStatus()) ||  
				partida.getMandante().getId() != userHelper.getUserLogged().getEquipe().getId()) {
			response.getErrors().add("Necessário uma partida válida.");
			return ResponseEntity.badRequest().body(response);
		}
		
		partida.setVisitante(null);
		partida.setStatus(StatusPartidaEnum.CANCELADA);
		partidaRepository.save(partida);
		
		response.setData(PartidaDto.parteToDto(partida));
		return ResponseEntity.ok(response);
		
	}
	
	@PutMapping("/{id}/marcar/cancelar")
	public ResponseEntity<Response<PartidaDto>> marcarCancelar(@PathVariable("id") Integer id) {
		Response<PartidaDto> response = new Response<PartidaDto>();
		
		Optional<Partida> optional = partidaRepository.findById(id);
		Partida partida =  optional.isPresent() ? optional.get() : null;
		
		if (partida == null || 
				!StatusPartidaEnum.AGUARDANDO_CONFIRMACAO.equals(partida.getStatus())) {
			response.getErrors().add("Necessário uma partida válida.");
			return ResponseEntity.badRequest().body(response);
		}
		
		partida.setVisitante(null);
		partida.setStatus(StatusPartidaEnum.CRIADA);
		partidaRepository.save(partida);
		
		response.setData(PartidaDto.parteToDto(partida));
		return ResponseEntity.ok(response);
		
	}
	
	@PutMapping("/{id}/confirmar")
	public ResponseEntity<Response<PartidaDto>> confirmar(@PathVariable("id") Integer id) {
		Response<PartidaDto> response = new Response<PartidaDto>();
		
		Optional<Partida> optional = partidaRepository.findById(id);
		Partida partida =  optional.isPresent() ? optional.get() : null;
		
		if (partida == null || 
				!StatusPartidaEnum.AGUARDANDO_CONFIRMACAO.equals(partida.getStatus()) || 
				partida.getMandante().getId() != userHelper.getUserLogged().getEquipe().getId()) {
			
			response.getErrors().add("Necessário uma partida válida.");
			return ResponseEntity.badRequest().body(response);
		}
		
		partida.setStatus(StatusPartidaEnum.CONFIRMADA);
		partidaRepository.save(partida);
		
		response.setData(PartidaDto.parteToDto(partida));
		return ResponseEntity.ok(response);
		
	}
	
	@PutMapping("/{id}/placar")
	public ResponseEntity<Response<PartidaDto>> placar(@PathVariable("id") Integer id, @RequestBody PlacarDto placar, BindingResult result) {
		Response<PartidaDto> response = new Response<PartidaDto>();
		
		if (result.hasErrors()) {
			result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
			return ResponseEntity.badRequest().body(response);
		}
		
		Optional<Partida> optional = partidaRepository.findById(id);
		Partida partida =  optional.isPresent() ? optional.get() : null;
		
		if (partida == null || 
				(!StatusPartidaEnum.CONFIRMADA.equals(partida.getStatus()) && 
				!StatusPartidaEnum.REALIZADA.equals(partida.getStatus())) ||
				partida.getMandante().getId() != userHelper.getUserLogged().getEquipe().getId()) {
			
			response.getErrors().add("Necessário uma partida válida.");
			return ResponseEntity.badRequest().body(response);
		}
		
		
		
		partida.setStatus(StatusPartidaEnum.REALIZADA);
		partida.setPlacarEquipeMandante(placar.getMandante());
		partida.setPlacarEquipeVisitante(placar.getVisitante());
		partidaRepository.save(partida);
		
		response.setData(PartidaDto.parteToDto(partida));
		return ResponseEntity.ok(response);
		
	}
	
	@PutMapping("/{id}/placar/confirmar")
	public ResponseEntity<Response<PartidaDto>> placarconfirma(@PathVariable("id") Integer id) {
		Response<PartidaDto> response = new Response<PartidaDto>();
		
		Optional<Partida> optional = partidaRepository.findById(id);
		Partida partida =  optional.isPresent() ? optional.get() : null;
		
		if (partida == null || 
				!StatusPartidaEnum.REALIZADA.equals(partida.getStatus()) ||
				partida.getMandante().getId() == userHelper.getUserLogged().getEquipe().getId()) {
			
			response.getErrors().add("Necessário uma partida válida.");
			return ResponseEntity.badRequest().body(response);
		}
		
		
		
		partida.setStatus(StatusPartidaEnum.PLACAR_CONFIRMADO);
		partidaRepository.save(partida);
		
		response.setData(PartidaDto.parteToDto(partida));
		return ResponseEntity.ok(response);
		
	}
	
	@GetMapping("/buscar/marcar")
	public ResponseEntity<Response<List<PartidaDto>>> buscarMarcar(@RequestParam LocalDate init, @RequestParam LocalDate end) {
		Response<List<PartidaDto>> response = new Response<List<PartidaDto>>();
		
		List<Partida> listaPArtidas = partidaRepository.burcarPartidasParaMarcar(userHelper.getUserLogged().getEquipe(), StatusPartidaEnum.CRIADA, init.atTime(0,0), end.atTime(23,59));
		response.setData(PartidaDto.parteToListDto(listaPArtidas));
		return ResponseEntity.ok(response);
		
	}

}
