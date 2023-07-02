import * as React from "react";
import { Persona } from "./Persona";
import { useCurrentUser } from "@/components/firebase/Hook/Auth";
import { useFetchProfilePicture } from "@/components/firebase/Hook/ProfilePicture";

export interface ProfilePictureProps {
  size: number;
  forceUrl: string;
}

export const ProfilePicture: React.FunctionComponent<ProfilePictureProps> = (
  props
) => {
  const { size, forceUrl } = props;
  const { name } = useCurrentUser();
  const { data: profilePicture } = useFetchProfilePicture();

  return (
    <Persona
      size={size}
      imageLink={forceUrl ? forceUrl : profilePicture}
      name={name}
    />
  );
};
