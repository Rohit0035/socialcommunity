"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";

export default function AdminLayout({ children }) {
	const router = useRouter();
	const pathname = usePathname();

	const { data: session, status } = useSession();
	console.log(session);

	useEffect(() => {
		if(!session && !session?.user) {
			router.replace("/admin/auth/login");
			return;
		}

		if (pathname === "/admin/auth/login") {
			return;
		}

		if (status === "loading") {
			return;
		}

		if (!session) {
			router.replace("/admin/auth/login");
			return;
		}

		if (session?.user?.role !== "admin") {
			router.replace("/");
			return;
		}
	}, [session, status, pathname, router]);

	// Loading
	if (status === "loading") {
		return (
			<div className="d-flex justify-content-center align-items-center vh-100">
				<h3>Loading...</h3>
			</div>
		);
	}

	// Login page without sidebar/navbar
	if (pathname === "/admin/auth/login") {
		return children;
	}

	// If no session
	if (!session) {
		return null;
	}

	return (
		<div className="d-flex">
			{/* Sidebar */}
			<AdminSidebar />

			{/* Main Content */}
			<div className="flex-grow-1">
				<AdminNavbar />

				<div className="p-4 bg-light min-vh-100">
					{children}
				</div>
			</div>
		</div>
	);
}