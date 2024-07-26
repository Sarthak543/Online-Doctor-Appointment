package com.application.controllers;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.application.entity.Appointment;
import com.application.services.AppointmentService;
import com.application.services.DoctorService;

@RestController
public class AppointmentController {

	@Autowired
	DoctorService doctorService;

	@Autowired
	AppointmentService appointmentService;


	/**
	 * Retrieve a list of all specialization
	 * 
	 * @return ResponseEntity containing a list of all the specialization
	 */
	@PostMapping(path = "/specialization")
	@CrossOrigin(origins = "http://localhost:3000/")
	public ResponseEntity<List<String>> getSpecialization() {
		List<String> specialization = doctorService.getSpecialization();
		System.out.println(specialization);
		return new ResponseEntity<List<String>>(specialization,HttpStatus.OK);
	}

	/**
	 * Retrieve a list of doctors for the specified specialization
	 * 
	 * @param specialization Specialization of a doctor
	 * @return ResponseEntity containing a list of doctor name.
	 */
	@PostMapping(path = "/getDoctorsName/{specialization}")
	@CrossOrigin(origins = "http://localhost:3000/")
	public ResponseEntity<List<String>> getDoctorsName(@PathVariable("specialization") String specialization) {
		List<String> doctorNames = doctorService.getDoctorsName(specialization);
		return new ResponseEntity<List<String>>(doctorNames,HttpStatus.OK);
	}

	/**
	 * Retrieve a list of appointments of the specified doctor
	 * 
	 * @param DoctorName Name of the doctor
	 * @return ResponseEntity containing a list of Appointments
	 */
	@PostMapping(path = "/getDoctorAppointmentSchedule/{DoctorName}")
	@CrossOrigin(origins = "http://localhost:3000/")
	public ResponseEntity<HashMap<Integer,Integer>> getAppointmentNumbersByDoctor(@PathVariable("DoctorName") String DoctorName) {
//		List<String> doc = doctorService.getDoctorsName(specialization);
		HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();
		return new ResponseEntity<HashMap<Integer,Integer>>(map,HttpStatus.OK);
	}

	/**
	 * Saves a new appointment with the provided details.
	 *
	 * @param specialization the specialization of the doctor
	 * @param DoctorName     the name of the doctor
	 * @param date           the date of the appointment
	 * @param problem        the problem description
	 * @param pNumber        the patient's phone number
	 * @param patientName    the name of the patient
	 * @return a ResponseEntity with a success message if the appointment is saved,
	 *         or an appropriate error message if it fails
	 * @throws BadRequestException if the request parameters are invalid
	 */
	@PostMapping(path = "/saveAppointment")
	@CrossOrigin(origins = "http://localhost:3000/")
	public ResponseEntity<String> saveAppointment(@RequestParam String specialization, @RequestParam String DoctorName,
			@RequestParam Date date, @RequestParam String problem, Long pNumber, String patientName , @RequestParam Long PID)
			throws BadRequestException {

		appointmentService.saveAppointment(specialization, DoctorName, date, problem, pNumber, patientName,PID);
		return new ResponseEntity<>("Unable to save", HttpStatus.OK);
	}

	/**
	 * Retrieves a list of appointments for a specific Patient.
	 * 
	 * @param patientName the name of the doctor whose appointments are to be
	 *                    retrieved
	 * @param pageNumber  the page number for pagination
	 * @return a ResponseEntity containing a list of appointments for the specified
	 *         doctor,with an HTTP status of OK
	 */
	@PostMapping(path = "/PatientAppointment/{patientName}")
	@CrossOrigin(origins = "http://localhost:3000/")
	public ResponseEntity<List<Appointment>> patientAppointment(@PathVariable("patientName") String patientName) {
		List<Appointment> appointments = appointmentService.getAppointmentByPatientName(patientName);
		return new ResponseEntity<>(appointments, HttpStatus.OK);
	}

	/**
	 * Retrieves a list of appointments for a specific doctor.
	 *
	 * @param docName    the name of the doctor whose appointments are to be
	 *                   retrieved
	 * @param pageNumber the page number for pagination
	 * @return a ResponseEntity containing a list of appointments for the specified
	 *         doctor, with an HTTP status of OK
	 */
	@PostMapping(path = "/DoctorAppointment/{docName}")
	@CrossOrigin(origins = "http://localhost:3000/")
	public ResponseEntity<List<Appointment>> doctorAppointment(@PathVariable("docName") String docName) {
		List<Appointment> appointments = appointmentService.getAppointmentByDoctorName(docName);
		return new ResponseEntity<>(appointments, HttpStatus.OK);
	}

	/**
	 * Deletes the Appointment
	 * 
	 * @param id Appointment id
	 * @return a ResponseEntity with a success message if the delete is successful,
	 *         or an INTERNAL_SERVER_ERROR status if the delete fails
	 */
	@GetMapping(path = "/deletePatient/{id}")
	@CrossOrigin(origins = "http://localhost:3000/")
	public ResponseEntity<String> deleteAppointment(@PathVariable("id") Long id) {
		if (appointmentService.deleteAppointment(id)) {
			return ResponseEntity.ok("Deleted successfully");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	/**
	 * Reschedule the appointment
	 * 
	 * @param id   Appointment Id
	 * @param date New date on which appointment is rescheduled
	 * @return a ResponseEntity with a success message if the update is successful,
	 *         or an INTERNAL_SERVER_ERROR status if the update fails
	 */
	@GetMapping(path = "/updateAppointment/{id}/{date}")
	@CrossOrigin(origins = "http://localhost:3000/")
	public ResponseEntity<String> rescheduleAppointment(@PathVariable("id") Long id, @PathVariable("date") Date date) {
		if (appointmentService.updateAppointmentTime(id, date)) {
			return ResponseEntity.ok("Updated successfully");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	/**
	 * Retrieve dates for specified doctor when the number of appointments are 30.
	 * (Doctor can not take more than 30 appointments in a day)
	 * 
	 * @param doctorName Name of the doctor
	 * @return a ResponseEntity containing a list of Dates with a HTTP status of OK
	 */
	@GetMapping(path = "/getBusyDate/{doctorName}")
	@CrossOrigin(origins = "http://localhost:3000/")
	public ResponseEntity<List<Date>> busyAppointmentDates(@PathVariable("doctorName") String doctorName) {
		List<Date> busyDates = appointmentService.getBusyDateByDoctorName(doctorName);
		return new ResponseEntity<List<Date>>(busyDates, HttpStatus.OK);
	}

	
	/**
	 * Get an appointment by its ID.
	 *
	 * @param id Appointment ID
	 * @return ResponseEntity containing the Appointment object
	 */
	@PostMapping(path = "/getAppointmentById/{id}")
	@CrossOrigin(origins = "http://localhost:3000/")
	public ResponseEntity<Appointment> getAppointmentById(@PathVariable("id") Long id) {
		Appointment appointment = appointmentService.getAppointmentByAppointmentNumber(id);
		return new ResponseEntity<Appointment>(appointment, HttpStatus.OK);
	}
	
	
	
}
