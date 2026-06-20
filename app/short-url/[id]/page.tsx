"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { UpdateShortUrlForm, useShortUrl } from "@/features/short-urls";
import { Spinner } from "@/components/ui/spinner";

const ShortUrlUpdatePage = () => {
  const params = useParams<{ id: string }>();
  const accessToken = useAuthStore((state) => state.accessToken);
  const id = params.id ?? "";

  const { data, isPending, error } = useShortUrl(id, accessToken ?? "");
  const shortUrl = data?.data;

  return (
    <div className="p-8 flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Update short URL</CardTitle>
          <CardDescription>Edit your existing short link details.</CardDescription>
        </CardHeader>
        <CardContent>
          {!accessToken ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Please login first before updating a short URL.
              </p>
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          ) : isPending ? (
            <Spinner className="size-8" />
          ) : error ? (
            <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
              {error.message}
            </p>
          ) : !shortUrl ? (
            <p className="text-sm text-muted-foreground">Short URL not found.</p>
          ) : (
            <UpdateShortUrlForm shortUrl={shortUrl} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ShortUrlUpdatePage;
