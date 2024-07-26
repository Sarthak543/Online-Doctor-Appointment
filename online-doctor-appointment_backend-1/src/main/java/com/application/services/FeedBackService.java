package com.application.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.entity.FeedBack;
import com.application.repository.FeedBackRepository;

@Service
public class FeedBackService {

	@Autowired
	FeedBackRepository feedbackRepository;

    /**
     * Save user feedback.
     *
     * @param userType User type (e.g., patient, doctor)
     * @param userName User's name
     * @param message Feedback message
     * @param email User's email address
     */
	public void saveFeedback(String userType,String userName,String message,String Email) {
		FeedBack f = new FeedBack(userType,userName,message,Email);
		feedbackRepository.save(f);
	}

    /**
     * Get a list of all feedbacks.
     *
     * @return List of FeedBack objects
     */
	public List<FeedBack> getFeedBacks() {
		try {
			return feedbackRepository.findAll();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

    /**
     * Delete feedback by ID.
     *
     * @param id Feedback ID
     */
	public void deleteFeedback(Long id) {
		try {			
			feedbackRepository.deleteById(id);
		}catch(Exception e){
			e.printStackTrace();
		}
	}

    /**
     * Save contact form feedback.
     *
     * @param email User's email address
     * @param userName User's name
     * @param message Feedback message
     */
	public void contactUs(String email, String userName, String message ) {
		FeedBack f = new FeedBack("Un Registered",userName,message,email);
		feedbackRepository.save(f);
	}
}
