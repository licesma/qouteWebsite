import { useStorage } from "../FirebaseProvider";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useCurrentUser } from "@/components/firebase/Hook/Auth";

export interface ProfilePictureParam {
  blob: Blob;
  pictureUrl: string;
}

export const useUpdateProfilePicture = () => {
  const storage = useStorage();
  const { id } = useCurrentUser();
  const { refetch } = useFetchProfilePicture();

  const setProfilePictureCallback = React.useCallback(
    (param: ProfilePictureParam) => {
      return uploadBytes(ref(storage, `users/${id}`), param.blob);
    },
    [storage, id]
  );

  return useMutation({
    mutationFn: setProfilePictureCallback,
    onSuccess: (data) => {
      refetch();
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
