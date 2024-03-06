import {
  faCalendar,
  faMagnifyingGlass,
  faBus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import process from "process";

export const BackendURI = process.env.PORT
  ? `https://polybuddy-api.azurewebsites.net:${process.env.PORT}`
  : `http://localhost:8000`;

export const SectionID = {
  Schedules: "schedules",
  NewSchedule: "newschedule",
  Map: "map",
  Shuttle: "shuttle",
  Profile: "profile",
  ForgotChangePass: "forgotchangepass",
  ChangePass: "changepass",
  CreateAccount: "createaccount",
  Login: "login",
  Root: "",
  ForgotPassword: "forgotpassword",
};

export const NavBarData = [
  {
    label: "Schedules",
    href: `${SectionID.Schedules}`,
    icon: faCalendar,
  },
  {
    label: "Map",
    href: `${SectionID.Map}`,
    icon: faMagnifyingGlass,
  },
  {
    label: "Shuttle",
    href: `${SectionID.Shuttle}`,
    icon: faBus,
  },
  {
    label: "Profile",
    href: `${SectionID.Profile}`,
    icon: faUser,
  },
];
