package com.seminariocolaborativo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.seminariocolaborativo.models.Evento;
import com.seminariocolaborativo.repository.EventoRepository;

@Controller	
public class MainController {
	

	
	@GetMapping("/")
	public String home(Model model) {
		model.addAttribute("evento",new Evento());
		return "home";
	}
	

	
	@PostMapping("/save-evento")
	public String crearEvento(@ModelAttribute("evento")Evento evento,RedirectAttributes redAttr) {
		
		return null;
	}
	

}
