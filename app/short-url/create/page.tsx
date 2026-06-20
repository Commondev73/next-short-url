import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateShortUrlForm } from "@/features/short-urls";

const DashboardCreatePage = () => {
  return (
    <div className="p-8 flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create short URL</CardTitle>
          <CardDescription>
            Create a new short link for your URL.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateShortUrlForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCreatePage;
