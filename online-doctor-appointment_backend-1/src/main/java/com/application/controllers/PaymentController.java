package com.application.controllers;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@RestController
public class PaymentController {
	/**
	 * This API endpoint creates an order using the Razorpay API.
	 * 
	 * @param data A `HashMap` containing the order details. 
	 *              Expected key: "amount" (Integer representing amount in paisa)
	 * @return A JSON string representing the created Razorpay Order object.
	 *         Returns null on error.
	 * @throws RazorpayException Throws an exception if there's an error with Razorpay API.
	 */
	@PostMapping("/createOrder")
	@CrossOrigin("http://localhost:3000/")
	public String createOrder(@RequestBody Map<String, Object> data) {
		int amount = Integer.parseInt(data.get("amount").toString());
		try {
			RazorpayClient client = new RazorpayClient("rzp_test_1L0eX7RuYr9ZH3", "gwhzYVoIHxE7PDs5xzeCgesq");
			JSONObject obj = new JSONObject();
			obj.put("amount", amount*100);
			obj.put("currency", "INR");
			obj.put("receipt", "txn_12345");
			Order order = client.orders.create(obj);
			System.out.println(order);
			return order.toString();
		} catch (RazorpayException e) {
			e.printStackTrace();
		}
		return null;
	}
}
