"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useUpdateShortUrl } from "../hooks/use-update-short-url";
import {
  updateShortUrlSchema,
  type UpdateShortUrlDto,
} from "../schemas/update-short-url.schema";
import type { ShortUrl } from "../types/short-url.type";

interface UpdateShortUrlFormProps {
  shortUrl: ShortUrl;
}

const UpdateShortUrlForm = ({ shortUrl }: UpdateShortUrlFormProps) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const { mutate: updateShortUrl, isPending, error } = useUpdateShortUrl(
    accessToken ?? "",
  );

  const { handleSubmit, control, reset } = useForm<UpdateShortUrlDto>({
    resolver: standardSchemaResolver(updateShortUrlSchema),
    defaultValues: {
      original_url: shortUrl.original_url,
      title: shortUrl.title ?? "",
      is_active: shortUrl.is_active,
      expires_at: shortUrl.expires_at ?? undefined,
    },
  });

  const onSubmit = (data: UpdateShortUrlDto) => {
    updateShortUrl(
      { id: String(shortUrl.id), data },
      {
        onSuccess: () => {
          reset(data);
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
      {error && (
        <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
          {error.message}
        </p>
      )}

      <Controller
        name="original_url"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>URL</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="https://example.com"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="title"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Title</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Optional title"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="expires_at"
        control={control}
        render={({ field, fieldState }) => {
          const selectedDate = field.value ? new Date(field.value) : undefined;
          return (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Expires at</FieldLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    {selectedDate ? format(selectedDate, "dd-MM-yyyy") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) =>
                      field.onChange(date ? date.toISOString() : null)
                    }
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      />

      <Controller
        name="is_active"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} orientation="horizontal">
            <FieldLabel htmlFor={field.name}>Active</FieldLabel>
            <Switch
              id={field.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button type="submit" disabled={isPending}>
        {isPending ? "Updating short URL..." : "Update Short URL"}
      </Button>
    </form>
  );
};

export default UpdateShortUrlForm;
