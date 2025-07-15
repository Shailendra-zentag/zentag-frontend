
import {
  Home,
  Upload,
  Settings,
  LogOut,
  User,
  HelpCircle,
  BarChart3,
  FileText,
  Building,
  Sun,
} from "lucide-react";

const CloudIcon = () => (
  <svg
    width="21"
    height="18"
    viewBox="0 0 22 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 5L7.90142 10.3669H14.0986L11 5ZM11 13.7051H11.5367V9.8302H11H10.4633V13.7051H11Z"
      fill="white"
    />
    <path
      d="M10.5879 0.75C12.2813 0.75 13.9152 1.35753 15.1836 2.45605C16.4517 3.55438 17.2672 5.0679 17.4814 6.71191L17.5283 7.06738L17.834 7.25488C18.8195 7.85847 19.584 8.75193 20.0205 9.80566C20.4568 10.8592 20.544 12.0206 20.2695 13.125C19.9949 14.2297 19.3724 15.2233 18.4883 15.9619C17.604 16.7006 16.5033 17.1467 15.3438 17.2344L15.1348 17.25H6.04199L5.83301 17.2344C4.67336 17.1467 3.5728 16.7006 2.68848 15.9619C1.80431 15.2233 1.18182 14.2297 0.907227 13.125C0.632744 12.0205 0.719899 10.8592 1.15625 9.80566C1.59277 8.75186 2.35716 7.85847 3.34277 7.25488L3.64844 7.06738L3.69434 6.71191C3.90854 5.0679 4.72509 3.55438 5.99316 2.45605C7.26141 1.35769 8.89466 0.750083 10.5879 0.75Z"
      stroke="white"
      strokeWidth="1.5"
    />
  </svg>
);

const HighlightsIcon = () => (
  <svg
    width="22"
    height="16"
    viewBox="0 0 22 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.1858 9.06412L0.79144 15.3274C0.714746 15.3784 0.625645 15.4077 0.533627 15.4121C0.44161 15.4165 0.350121 15.3959 0.268906 15.3524C0.18769 15.3089 0.11979 15.2442 0.0724356 15.1652C0.0250816 15.0862 4.75887e-05 14.9958 0 14.9037V0.509029C4.75887e-05 0.416906 0.0250816 0.326521 0.0724356 0.247501C0.11979 0.16848 0.18769 0.103784 0.268906 0.0603014C0.350121 0.0168193 0.44161 -0.00382006 0.533627 0.000581848C0.625645 0.00498376 0.714746 0.0342622 0.79144 0.0852984L10.1858 6.34857V0.509029C10.1859 0.416906 10.2109 0.326521 10.2583 0.247501C10.3056 0.16848 10.3735 0.103784 10.4547 0.0603014C10.536 0.0168193 10.6274 -0.00382006 10.7195 0.000581848C10.8115 0.00498376 10.9006 0.0342622 10.9773 0.0852984L21.7733 7.28261C21.843 7.32912 21.9002 7.39213 21.9397 7.46605C21.9793 7.53997 22 7.62251 22 7.70634C22 7.79018 21.9793 7.87272 21.9397 7.94664C21.9002 8.02055 21.843 8.08356 21.7733 8.13008L10.9773 15.3274C10.9006 15.3784 10.8115 15.4077 10.7195 15.4121C10.6274 15.4165 10.536 15.3959 10.4547 15.3524C10.3735 15.3089 10.3056 15.2442 10.2583 15.1652C10.2109 15.0862 10.1859 14.9958 10.1858 14.9037V9.06412ZM8.54999 7.70634L2.03717 3.36412V12.0486L8.54999 7.70634ZM12.223 3.36412V12.0486L18.7358 7.70634L12.223 3.36412Z"
      fill="white"
    />
  </svg>
);

export const dashboardStats = [
    {
      label: "Total videos",
      value: "1,657",
      iconType: "total-videos",
      color: "text-blue-400",
    },
    {
      label: "Live streams",
      value: "4",
      iconType: "live-streams",
      color: "text-red-400",
    },
    {
      label: "Completed videos",
      value: "570",
      iconType: "completed-videos",
      color: "text-green-400",
    },
    {
      label: "Highlights",
      value: "5,130",
      iconType: "highlights",
      color: "text-yellow-400",
    },
    {
      label: "Published",
      value: "972",
      iconType: "published",
      color: "text-purple-400",
    },
  ];

  //Sidebar items
  export const sidebarItems = [
  { icon: Home, label: "Home", active: true },
  { icon: HighlightsIcon, label: "Highlights" },
  { icon: CloudIcon, label: "Published" },
  { icon: Settings, label: "Settings" },
];

 export const profileMenuItems = [
    { icon: User, label: "Profile" },
    { icon: BarChart3, label: "Overview" },
    { icon: FileText, label: "Publish History" },
    // { icon: Building, label: "Organization Profile" },
    { icon: HelpCircle, label: "Help" },
  ];