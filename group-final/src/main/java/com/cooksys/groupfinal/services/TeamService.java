package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.TeamRequestDto;

import java.util.Set;

public interface TeamService {

    Set<TeamDto> getTeams();

    TeamDto getTeamById(Long id);


    TeamDto createTeam(TeamRequestDto teamRequestDto);

    Set<TeamDto> getTeamsByUserId(Long userId);

    int getNumberOfProjectsByTeamId(Long id);
}
