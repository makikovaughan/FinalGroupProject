import api from "./api";

//----------Get Requests----------\\
export const getCompanyAnnouncements = async (companyId) => {
  return await api.get("/company/" + companyId + "/announcements");
};

export const getCompanyTeams = async (companyId) => {
  return await api.get("/company/" + companyId + "/teams");
};

export const getTeamProjects = async (companyId, teamId) => {
  return await api.get(
    "/company/" + companyId + "/teams/" + teamId + "/projects"
  );
};

export const getCompanyUsers = async (companyId) => {
  return await api.get("/company/" + companyId + "/users");
};

export const getAllCompanyProjects = async () => {
  return await api.get("/projects");
};



//----------Post Requests----------\\
export const login = async (username, password) => {
  return await api.post("/users/login", {
    username: username,
    password: password,
  });
};

export const createTeam = async (teamName, description, companyId, teamMembers) => {
  let memberObjects = []
  for(let memberId of teamMembers.members){
    memberObjects.push({id: memberId})
  }
  
  return await api.post("/team", {
    name: teamName,
    description: description,
    company: {
      id: companyId
    },
    teammates: memberObjects
  });
};

export const createUser = async (
  username,
  password,
  firstName,
  lastName,
  email,
  phone,
  isAdmin,
  companyId
) => {
  return await api.post("/users/create", {
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
  });
};

export const createAnnouncement = async (announcementObject, userState) => {
  return await api.post("/announcements", {
    title: announcementObject.title,
    message: announcementObject.message,
    author: {
      id: userState.id,
      profile: {
        firstname: userState.firstName,
        lastName: userState.lastName,
        email: userState.email,
        phone: userState.phone,
      },
      isAdmin: userState.isAdmin,
      active: userState.active,
      status: userState.status,
    },
  });
};

export const createProject = async (
  projectName,
  projectDescription,
  active,
  teamId
) => {
  return await api.post("/projects/create-project", {
    name: projectName,
    description: projectDescription,
    active: active,
    teamId: teamId,
  });
};

//----------Patch Requests----------\\
export const updateProject = async (
  projectId,
  projectName,
  projectDescription,
  active,
  teamId
) => {
  return await api.patch("/projects/update-project/" + projectId, {
    name: projectName,
    description: projectDescription,
    active: active,
    teamId: teamId,
  });
};

//----------Delete Requests----------\\
