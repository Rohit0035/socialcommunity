// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import {
//   Navbar,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   Collapse,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
// } from "reactstrap";
// import {
//   FaChevronDown,
//   FaBars,
//   FaArrowLeft,
//   FaTimes,
//   FaChevronRight,
//   FaMapMarkerAlt
// } from "react-icons/fa";
// // import "../assets/styles/navbar.css";

// import menuData from "./menuData"; // ✅ Import dynamic menu data
// // import CityPopup from "./CityPopup";
// import Image from "next/image";
// import logo from "../assets/images/logo.png"
// export default function MainNavbar() {
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [activeSubmenu, setActiveSubmenu] = useState(null);
//   const [expandedChild, setExpandedChild] = useState(null);

//   // citypopup
//   // const [modalOpen, setModalOpen] = useState(false);
//   // const toggleModal = () => setModalOpen(!modalOpen);

//   const toggleSidebar = () => {
//     setShowSidebar(!showSidebar);
//     setActiveSubmenu(null);
//     setExpandedChild(null);
//   };

//   const openSubmenu = (menu) => {
//     setActiveSubmenu(menu);
//     setExpandedChild(null);
//   };

//   const closeSubmenu = () => setActiveSubmenu(null);

//   const toggleChild = (child) => {
//     setExpandedChild(expandedChild === child ? null : child);
//   };

//   const activeMenuData = menuData.find((m) => m.name === activeSubmenu);

//   return (
//     <>
//       {/* === Top Header === */}
//       <div className="top-header border-bottom" style={{padding:'14px 0px'}}>
//         <div className="container small text-muted">
//           <div className="row">
//             <marquee className="text-white fw-bold" behavior="scroll" direction="left" scrollamount="5">
//               SmartMind – Your Trusted Real Estate Partner | Buy • Sell • Rent Properties | Verified Listings | 0%
//               Brokerage Options |
//               Best Deals on Apartments & Villas | Assured Property Guidance | Premium Locality Insights |
//               Expert Real Estate Advisors | Transparent Pricing | Smart Property Search |
//               Trusted by Thousands of Home Buyers | Fastest-Growing Real Estate Platform |
//             </marquee>
//           </div>
//         </div>
//       </div>

//       {/* === Main Navbar === */}
//       <Navbar expand="lg" className="smart-navbar bg-white shadow-sm py-2">
//         <div className="container">
//           <div className="">
//             {/* === Mobile Toggle === */}
//             <div className="d-flex align-items-center w-100">
//               <NavbarBrand href="/" className="fw-bold text-white fs-3 d-lg-none">
//                 <Image src={logo} alt="smartmind" className="st-logo" />
//               </NavbarBrand>
//               <span className="d-lg-none" style={{ marginTop: '0px' }}>
//                 {/* <a href="#" onClick={toggleModal} className="text-st ms-2 me-3" >
//                   <FaMapMarkerAlt size={20} />
//                   <span className="small ms-1 d-none">Bangalore</span>
//                 </a> */}
//               </span>
//               <div className="ms-auto right-grid d-flex justify-content-end d-lg-none">
//                 <UncontrolledDropdown>
//                   <DropdownToggle caret color="primary" className="rounded-pill btn-danger w-100  btn btn-danger btn-sm px-4 ">
//                     Login
//                   </DropdownToggle>
//                   <DropdownMenu style={{ zIndex: '9999 !important', position: 'absolute !important' }}>
//                     <DropdownItem tag={Link} href="/signup">
//                       Sign Up
//                     </DropdownItem>

//                     <DropdownItem tag={Link} href="/signin">
//                       Sign In
//                     </DropdownItem>
//                   </DropdownMenu>
//                 </UncontrolledDropdown>
//                 <button className=" ms-2 btn btn-light btn-sm sm-2 px-4 fw-bold d-none d-sm-block" style={{ borderRadius: '100px' }}>
//                   Post Property
//                 </button>
//               </div>
//               <button
//                 className="btn btn-link text-dark d-lg-none fs-5 "
//                 onClick={toggleSidebar}
//               >
//                 <FaBars />
//               </button>
//             </div>

//             {/* === Desktop Menu === */}
//             <Collapse isOpen={true} navbar className="d-none d-lg-flex">
//               <NavbarBrand href="/" className="fw-bold text-white fs-3">
//                 <Image src={logo} alt="smartmind" className="st-logo" />
//               </NavbarBrand>
//               <span className="" style={{ marginTop: '0px' }}>
//                 {/* <a href="#" onClick={toggleModal} className="text-st ms-2" >
//                   <FaMapMarkerAlt size={14} />
//                   <span className="small ms-1 ">Bangalore</span>
//                 </a> */}
//               </span>
//               <Nav className="align-items-center ms-4" navbar>
//                 {menuData.map((menu) => (
//                   <NavItem key={menu.name} className="smart-megamenu-parent">
//                     <Link
//                       href={menu.path || "#"}
//                       className="nav-link text-dark fw-semibold"
//                     >
//                       {menu.name}
//                       {menu.submenu && <FaChevronDown className="small ms-1" />}
//                     </Link>

