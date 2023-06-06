import { useFirebase } from "../FirebaseProvider";
import { Auth, onAuthStateChanged, User } from "firebase/auth";
import type { GutenlyUser } from "@/types/GutenlyUser";
import * as React from "react";

function useCoreAuth(): Auth {
  const firebase = useFirebase();
  return firebase.getAuth();
}

export const useCoreUser = (): User | undefined => {
  const auth = useCoreAuth();
  const [user, setUser] = React.useState<User | undefined>(undefined);
  React.useEffect(() => {
    if (auth !== null) {
      return onAuthStateChanged(auth, (user) => {
        setUser(user ?? undefined);
      });
    }
  });
  return user;
};

export const useCurrentUser = (): GutenlyUser => {
  const user = useCoreUser();
  return {
    name: user?.displayName ?? undefined,
    email: user?.email ?? undefined,
    id: user?.uid ?? undefined,
    birthDate: undefined, //TODO: add birth date info
  };
};
