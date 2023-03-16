package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;

public interface AnnouncementService {

    void postAnnouncement(AnnouncementRequestDto announcementRequestDto);
}
