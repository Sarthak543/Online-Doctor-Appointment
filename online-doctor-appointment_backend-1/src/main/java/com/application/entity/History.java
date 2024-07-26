package com.application.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "Consultant_History")
public class History {
	
	@Id
	@SequenceGenerator(name = "his_seq", sequenceName = "his_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "his_seq")
	private Long id;
	
	@Column 
	private String sender;
	
	@Column
	private String message;
	
	@ManyToOne
	@JoinColumn(name = "appointment_appointment_number", nullable = false)
	@JsonBackReference
	private Appointment appointment;

	public Long getId() {
		return id;
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Appointment getAppointment() {
		return appointment;
	}

	public void setAppointment(Appointment appointment) {
		this.appointment = appointment;
	}

	@Override
	public String toString() {
		return "History [id=" + id + ", sender=" + sender + ", message=" + message + ", appointment=" + appointment
				+ "]";
	}
	
	
	
}
