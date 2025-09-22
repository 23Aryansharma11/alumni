"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Validation schema for post content
const postSchema = z.object({
  content: z.string().min(1, "Post content is required"),
});

type PostFormValues = z.infer<typeof postSchema>;

export function PostDrawer() {
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (data: PostFormValues) => {
    console.log("Post content:", data.content);
    form.reset();
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary" className="rounded-full">
          <Plus />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create a post</DrawerTitle>
          <DrawerDescription>Post will be publicly visible.</DrawerDescription>
        </DrawerHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 px-6"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <textarea
                      {...field}
                      rows={6}
                      placeholder="Whats on your mind..."
                      className="resize-none rounded-md border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mb-2">
              Post
            </Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
