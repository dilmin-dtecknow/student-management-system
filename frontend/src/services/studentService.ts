import type { StudentRequest, StudentUser } from "@/types/typs";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getStudents = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/students`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to get students!");

  return response.json();
};

export const registerStudentUser = async (data: StudentUser) => {
  const response = await fetch(`${BASE_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const messages = Object.values(errorData) as string[];
    throw new Error(JSON.stringify([messages[0]]));
  }

  return response.json();
};

export const createStudent = async (data: StudentRequest) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: data.userId,
      address: data.address,
      gender: data.gender,
      courseIds: data.courseIds,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    if (errorData.errors && errorData.errors.length > 0) {
      throw new Error(errorData.errors[0].message);
    }
    throw new Error("Student creation failed!");
  }

  return response.json();
};