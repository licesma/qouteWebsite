import { QuoteData } from "@/types/QuoteData";

export const getUnrepeatedAuthors = (quotes: QuoteData[]): string[] => {
  return Array.from(
    new Set<string>(
      quotes.filter((q) => q.author !== undefined).map((q) => q.author)
    )
  );
};

export const getUnrepeatedSources = (quotes: QuoteData[]): string[] => {
  return Array.from(
    new Set<string>(
      quotes.filter((q) => q.source !== undefined).map((q) => q.source)
    )
  );
};
