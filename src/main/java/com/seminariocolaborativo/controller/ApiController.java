package com.seminariocolaborativo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	public ResponseEntity<String> saveEvento(@RequestBody Evento evento) {
		if(evento.getStart()==null || evento.getTitle()=="") {
			return new ResponseEntity("No existe titulo o fecha de inicio",HttpStatus.BAD_REQUEST);
		}
		evRep.save(evento);
		return ResponseEntity.ok("guardado correctamente");
	}
	
	
	@DeleteMapping("/deleteEvento/{id}")
	public ResponseEntity deleteEvento(@PathVariable int id) {
		Evento e=evRep.findById(id).get();
		evRep.delete(e);
		return  ResponseEntity.ok("eliminado correctamente");
	}
	
	
	@PutMapping("/update")
	public Evento updateEvento(@RequestBody Evento evento) {
		System.out.println("update: "+ evento.getTitle());
		Evento e =evRep.findById(evento.getId()).get();
		e.setAutor(evento.getAutor());
		e.setDescription(evento.getDescription());
		e.setStart(evento.getStart());
		e.setEnd(evento.getEnd());
		e.setTitle(evento.getTitle());
		
		return evRep.save(e);
	}
}
