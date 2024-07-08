import { userStorage } from "@humblebrag/storage";

export const handleAuth = async () => {
  // Open the OAuth window
  const authWindow = window.open(
    "http://localhost:3000/auth/discord",
    "_blank",
    "width=500,height=600"
  );

  if (!authWindow) {
    console.error("Failed to open authentication window");
    return;
  }

  // Monitor the window's state
  const checkWindowClosed = new Promise((resolve) => {
    const interval = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(interval);
        resolve(true);
      }
    }, 500);
  });

  // Wait for the authentication window to close
  await checkWindowClosed;

  // Fetch user data from the API
  try {
    const response = await fetch("http://localhost:3000/me", {
      method: "GET",
      credentials: "include", // Include cookies for session tracking
    });
    if (!response.ok) throw new Error("Failed to fetch user data");

    const data = await response.json();
    userStorage.set(data);
    console.log("User data:", data);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
