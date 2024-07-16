import { BaseStorage, createStorage, StorageType } from "./base";

interface User {
  id: number;
  username: string;
  avatar: string;
  email: string;
  avatar_url: string;

  subscription: {
    status: string | "none";
    plan: string | "none";
  };
}

type UserStorage = BaseStorage<User> & {
  getUser: () => Promise<User>;
};

const storage = createStorage<User>(
  "user-storage-key",
  {
    id: 0,
    username: "",
    avatar: "",
    email: "",
    avatar_url: "",

    subscription: {
      status: "none",
      plan: "none",
    },
  },
  {
    storageType: StorageType.Session,
    liveUpdate: true,
  }
);

export const userStorage = {
  ...storage,

  getUser: async () => {
    const response = await fetch("http://localhost:3000/me");
    if (!response.ok) {
      userStorage.set({
        id: 0,
        username: "Guest",
        avatar: "",
        email: "",
        avatar_url: "",

        subscription: {
          status: "none",
          plan: "none",
        },
      });
      return {
        id: 0,
        name: "Guest",
        avatar: "",
        email: "",
        avatarUrl: "",

        subscription: {
          status: "none",
          plan: "none",
        },
      };
    }

    const data = await response.json();
    userStorage.set(data);
    return data;
  },
};
