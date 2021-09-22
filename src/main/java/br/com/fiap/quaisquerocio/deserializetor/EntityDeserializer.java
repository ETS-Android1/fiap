package br.com.fiap.quaisquerocio.deserializetor;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import br.com.fiap.quaisquerocio.dtos.BaseDto;
import br.com.fiap.quaisquerocio.dtos.LocalPartidaDto;
import br.com.fiap.quaisquerocio.entities.LocalPartida;
import br.com.fiap.quaisquerocio.repositories.EquipeRepository;
import br.com.fiap.quaisquerocio.repositories.LocalPartidaRepository;
import br.com.fiap.quaisquerocio.repositories.PartidaRepository;
import br.com.fiap.quaisquerocio.security.UserHelper;


public class EntityDeserializer extends StdDeserializer<BaseDto> {

	@Autowired
	private LocalPartidaRepository localPartidaRepository;
	
	@Autowired 
	private PartidaRepository partidaRepository;
	
	@Autowired
	private EquipeRepository equipeRepository;
	
	@Autowired
	private UserHelper userHelper;
	
	protected EntityDeserializer() {
		this(null);
	}

	protected EntityDeserializer(Class<?> vc) {
		super(vc);
	}

	private static final long serialVersionUID = 1L;

	@Override
	public BaseDto deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
		JsonNode node = jp.getCodec().readTree(jp);
		
		try {
			
			switch (jp.currentName()) {
			case "localPartida":
				LocalPartida localPartida = localPartidaRepository.findLocalPartida(node.asInt(), userHelper.getUserLogged());
				if (localPartida == null ) {
					throw new CustomDeserializatorException("Local partida não encontrada.");
				}
				return LocalPartidaDto.parseToDto(localPartida);
			default:
				throw new CustomDeserializatorException("Entity not found");
			}
		} catch (Exception e) {
			throw new CustomDeserializatorException(e.getMessage());
		}
	}

}
