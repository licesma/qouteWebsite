import { useFirestore } from "@/components/firebase/FirebaseProvider";
import { useCurrentUser } from "@/components/firebase/Hook/Auth";
import type { QuoteData } from "@/types/QuoteData";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

export function useQuotesData() {
  const firestore = useFirestore();

  return useQuery({
    queryKey: ["quotes"],
    queryFn: () =>
      getDocs(collection(firestore, "quotes")).then((quoteDocuments) => {
        const quotes = quoteDocuments.docs.map<QuoteData>(
          (quoteDoc) => quoteDoc.data() as QuoteData
        );
        return quotes;
      }),
  });
}
