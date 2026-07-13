import type { CreateCourse } from "@/types/typs";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCourses = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to get courses!");

  return response.json();
};

export const createCourse = async (data: CreateCourse) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      courseName: data.courseName,
      description: data.description,
      duration: data.duration,
      fee: data.fee,
      status: data.status,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const messages = Object.values(errorData) as string[];
    throw new Error(JSON.stringify([messages[0]]));
  }

  return response.json();
};