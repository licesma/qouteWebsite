import { useFirestore } from "@/components/firebase/FirebaseProvider";
import type { QuoteData } from "@/types/QuoteData";
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

export function useAllUserQuotesData(userId: string) {
  console.log("esteban user id: ", userId);
  const firestore = useFirestore();
  const quotesRef = doc(firestore, `user_quotes/${userId}`);
  return useQuery({
    queryKey: [userId, "quotes"],
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
