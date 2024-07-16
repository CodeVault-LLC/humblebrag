import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useStorageSuspense } from "@humblebrag/shared";
import { scanStorage, userStorage } from "@humblebrag/storage";
import { useEffect } from "react";
import { handleAuth } from "@src/lib/auth";
import { RefreshCcw } from "lucide-react";
import { DoScan } from "@src/lib/scan";

export const Navbar: React.FC = () => {
  const user = useStorageSuspense(userStorage);

  useEffect(() => {
    userStorage.getUser();

    const getData = async () => {
      await DoScan();
    };

    getData();
  }, []);

  return (
    <header className="flex items-center h-10 px-4 border-b border-[#d8d8d8] dark:border-[#2c2c2e] ">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex-1">
        <div className="flex flex-row items-center justify-center space-x-4">
          <h1 className="text-center text-[#333] dark:text-[#f2f2f2] font-semibold text-lg">
            Humblebrag
          </h1>

          <span className="text-[#333] dark:text-[#f2f2f2] text-xs text-center">
            {chrome.runtime.getManifest().version}
          </span>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              DoScan();
            }}
          >
            <RefreshCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {user?.id ? (
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="size-8">
              <AvatarImage src={user.avatar_url} alt="Avatar" />
              <AvatarFallback>{user.username}</AvatarFallback>
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
