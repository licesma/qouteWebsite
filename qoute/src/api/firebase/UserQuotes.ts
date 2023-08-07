import { useFirestore } from "@/components/firebase/FirebaseProvider";
import type { QuoteData } from "@/types/QuoteData";
import { useQuery } from "@tanstack/react-query";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import * as React from "react";

export function useUserQuotes(userId: string) {
  const firestore = useFirestore();
  const quotesRef = doc(firestore, `user_quotes/${userId}`);

  return useQuery({
    queryKey: [userId, "quotes"],
    queryFn: () =>
      getDoc(quotesRef).then((quotes) => {
        const quotesMap = quotes.data();
        return quotesMap ? convertUserQuotesToArray(quotesMap) : [];
      }),
  });
}

const convertUserQuotesToArray = (quoteObject: DocumentData) =>
  Object.keys(quoteObject).map<QuoteData>((quoteId) => {
    return { id: quoteId, ...quoteObject[quoteId] } as QuoteData;
  });
