import { useUserQuotes } from "@/api/firebase/UserQuotes";
import { useUserQuotes2 } from "@/components/firebase/Hook/UserQuotes";
import { LocalAuthorData, LocalSourceData, QuoteData } from "@/types/QuoteData";
import * as React from "react";
import { useAllUserQuotesData } from "../api/AllUserQuotes";

export function useUserAuthorsByIds(userId: string, authorIds: string[]) {
  const sources = useUserAuthors(userId);
  return authorIds
    .map((authorId) => sources.get(authorId))
    .filter((author): author is LocalAuthorData => author !== undefined);
}

export function useUserSourcesByIds(userId: string, sourceIds: string[]) {
  const sources = useUserSources(userId);
  return sourceIds
    .map((sourceId) => sources.get(sourceId))
    .filter((source): source is LocalSourceData => source !== undefined);
}

export function useUserAuthors(userId: string) {
  const { data: userQuotes } = useUserQuotes(userId);

  return React.useMemo(() => getAuthorMapFromQuotes(userQuotes), [userQuotes]);
}

export function useUserSources(userId: string) {
  const { data: userQuotes } = useUserQuotes(userId);
  return React.useMemo(() => getSourceMapFromQuotes(userQuotes), [userQuotes]);
}

function getAuthorMapFromQuotes(quotes: QuoteData[] | undefined) {
  const authorsMap = new Map<string, LocalAuthorData>();

  quotes?.forEach((quote) => {
    if (quote.author && quote.authorId) {
      let authorInstance: LocalAuthorData;
      const existingAuthor = authorsMap.get(quote.authorId);
      if (existingAuthor) {
        authorInstance = existingAuthor;
      } else {
        authorInstance = createLocalAuthor(quote.author, quote.authorId);
        authorsMap.set(quote.authorId, authorInstance);
      }
      authorInstance.quoteIds.add(quote.id);
      if (quote.sourceId) {
        authorInstance.sourceIds.add(quote.sourceId);
      }
    }
  });
  return authorsMap;
}

function createLocalAuthor(author: string, authorId: string): LocalAuthorData {
  return {
    id: authorId,
    name: author,
    quoteIds: new Set(),
    sourceIds: new Set(),
  };
}

function getSourceMapFromQuotes(quotes: QuoteData[] | undefined) {
  const sourcesMap = new Map<string, LocalSourceData>();
  quotes?.forEach((quote) => {
    if (quote.source && quote.sourceId) {
      let sourceInstance: LocalSourceData;
      const existingSource = sourcesMap.get(quote.sourceId);
      if (existingSource) {
        sourceInstance = existingSource;
      } else {
        sourceInstance = createLocalSource(
          quote.source,
          quote.sourceId,
          quote.authorId
        );
        sourcesMap.set(quote.sourceId, sourceInstance);
      }
      sourceInstance.quoteIds.add(quote.id);
    }
  });
  return sourcesMap;
}

function createLocalSource(
  source: string,
  sourceId: string,
  authorId?: string
): LocalSourceData {
  return {
    id: sourceId,
    name: source,
    authorId: authorId,
    quoteIds: new Set(),
  };
}
