import { useCallback, useState } from "react";

export interface EmailUser {
  id: number;
  email: string;
}

type AuthResult = { ok: number } | { err: string };

const STORAGE_KEY = "welkee_user";
const USERS_KEY = "welkee_users";

interface StoredUser {
  id: number;
  email: string;
  password: string;
}

function getUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function useEmailAuth() {
  const [user, setUser] = useState<EmailUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as EmailUser) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      const users = getUsers();
      const found = users.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password,
      );
      if (!found) {
        return {
          err: "Account not found or wrong password. Please Sign Up first.",
        };
      }
      const loggedIn: EmailUser = { id: found.id, email: found.email };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedIn));
      setUser(loggedIn);
      return { ok: found.id };
    },
    [],
  );

  const register = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      const users = getUsers();
      const exists = users.some(
        (u) => u.email.toLowerCase() === email.toLowerCase(),
      );
      if (exists) {
        return { err: "Email already registered. Please log in instead." };
      }
      const newUser: StoredUser = {
        id: Date.now(),
        email,
        password,
      };
      users.push(newUser);
      saveUsers(users);
      const loggedIn: EmailUser = { id: newUser.id, email: newUser.email };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedIn));
      setUser(loggedIn);
      return { ok: newUser.id };
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return { user, login, register, logout };
}
