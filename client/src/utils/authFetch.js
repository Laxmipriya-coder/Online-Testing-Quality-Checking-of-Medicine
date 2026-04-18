const BASE_URL = "http://localhost:5000/api";

const authFetch = async (endpoint, options = {}) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    // 🔴 Unauthorized handling
    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }

    // 🔴 Error handling
    if (!res.ok) {
      let errorMessage = "API Error";
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {}

      throw new Error(errorMessage);
    }

    return await res.json();

  } catch (error) {
    console.error("authFetch Error:", error.message);
    throw error;
  }
};

export default authFetch;