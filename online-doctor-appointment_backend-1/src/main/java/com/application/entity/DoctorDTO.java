package com.application.entity;

import org.springframework.web.multipart.MultipartFile;

public class DoctorDTO {
	/*
	 * If we are using @ModalAttribute to bind form data to the entity class DBMS
	 * can not understand MultiPart keyword we accept form data here and then
	 * convert this MultiPart data into byte and store it in the entity class and
	 * then save the object
	 */
	private String name;
	private String email;
	private Integer mobile;
	private String password;
	private String gender;
	private Double experience;
	private String previousOrg;
	private String specialization;
	private MultipartFile expLetter;
	private String country;
	private String state;
	private String city;
	private Integer zipCode;
	private String nationality;
	private String governmentId;
	private MultipartFile dp;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Integer getMobile() {
		return mobile;
	}

	public void setMobile(Integer mobile) {
		this.mobile = mobile;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Double getExperience() {
		return experience;
	}

	public void setExperience(Double experience) {
		this.experience = experience;
	}

	public String getPreviousOrg() {
		return previousOrg;
	}

	public void setPreviousOrg(String previousOrg) {
		this.previousOrg = previousOrg;
	}

	public String getSpecialization() {
		return specialization;
	}

	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}

	public MultipartFile getExperienceLetter() {
		return expLetter;
	}

	public void setExperienceLetter(MultipartFile experienceLetter) {
		this.expLetter = experienceLetter;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public Integer getZipCode() {
		return zipCode;
	}

	public void setZipCode(Integer zipCode) {
		this.zipCode = zipCode;
	}

	public String getNationality() {
		return nationality;
	}

	public void setNationality(String nationality) {
		this.nationality = nationality;
	}

	public String getGovernmentId() {
		return governmentId;
	}

	public void setGovernmentId(String governmentId) {
		this.governmentId = governmentId;
	}

	public MultipartFile getdp() {
		return dp;
	}

	public void setdp(MultipartFile dp) {
		this.dp = dp;
	}

}
