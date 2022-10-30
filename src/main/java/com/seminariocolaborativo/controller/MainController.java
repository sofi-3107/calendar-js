package com.seminariocolaborativo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller	
public class MainController {
	
	
	
	@GetMapping("/")
	public String home() {
		
		return "home";
	}
	
	/*
	 *   @GetMapping("/{id}", produces = "application/json")
    public @ResponseBody Book getBook(@PathVariable int id) {
        return findBookById(id);
    }
*/

}
