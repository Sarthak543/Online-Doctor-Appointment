package com.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.application")
public class OnlineDoctorAppointmentBackendApplication {

	public static void main(String[] args) {
		System.out.println("Glasdslkjdlks");
		SpringApplication.run(OnlineDoctorAppointmentBackendApplication.class, args);
	}

}
