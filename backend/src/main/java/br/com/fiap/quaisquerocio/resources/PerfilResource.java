package br.com.fiap.quaisquerocio.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.fiap.quaisquerocio.dtos.EquipeDto;
import br.com.fiap.quaisquerocio.entities.Equipe;
import br.com.fiap.quaisquerocio.entities.Escudo;
import br.com.fiap.quaisquerocio.entities.LocalPartida;
import br.com.fiap.quaisquerocio.repositories.EquipeRepository;
import br.com.fiap.quaisquerocio.repositories.EscudoRepository;
import br.com.fiap.quaisquerocio.security.UserHelper;
import br.com.fiap.quaisquerocio.utils.Response;

@RestController
@RequestMapping("api/perfil")
@CrossOrigin(origins = "*")
public class PerfilResource extends BaseResource<LocalPartida> {

	@Autowired
	private UserHelper userHelper;

	@Autowired
	private EscudoRepository escudoRepository;

	@Autowired
	private EquipeRepository equipeRepository;

	@PostMapping("/upload")
	public ResponseEntity<Response<EquipeDto>> uploadFile(@RequestPart MultipartFile image) {
		Response<EquipeDto> response = new Response<EquipeDto>();
		try {

			String fileName = StringUtils.cleanPath(image.getOriginalFilename());
			Escudo escudo = new Escudo(fileName, image.getContentType(), image.getBytes());

			escudoRepository.save(escudo);
			
			Equipe equipe = userHelper.getUserLogged().getEquipe();
			equipe.setEscudo(escudo);
			equipeRepository.save(equipe);
			
			response.setData(EquipeDto.parteToDto(equipe));
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			response.getErrors().add("Erro ao fazer o upload do escudo.");
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	@GetMapping
	public ResponseEntity<Response<EquipeDto>> getEquipe() {
		Response<EquipeDto> response = new Response<EquipeDto>();
		Equipe equipe = userHelper.getUserLogged().getEquipe();
		response.setData(EquipeDto.parteToDto(equipe));
		return ResponseEntity.ok(response);
	}
}
