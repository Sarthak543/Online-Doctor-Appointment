package com.application.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.entity.History;
import com.application.repository.HistoryRepository;

@Service
public class HistoryService {
	
	@Autowired
	private HistoryRepository repo;
	
	/**
	 * Saves the provided history record.
	 *
	 * This method saves the given history object to the repository.
	 *
	 * @param history the history record to be saved
	 */
	public void saveHistory(History history) {
		repo.save(history);
	}
	
	/**
	 * Retrieves the history records for a specified appointment number.
	 *
	 * This method queries the repository to get a list of history records associated with the given appointment number.
	 *
	 * @param appointmentNumber the number of the appointment whose history records are to be retrieved
	 * @return a list of history records for the specified appointment number
	 */
	public List<History> getHistoryByAppointmentNumber(long appointmentNumber){
		
		return repo.getHistoryByAppointmentNumber(appointmentNumber);
	}
}
