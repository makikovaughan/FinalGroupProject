package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import com.cooksys.groupfinal.services.AnnouncementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/announcements")
@RequiredArgsConstructor
@CrossOrigin
public class AnnouncementController {
	
	private final AnnouncementService announcementService;

	@PostMapping("")
	@CrossOrigin(origins="*")
	@ResponseStatus(HttpStatus.CREATED)
	public void postAnnouncements(@RequestBody AnnouncementRequestDto announcementRequestDto) {
		announcementService.postAnnouncement(announcementRequestDto);
	}
}
