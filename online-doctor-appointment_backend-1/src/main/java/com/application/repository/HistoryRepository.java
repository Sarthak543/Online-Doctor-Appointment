package com.application.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.application.entity.History;

public interface HistoryRepository extends JpaRepository<History, Long> {
	
	/**
	 * Retrieves the history records associated with a specific appointment number.
	 *
	 * This method performs a native SQL query to fetch all history records from the 'CONSULTANT_HISTORY' table
	 * where the 'Appointment_Appointment_Number' column matches the provided appointment number.
	 *
	 * @param AppointmentNumber the appointment number for which history records are to be retrieved
	 * @return a list of history records for the specified appointment number
	 */
	@Query(value = "select * from CONSULTANT_HISTORY c where c.Appointment_Appointment_Number = :AppointmentNumber", nativeQuery = true)
	public List<History> getHistoryByAppointmentNumber(@Param("AppointmentNumber") Long AppointmentNumber); 
}
