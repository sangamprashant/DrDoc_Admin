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

export const menuItems = [
  {
    title: "",
    items: [
      { id: 1, text: "Dashboard", link: "/", icon: <HomeIcon /> },
      { id: 2, text: "State", link: "#", icon: <TimelineIcon /> },
      { id: 3, text: "Graph", link: "#", icon: <SignalCellularAltIcon /> },
    ],
  },
  {
    title: "Email",
    items: [
      { id: 4, text: "All Response", link: "/mail/all", icon: <MailIcon /> },
      { id: 5, text: "Pending", link: "/mail/pending", icon: <MarkEmailUnreadIcon /> },
      { id: 6, text: "Responded", link: "/mail/responded", icon: <MarkEmailReadIcon /> },
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
      { id: 9, text: "Applications", link: "/doctor/application", icon: <PersonAddAlt1Icon /> },
    ],
  },
  {
    title: "Seller",
    items: [
      { id: 10, text: "All Seller", link: "/seller/all", icon: <BadgeIcon /> },
    ],
  },
  {
    title: "Delivery",
    items: [
      { id: 11, text: "All Seller", link: "/delivery/all", icon: <BadgeIcon /> },
    ],
  },
];
