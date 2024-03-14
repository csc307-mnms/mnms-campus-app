import {
  faCalendar,
  faMagnifyingGlass,
  faBus,
  faUser,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

function getBackendURI() {
  if (process.env.NODE_ENV === "production") {
    return "https://polybuddy-api.azurewebsites.net";
  } else {
    return "http://localhost:8000";
  }
}

export const BackendURI = getBackendURI();

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

export const AddScheduleData = [
  {
    label: "Plus",
    href: `${SectionID.NewSchedule}`,
    icon: faPlus,
  },
];

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
