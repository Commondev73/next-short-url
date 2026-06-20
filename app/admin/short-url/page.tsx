import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ListAdminShortUrl } from "@/features/short-urls";

const AdminShortUrlListPage = () => {
  return (
    <div className="p-8 flex justify-center">
      <Card className="w-full max-w-6xl">
        <CardHeader>
          <CardTitle>All short URLs</CardTitle>
          <CardDescription>Manage short links across all users.</CardDescription>
        </CardHeader>
        <CardContent>
          <ListAdminShortUrl />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminShortUrlListPage;
