import { useFirestore } from "@/components/firebase/FirebaseProvider";
import { collection, getDocs } from "firebase/firestore";
import type { QuoteData } from "@/types/QuoteData";
import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "@/components/firebase/Hook/Auth";

export function useQuotesData() {
  const firestore = useFirestore();

  return useQuery({
    queryKey: ["quotes"],
    queryFn: () =>
      getDocs(collection(firestore, "quotes")).then((quotes) =>
        quotes.docs.map<QuoteData>((quoteDoc) => quoteDoc.data() as QuoteData)
      ),
  });
}
