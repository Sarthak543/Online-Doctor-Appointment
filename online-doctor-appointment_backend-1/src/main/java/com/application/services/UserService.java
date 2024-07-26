package com.application.services;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.application.entity.User;
import com.application.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private EmailService emailService;

	/**
	 * Saves a new user with the specified details.
	 *
	 * This method sets various attributes of the user, including personal information,
	 * password, and profile photo, and then saves the user to the repository.
	 *
	 * @param name the name of the user
	 * @param email the email address of the user
	 * @param mob the mobile number of the user
	 * @param password the password for the user's account
	 * @param gender the gender of the user
	 * @param image the profile photo of the user
	 * @throws IOException if an error occurs while processing the profile photo
	 */
	public void saveUser(String name, String email, String mob, String password, String gender, MultipartFile image)
			throws IOException {
		User user = new User();
		user.setName(name);
		user.seteMail(email);
		user.setGender(gender);
		user.setMob(Long.parseLong(mob));
		user.setPassword(password);
		user.setImage(image.getBytes());
		userRepository.save(user);
	}

	/**
	 * Verifies the user's credentials.
	 *
	 * This method checks if the provided email and password match the stored credentials
	 * for a user. If they match, it returns the user's details; otherwise, it returns null.
	 *
	 * @param email the email address of the user
	 * @param password the password of the user
	 * @return the user's details if the credentials are correct, null otherwise
	 */
	public User verifyUser(String email, String password) {
		System.out.println(email);
		User u = userRepository.getUserByEmail(email);
		String dbPassword = u.getPassword().replace("\"", "").trim();
		if (dbPassword.equals(password)) {
			return u;
		}
		return null;
	}
	
	/**
	 * Retrieves the details of a user by email.
	 *
	 * This method queries the repository to get the details of the user with the specified email.
	 *
	 * @param email the email address of the user
	 * @return the details of the user
	 */
	public User getUserDetailsByEmail(String email) {
		User user = userRepository.getUserByEmail(email);
		return user;
	}

	/**
	 * Retrieves the email address of a user based on their ID.
	 *
	 * @param pID the ID of the user
	 * @return the email address of the user
	 */
	public String getEmailByPID(Long pID) {
		User user = userRepository.findById(pID).get();
		return user.geteMail();
	}

	/**
	 * Sends the user's password to their email address.
	 *
	 * @param email the email address of the user
	 * @return true if the email was sent successfully, false otherwise
	 */
	public boolean sendPasswordToEmail(String email) {
		try {
			User doc = userRepository.getUserByEmail(email.trim().toLowerCase());
			if(doc==null) {
				return false;
			}else {				
				emailService.sendEmail(email,"Password Recovery" ,doc.getPassword().trim());
				return true;
			}
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	
}
