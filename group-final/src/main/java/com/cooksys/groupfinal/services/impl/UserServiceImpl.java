package com.cooksys.groupfinal.services.impl;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.CompanyDto;
import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.CompanyMapper;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
	private final FullUserMapper fullUserMapper;
	private final CredentialsMapper credentialsMapper;
	private final CompanyMapper companyMapper;
	private final CompanyRepository companyRepository;
	
	private User findUser(String username) {
        Optional<User> user = userRepository.findByCredentialsUsernameAndActiveTrue(username);
        if (user.isEmpty()) {
            throw new NotFoundException("The username provided does not belong to an active user.");
        }
        return user.get();
    }
	
	private boolean usernameExists(String username) {
		Optional<User> usernameCheck = userRepository.findByCredentialsUsername(username);
		if(usernameCheck.isPresent()) {
			throw new BadRequestException("The username is already taken. Please chose another and try again.");
		}
		return false;
	}
	
	private User findUserById(Long userId) {
		Optional<User> user = userRepository.findById(userId);
		
		if(user.isEmpty()) {
			throw new BadRequestException("User with that id not found");
		}
		return user.get();
	}
	
	@Override
	public FullUserDto login(CredentialsDto credentialsDto) {
		if (credentialsDto == null || credentialsDto.getUsername() == null || credentialsDto.getPassword() == null) {
            throw new BadRequestException("A username and password are required.");
        }
        Credentials credentialsToValidate = credentialsMapper.dtoToEntity(credentialsDto);
        User userToValidate = findUser(credentialsDto.getUsername());
        if (!userToValidate.getCredentials().equals(credentialsToValidate)) {
            throw new NotAuthorizedException("The provided credentials are invalid.");
        }
        if (userToValidate.getStatus().equals("PENDING")) {
        	userToValidate.setStatus("JOINED");
        	userToValidate.setActive(true);
        	userRepository.saveAndFlush(userToValidate);
        }
        return fullUserMapper.entityToFullUserDto(userToValidate);
	}

	@Override
	public FullUserDto createUser(UserRequestDto userRequestDto) {
		User userToCreate = fullUserMapper.requestDtoToEntity(userRequestDto);
		
		if(usernameExists(userToCreate.getCredentials().getUsername()) != false) {
			throw new BadRequestException("Username is already taken. Please choose another and try again.");
		}
		if(userToCreate.getProfile().getEmail() == null) {
			throw new BadRequestException("You must enter an email address");
		}
		if(userToCreate.getCredentials().getPassword() == null) {
			throw new BadRequestException("You must provide a password");
		}
		
		if(userRequestDto.getCompany() != null) {
			
			Optional<Company> company = companyRepository.findById(userRequestDto.getCompany().getId());
			
			if(company.isPresent()) {
				System.out.println("Test");
				Set<Company> companies = new HashSet<>();
				companies.add(company.get());
				for(Company c : companies) {
					System.out.println(c.getName());
				}
				userToCreate.setCompanies(companies);
				Set<User> users = company.get().getEmployees();
				users.add(userToCreate);
				company.get().setEmployees(users);
				userRepository.saveAndFlush(userToCreate);
				companyRepository.saveAndFlush(company.get());
				
			} else {
				throw new BadRequestException("Company with id" + userRequestDto.getCompany().getId() + "not found");
			}
		}
		
		userToCreate.getCredentials().setUsername(userRequestDto.getCredentials().getUsername());
		userToCreate.getCredentials().setPassword(userRequestDto.getCredentials().getPassword());
		userToCreate.getProfile().setFirstName(userRequestDto.getProfile().getFirstName());
		userToCreate.getProfile().setLastName(userRequestDto.getProfile().getLastName());
		userToCreate.getProfile().setEmail(userRequestDto.getProfile().getEmail());
		userToCreate.getProfile().setPhone(userRequestDto.getProfile().getPhone());
		userToCreate.setActive(true);
		
		if(userRequestDto.isAdmin() == true) {
			userToCreate.setAdmin(userRequestDto.isAdmin());
			userRepository.saveAndFlush(userToCreate);
		} else {
			userToCreate.setAdmin(false);
			userRepository.saveAndFlush(userToCreate);
		}
		
		return fullUserMapper.entityToFullUserDto(userRepository.saveAndFlush(userToCreate));
		}

	@Override
	public Set<CompanyDto> findUserCompanies(Long userId) {
		User userCompanies = findUserById(userId);
		Set<Company> companies = new HashSet<>();
		userCompanies.getCompanies().forEach(companies::add);
		
		return companyMapper.entitiesToDtos(companies);
	}
			
}
