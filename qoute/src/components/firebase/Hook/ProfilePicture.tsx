import { useStorage } from "../FirebaseProvider";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import type { UserProfilePictureProps } from "@/types/FirebaseUser";
import * as React from "react";
import { useCoreUser } from "./Auth";

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
