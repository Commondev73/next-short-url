import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_ROLE_COOKIE, AUTH_TOKEN_COOKIE } from "@/lib/auth/constants";

const HomePage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_COOKIE)?.value;
  const role = cookieStore.get(AUTH_ROLE_COOKIE)?.value;

  if (token && role === "admin") {
    redirect("/admin/short-url");
  }

  redirect("/short-url");
};

export default HomePage;
