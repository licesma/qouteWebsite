import { useFirestore } from "@/components/firebase/FirebaseProvider";
import { QuoteData, StandardQuoteData } from "@/types/QuoteData";
import type { SourceData } from "@/types/SourceData";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";

export function useAuthorName(authorId: string) {
  const firestore = useFirestore();
  const authorRef = doc(firestore, `users/all/authors/${authorId}`);

  return useQuery({
    queryKey: [authorId, "name"],
    queryFn: () =>
      getDoc(authorRef).then((author) => author.data()?.name as string),
    enabled: authorId !== undefined,
  });
}

export function useAuthorTopSources(authorId: string, maxCount: number) {
  const firestore = useFirestore();
  const allSourcesRef = collection(firestore, "users/all/sources");
  const sourcesRef = query(
    allSourcesRef,
    where("authorId", "==", authorId),
    limit(maxCount)
  );

  return useQuery({
    queryKey: [authorId, "sources", "top"],
    queryFn: () =>
      getDocs(sourcesRef).then((recommendations) =>
        recommendations.docs.map<SourceData>((recDoc) => {
          return recDoc.data() as SourceData;
        })
      ),
    enabled: authorId !== undefined,
  });
}

export function useAuthorTopQuotes(authorId: string, maxCount: number) {
  const firestore = useFirestore();
  const allQuotesRef = collection(firestore, "users/all/quotes");
  const quotesRef = query(
    allQuotesRef,
    where("authorId", "==", authorId),
    where("isConversation", "==", false),
    limit(maxCount)
  );

  return useQuery({
    queryKey: [authorId, "quotes", "top"],
    queryFn: () =>
      getDocs(quotesRef).then((recommendations) =>
        recommendations.docs.map<StandardQuoteData>((recDoc) => {
          return recDoc.data() as StandardQuoteData;
        })
      ),
    enabled: authorId !== undefined,
  });
}

export function useAuthorSources(authorId: string) {
  const firestore = useFirestore();
  const allSourcesRef = collection(firestore, "users/all/sources");
  const sourcesRef = query(allSourcesRef, where("authorId", "==", authorId));

  return useQuery({
    queryKey: [authorId, "sources"],
    queryFn: () =>
      getDocs(sourcesRef).then((recommendations) =>
        recommendations.docs.map<SourceData>((recDoc) => {
          return recDoc.data() as SourceData;
        })
      ),
    enabled: authorId !== undefined,
  });
}

export function useAuthorQuotes(authorId: string) {
  const firestore = useFirestore();
  const allQuotesRef = collection(firestore, "users/all/quotes");
  const quotesRef = query(allQuotesRef, where("authorId", "==", authorId));

  return useQuery({
    queryKey: [authorId, "quotes"],
    queryFn: () =>
      getDocs(quotesRef).then((recommendations) =>
        recommendations.docs.map<QuoteData>((recDoc) => {
          return recDoc.data() as QuoteData;
        })
      ),
    enabled: authorId !== undefined,
  });
}
