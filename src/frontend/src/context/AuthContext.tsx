import { createContext, useCallback, useContext, useState } from "react";

export interface AuthUser {
  id: number;
  email: string;
}

interface StoredUser {
  id: number;
  email: string;
  password: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isSuperAdmin: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (email: string, password: string) => Promise<string | null>;
  logout: () => void;
}

const STORAGE_KEY = "welkee_user";
const USERS_KEY = "welkee_users";
const SUPER_ADMIN_KEY = "welkee_is_super_admin";

const OWNER_EMAIL = "mohdali7z7z00@gmail.com";
const OWNER_PASSWORD = "20242025786786";

function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as AuthUser) : null;
    } catch {
      return null;
    }
  });

  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(() => {
    return localStorage.getItem(SUPER_ADMIN_KEY) === "true";
  });

  const login = useCallback(
    async (email: string, password: string): Promise<string | null> => {
      const normalizedEmail = email.toLowerCase().trim();

      // Check if owner credentials
      if (
        normalizedEmail === OWNER_EMAIL.toLowerCase() &&
        password === OWNER_PASSWORD
      ) {
        const ownerUser: AuthUser = { id: 0, email: OWNER_EMAIL };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ownerUser));
        localStorage.setItem(SUPER_ADMIN_KEY, "true");
        setUser(ownerUser);
        setIsSuperAdmin(true);
        return null;
      }

      const users = getStoredUsers();
      const found = users.find(
        (u) => u.email.toLowerCase() === normalizedEmail,
      );

      if (!found) {
        return "No account found with this email. Please Sign Up.";
      }
      if (found.password !== password) {
        return "Wrong Password. Please try again.";
      }

      const loggedIn: AuthUser = { id: found.id, email: found.email };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedIn));
      localStorage.setItem(SUPER_ADMIN_KEY, "false");
      setUser(loggedIn);
      setIsSuperAdmin(false);
      return null;
    },
    [],
  );

  const register = useCallback(
    async (email: string, password: string): Promise<string | null> => {
      const normalizedEmail = email.toLowerCase().trim();
      const users = getStoredUsers();
      const exists = users.some(
        (u) => u.email.toLowerCase() === normalizedEmail,
      );

      if (exists) {
        return "Email already registered. Please log in instead.";
      }

      const newUser: StoredUser = {
        id: Date.now(),
        email: email.trim(),
        password,
      };
      users.push(newUser);
      saveStoredUsers(users);

      const loggedIn: AuthUser = { id: newUser.id, email: newUser.email };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedIn));
      localStorage.setItem(SUPER_ADMIN_KEY, "false");
      setUser(loggedIn);
      setIsSuperAdmin(false);
      return null;
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(SUPER_ADMIN_KEY, "false");
    setUser(null);
    setIsSuperAdmin(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isSuperAdmin, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
