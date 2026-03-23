
import { GoHome } from "react-icons/go";
import { CgPlayButtonR } from "react-icons/cg";
import { BsFillSendFill } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { MdOutlineInsertChart } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { RiSettings4Line } from "react-icons/ri";
import { LuSquareActivity } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa";
import { TbMessageReport } from "react-icons/tb";
import { CiUser } from "react-icons/ci";

export const sidebarMenu = [
  { icon: GoHome, label: "Home", link: "/" },
  { icon: CgPlayButtonR, label: "Reels", link: "/reels" },
  { icon: BsFillSendFill, label: "Messages", link: "/messages" },
  { icon: IoSearch, label: "Search", link: "/search" },
  { icon: MdOutlineExplore, label: "Explore", link: "/explore" },
  { icon: FaRegHeart, label: "Notifications", link: "/notifications" },
  { icon: GoPlus, label: "Create", link: "/create" },
  { icon: MdOutlineInsertChart, label: "Dashboard", link: "/dashboard" },
  { icon: CgProfile, label: "Profile", link: "/profile" },
];

export const moreMenu = [
  { icon: RiSettings4Line, label: "Settings", link: "/settings" },
  { icon: LuSquareActivity, label: "Your activity", link: "/activity" },
  { icon: FaRegBookmark, label: "Saved", link: "/saved" },
  // { icon: GoHome, label: "Switch appearance", link: "/appearance" },
  { icon: TbMessageReport, label: "Report a problem", link: "/report" },
  { icon: CiUser, label: "Switch accounts", link: "/accounts" },
  { icon: GoHome, label: "Log out", link: "/logout" },
];