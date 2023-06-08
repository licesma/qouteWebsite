import { useStorage } from "../FirebaseProvider";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import type { UserProfilePictureProps } from "@/types/FirebaseUser";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import * as React from "react";
import { useCoreUser } from "./Auth";
import { useCurrentUser } from "@/components/firebase/Hook/Auth";

const POSTS = [
  { id: 1, title: "post 1" },
  { id: 2, title: "post 2" },
];

const useQueryHook2 = () => {
  const userId: string = "esteban";
  const postsQuery = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => wait(100).then(() => [...POSTS]),
  });

  if (postsQuery.isLoading) console.log("Esteban, loading....");
  if (postsQuery.isError) console.log("Esteban, errro");
};

const useQueryHook = () => {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(100).then(() => [...POSTS]),
  });

  if (postsQuery.isLoading) console.log("Esteban, loading....");
  if (postsQuery.isError) console.log("Esteban, errro");
};

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export function useProfilePicture(): UserProfilePictureProps {
  const storage = useStorage();
  const user = useCoreUser();
  const currentUserId = user?.uid;

  const [hasProfilePicture, setHasProfilePicture] =
    React.useState<boolean>(false);

  const [profilePicture, setProfilePicture] = React.useState<
    string | undefined
  >(undefined);

  const [isProfilePictureLoading, setIsProfilePictureLoading] =
    React.useState<boolean>(false);

  const setProfilePictureCallback = React.useCallback(
    (pictureBlob: Blob, pictureUrl: string) => {
      uploadBytes(ref(storage, `users/${currentUserId}`), pictureBlob);
      setProfilePicture(pictureUrl);
    },
    [storage, currentUserId]
  );

  React.useEffect(() => {
    //TODO: Move this call to use React Query.
    if (currentUserId) {
      setIsProfilePictureLoading(true);
      const profilePictureRef = ref(storage, `users/${currentUserId}`);
      getDownloadURL(profilePictureRef)
        .then((url) => {
          setProfilePicture(url);
          setHasProfilePicture(true);
        })
        .catch((error) => {
          console.error("Error retrieving profile picture", error.code);
          setHasProfilePicture(false);
        });
      setIsProfilePictureLoading(false);
    }
  }, [currentUserId]);

  return {
    profilePicture,
    hasProfilePicture,
    isProfilePictureLoading,
    setProfilePictureCallback,
  };
}

export interface ProfilePictureParam {
  blob: Blob;
  pictureUrl: string;
}

export const useUpdateProfilePicture = () => {
  const queryClient = useQueryClient();
  const storage = useStorage();
  const { id } = useCurrentUser();
  const setProfilePictureCallback = React.useCallback(
    (param: ProfilePictureParam) => {
      return uploadBytes(ref(storage, `users/${id}`), param.blob);
    },
    [storage, id]
  );
  return useMutation({
    mutationFn: setProfilePictureCallback,
    onSuccess: () => {
      queryClient.invalidateQueries(["users", id]);
    },
  });
};

export function useFetchProfilePicture() {
  const storage = useStorage();
  const { id: userId } = useCurrentUser();

  const fetchProfilePicture = (currentUserId?: string) => {
    if (currentUserId === undefined) {
      Promise.reject(new Error("User id is undefined"));
    }

    const profilePictureRef = ref(storage, `users/${currentUserId}`);
    return getDownloadURL(profilePictureRef);
  };

  return useQuery({
    queryKey: ["posts", userId],
    enabled: userId !== undefined,
    queryFn: () => fetchProfilePicture(userId).then((url) => url),
  });
}
