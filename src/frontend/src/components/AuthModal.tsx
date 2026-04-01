import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<string | null>;
  onRegister: (email: string, password: string) => Promise<string | null>;
}

export function AuthModal({
  open,
  onClose,
  onLogin,
  onRegister,
}: AuthModalProps) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regError, setRegError] = useState("");
  const [regLoading, setRegLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    if (!loginEmail) {
      setLoginError("Email is required");
      return;
    }
    if (!loginPassword) {
      setLoginError("Password is required");
      return;
    }
    setLoginLoading(true);
    const err = await onLogin(loginEmail, loginPassword);
    setLoginLoading(false);
    if (err) {
      setLoginError(err);
    } else {
      onClose();
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setRegError("");
    if (!regEmail) {
      setRegError("Email is required");
      return;
    }
    if (!regPassword) {
      setRegError("Password is required");
      return;
    }
    if (regPassword !== regConfirm) {
      setRegError("Passwords don't match");
      return;
    }
    if (regPassword.length < 6) {
      setRegError("Password must be at least 6 characters");
      return;
    }
    setRegLoading(true);
    const err = await onRegister(regEmail, regPassword);
    setRegLoading(false);
    if (err) {
      setRegError(err);
    } else {
      onClose();
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md" data-ocid="auth.modal">
        <DialogHeader>
          <DialogTitle className="text-welkee-blue text-xl">
            Welcome to Welkee
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to save your favourite bikes and get personalised offers.
          </p>
        </DialogHeader>

        <Tabs defaultValue="login" className="mt-2">
          <TabsList className="w-full" data-ocid="auth.tab">
            <TabsTrigger value="login" className="flex-1" data-ocid="auth.tab">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="flex-1" data-ocid="auth.tab">
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* LOGIN TAB */}
          <TabsContent value="login" className="mt-4">
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
              <div>
                <label
                  htmlFor="login-email"
                  className="text-sm font-medium text-gray-700 mb-1 block"
                >
                  Email
                </label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  autoComplete="email"
                  data-ocid="auth.input"
                />
              </div>
              <div>
                <label
                  htmlFor="login-password"
                  className="text-sm font-medium text-gray-700 mb-1 block"
                >
                  Password
                </label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  autoComplete="current-password"
                  data-ocid="auth.input"
                />
              </div>
              {loginError && (
                <p
                  className="text-sm text-red-500"
                  data-ocid="auth.error_state"
                >
                  {loginError}
                </p>
              )}
              <Button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-[#004085] hover:bg-[#003070] text-white font-semibold py-3 rounded-xl mt-1"
                data-ocid="auth.primary_button"
              >
                {loginLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging
                    in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </TabsContent>

          {/* SIGNUP TAB */}
          <TabsContent value="signup" className="mt-4">
            <form onSubmit={handleRegister} className="flex flex-col gap-3">
              <div>
                <label
                  htmlFor="reg-email"
                  className="text-sm font-medium text-gray-700 mb-1 block"
                >
                  Email
                </label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="you@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  autoComplete="email"
                  data-ocid="auth.input"
                />
              </div>
              <div>
                <label
                  htmlFor="reg-password"
                  className="text-sm font-medium text-gray-700 mb-1 block"
                >
                  Password
                </label>
                <Input
                  id="reg-password"
                  type="password"
                  placeholder="At least 6 characters"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  autoComplete="new-password"
                  data-ocid="auth.input"
                />
              </div>
              <div>
                <label
                  htmlFor="reg-confirm"
                  className="text-sm font-medium text-gray-700 mb-1 block"
                >
                  Confirm Password
                </label>
                <Input
                  id="reg-confirm"
                  type="password"
                  placeholder="Repeat your password"
                  value={regConfirm}
                  onChange={(e) => setRegConfirm(e.target.value)}
                  autoComplete="new-password"
                  data-ocid="auth.input"
                />
              </div>
              {regError && (
                <p
                  className="text-sm text-red-500"
                  data-ocid="auth.error_state"
                >
                  {regError}
                </p>
              )}
              <Button
                type="submit"
                disabled={regLoading}
                className="w-full bg-[#FF8225] hover:bg-[#e67320] text-white font-semibold py-3 rounded-xl mt-1"
                data-ocid="auth.primary_button"
              >
                {regLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating
                    Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