//                     {/* === Mega Menu === */}
//                     {menu.submenu && (
//                       <div className="smart-megamenu shadow-sm p-4 bg-white">
//                         <div className="row g-4">
//                           {menu.submenu.map((sub, i) => (
//                             <div key={i} className="col">
//                               <h6 className="fw-bold text-st mb-2">
//                                 {sub.title}
//                               </h6>
//                               <ul className="list-unstyled small">
//                                 {sub.items.map((item, j) => (
//                                   <li key={j}>
//                                     <Link
//                                       href={item.path || "#"}
//                                       className="text-decoration-none text-dark"
//                                     >
//                                       {item.label}
//                                     </Link>
//                                   </li>
//                                 ))}
//                               </ul>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </NavItem>
//                 ))}
//               </Nav>

//               <div className="ms-auto right-grid d-flex justify-content-end">
//                 <UncontrolledDropdown>
//                   <DropdownToggle caret color="primary" className="rounded-pill btn-danger w-100  btn btn-danger btn-sm px-4 ">
//                     Login
//                   </DropdownToggle>
//                   <DropdownMenu style={{ zIndex: '9999 !important', position: 'absolute !important' }}>
//                     <DropdownItem tag={Link} href="/signup">
//                       Sign Up
//                     </DropdownItem>

//                     <DropdownItem tag={Link} href="/signin">
//                       Sign In
//                     </DropdownItem>
//                   </DropdownMenu>

//                   {/* <DropdownMenu style={{ zIndex: '9999' }} className="d-none">
//                     <DropdownItem>Profile</DropdownItem>
//                     <DropdownItem>Settings</DropdownItem>
//                     <DropdownItem divider />
//                     <DropdownItem>Log out</DropdownItem>
//                   </DropdownMenu> */}
//                 </UncontrolledDropdown>
//                 <button className=" ms-2 btn btn-light btn-sm sm-2 px-4 fw-bold d-none d-sm-block" style={{ borderRadius: '100px' }}>
//                   Post Property
//                 </button>
//               </div>
//             </Collapse>
//           </div>
//         </div>
//       </Navbar>

//       {/* === Mobile Sidebar === */}
//       <div className={`smart-sidebar ${showSidebar ? "open" : ""}`}>
//         <div className="sidebar-header d-flex align-items-center justify-content-between p-3 border-bottom">
//           {activeSubmenu ? (
//             <>
//               <FaArrowLeft
//                 onClick={closeSubmenu}
//                 className="fs-5 cursor-pointer"
//               />
//               <h6 className="mb-0 fw-bold">{activeSubmenu}</h6>
//               <FaTimes onClick={toggleSidebar} className="fs-5 cursor-pointer" />
//             </>
//           ) : (
//             <>
//               <h5 className="mb-0 fw-bold">Menu</h5>
//               <FaTimes onClick={toggleSidebar} className="fs-5 cursor-pointer" />
//             </>
//           )}
//         </div>

//         {/* === Parent Menu === */}
//         <div className={`sidebar-body ${activeSubmenu ? "hide" : ""}`}>
//           <ul className="list-unstyled mb-0">
//             {menuData.map((menu) => (
//               <li
//                 key={menu.name}
//                 onClick={() =>
//                   menu.submenu
//                     ? openSubmenu(menu.name)
//                     : (window.location.href = menu.path)
//                 }
//               >
//                 {menu.name}
//                 {menu.submenu && <FaChevronRight className="float-end mt-1" />}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* === Submenu Body === */}
//         <div className={`submenu-body ${activeSubmenu ? "show" : ""}`}>
//           {activeMenuData && (
//             <ul className="list-unstyled mb-0 p-0">
//               {activeMenuData.submenu?.map((sub) => (
//                 <li key={sub.title}>
//                   <div
//                     className="d-flex justify-content-between align-items-center px-3 py-2"
//                     onClick={() => toggleChild(sub.title)}
//                   >
//                     <span>{sub.title}</span>
//                     <FaChevronDown
//                       className={`small transition ${expandedChild === sub.title ? "rotate" : ""
//                         }`}
//                     />
//                   </div>

//                   <Collapse isOpen={expandedChild === sub.title}>
//                     <ul className="list-unstyled ms-3 mt-2 small">
//                       {sub.items.map((item, i) => (
//                         <li key={i}>
//                           <Link
//                             href={item.path || "#"}
//                             className="text-decoration-none text-dark"
//                           >
//                             {item.label}
//                           </Link>
//                         </li>
//                       ))}
//                     </ul>
//                   </Collapse >
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>

//       {/* === Overlay === */}
//       <div
//         className={`smart-sidebar-overlay ${showSidebar ? "show" : ""}`}
//         onClick={toggleSidebar}
//       ></div>

//       {/* citypopup */}
//       {/* <CityPopup isOpen={modalOpen} toggle={toggleModal} /> */}
//     </>
//   );
// }
