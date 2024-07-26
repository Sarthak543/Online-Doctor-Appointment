package com.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.application.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

	/**
	 * Retrieves a user by their email address.
	 *
	 * This method performs a native SQL query to fetch the user from the 'patient' table
	 * where the 'eMail' column matches the provided email address.
	 *
	 * @param eMail the email address of the user to be retrieved
	 * @return the user with the specified email address
	 */
	@Query(value="select * from patient p where p.eMail= :eMail",nativeQuery = true)
	public User getUserByEmail(@Param("eMail") String eMail);
}
