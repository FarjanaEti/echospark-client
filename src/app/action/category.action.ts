"use server";

import { createCategory } from "@/services/category.service";

export async function createCategoryAction(formData: FormData) {
  const name = formData.get("name") as string;
  const isActive = formData.get("isActive") === "true";

  try {
    const result = await createCategory({
      name: name.trim(),
      isActive,
    });

    // console.log("SUCCESS:", result);

    return {
      success: true,
      message: "Category added successfully.",
    };
  } catch (err: any) {
    // console.log("STATUS:", err?.response?.status);
    // console.log("DATA:", err?.response?.data);
    // console.log("MESSAGE:", err?.message);

    return {
      success: false,
      message:
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create category.",
    };
  }
}