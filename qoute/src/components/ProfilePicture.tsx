import * as React from "react";
import { Persona } from "./Persona";
import { useCurrentUser } from "@/components/firebase/Hook/Auth";
import { useProfilePicture } from "@/components/firebase/Hook/ProfilePicture";

export interface ProfilePictureProps {
  size: number;
}

export const ProfilePicture: React.FunctionComponent<ProfilePictureProps> = (
  props
) => {
  const { size } = props;
  const { name } = useCurrentUser();
  const { profilePicture } = useProfilePicture();
  return <Persona size={size} imageLink={profilePicture} name={name} />;
};
