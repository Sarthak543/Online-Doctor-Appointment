package com.application.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
class EmailServiceImpl implements EmailService {

	@Autowired
	private JavaMailSender mailSender;
	
	/**
	 * Sends an email with the specified message to the given recipient.
	 *
	 * This method constructs a simple email message with a predefined subject and sender address,
	 * and sends it to the specified recipient using the mail sender.
	 *
	 * @param to the recipient's email address
	 * @param message the message to be sent in the email
	 */
	@Override
	public void sendEmail(String to, String subject ,String message) {
		SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
		simpleMailMessage.setTo(to);
		simpleMailMessage.setSubject(subject);
		simpleMailMessage.setFrom("sarthakjaiswal770@gmail.com");
		simpleMailMessage.setText(message);
		mailSender.send(simpleMailMessage);
	}

}
