import { redirect } from "next/navigation";

const HomePage = async () => {
  redirect("/short-url");
};

export default HomePage;
