import { useFirestore } from "@/components/firebase/FirebaseProvider";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import type { SourceData } from "@/types/SourceData";
import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "@/components/firebase/Hook/Auth";

export function useAuthorSourceRecommendationData(authorId: string) {
  const firestore = useFirestore();
  const sourcesRef = collection(firestore, "sources");
  const recommendationsRef = query(
    sourcesRef,
    where("authorId", "==", authorId),
    limit(10)
  );

  return useQuery({
    queryKey: ["sources"],
    queryFn: () =>
      getDocs(recommendationsRef).then((recommendations) =>
        recommendations.docs.map<SourceData>((recDoc) => {
          console.log(recDoc.data());
          return recDoc.data() as SourceData;
        })
      ),
  });
}
