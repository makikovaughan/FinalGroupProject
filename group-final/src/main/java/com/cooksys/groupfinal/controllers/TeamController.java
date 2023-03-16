package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.TeamRequestDto;
import com.cooksys.groupfinal.services.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
@CrossOrigin
public class TeamController {

	private final TeamService teamService;

	@GetMapping
	@CrossOrigin(origins="*")
	public Set<TeamDto> getTeams(){return teamService.getTeams();}

	@GetMapping("/{id}")
	@CrossOrigin(origins="*")
	public TeamDto getTeamById(@PathVariable Long id){return teamService.getTeamById(id);}

	@GetMapping("/user/{userId}")
	@CrossOrigin(origins="*")
	public Set<TeamDto> getTeamsByUserId(@PathVariable Long userId){return teamService.getTeamsByUserId(userId);}

	@GetMapping("/{id}/project/num")
	@CrossOrigin(origins="*")
	public int getNumberOfProjectsByTeamId(@PathVariable Long id){return teamService.getNumberOfProjectsByTeamId(id);}
	
	@PostMapping
	@CrossOrigin(origins="*")
	public TeamDto createTeam(@RequestBody TeamRequestDto teamRequestDto){return teamService.createTeam(teamRequestDto);}

}
