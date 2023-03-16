import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

//Global States
export const userState = atom({
  key: "userState",
  default: {
    //login, takes username and password
    id: "[USER 1 ID]",
    isLoggedIn: false,
    isAdmin: true,
    firstName: "[FIRSTNAME]",
    lastName: "[LASTNAME]",
    email: "[EMAIL]",
    phone: "[PHONE]",
    active: "[ACTIVE STATUS]",
    status: "[STATUS]",
    companies: [
      {
        id: "[COMPANY 1 ID",
        name: "[COMPANY 1 NAME]",
      },
    ],
    selectedCompany: {},
    selectedTeam: "[SELECTED TEAM]",
  },
  effects_UNSTABLE: [persistAtom],
});

export const errorState = atom({
  key: "errorState",
  default: {
    isError: false,
    message: "",
  },
});

//Page Specific States
export const announcementsState = atom({
  key: "announcementsState",
  default: [
    //getCompanyAnnouncements, takes company id
    {
      id: "[ANNOUNCEMENT 1 ID]",
      author: "[AUTHOR 1]",
      dateCreated: "[DATE 1]",
      title: "[TITLE 1]",
      message: "[MESSAGE 1]",
    },
    {
      id: "[ANNOUNCEMENT 2 ID]",
      author: "[AUTHOR 2]",
      dateCreated: "[DATE 2]",
      title: "[TITLE 2]",
      message: "[MESSAGE 2]",
    },
    {
      id: "[ANNOUNCEMENT 3 ID]",
      author: "[AUTHOR 3]",
      dateCreated: "[DATE 3]",
      title: "[TITLE 3]",
      message: "[MESSAGE 3]",
    },
  ],
});

export const teamsState = atom({
  key: "teamsState",
  default: [
    //getCompanyTeams, takes company id
    {
      id: "[TEAM 1 ID]",
      teamName: "[TEAM 1 NAME]",
      qtyProjects: "[# OF PROJECTS]",
      members: [
        "[{MEMBER 1 USER REGISTRY OBJECT}]",
        "[{MEMBER 2 USER REGISTRY OBJECT}]",
        "[{MEMBER 3 USER REGISTRY OBJECT}]",
      ],
    },
    {
      id: "[TEAM 2 ID]",
      teamName: "[TEAM 2 NAME]",
      qtyProjects: "[# OF PROJECTS]",
      members: [
        "[{MEMBER 1 USER REGISTRY OBJECT}]",
        "[{MEMBER 2 USER REGISTRY OBJECT}]",
        "[{MEMBER 3 USER REGISTRY OBJECT}]",
      ],
    },
    {
      id: "[TEAM 3 ID]",
      teamName: "[TEAM 3 NAME]",
      qtyProjects: "[# OF PROJECTS]",
      members: [
        "[{MEMBER 1 USER REGISTRY OBJECT}]",
        "[{MEMBER 2 USER REGISTRY OBJECT}]",
        "[{MEMBER 3 USER REGISTRY OBJECT}]",
      ],
    },
  ],
});

export const companyState = atom({
  key: "companyState",
  default: [
    //login, takes username and password
    {
      id: 1,
      name: "[COMPANY 1 NAME]",
    },
    {
      id: 2,
      name: "[COMPANY 2 NAME]",
    },
    {
      id: 3,
      name: "[COMPANY 3 NAME]",
    },
  ],
});

export const projectsState = atom({
  key: "projectsState",
  default: [
    //GET company/{id}/teams/{id}/projects, takes company id and team id
    {
      id: "[PROJECT 1 ID]",
      projectName: "[PROJECT 1 NAME]",
      isActive: true,
      projectDecription: "[PROJECT 1 DESCRIPTION]",
      team: "[TEAM ID ASSIGNED TO PROJECT]",
    },
    {
      id: "[PROJECT 2 ID]",
      projectName: "[PROJECT 2 NAME]",
      isActive: true,
      projectDecription: "[PROJECT 2 DESCRIPTION]",
      teamId: "[TEAM ID ASSIGNED TO PROJECT]",
    },
    {
      id: "[PROJECT 3 ID]",
      projectName: "[PROJECT 3 NAME]",
      isActive: false,
      projectDecription: "[PROJECT 3 DESCRIPTION]",
      teamId: "[TEAM ID ASSIGNED TO PROJECT]",
    },
  ],
});

export const allProjectsState = atom({
  key: "allProjectsState",
  default: [
    //GET company/{id}/teams/{id}/projects, takes company id and team id
    {
      id: "[PROJECT 1 ID]",
      projectName: "[PROJECT 1 NAME]",
      isActive: true,
      projectDecription: "[PROJECT 1 DESCRIPTION]",
      team: "[TEAM ID ASSIGNED TO PROJECT]",
    },
    {
      id: "[PROJECT 2 ID]",
      projectName: "[PROJECT 2 NAME]",
      isActive: true,
      projectDecription: "[PROJECT 2 DESCRIPTION]",
      teamId: "[TEAM ID ASSIGNED TO PROJECT]",
    },
    {
      id: "[PROJECT 3 ID]",
      projectName: "[PROJECT 3 NAME]",
      isActive: false,
      projectDecription: "[PROJECT 3 DESCRIPTION]",
      teamId: "[TEAM ID ASSIGNED TO PROJECT]",
    },
  ],
});

export const userRegistryState = atom({
  key: "userRegistryState",
  default: [
    //GET company/{id}/users, takes company id
    {
      id: "[USER 1 ID]",
      firstName: "[FIRST NAME 1]",
      lastName: "[LAST NAME 1]",
      email: "[EMAIL 1]",
      phone: "[PHONE NUMBER 1",
      active: "[ACTIVE STATUS]",
      status: "[STATUS 1]",
    },
    {
      id: "[USER 2 ID]",
      firstName: "[FIRST NAME 2]",
      lastName: "[LAST NAME 2]",
      email: "[EMAIL 2]",
      phone: "[PHONE NUMBER 2",
      active: "[ACTIVE STATUS]",
      status: "[STATUS 2]",
    },
    {
      id: "[USER 3 ID]",
      firstName: "[FIRST NAME 3]",
      lastName: "[LAST NAME 3]",
      email: "[EMAIL 3]",
      phone: "[PHONE NUMBER 3",
      active: "[ACTIVE STATUS]",
      status: "[STATUS 3]",
    },
  ],
});
