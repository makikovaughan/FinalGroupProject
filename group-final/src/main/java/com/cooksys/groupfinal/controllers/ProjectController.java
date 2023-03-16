package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.ProjectRequestDto;
import com.cooksys.groupfinal.services.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
@CrossOrigin
public class ProjectController {
	
	private final ProjectService projectService;

	// get all the projects

	@GetMapping
	@CrossOrigin(origins="*")
	public List<ProjectDto> getAllProjects() {
		return projectService.getAllProjects();
	}

	//get all the projects that are active
	@GetMapping("/active")
	@CrossOrigin(origins="*")
	public List<ProjectDto> getAllActiveProjects() {
		return projectService.getAllActiveProjects();
	}

	//get all the projects by a team
	@GetMapping("/team/{id}")
	@CrossOrigin(origins="*")
	public Set<ProjectDto> getAllTeamProjects(@PathVariable Long  id){
		return projectService.getAllTeamProjects(id);
	}
	// create a project
	@PostMapping("/create-project")
	@CrossOrigin(origins="*")
	public ProjectDto createProject(@RequestBody ProjectRequestDto projectRequestDto){
		return  projectService.createProject(projectRequestDto);
	}

	//edit a project
	@PatchMapping("/update-project/{projectId}")
	@CrossOrigin(origins="*")
	public ProjectDto updateProject(@RequestBody ProjectRequestDto projectRequestDto, @PathVariable Long projectId){
		return projectService.updateProject(projectRequestDto, projectId);
	}

}
