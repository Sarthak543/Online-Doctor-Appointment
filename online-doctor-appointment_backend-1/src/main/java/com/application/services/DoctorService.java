package com.application.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.application.entity.Doctor;
import com.application.repository.DoctorRepository;

@Service
public class DoctorService {
	@Autowired
	DoctorRepository repository;
	
	@Autowired
	EmailService emailService;

	/**
	 * Saves the details of a new doctor.
	 *
	 * This method sets various attributes of the doctor, including personal information,
	 * experience, and profile photo, and then saves the doctor to the repository.
	 *
	 * @param name the name of the doctor
	 * @param email the email address of the doctor
	 * @param mobile the mobile number of the doctor
	 * @param password the password for the doctor's account
	 * @param gender the gender of the doctor
	 * @param experience the years of experience the doctor has
	 * @param previousOrg the previous organization the doctor worked at
	 * @param specialization the doctor's specialization
	 * @param expLetter the experience letter of the doctor
	 * @param country the country where the doctor resides
	 * @param state the state where the doctor resides
	 * @param city the city where the doctor resides
	 * @param zipCode the zip code of the doctor's location
	 * @param nationality the nationality of the doctor
	 * @param governmentId the government ID of the doctor
	 * @param dp the profile photo of the doctor
	 * @throws IOException if an error occurs while processing the files
	 */
	public void saveDoctorDetails(String name, String email, String mobile, String password, String gender,
			Double experience, String previousOrg, String specialization, MultipartFile expLetter, String country,
			String state, String city, Integer zipCode, String nationality, String governmentId, MultipartFile dp)
			throws IOException {
		Doctor doctor = new Doctor();
		doctor.setCity(city);
		doctor.setCountry(country);
		doctor.setEmail(email);
		doctor.setExperience(experience);
		doctor.setExperienceLetter(expLetter.getBytes());
		doctor.setGender(gender);
		doctor.setGovernmentId(governmentId);
		doctor.setMobile(Long.parseLong(mobile));
		doctor.setName(name);
		doctor.setNationality(nationality);
		doctor.setPassword(password);
		doctor.setPreviousOrg((previousOrg));
		doctor.setProfilePhoto(dp.getBytes());
		doctor.setSpecialization(specialization);
		doctor.setState(state);
		doctor.setZipCode(zipCode);
		repository.save(doctor);
	}
	
	/**
	 * Verifies the doctor's credentials.
	 *
	 * This method checks if the provided email and password match the stored credentials
	 * for a doctor. If they match, it returns the doctor's details; otherwise, it returns null.
	 *
	 * @param email the email address of the doctor
	 * @param password the password of the doctor
	 * @return the doctor's details if the credentials are correct, null otherwise
	 */

	public Doctor verifyDoctor(String email,String password) {
		System.out.println(email);
		String trimEmail = email.trim();
		Doctor d = repository.getDoctorByEmail(trimEmail);
		String dbPassword = d.getPassword().replace("\"", "").trim();
		if(dbPassword.equals(password)) {
			return d;
		}
		return null;
	}
	
	/**
	 * Retrieves a list of all specializations.
	 *
	 * This method queries the repository to get a list of all unique specializations
	 * from the doctors.
	 *
	 * @return a list of unique specializations
	 */
	public List<String> getSpecialization(){
		List<String> result = new ArrayList<String>();
		List<Doctor> doctors = repository.findAll();
		for(Doctor doc:doctors) {
			if(!result.contains(doc.getSpecialization())) {
				result.add(doc.getSpecialization());
			}
		}
		return result;
	}
	
	/**
	 * Retrieves a list of doctor names by specialization.
	 *
	 * This method queries the repository to get a list of doctor names who have the specified specialization.
	 *
	 * @param specialization the specialization to filter doctors by
	 * @return a list of doctor names with the specified specialization
	 */
	public List<String> getDoctorsName(String specialization){
		List<String> result = new ArrayList<String>();
		List<Doctor> doctors = repository.findAll();
		for(Doctor doc:doctors) {
			if(specialization.equals(doc.getSpecialization())) {
				result.add(doc.getName());
			}
		}
		return result;
	}
	
	/**
	 * Retrieves the mobile number of a doctor by name.
	 *
	 * This method queries the repository to get the mobile number of the doctor with the specified name.
	 *
	 * @param docName the name of the doctor
	 * @return the mobile number of the doctor
	 */
	public Long getDoctorNumber(String docName) {
		String mob = repository.getNumberByDoctorName(docName);
		return Long.parseLong(mob);
	}
	
	/**
	 * Retrieves the details of a doctor by email.
	 *
	 * This method queries the repository to get the details of the doctor with the specified email.
	 *
	 * @param email the email address of the doctor
	 * @return the details of the doctor
	 */
	public Doctor getDoctorDetailsByEmail(String email) {
		Doctor doc  = repository.getDoctorByEmail(email);
		return doc;
	}

	 /**
     * Send a password reset email to the doctor by their email address.
     *
     * @param email Doctor's email address
     * @return true if email sent successfully, false otherwise
     */
	public Boolean sendPasswordToEmail(String email) {
		try {
			Doctor doc = repository.getDoctorByEmail(email.trim().toLowerCase());
			if(doc==null) {
				return false;
			}else {				
				emailService.sendEmail(email,"password Recovery" ,doc.getPassword().trim());
				return true;
			}
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		
		
	}

}
