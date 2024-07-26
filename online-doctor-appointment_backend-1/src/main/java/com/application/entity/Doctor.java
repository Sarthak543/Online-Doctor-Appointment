package com.application.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "Doctor")
public class Doctor {
	@Id
	@SequenceGenerator(name = "doc_seq", sequenceName = "doc_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "doc_seq")
	private Long id;
	@Column(name = "Name")
	private String name;
	@Column(name = "Email")
	private String email;
	@Column(name = "Mobile")
	private Long mobile;
	@Column(name = "Password")
	private String password;
	@Column(name = "Gender")
	private String gender;
	@Column(name = "experience")
	private Double experience;
	@Column(name = "Previous Organization Name")
	private String previousOrg;
	@Column(name = "Specialization")
	private String specialization;
	@Lob
	private byte[] experienceLetter;
	@Column(name = "Country")
	private String country;
	@Column(name = "State")
	private String state;
	@Column(name = "City")
	private String city;
	@Column(name = "Zip Code")
	private Integer zipCode;
	@Column(name = "Nationality")
	private String nationality;
	@Column(name = "Government ID", unique = true)
	private String governmentId;
	@Lob
	private byte[] profilePhoto;
	
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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

	public Long getMobile() {
		return mobile;
	}

	public void setMobile(Long mobile) {
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

	public byte[] getExperienceLetter() {
		return experienceLetter;
	}

	public void setExperienceLetter(byte[] experienceLetter) {
		this.experienceLetter = experienceLetter;
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

	public byte[] getProfilePhoto() {
		return profilePhoto;
	}

	public void setProfilePhoto(byte[] profilePhoto) {
		this.profilePhoto = profilePhoto;
	}

	@Override
	public String toString() {
		return "Doctor [id=" + id + ", name=" + name + ", email=" + email + ", mobile=" + mobile + ", password="
				+ password + ", gender=" + gender + ", experience=" + experience + ", previousOrg=" + previousOrg
				+ ", specialization=" + specialization + ", country=" + country + ", state=" + state + ", city=" + city
				+ ", zipCode=" + zipCode + ", nationality=" + nationality + ", governmentId=" + governmentId + "]";
	}



}
