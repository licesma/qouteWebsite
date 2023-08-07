export interface SuggestionProps {
  key: string | number;
  id: string;
  name: string;
  isSelected: boolean;
  onClick: () => void;
}
