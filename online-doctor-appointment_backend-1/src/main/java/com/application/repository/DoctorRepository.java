package com.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.application.entity.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
	
	/**
	 * Retrieves a doctor by their email address.
	 *
	 * This method performs a native SQL query to fetch the doctor from the 'Doctor' table
	 * where the 'email' column matches the provided email address, ignoring case.
	 *
	 * @param email the email address of the doctor to be retrieved
	 * @return the doctor with the specified email address
	 */
	@Query(value="select * from Doctor d where LOWER(d.email) = :email",nativeQuery = true)
	public Doctor getDoctorByEmail(@Param("email") String email);

	/**
	 * Retrieves the mobile number of a doctor by their name.
	 *
	 * This method performs a native SQL query to fetch the mobile number of the doctor from the 'Doctor' table
	 * where the 'name' column matches the provided name. The mobile number is returned as a string.
	 *
	 * @param name the name of the doctor whose mobile number is to be retrieved
	 * @return the mobile number of the doctor as a string
	 */
	@Query(value = "select TO_CHAR(d.mobile) AS mobile_string from Doctor d where d.name = :name",nativeQuery = true)
	public String getNumberByDoctorName(@Param("name") String name);

}
