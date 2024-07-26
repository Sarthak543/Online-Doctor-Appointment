package com.application.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
public class FeedBack {

	@Id
	@SequenceGenerator(name = "feed_seq", sequenceName = "feed_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "feed_seq")
	private Long id;
	@Column
	private String userType;
	@Column
	private String userName;
	@Column
	private String message;
	@Column
	private String Email;
	
	
	
	
	public FeedBack() {
		super();
	}

	public FeedBack(String userType, String userName, String message, String email) {
		super();
		this.userType = userType;
		this.userName = userName;
		this.message = message;
		Email = email;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	
	public String getEmail() {
		return Email;
	}

	public void setEmail(String email) {
		Email = email;
	}

	@Override
	public String toString() {
		return "FeedBack [id=" + id + ", userType=" + userType + ", userName=" + userName + ", message=" + message
				+ "]";
	}
	
	
}
