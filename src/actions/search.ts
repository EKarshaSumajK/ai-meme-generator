"use server";
import { redirect } from "next/navigation";

export async function searchAction(formData: FormData) {
  const search = formData.get("search");
  redirect(`/search?q=${search}`);
} 