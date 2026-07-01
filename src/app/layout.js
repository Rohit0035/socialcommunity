// app/layout.js
import "../assets/styles/globals.css";
import "../assets/styles/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "yet-another-react-lightbox/styles.css";
import '../assets/styles/friends.css';

import ClientLayout from "./ClientLayout.old"; 
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import BootstrapClient from "@/components/BootstrapClient";

export const metadata = {
  title: "Social Community",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BootstrapClient />
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}


