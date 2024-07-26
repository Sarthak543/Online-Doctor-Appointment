package com.application.services;

public interface EmailService {
	
	/**
	 * Sends an email with the specified message to the given recipient.
	 *
	 * This method is intended to send an email to the specified recipient with the provided message.
	 *
	 * @param to the recipient's email address
	 * @param message the message to be sent in the email
	 */
	void sendEmail(String to,String subject,String message);
}
