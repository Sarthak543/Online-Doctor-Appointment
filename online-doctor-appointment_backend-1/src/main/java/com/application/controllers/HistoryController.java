package com.application.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.application.entity.History;
import com.application.services.HistoryService;

@RestController
public class HistoryController {
	
	@Autowired
	HistoryService service;
	
	/**
	 * Retrieve a list of history
	 * 
	 * @param id Appointment id
	 * @return a ResponseEntity containing a list of history
	 */
	@GetMapping(path="/getHistory/{id}")
	@CrossOrigin("http://localhost:3000/")
	public List<History> getHistoryByAppointmentNumber(@PathVariable("id") long id){
		return service.getHistoryByAppointmentNumber(id);
	}
}
