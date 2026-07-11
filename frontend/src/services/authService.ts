const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (email: string, password: string) => {

    const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password
        }),
        mode: "cors",
    });


    if (!response.ok) throw new Error("Invalide email or password!");

    return response.json();
}