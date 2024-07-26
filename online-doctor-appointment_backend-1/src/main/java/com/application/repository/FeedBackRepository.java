package com.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.application.entity.FeedBack;

public interface FeedBackRepository extends JpaRepository<FeedBack, Long> {
	
}
