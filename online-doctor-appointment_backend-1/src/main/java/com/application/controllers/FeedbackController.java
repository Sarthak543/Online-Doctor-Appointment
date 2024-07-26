package com.application.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.application.entity.FeedBack;
import com.application.services.FeedBackService;

@RestController
public class FeedbackController {

	@Autowired
	FeedBackService service;
	
    /**
     * Save user feedback.
     *
     * @param userType User type (e.g., patient, doctor)
     * @param userName User's name
     * @param message Feedback message
     * @param email User's email address
     */
	@PostMapping(value = "/saveFeedback")
	@CrossOrigin(origins = "http://localhost:3000/")
	public void saveFeedBack(@RequestParam("userType") String userType, @RequestParam("userName") String userName,
			@RequestParam("message") String message , @RequestParam("Email") String Email) {
		service.saveFeedback(userType,userName,message,Email);
	}

    /**
     * Save contact form feedback.
     *
     * @param userName User's name
     * @param message Feedback message
     * @param email User's email address
     */
	@PostMapping(value = "/contactUS")
	@CrossOrigin(origins = "http://localhost:3000/")
	public void saveContactUsFeedBack(@RequestParam("userName") String userName,
			@RequestParam("message") String message, @RequestParam("Email") String Email) {
		service.contactUs(Email,userName,message);
	}

    /**
     * Get a list of all feedbacks.
     *
     * @return ResponseEntity containing a list of Feedback objects
     */
	@PostMapping(value = "/getFeedbacks")
	@CrossOrigin(origins = "http://localhost:3000/")
	public ResponseEntity<List<FeedBack>> getFeedBacks() {
		return new ResponseEntity<List<FeedBack>>(service.getFeedBacks(),HttpStatus.OK);
	}

    /**
     * Delete feedback by ID.
     *
     * @param id Feedback ID
     * @return ResponseEntity with a success message
     */
	@DeleteMapping(value = "/deleteFeedback")
	@CrossOrigin(origins = "http://localhost:3000/")
	public ResponseEntity<String> deleteFeedback(@RequestParam("id" )Long id) {
		service.deleteFeedback(id);
		return new ResponseEntity<String>("Done",HttpStatus.OK);
	}
}
