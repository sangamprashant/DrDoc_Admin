import {
  BadgeIcon,
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
      { id: 1, text: "Dashboard", link: "#", icon: <HomeIcon /> },
      { id: 2, text: "State", link: "#", icon: <TimelineIcon /> },
      { id: 3, text: "Graph", link: "#", icon: <SignalCellularAltIcon /> },
    ],
  },
  {
    title: "Email",
    items: [
      { id: 10, text: "All Response", link: "#", icon: <MailIcon /> },
      { id: 3, text: "Pending", link: "#", icon: <MarkEmailUnreadIcon /> },
      { id: 2, text: "Responded", link: "#", icon: <MarkEmailReadIcon /> },
    ],
  },
  {
    title: "Employee",
    items: [
      { id: 10, text: "All Employee", link: "#", icon: <BadgeIcon /> },
      { id: 3, text: "Add Emplopyee", link: "#", icon: <PersonAddAlt1Icon /> },
      { id: 2, text: "Remove Employee", link: "#", icon: <PersonRemoveIcon /> },
    ],
  },
  {
    title: "Payment",
    items: [
      { id: 17, text: "Received", link: "#" },
      { id: 2, text: "Failed", link: "#" },
      { id: 3, text: "Confirmed", link: "#" },
      { id: 3, text: "Refund", link: "#" },
    ],
  },
];