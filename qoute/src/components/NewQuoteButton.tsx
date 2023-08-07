import * as React from "react";
import { NewQuoteModal } from "./NewQuoteModal";
import { StandardButton } from "./StandardButton";

export interface NewQuoteButtonProps {
  userId: string;
}

export const NewQuoteButton: React.FunctionComponent<NewQuoteButtonProps> = (
  props
) => {
  const { userId } = props;
  const [isModalOpen, setIsModalOpen] = React.useState(true);
  return (
    <>
      <StandardButton text="New Quote" callback={() => setIsModalOpen(true)} />
      <NewQuoteModal
        userId={userId}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
};
