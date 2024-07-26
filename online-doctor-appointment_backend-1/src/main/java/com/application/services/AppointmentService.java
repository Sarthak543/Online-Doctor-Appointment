package com.application.services;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.entity.Appointment;
import com.application.entity.History;
import com.application.repository.AppointmentRepository;

@Service
public class AppointmentService {

	@Autowired
	AppointmentRepository appointmentRepo;

	@Autowired
	DoctorService docService;

	@Autowired
	EmailService emailService;
	
	@Autowired
	UserService userService;

	/**
	 * Saves a new appointment with the specified details.
	 *
	 * This function is used to save appointments by setting all the necessary data in the Appointment class.
	 * Each appointment is given a 15-minute slot. The function fetches the last appointment of the day,
	 * adds 15 minutes to its time, and sets this new time for the new appointment. It skips the time slot
	 * between 1-2 PM for lunch. After setting the appointment details, it sends an email to the patient
	 * with the appointment timings.
	 *
	 * @param specialization the doctor's specialization
	 * @param doctorName the name of the doctor
	 * @param date the date of the appointment
	 * @param problem the patient's problem
	 * @param pNumber the patient's mobile number
	 * @param patientName the patient's name
	 * @throws BadRequestException if the appointment cannot be saved
	 */
	public void saveAppointment(String specialization, String doctorName, Date date, String problem, Long pNumber,
			String patientName, Long PID) throws BadRequestException {
		System.out.println("\n\n\n\n" + date + "\n\n\n\n");
		// setting appointment
		Appointment ap = new Appointment();
		
		System.out.println(doctorName);
		System.out.println(patientName);
		System.out.println(pNumber);
		System.out.println(docService.getDoctorNumber(doctorName));
		
		ap.setDoctorName(doctorName);
		ap.setPatientName(patientName);
		ap.setPatientNumber(pNumber);
		ap.setDoctorNumber(docService.getDoctorNumber(doctorName));

		// Setting history
		List<History> his = new ArrayList<History>();
		History hist = new History();
		hist.setSender(patientName);
		hist.setMessage(problem);
		his.add(hist);
		hist.setAppointment(ap);
		ap.setHistory(his);

		// setting appointment timings
		Date appointmentTimeSlot =getAppointmentTime(date, doctorName); 
		ap.setDate(appointmentTimeSlot);

		// setting Email message for appointment
		String message = getAppointmentEmailMessage(appointmentTimeSlot, doctorName, patientName);

		// saving appointment
		appointmentRepo.save(ap);
		
		// sending the appointment timings to Patient
		String patientEmailID = userService.getEmailByPID(PID);
		emailService.sendEmail(patientEmailID,"Appointment Booked" ,message);
	}

	/**
	 * Retrieves a list of appointments for a specified Patient.
	 *
	 * This method queries the appointment repository to get a list of appointments for the specified patient.
	 *
	 * @param patientName the name of the patient whose appointments are to be retrieved
	 * @param pageNumber the page number to retrieve
	 * @return a list of appointments for the specified patient on the given page
	 */
	public List<Appointment> getAppointmentByPatientName(String patientName) {
		List<Appointment> data = appointmentRepo.getAppointmentsByPatientName(patientName);
		return data;
	}

	/**
	 * Retrieves a list of appointments for a specified doctor.
	 *
	 * This method queries the appointment repository to get a list of appointments for the specified doctor
	 *
	 * @param docName the name of the doctor whose appointments are to be retrieved
	 * @param pageNumber the page number to retrieve
	 * @return a list of appointments for the specified doctor on the given page
	 */
	public List<Appointment> getAppointmentByDoctorName(String docName) {
		return appointmentRepo.getAppointmentsByDoctorName(docName);
	}

