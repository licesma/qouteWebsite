import { useCurrentUser } from "@/components/firebase/Hook/Auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as React from "react";
import { useStorage } from "../FirebaseProvider";

export interface ProfilePictureParam {
  blob: Blob;
  pictureUrl: string;
}

export const useUpdateAuthorPicture = (authorId: string | undefined) => {
  const storage = useStorage();
  const { refetch } = useAuthorPicture(authorId);

  const setProfilePictureCallback = React.useCallback(
    (blob: Blob) => {
      return uploadBytes(ref(storage, `authors/${authorId}`), blob);
    },
    [storage, authorId]
  );

  return useMutation({
    mutationFn: setProfilePictureCallback,
    onSuccess: () => {
      refetch();
    },
  });
};

export function useAuthorPicture(authorId: string | undefined) {
  const storage = useStorage();

  const fetchProfilePicture = () => {
    if (authorId === undefined) {
      Promise.reject(new Error("Author id is undefined"));
    }

    const profilePictureRef = ref(storage, `authors/${authorId}`);
    return getDownloadURL(profilePictureRef);
  };

  return useQuery({
    queryKey: ["authors", authorId],
    enabled: authorId !== undefined,
    queryFn: () => fetchProfilePicture().then((url) => url),
  });
}
