package com.application.entity;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "Appointment")
public class Appointment {
	@Id
	@SequenceGenerator(name = "app_seq", sequenceName = "app_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "app_seq")
	private Long AppointmentNumber;
	
	@Column
	private String DoctorName;

	@Column
	private String PatientName;
	
	@Column(name = "Appointment_Date")
	private Date date;
	
	@Column
	private Long DoctorNumber;

	@Column
	private Long PatientNumber;

	@OneToMany(mappedBy = "appointment",cascade = CascadeType.ALL)
	@JsonManagedReference
	private List<History> history;

	private Long PID;
	
	public Long getAppointmentNumber() {
		return AppointmentNumber;
	}
	
	

	public void setAppointmentNumber(Long appointmentNumber) {
		AppointmentNumber = appointmentNumber;
	}



	public String getDoctorName() {
		return DoctorName;
	}

	public void setDoctorName(String doctorName) {
		DoctorName = doctorName;
	}

	public String getPatientName() {
		return PatientName;
	}

	public void setPatientName(String patientName) {
		PatientName = patientName;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Long getDoctorNumber() {
		return DoctorNumber;
	}

	public void setDoctorNumber(Long doctorNumber) {
		DoctorNumber = doctorNumber;
	}

	public Long getPatientNumber() {
		return PatientNumber;
	}

	public void setPatientNumber(Long patientNumber) {
		PatientNumber = patientNumber;
	}

	public List<History> getHistory() {
		return history;
	}

	public void setHistory(List<History> history) {
		this.history = history;
	}
	
	

	public Long getPID() {
		return PID;
	}



	public void setPID(Long pID) {
		PID = pID;
	}


	
	
}
