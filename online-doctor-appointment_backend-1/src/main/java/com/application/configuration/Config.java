package com.application.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class Config implements WebSocketMessageBrokerConfigurer{

    /**
     * Register STOMP end points.
     *
     * @param registry StompEndpointRegistry
     */
	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/server1").setAllowedOrigins("http://localhost:3000").withSockJS();
	}

    /**
     * Configure message broker.
     *
     * @param registry MessageBrokerRegistry
     */
	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		// TODO Auto-generated method stub
		registry.enableSimpleBroker("/chat");
		registry.setApplicationDestinationPrefixes("/app");
	}
	
}
