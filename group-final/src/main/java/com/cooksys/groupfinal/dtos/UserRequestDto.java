package com.cooksys.groupfinal.dtos;

import java.util.Set;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class UserRequestDto {
	
	private CredentialsDto credentials;

    private ProfileDto profile;
    
    private boolean admin;
    
    private CompanyDto company;
    
    private Set<CompanyDto> companies;
    
    private TeamDto team;

}