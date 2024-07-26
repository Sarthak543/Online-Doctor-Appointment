package com.application.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.application.entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
	/**
	 * Retrieves a paginated list of appointments for a specified doctor.
	 *
	 * This method queries the database to get a list of appointments for the
	 * specified doctor, using pagination to limit the results to a specific range
	 * of rows.
	 *
	 * @param DoctorName the name of the doctor whose appointments are to be
	 *                   retrieved
	 * @param startRow   the starting row number for pagination
	 * @param endRow     the ending row number for pagination
	 * @return a list of appointments for the specified doctor within the given row
	 *         range
	 */
	@Query(value = "SELECT * FROM Appointment a WHERE a.Doctor_Name = :DoctorName", nativeQuery = true)
	public List<Appointment> getAppointmentsByDoctorName(@Param("DoctorName") String DoctorName);

	/**
	 * Retrieves a paginated list of appointments for a specified patient.
	 *
	 * This method queries the database to get a list of appointments for the
	 * specified patient, using pagination to limit the results to a specific range
	 * of rows.
	 *
	 * @param patientName the name of the patient whose appointments are to be
	 *                    retrieved
	 * @param startRow    the starting row number for pagination
	 * @param endRow      the ending row number for pagination
	 * @return a list of appointments for the specified patient within the given row
	 *         range
	 */
	@Query(value = "SELECT * FROM Appointment a WHERE a.Patient_Name = :patientName", nativeQuery = true)
	public List<Appointment> getAppointmentsByPatientName(@Param("patientName") String patientName);

	/**
	 * Retrieves the busy dates for a specified doctor.
	 *
	 * This method queries the database to get a list of dates on which the
	 * specified doctor has more than 29 appointments, indicating that the doctor is
	 * fully booked on those dates.
	 *
	 * @param doctor_name the name of the doctor whose busy dates are to be
	 *                    retrieved
	 * @return a list of dates on which the doctor is fully booked
	 */
	@Query(value = "SELECT TRUNC(APPOINTMENT_DATE) AS \"Date\" FROM appointment WHERE APPOINTMENT_DATE >= TRUNC(SYSDATE) AND DOCTOR_NAME = :doctor_name GROUP BY TRUNC(APPOINTMENT_DATE) HAVING COUNT(*) > 29 ORDER BY TRUNC(APPOINTMENT_DATE)", nativeQuery = true)
	public List<Date> getBusyDatesByDoctorName(@Param("doctor_name") String doctor_name);

	/**
	 * Retrieves the last appointment time for a specified doctor on a given date.
	 *
	 * This method queries the database to get the latest appointment time for the
	 * specified doctor on the given date.
	 *
	 * @param date       the date for which the last appointment time is to be
	 *                   retrieved
	 * @param doctorName the name of the doctor whose last appointment time is to be
	 *                   retrieved
	 * @return the latest appointment time for the specified doctor on the given
	 *         date
	 */
	@Query(value = "SELECT appointment_date FROM (SELECT appointment_date, RANK() OVER (PARTITION BY TRUNC(appointment_date) ORDER BY appointment_date DESC) AS rnk FROM appointment WHERE TRUNC(appointment_date) = TRUNC(:date) AND doctor_name = :doctorName) WHERE rnk = 1", nativeQuery = true)
	public Date getLastAppointmentTime(@Param("date") Date date, @Param("doctorName") String doctorName);

}
