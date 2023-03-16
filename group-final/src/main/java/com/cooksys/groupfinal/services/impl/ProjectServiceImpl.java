package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.ProjectRequestDto;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final TeamRepository teamRepository;
    private final CredentialsMapper credentialsMapper;
    private final UserRepository userRepository;

    @Override
    public List<ProjectDto> getAllProjects() {
        List <Project> projects = projectRepository.findAll();
        return projectMapper.entitiesToDtos(projects);
    }

    @Override
    public List<ProjectDto> getAllActiveProjects() {
        List <Project> projects = projectRepository.findAll();
        List <Project> activeProjects = projectRepository.findAll();
        for(Project project : projects){
            if(project.isActive()) activeProjects.add(project);
        }
        return projectMapper.entitiesToDtos(activeProjects);
    }

    @Override
    public Set<ProjectDto> getAllTeamProjects(Long id) {
        if(id == null)
            throw new BadRequestException("Missing property! (id=number)");

        Optional<Team> team = teamRepository.findById(id);
        if(team.isEmpty()) throw new NotFoundException("Invalid ID");
        Set<Project> projects = team.get().getProjects();
        return projectMapper.entitiesToDtos(projects);
    }

    @Override
    public ProjectDto createProject(ProjectRequestDto projectRequestDto) {
        System.out.println(projectRequestDto);
        if(projectRequestDto.getName() == null || projectRequestDto.getDescription() == null || projectRequestDto.getTeamId() == null){
            throw new BadRequestException("Missing property!(name=string || description=string || teamid=number");
        }
        Project project = new Project();
        project.setName(projectRequestDto.getName());
        project.setDescription(projectRequestDto.getDescription());
        project.setActive(projectRequestDto.isActive() ? true : false);

        Optional<Team> team = teamRepository.findById(projectRequestDto.getTeamId());
        if(team.isEmpty()) throw new NotFoundException("Team id doesn't exist");
        project.setTeam(team.get());
        project = projectRepository.saveAndFlush(project);

        return projectMapper.entityToDto(project);

    }

    @Override
    public ProjectDto updateProject(ProjectRequestDto projectRequestDto, Long projectId) {
        if(projectId == null)
            throw new BadRequestException("Missing property! (projectId=number)");

        Optional<Project> optionalProject = projectRepository.findById(projectId);
        if (!optionalProject.isPresent()) throw new NotFoundException("id " + projectId + " doesn't exist");

        Project project = optionalProject.get();
        if (projectRequestDto.getName() != null) {
            project.setName(projectRequestDto.getName());
        }
        if (projectRequestDto.getDescription() != null) {
            project.setDescription(projectRequestDto.getDescription());
        }
        project.setActive(projectRequestDto.isActive());
        project = projectRepository.saveAndFlush(project);
        return projectMapper.entityToDto(project);
    }

}
