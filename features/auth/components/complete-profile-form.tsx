"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { completeUserProfile } from "../actions";
import { toast } from "sonner";

// Enums from your schema
const courseOptions = ["BTECH", "MTECH", "MBA"] as const;
const branchOptions = [
  "CSE",
  "IT",
  "ECE",
  "EEE",
  "ME",
  "CE",
  "Finance",
  "Marketing",
  "HumanResources",
  "Operations",
  "BusinessAnalytics",
] as const;

// Validation schema with zod
const formSchema = z.object({
  passoutYear: z
    .number("Passout Year is required")
    .int()
    .min(1900, "Enter a valid year")
    .max(new Date().getFullYear() + 10, "Enter a valid year"),
  course: z.enum(courseOptions, "Course is required"),
  branch: z.enum(branchOptions, "Branch is required"),
});

export type CompleteProfileFormValues = z.infer<typeof formSchema>;

export const CompleteProfileForm = () => {
  const router = useRouter();

  const form = useForm<CompleteProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passoutYear: new Date().getFullYear(),
      course: "BTECH",
      branch: "CSE",
    },
  });

  async function onSubmit(data: CompleteProfileFormValues) {
    try {
      const userData = await completeUserProfile(data);
      if (!userData) {
        toast.error("Something went wrong");
        form.reset();
      }
      console.log(userData);
      // router.push("/auth");
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-md border rounded p-4 shadow"
      >
        {/* Passout Year */}
        <FormField
          control={form.control}
          name="passoutYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passout Year</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 2025" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Course */}
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseOptions.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Branch */}
        <FormField
          control={form.control}
          name="branch"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Branch / Specialization</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branchOptions.map((branch) => (
                      <SelectItem key={branch} value={branch}>
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Complete Profile
        </Button>
      </form>
    </Form>
  );
};
