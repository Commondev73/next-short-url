"use client";

import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UpdateAdminShortUrlForm, useAdminShortUrl } from "@/features/short-urls";
import { Spinner } from "@/components/ui/spinner";

const AdminShortUrlUpdatePage = () => {
  const params = useParams<{ id: string }>();
  const id = params.id ?? "";

  const { data, isPending, error } = useAdminShortUrl(id);
  const shortUrl = data?.data;

  return (
    <div className="p-8 flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Update short URL</CardTitle>
          <CardDescription>
            Edit short link details (admin).
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
              {error.message}
            </p>
          )}

          {isPending && <Spinner className="size-8" />}

          {!isPending && shortUrl && <UpdateAdminShortUrlForm shortUrl={shortUrl} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminShortUrlUpdatePage;
