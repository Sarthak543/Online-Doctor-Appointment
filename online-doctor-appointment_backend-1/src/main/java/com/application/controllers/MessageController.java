package com.application.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

import com.application.entity.History;
import com.application.services.HistoryService;

@RestController
public class MessageController {
	@Autowired
	HistoryService historyService;
	
	/**
	 * Save and send the history object to the broadcast channel
	 * 
	 * @param history
	 * @return History object
	 */
	@MessageMapping("/message")
	@SendTo("/chat/return-to")
	private History getContent(@Payload History history) {
		try {
			saveHistory(history);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return history;
	}
	
	/**
	 * save the history object to the database 
	 * 
	 * @param history history object
	 */
	public void saveHistory(History history) {
		historyService.saveHistory(history);
	}

}
