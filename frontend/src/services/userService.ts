const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUsers = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to load users");

  return response.json();
};

export const createUser = async (data: Record<string, unknown>) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create user");
  }

  return response.json();
};

export const deleteUser = async (id: string) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to delete user");
};
