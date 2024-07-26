package com.application.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.entity.Appointment;
import com.application.entity.Doctor;
import com.application.entity.FeedBack;
import com.application.entity.User;
import com.application.repository.AppointmentRepository;
import com.application.repository.DoctorRepository;
import com.application.repository.FeedBackRepository;
import com.application.repository.UserRepository;

/**
 * 
 */
@Service
public class AdminService {

	@Autowired
	DoctorRepository doctorRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	AppointmentRepository appointmentRepository;
	@Autowired
	FeedBackRepository feedbackRepository;

    /**
     * Get a list of all patients.
     *
     * @return List of User objects representing patients
     */
	public List<User> getAllPatient() {
		try {
			return userRepository.findAll();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

    /**
     * Get a list of all doctors.
     *
     * @return List of Doctor objects representing doctors
     */
	public List<Doctor> getAllDoctors() {
		try {
			return doctorRepository.findAll();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

    /**
     * Get a list of all appointments.
     *
     * @return List of Appointment objects representing appointments
     */
	public List<Appointment> getAllAppointments() {
		try {
			return appointmentRepository.findAll();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
    /**
     * Get a list of all feedbacks.
     *
     * @return List of FeedBack objects representing feedbacks
     */
	public List<FeedBack> getFeedbacks() {
		try {
			return feedbackRepository.findAll();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

    /**
     * Remove a patient record by ID.
     *
     * @param id Patient ID
     */
	public void removePatientData(Long id) {
		userRepository.deleteById(id);

	}

    /**
     * Remove a doctor record by ID.
     *
     * @param id Doctor ID
     */
	public void removeDoctorData(Long id) {
		doctorRepository.deleteById(id);

	}
}