	/**
	 * Deletes the appointment with the specified ID.
	 *
	 * This method attempts to delete the appointment identified by the given ID from the repository.
	 * If the deletion is successful, it returns true. If an error occurs during the deletion process,
	 * it catches the exception, prints the stack trace, and returns false.
	 *
	 * @param id the ID of the appointment to be deleted
	 * @return true if the appointment was successfully deleted, false otherwise
	 */
	public boolean deleteAppointment(Long id) {
		try {
			appointmentRepo.deleteById(id);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * Updates the appointment time for a given appointment ID.
	 *
	 * This method finds the appointment by its ID and, if found, updates its date to the new specified date.
	 * It also sends a reschedule email notification to the patient. If the appointment is not found or an error
	 * occurs during the update, the method returns false.
	 *
	 * @param id   the ID of the appointment to be updated
	 * @param date the new date for the appointment
	 * @return true if the appointment was successfully updated, false otherwise
	 */
	public boolean updateAppointmentTime(Long id, Date date) {
		Optional<Appointment> ap = appointmentRepo.findById(id);
		try {
			if (ap.isPresent()) {
				Appointment appointment = ap.get();
				Date oldDate = appointment.getDate();
				/* getting appointment time slot on the rescheduled appointment date */
				Date dateTimeSlot = getAppointmentTime(date, appointment.getDoctorName());
				appointment.setDate(dateTimeSlot);
				appointmentRepo.save(appointment);
				String message = getRescheduleAppointmentEmailMessage(dateTimeSlot, oldDate,
						appointment.getDoctorName(), appointment.getPatientName());
				String patientEmailID = userService.getEmailByPID(appointment.getPID());
				emailService.sendEmail(patientEmailID,"Reschedule Appointment",message);
				return true;
			} else {
				return false;
			}

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * Retrieves the busy dates for a specified doctor.
	 *
	 * This method queries the appointment repository to get a list of dates on which the specified doctor
	 * is unavailable for new appointments.
	 *
	 * @param doctorName the name of the doctor whose busy dates are to be retrieved
	 * @return a list of dates on which the doctor cannot take more appointments, or null if an error occurs
	 */
	public List<Date> getBusyDateByDoctorName(String doctorName) {
		try {
			List<Date> busyDates = appointmentRepo.getBusyDatesByDoctorName(doctorName);
			return busyDates;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * Retrieve the last appointment on given date
	 * 
	 * @param date       Patient appointment date
	 * @param doctorName Name of the Doctor
	 * @return Return the last appointment Time slot on that date
	 */
	public Date lastAppointmentDate(Date date, String doctorName) {
		Date lastAppointmentDate = appointmentRepo.getLastAppointmentTime(date, doctorName);
		return lastAppointmentDate;
	}

	/**
	 * Retrieve a date object containing available time slot based on given date
	 * 
	 * @param date       Date Patient select
	 * @param doctorName Name of the doctor
	 * @return Date object containing date along with available time slot
	 */
	public Date getAppointmentTime(Date appointmentDate, String doctorName) {
		Calendar timeSlot = Calendar.getInstance();
		Date lastAppointmentTimeslot = lastAppointmentDate(appointmentDate, doctorName);
		if(lastAppointmentTimeslot==null) {
			if(isSameDay(appointmentDate)) {
				if(isBefore()) {
					timeSlot.set(Calendar.HOUR_OF_DAY, 9);
					timeSlot.set(Calendar.MINUTE, 0);
					timeSlot.set(Calendar.SECOND, 0);
				}else {
					int remainder = timeSlot.get(Calendar.MINUTE)%15;
					timeSlot.add(Calendar.MINUTE, 15-remainder);
					timeSlot.set(Calendar.SECOND, 0);
				}
			}else {
				timeSlot.setTime(appointmentDate);
				timeSlot.set(Calendar.HOUR_OF_DAY, 9);
				timeSlot.set(Calendar.MINUTE, 0);
				timeSlot.set(Calendar.SECOND, 0);
			}
		}else {
			if(isSameDay(appointmentDate)) {
				if(isBefore(lastAppointmentTimeslot)) {
					// set 15 minutes ahead time slot
					timeSlot.setTime(lastAppointmentTimeslot);
					timeSlot.add(Calendar.MINUTE, 15);
				}else {
					// set modulus
					int remainder = timeSlot.get(Calendar.MINUTE)%15;
					timeSlot.add(Calendar.MINUTE, 15-remainder);
					timeSlot.set(Calendar.SECOND, 0);
				}
			}else {
				// add 15 minutes to lastAppointmentSlot
				timeSlot.setTime(lastAppointmentTimeslot);
				timeSlot.add(Calendar.MINUTE, 15);
			}
		}
		
		return timeSlot.getTime();
	}

	/**
	 * @param date Appointment date
	 * @return Return a string(message) containing email message for appointment
	 *         timing
	 */
	private String getAppointmentEmailMessage(Date date, String doctorName, String PatientName) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("MMMM dd, yyyy, 'at' hh:mm a");
		String formattedDate = dateFormat.format(date);
		String appointmentConfirmationEmail = "Dear " + PatientName + ",\n"
				+ "I am pleased to inform you that your appointment has been successfully scheduled for "
				+ formattedDate + ". We look forward to seeing you at our clinic.\n\n" + "Best regards,\n" + doctorName
				+ "\n";

		return appointmentConfirmationEmail;
	}

	/**
	 * @param date        New date on which appointment reschedule
	 * @param oldDate     Previous date of appointment
	 * @param doctorName  Name of the doctor
	 * @param PatientName Name of the patient
	 * @return returns a message for an email regarding reschedule of the
	 *         appointment
	 */
	private String getRescheduleAppointmentEmailMessage(Date date, Date oldDate, String doctorName,
			String PatientName) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("MMMM dd, yyyy, 'at' hh:mm a");
		String formattedDate = dateFormat.format(date);
		String previousFormattedDate = dateFormat.format(oldDate);
		String str = "Dear " + PatientName + ",\n"
				+ "Due to unforeseen circumstances, I regret to inform you that I won’t be able to attend our meeting scheduled for "
				+ previousFormattedDate + ". I apologize for any inconvenience this may cause.\n" + "Would "
				+ formattedDate
				+ " be suitable for you? I have already reserved this date, so if you encounter any issues, please feel free to cancel the appointment and rebook it.\n"
				+ "Thank you for your understanding, and I appreciate your flexibility.\n" + "Best regards, "
				+ doctorName;

		return str;
	}
	
	/**
	 * Checks whether the given date falls on the same day as today.
	 * 
	 * @param date
	 * @return true if the date is today otherwise false
	 */
	private boolean isSameDay(Date date) {
		Calendar today = Calendar.getInstance();
		Calendar dateToCheck = Calendar.getInstance();
		dateToCheck.setTime(date);
		boolean isSameDay = today.get(Calendar.DAY_OF_YEAR)==dateToCheck.get(Calendar.DAY_OF_YEAR) && today.get(Calendar.YEAR)==dateToCheck.get(Calendar.YEAR);
		return isSameDay;
	}
	
	/**
	 * @return true if current time is less than 9:00 AM
	 */
	private boolean isBefore() {
		Calendar currentTime = Calendar.getInstance();
		return currentTime.get(Calendar.HOUR_OF_DAY)<9;
	}

	/**
	 * @param lastAppointmentDate
	 * @return true if current time is less than given time
	 */
	private boolean isBefore(Date lastAppointmentDate) {
		Calendar currentTime = Calendar.getInstance();
	    Calendar timeSlot = Calendar.getInstance();
	    timeSlot.setTime(lastAppointmentDate);
	    return !(timeSlot.compareTo(currentTime) < 0);
	}

	/**
	 * Get an appointment by its appointment number (ID).
	 *
	 * @param id Appointment ID
	 * @return The corresponding Appointment object
	 */
	public Appointment getAppointmentByAppointmentNumber(Long id) {
		Appointment appointment = appointmentRepo.findById(id).get();
		return appointment;
	}
	
}