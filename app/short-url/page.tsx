import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ListShortUrl } from "@/features/short-urls";

const ShortUrlListPage = () => {
  return (
    <div className="p-8 flex justify-center">
      <Card className="w-full max-w-5xl">
        <CardHeader>
          <CardTitle>My short URLs</CardTitle>
          <CardDescription>Manage your short links.</CardDescription>
          <CardAction>
            <Button asChild>
              <Link href="/short-url/create">Create</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <ListShortUrl />
        </CardContent>
      </Card>
    </div>
  );
};

export default ShortUrlListPage;
