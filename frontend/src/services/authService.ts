const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
    mode: "cors",
  });

  if (!response.ok) {
    const contentType = response.headers.get("Content-Type") || "";
    if (contentType.includes("application/json")) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || "Invalid email or password!");
    }
    const err = await response.text();
    throw new Error(err || "Invalid email or password!");
  }

  return response.json();
};