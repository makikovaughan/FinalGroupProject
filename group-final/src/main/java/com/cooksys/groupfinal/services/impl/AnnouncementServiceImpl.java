package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.AnnouncementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {

    private final AnnouncementMapper announcementMapper;
    private final AnnouncementRepository announcementRepository;
    private final UserRepository userRepository;

    @Override
    public void postAnnouncement(AnnouncementRequestDto announcementRequestDto)
    {
        if(announcementRequestDto.getAuthor() == null)
            throw new BadRequestException("Missing property! (author)");

        Long id = announcementRequestDto.getAuthor().getId();

        if(id == null)
            throw new BadRequestException("Author id cannot be 0");

        Optional<User> user = userRepository.findById(id);

        if(user.isPresent())
        {
            Announcement announcement = new Announcement();
            announcement.setAuthor(user.get());
            announcement.setTitle(announcementRequestDto.getTitle());
            //Note: not sure if right, I can't find anywhere else to pull from.
            announcement.setCompany(user.get().getCompanies().iterator().next());
            announcement.setMessage(announcementRequestDto.getMessage());
            announcementRepository.saveAndFlush(announcement);
        }
        else
            throw new NotFoundException("The requested user was not found");
    }
}