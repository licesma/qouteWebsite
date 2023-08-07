export interface QuoteData {
  id: string;
  author?: string;
  authorId?: string;
  isConversation: boolean;
  source?: string;
  sourceId?: string;
}

export interface StandardQuoteData extends QuoteData {
  quote: string;
}

export interface DialogoueQuote {
  quote: string;
  interlocutor: string;
}

export interface DialogueQuoteData extends QuoteData {
  dialogue: DialogoueQuote[];
}

export interface LocalData {
  id: string;
  name: string;
  quoteIds: Set<string>;
}

export interface LocalAuthorData extends LocalData {
  sourceIds: Set<string>;
}

export interface LocalSourceData extends LocalData {
  authorId?: string;
}
