import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useStorageSuspense } from "@humblebrag/shared";
import { userStorage } from "@humblebrag/storage";
import { useEffect } from "react";

export const Navbar: React.FC = () => {
  const user = useStorageSuspense(userStorage);

  useEffect(() => {
    userStorage.getUser();
  }, []);

  const handleAuth = async () => {
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

  return (
    <header className="flex items-center h-10 px-4 border-b border-[#d8d8d8] dark:border-[#2c2c2e] bg-[#f2f2f2] dark:bg-[#1c1c1e]">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex-1 text-center text-[#333] dark:text-[#f2f2f2] font-medium">
        Humblebrag
      </div>
      <div className="flex items-center gap-2">
        {user.id ? (
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="size-8">
              <AvatarImage src={user.avatarUrl} alt="Avatar" />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              handleAuth();
            }}
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};
