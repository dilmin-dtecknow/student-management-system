const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCourses = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/api/courses`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) throw new Error("Faild to get courses!")

    return response.json();
}