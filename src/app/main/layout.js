import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
// import ClientLayout from "@/components/ClientLayout";

import ClientLayout from "../../components/ClientLayout";
import { authOptions } from "@/lib/auth";

const MainLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user) {
    redirect("/auth/login");
  }

  if (session?.user?.role !== "user") {
    redirect("/admin");
  }

  return <ClientLayout>{children}</ClientLayout>;
};

export default MainLayout;