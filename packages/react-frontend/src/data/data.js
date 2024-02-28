import {
  faCalendar,
  faMagnifyingGlass,
  faBus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const SectionID = {
  Schedules: "schedules",
  Map: "map",
  Shuttle: "shuttle",
  Profile: "profile",
  HomePage: "",
  ChangePass: "changepass",
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
