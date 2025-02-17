import { useAuth } from "@/components/firebase/FirebaseProvider";
import { onAuthStateChanged, signInWithEmailLink, User } from "firebase/auth";
import * as React from "react";

export interface UseCurrentUserProps {
  displayName?: string;
  email?: string;
}

export function useCurrentUser(): UseCurrentUserProps {
  const [user, setUser] = React.useState<User | null>(null);
  const { auth } = useAuth();
  React.useEffect(() => {
    if (auth != null)
      return onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
  }, [auth]);

  return {
    displayName: user?.displayName ?? undefined,
    email: user?.email ?? undefined,
  };
}
