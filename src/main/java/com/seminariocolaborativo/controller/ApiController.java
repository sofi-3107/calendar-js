package com.seminariocolaborativo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
	
}
