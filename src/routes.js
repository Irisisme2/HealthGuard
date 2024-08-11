import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdHome,
  MdMap,
  MdEvent,
  MdHealthAndSafety,
  MdFitnessCenter,
  MdLocalPharmacy,
  MdAssistant,
  MdBook,
  MdForum,
  MdAccountCircle
} from "react-icons/md";

import MainDashboard from "views/admin/default";
import ActivityTracking from "views/admin/ActivityTracking";
import Ai from "views/admin/Ai";
import Appointments from "views/admin/Appointments";
import FacilityMap from "views/admin/FacilityMap";
import Forum from "views/admin/Forum";
import HealthMonitoring from "views/admin/HealthMonitoring";
import HealthTips from "views/admin/HealthTips";
import MedicineOrders from "views/admin/MedicineOrders";
import profile from "views/admin/profile";

import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Medical Facility Map",
    layout: "/admin",
    path: "/FacilityMap",
    icon: <Icon as={MdMap} width='20px' height='20px' color='inherit' />,
    component: FacilityMap,
    secondary: true,
  },
  {
    name: "Appointments",
    layout: "/admin",
    icon: <Icon as={MdEvent} width='20px' height='20px' color='inherit' />,
    path: "/Appointments",
    component: Appointments,
    
  },
  {
    name: "Health Monitoring",
    layout: "/admin",
    path: "/HealthMonitoring",
    icon: <Icon as={MdHealthAndSafety} width='20px' height='20px' color='inherit' />,
    component: HealthMonitoring,
  },
  {
    name: "Activity Tracking",
    layout: "/admin",
    path: "/ActivityTracking",
    icon: <Icon as={MdFitnessCenter} width='20px' height='20px' color='inherit' />,
    component: ActivityTracking,
  },
  {
    name: "Medicine Orders",
    layout: "/admin",
    path: "/MedicineOrders",
    icon: <Icon as={MdLocalPharmacy} width='20px' height='20px' color='inherit' />,
    component: MedicineOrders,
  },
  {
    name: "Ai Assistant",
    layout: "/admin",
    path: "/Ai",
    icon: <Icon as={MdAssistant} width='20px' height='20px' color='inherit' />,
    component: Ai,
  },
  {
    name: "Health Tips",
    layout: "/admin",
    path: "/HealthTips",
    icon: <Icon as={MdBook} width='20px' height='20px' color='inherit' />,
    component: HealthTips,
  },
  {
    name: "Forum",
    layout: "/admin",
    path: "/Forum",
    icon: <Icon as={MdForum} width='20px' height='20px' color='inherit' />,
    component: Forum,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdAccountCircle} width='20px' height='20px' color='inherit' />,
    component: profile,
  },
  {
    name: "Signin",
    layout: "/admin",
    path: "/SignInCentered",
    icon: <Icon as={MdAccountCircle} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
];

export default routes;
