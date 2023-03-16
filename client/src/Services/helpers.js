import {
  createUserObject,
  createAnnouncementObject,
  createTeamObject,
  createProjectObject,
  createUserRegistryObject,
} from "./objects.js";

//----------General Helpers----------\\
export const countTeamProjects = (projectsDto, teamId) => {
  let result = 0;
  for (let project of projectsDto) {
    result = project.teamId == teamId ? result + 1 : result;
  }
  return result;
};

export const parseDate = (date) => {
  const intToMonth = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };
  let month = String(intToMonth[date.getMonth()]);
  let day = date.getDate();
  let year = String(date.getFullYear());
  console.log(day)
  return month + " " + day + ", " + year;
};

//----------Parsing Data From Backend----------\\
export const parseCompanyAnouncementsDto = (announcementsDto) => {
  let _ = require('lodash');
  let sortedAccouncementsDto = _.orderBy(announcementsDto, ['date'], ['desc'])
  let result = [];

  for (let announcement of sortedAccouncementsDto) {
      result.push(createAnnouncementObject(announcement.id, announcement.author.profile.firstName + " " + announcement.author.profile.lastName, parseDate(new Date(announcement.date.replace(' ', 'T'))), announcement.title, announcement.message));
  }
  return result;
}

//This is to count projects. I will figure out a better implementation.
export const parseCompanyTeamsDto = (companyTeamsDto, projectsDto) => {
  let _ = require('lodash');
  let sortedCompanyTeamsDto = _.orderBy(companyTeamsDto, ['name'], ['asc'])
  let result = [];
  for (let team of sortedCompanyTeamsDto) {
    let usersToAdd = [];
    let qtyProjectsToAdd = countTeamProjects(projectsDto, team.id);
    for (let user of team.teammates) {
      usersToAdd.push(user.profile.firstName + " " + user.profile.lastName[0] + ".")
    }
    result.push(
      createTeamObject(team.id, team.name, qtyProjectsToAdd, usersToAdd)
    );
  }
  return result;
};

// export const parseCompanyTeamsDto = (companyTeamsDto) => {
//   let _ = require('lodash');
//   let sortedCompanyTeamsDto = _.orderBy(companyTeamsDto, ['name'], ['asc'])
//   let result = [];
//   for (let team of sortedCompanyTeamsDto) {
//     let usersToAdd = [];
//     for (let user of team.teammates) {
//       usersToAdd.push(user.profile.firstName + " " + user.profile.lastName[0] + ".")
//     }
//     result.push(
//       createTeamObject(team.id, team.name, "[#]", usersToAdd)
//     );
//   }
//   return result;
// };

export const parseTeamProjectsDto = (projectsDto) => {
  let _ = require('lodash');
  let sortedProjectsDto = _.orderBy(projectsDto, ['id'], ['desc'])
  let result = [];
  for (let project of sortedProjectsDto) {
    result.push(
      createProjectObject(
        project.id,
        project.active,
        project.name,
        project.description,
        project.team.id
      )
    );
  }
  return result;
};

export const parseCompanyUsersDto = (companyUsersDto) => {
  let _ = require('lodash');
  let sortedCompanyUsersDto = _.orderBy(companyUsersDto, ['profile.firstName'], ['asc'])
  let result = [];
  for (let user of sortedCompanyUsersDto) {
    result.push(
      createUserRegistryObject(
        user.id,
        user.profile.firstName,
        user.profile.lastName,
        user.profile.email,
        user.profile.phone,
        user.active,
        user.status,
        user.admin
      )
    );
  }
  return result;
};

export const parseUserDto = (userDto, companies) => {
  return createUserObject(
    userDto.id,
    true,
    userDto.admin,
    userDto.profile.firstName,
    userDto.profile.lastName,
    userDto.profile.email,
    userDto.profile.phone,
    userDto.active,
    userDto.status,
    companies
  );
};

export const parseUserDtoToCompanies = (userDto) => {
  let companies = [];
  for (let company of userDto.companies) {
    companies.push({ id: company.id, name: company.name });
  }
  return companies;
};
