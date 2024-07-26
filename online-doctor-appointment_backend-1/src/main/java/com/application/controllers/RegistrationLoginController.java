package com.application.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.application.entity.Doctor;
import com.application.entity.User;
import com.application.services.DoctorService;
import com.application.services.UserService;

@RestController
public class RegistrationLoginController {
	@Autowired
	UserService service;

	@Autowired
	DoctorService docService;

	/**
	 * Registers a new patient with the provided details.
	 *
	 * @param name     the name of the patient
	 * @param email    the email of the patient
	 * @param mobile   the mobile number of the patient
	 * @param password the password for the patient's account
	 * @param gender   the gender of the patient
	 * @param image    the profile image of the patient
	 * @return         a ResponseEntity with a success message if the registration is successful,
	 *                 or an error message if it fails
	 */
	@PostMapping("/patientRegistration")
	@CrossOrigin(origins = "http://localhost:3000/")
	public ResponseEntity<String> registerUser(@RequestParam String name, @RequestParam String email,
			@RequestParam String mobile, @RequestParam String password, @RequestParam String gender,
			@RequestParam MultipartFile image) {
		try {
			service.saveUser(name, email, mobile, password, gender, image);
			return new ResponseEntity<>("Patient registered successfully", HttpStatus.OK);
		} catch (Exception E) {
			E.printStackTrace();
			return new ResponseEntity<>("Error while saving data", HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	/**
	 * Registers a new doctor with the provided details.
	 *
	 * @param name           the name of the doctor
	 * @param email          the email of the doctor
	 * @param mobile         the mobile number of the doctor
	 * @param password       the password for the doctor's account
	 * @param gender         the gender of the doctor
	 * @param experience     the years of experience the doctor has
	 * @param previousOrg    the previous organization the doctor worked at
	 * @param specialization the doctor's specialization
	 * @param expLetter      the experience letter of the doctor
	 * @param country        the country of the doctor
	 * @param state          the state of the doctor
	 * @param city           the city of the doctor
	 * @param zipCode        the zip code of the doctor's location
	 * @param nationality    the nationality of the doctor
	 * @param governmentId   the government ID of the doctor
	 * @param dp             the display picture of the doctor
	 * @return a ResponseEntity with a success message if the registration is
	 *         successful, or an error message if it fails
	 */
	@PostMapping("/doctorRegistration")
	@CrossOrigin(origins = "http://localhost:3000/")
	public ResponseEntity<String> registerDoctor(@RequestParam String name, @RequestParam String email,
			@RequestParam String mobile, @RequestParam String password, @RequestParam String gender,
			@RequestParam Double experience, @RequestParam String previousOrg, @RequestParam String specialization,
			@RequestParam MultipartFile expLetter, @RequestParam String country, @RequestParam String state,
			@RequestParam String city, @RequestParam Integer zipCode, @RequestParam String nationality,
			@RequestParam String governmentId, @RequestParam MultipartFile dp) {
		try {
			docService.saveDoctorDetails(name, email, mobile, password, gender, experience, previousOrg, specialization,
					expLetter, country, state, city, zipCode, nationality, governmentId, dp);
			return new ResponseEntity<>("Patient registered successfully", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("Error while saving data", HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	/**
	 * Authenticates a patient based on the provided email and password.
	 *
	 * @param email    the email of the patient
	 * @param password the password of the patient
	 * @return a ResponseEntity containing the Patient object with an HTTP status of
	 *         OK if authentication is successful, or an INTERNAL_SERVER_ERROR
	 *         status if authentication fails
	 */
	@PostMapping(path = "/patientLogin/{email}/{password}", produces = "application/json")
	@CrossOrigin(origins = "http://localhost:3000/")
	public ResponseEntity<User> patientLogin(@PathVariable("email") String email,
			@PathVariable("password") String password) {
		try {
			User user = service.verifyUser(email, password);
			return new ResponseEntity<User>(user, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	/**
	 * Authenticates a doctor based on the provided email and password.
	 *
	 * @param email    the email of the doctor
	 * @param password the password of the doctor
	 * @return a ResponseEntity containing the Doctor object with an HTTP status of
	 *         OK if authentication is successful, or an INTERNAL_SERVER_ERROR
	 *         status if authentication fails
	 */
	@PostMapping(path = "/doctorLogin/{email}/{password}", produces = "application/json")
	@CrossOrigin(origins = "http://localhost:3000/")
	public ResponseEntity<Doctor> doctorLogin(@PathVariable("email") String email,
			@PathVariable("password") String password) {
		try {
			Doctor doctor = docService.verifyDoctor(email, password);
			System.out.println(doctor);
			return new ResponseEntity<Doctor>(doctor, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	/**
	 * Retrieves a patient object based on the provided email.
	 * 
	 * @param email the email of the patient
	 * @return ResponseEntity containing patient object with a HTTP status of OK
	 */
	@PostMapping(path = "/PatientDetail", produces = "application/json")
	@CrossOrigin(origins = "http://localhost:3000/")
	public ResponseEntity<User> getPatientByEmail(@RequestParam("email") String email) {
		User user = service.getUserDetailsByEmail(email);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

	/**
	 * Retrieves a doctor object based on the provided email.
	 * 
	 * @param email Email of the doctor
	 * @return a ResponseEntity containing the Doctor object with an HTTP status of
	 *         OK
	 */
	@PostMapping(path = "/DoctorDetail", produces = "application/json")
	@CrossOrigin(origins = "http://localhost:3000/")
	public ResponseEntity<Doctor> getDoctorByEmail(@RequestParam("email") String email) {
		Doctor doctor = docService.getDoctorDetailsByEmail(email);
		return new ResponseEntity<Doctor>(doctor, HttpStatus.OK);
	}

	/**
     * Send a password reset email to the doctor by their email address.
     *
     * @param email Doctor's email address
     * @return ResponseEntity with a success message or an error message
     */
	@PostMapping(path = "/doctorLogin/forgetPassword", produces = "application/json")
	@CrossOrigin(origins = "http://localhost:3000/")
	public ResponseEntity<String> getPasswordByDoctorEmail(@RequestParam("email") String email) {
		if (docService.sendPasswordToEmail(email)== false) {			
			return new ResponseEntity<String>("User not found",HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<String>("DOne", HttpStatus.OK);
	}

    /**
     * Send a password reset email to the patient by their email address.
     *
     * @param email Patient's email address
     * @return ResponseEntity with a success message or an error message
     */
	@PostMapping(path = "/patientLogin/forgetPassword", produces = "application/json")
	@CrossOrigin(origins = "http://localhost:3000/")
	public ResponseEntity<String> getPasswordByPatientEmail(@RequestParam("email") String email) {
		System.out.println("aslkdjlaksdlkjalskdjlksadjlaksdjlkasjdlkj");
		if (service.sendPasswordToEmail(email)== false) {			
			return new ResponseEntity<String>("User not found",HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<String>("DOne", HttpStatus.OK);
	}

	
	
	
}