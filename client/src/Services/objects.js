export const createUserObject = (
  id,
  isLoggedIn,
  isAdmin,
  firstName,
  lastName,
  email,
  phone,
  active,
  status,
  companies
) => {
  return {
    id: id,
    isLoggedIn: isLoggedIn,
    isAdmin: isAdmin,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    active: active,
    status: status,
    companies: companies,
    selectedCompany: isAdmin ? null : companies[0].id,
    selectedTeam: null,
  };
};

export const createAnnouncementObject = (
  id,
  author,
  dateCreated,
  title,
  message
) => {
  return {
    id: id,
    author: author,
    dateCreated: dateCreated,
    title: title,
    message: message,
  };
};

export const createTeamObject = (id, teamName, qtyProjects, members) => {
  return {
    id: id,
    teamName: teamName,
    qtyProjects: qtyProjects,
    members: members,
  };
};

export const createProjectObject = (
  id,
  isActive,
  projectName,
  projectDescription,
  teamId
) => {
  return {
    id: id,
    isActive: isActive,
    projectName: projectName,
    projectDescription: projectDescription,
    teamId: teamId,
  };
};

export const createUserRegistryObject = (
  id,
  firstName,
  lastName,
  email,
  phone,
  active,
  status,
  isAdmin
) => {
  return {
    id: id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    active: active,
    status: status,
    isAdmin: isAdmin
  };
};

// email, password, firstName, lastName, email, phone, isAdmin

export const createUserRequestDto = (username, password, firstName, lastName, email, phone, isAdmin, companyId) => {
  return {
    credentials: {
      username: username,
      password: password,
    },
    profile: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
    },
    company:
    {
      id: companyId
    },
    admin: isAdmin
  };
};

// {
//   "profile":{
//   "firstName": "Alex",
//   "lastName": "Miller",
//   "email" : "alex@mail.com",
//   "phone" : "9999999999"
//   },
//   "credentials":{
//       "username" : "alex@mail.com",
//       "password" : "password"
//   },
//   "company": {
//           "id" : 6
//   }
// }