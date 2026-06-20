"use client";

import Link from "next/link";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useDeleteShortUrl } from "../hooks/use-delete-short-url";
import { useListShortUrls } from "../hooks/use-list-short-urls";
import type { ShortUrl } from "../types/short-url.type";

const PER_PAGE = 10;

const ListShortUrl = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [page, setPage] = useState(1);

  const { data, isPending, error } = useListShortUrls(accessToken ?? "", {
    page,
    perPage: PER_PAGE,
  });

  const { mutate: deleteShortUrl, isPending: isDeleting } = useDeleteShortUrl(
    accessToken ?? "",
  );

  const shortUrls: ShortUrl[] = data?.data ?? [];
  const pagination = data?.pagination;

  const handleDelete = (id: number) => {
    deleteShortUrl(String(id));
  };

  if (isPending) {
    return <Spinner className="size-8" />;
  }

  if (error) {
    return (
      <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
        {error.message}
      </p>
    );
  }

  if (shortUrls.length === 0) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">No short URLs yet.</p>
        <Button asChild>
          <Link href="/short-url/create">Create short URL</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Short URL</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Original URL</TableHead>
            <TableHead>Clicks</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shortUrls.map((shortUrl) => (
            <TableRow key={shortUrl.id}>
              <TableCell className="truncate font-medium">
                {shortUrl.short_url ? (
                  <a
                    href={shortUrl.short_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {shortUrl.short_url}
                  </a>
                ) : (
                  shortUrl.short_code
                )}
              </TableCell>
              <TableCell>{shortUrl.title ?? "-"}</TableCell>
              <TableCell className="truncate">
                {shortUrl.original_url ? (
                  <a
                    href={shortUrl.original_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {shortUrl.original_url}
                  </a>
                ) : (
                  shortUrl.original_url
                )}
              </TableCell>
              <TableCell>{shortUrl.click_count}</TableCell>
              <TableCell>{shortUrl.is_active ? "Active" : "Inactive"}</TableCell>
              <TableCell>
                {shortUrl.expires_at
                  ? format(new Date(shortUrl.expires_at), "dd-MM-yyyy")
                  : "-"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon-sm" asChild>
                    <Link href={`/short-url/${shortUrl.id}`}>
                      <Pencil />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    disabled={isDeleting}
                    onClick={() => handleDelete(shortUrl.id)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {pagination && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {pagination.current_page} of {pagination.last_page} ({pagination.total}{" "}
            total)
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((current) => current - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= pagination.last_page}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListShortUrl;
