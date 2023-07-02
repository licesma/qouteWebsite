export interface QuoteData {
  author: string;
  isConversation: boolean;
  source: string;
}

export interface StandardQuoteData extends QuoteData {
  quote: string;
}

export interface ConversationQuote {
  quote: string;
  interlocutor: string;
}

export interface ConversationQuoteData extends QuoteData {
  conversation: ConversationQuote[];
}
