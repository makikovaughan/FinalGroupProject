package com.cooksys.groupfinal.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@NoArgsConstructor
@Data
public class TeamRequestDto {

    private String name;

    private String description;

    private Set<BasicUserDto> teammates;

    private CompanyDto company;
//    private Long companyId;
}
