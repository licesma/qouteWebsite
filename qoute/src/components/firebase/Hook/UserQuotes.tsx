import { useFirestore } from "@/components/firebase/FirebaseProvider";
import type { QuoteData } from "@/types/QuoteData";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import * as React from "react";

export function useUserQuotes2(userId: string) {
  const firestore = useFirestore();
  const quotesRef = doc(firestore, `users/${userId}/quotes/all`);
  return useQuery({
    queryKey: [userId, "quotes23"],
    queryFn: () =>
      getDoc(quotesRef).then((quotes) => {
        const quotesMap = quotes.data();
        return quotesMap
          ? Object.keys(quotesMap).map<QuoteData>((quoteId) => {
              return { id: quoteId, ...quotesMap[quoteId] } as QuoteData;
            })
          : [];
      }),
  });
}

const useUpdateUserQuote = (userId: string, data: QuoteData) => {
  const firestore = useFirestore();
  const quotesRef = collection(firestore, `users/${userId}/quotes`);

  const addUserQuote = (quoteData: QuoteData) => {
    return addDoc(quotesRef, data);
  };

  return useMutation({
    mutationFn: addUserQuote,
    onSuccess: (response: DocumentReference<DocumentData>) => {
      console.log(response.id);
    },
  });
};

/*

const useUpdateUserQuotesObject = (userId: string, data: QuoteData) => {
  const firestore = useFirestore();
  const docRef = doc(firestore, "quotes", "yQ1QRTVFTNVPCtRRKICa");
  const allQuotesRef = `users/${userId}/quotes/all`; 

  const addUserQuote = React.useCallback(
    (quoteData: QuoteData) => {
      return setDoc(docRef, {"i"})
    },
    [userId]
  );

  return useMutation({
    mutationFn: setProfilePictureCallback,
    onSuccess: (response) => {
      refetch();
    },
  });
};

*/
