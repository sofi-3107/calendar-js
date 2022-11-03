package com.seminariocolaborativo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.seminariocolaborativo.models.Evento;
import com.seminariocolaborativo.repository.EventoRepository;

@RestController
public class ApiController {

	@Autowired
	EventoRepository evRep;

	@GetMapping("/all")
	public List<Evento>getEvents(){
		return (List<Evento>) evRep.findAll();
	}
	
	@PostMapping("/saveEvento")
	public ResponseEntity saveEvento(@RequestBody Evento evento) {
		//System.out.println(evento.toString());
		if(evento.getTitle()!=null) {
			evRep.save(evento);
			return ResponseEntity.ok("guardado correctamente");
		}else {
			return (ResponseEntity) ResponseEntity.status(HttpStatus.BAD_REQUEST);
		}		
	}
	
	
	@DeleteMapping("/deleteEvento/{id}")
	public ResponseEntity deleteEvento(@PathVariable int id) {
		Evento e=evRep.findById(id).get();
		evRep.delete(e);
		return  ResponseEntity.ok("eliminado correctamente");
	}
}
