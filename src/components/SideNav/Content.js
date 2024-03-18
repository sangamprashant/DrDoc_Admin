import {
  BadgeIcon,
  BusinessCenterIcon,
  HomeIcon,
  MailIcon,
  MarkEmailReadIcon,
  MarkEmailUnreadIcon,
  PersonAddAlt1Icon,
  PersonRemoveIcon,
  SignalCellularAltIcon,
  TimelineIcon,
} from "../Icons/Icons";

export const menuItemsAdmin = [
  {
    title: "",
    items: [{ id: 1, text: "Dashboard", link: "/", icon: <HomeIcon /> }],
  },
  {
    title: "Email",
    items: [
      { id: 4, text: "All Response", link: "/mail/all", icon: <MailIcon /> },
      {
        id: 5,
        text: "Pending",
        link: "/mail/pending",
        icon: <MarkEmailUnreadIcon />,
      },
      {
        id: 6,
        text: "Responded",
        link: "/mail/responded",
        icon: <MarkEmailReadIcon />,
      },
    ],
  },
  {
    title: "User",
    items: [
      { id: 7, text: "All User", link: "/user/all", icon: <BadgeIcon /> },
    ],
  },
  {
    title: "Doctors",
    items: [
      { id: 8, text: "All Doctors", link: "/doctor/all", icon: <BadgeIcon /> },
      {
        id: 9,
        text: "Applications",
        link: "/doctor/application",
        icon: <PersonAddAlt1Icon />,
      },
    ],
  },
];

export const menuItemsDoctor = [
  {
    title: "",
    items: [{ id: 1, text: "Dashboard", link: "/", icon: <HomeIcon /> }],
  },
  {
    title: "Profile",
    items: [
      {
        id: 1,
        text: "My Profile",
        link: "/doctor/my/profile",
        icon: <HomeIcon />,
      },
    ],
  },
  {
    title: "Clients",
    items: [
      {
        id: 1,
        text: "My Clients",
        link: "/doctor/my/clients",
        icon: <HomeIcon />,
      },
      {
        id: 1,
        text: "Chats",
        link: "/doctor/my/clients/chats",
        icon: <HomeIcon />,
      },
    ],
  },
];
