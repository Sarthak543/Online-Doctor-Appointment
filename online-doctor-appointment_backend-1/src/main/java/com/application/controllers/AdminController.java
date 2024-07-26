package com.application.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.application.entity.Appointment;
import com.application.entity.Doctor;
import com.application.entity.FeedBack;
import com.application.entity.User;
import com.application.services.AdminService;

@RestController
public class AdminController {
	
	@Autowired
	AdminService service;

    /**
     * Get a list of all patients.
     *
     * @return ResponseEntity containing a list of User objects
     */
	@GetMapping("/getPatientDetails")
	@CrossOrigin("http://localhost:3000/")
	public ResponseEntity<List<User>> getPatient(){
		return new ResponseEntity<List<User>>(service.getAllPatient(),HttpStatus.OK);
	}

    /**
     * Get a list of all doctors.
     *
     * @return ResponseEntity containing a list of Doctor objects
     */
	@GetMapping("/getDoctorsDetails")
	@CrossOrigin("http://localhost:3000/")
	public ResponseEntity<List<Doctor>> getDoctors(){
		return new ResponseEntity<List<Doctor>>(service.getAllDoctors(),HttpStatus.OK);
	}
	
    /**
     * Get a list of all appointments.
     *
     * @return ResponseEntity containing a list of Appointment objects
     */
	@GetMapping("/getAllAppointments")
	@CrossOrigin("http://localhost:3000/")
	public ResponseEntity<List<Appointment>> getAppointments(){
		return new ResponseEntity<List<Appointment>>(service.getAllAppointments(),HttpStatus.OK);
	}
	
    /**
     * Delete a patient record by ID.
     *
     * @param id Patient ID
     * @return ResponseEntity with a success message
     */
	@GetMapping("/deletePatientRecord/{id}")
	@CrossOrigin("http://localhost:3000/")
	public ResponseEntity<String> removePatient(@PathVariable("id") Long id){
		service.removePatientData(id);
		return new ResponseEntity<String>("Done",HttpStatus.OK);
	}

    /**
     * Delete a doctor record by ID.
     *
     * @param id Doctor ID
     * @return ResponseEntity with a success message
     */
	@GetMapping("/deleteDoctorRecord/{id}")
	@CrossOrigin("http://localhost:3000/")
	public ResponseEntity<String> removeDoctor(@PathVariable("id") Long id){
		service.removeDoctorData(id);
		return new ResponseEntity<String>("Done",HttpStatus.OK);
	}

	 /**
     * Get a list of all feedbacks.
     *
     * @return ResponseEntity containing a list of FeedBack objects
     */
	@GetMapping("/getFeedbacks")
	@CrossOrigin("http://localhost:3000/")
	public ResponseEntity<List<FeedBack>> getFeedbacks(){
		return new ResponseEntity<List<FeedBack>>(service.getFeedbacks(),HttpStatus.OK);
	}
	
	
}
