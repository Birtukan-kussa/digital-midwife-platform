export async function login(email: string, password: string) {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "/api";

  const response = await fetch(`${apiBaseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      typeof errorData?.message === "string"
        ? errorData.message
        : "Login failed. Please check your credentials and try again."
    );
  }

  return response.json();
}
