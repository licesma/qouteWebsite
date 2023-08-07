import * as React from "react";

export interface SearchableName {
  name: string; // May have multiple words inside
  id: string;
}

export interface SearchableWord {
  word: string;
  id: string;
}

export const useNameSearchList = (names: SearchableName[]) => {
  const words = React.useMemo(
    () => getOrderedSearchableWordList(names),
    [names]
  );

  React.useEffect(() => {
    console.log("regina", names, words, findMatchingWords("g", words));
  });

  const searchCallback = React.useCallback(
    (prefix: string) => {
      return findMatchingWords(prefix, words).map(
        (searchableWord) => searchableWord.id
      );
    },
    [words]
  );

  return searchCallback;
};

const getOrderedSearchableWordList = (names: SearchableName[]) => {
  const words: SearchableWord[] = [];
  names.forEach((name) => {
    const nameWords = getSimplifiedWords(name);
    words.push(...nameWords);
  });
  // words.sort((a, b) => a.word.localeCompare(b.word)); ||| not necessary until binary search is needed
  return words;
};

const getSimplifiedWords = ({ name, id }: SearchableName): SearchableWord[] => {
  const words: string[] = name.split(" ");
  const nonSymbolWords = words.map((word) =>
    word.normalize("NFD").replace(/\p{Diacritic}/gu, "")
  );
  const lowerCaseWords = nonSymbolWords.map((word) => word.toLowerCase());
  return lowerCaseWords.map((word) => ({ id, word }));
};

const findMatchingWords = (
  prefix: string,
  searchableWords: SearchableWord[]
) => {
  // standardSearch, change to binary when necessary
  return searchableWords.filter((searchableWord) =>
    searchableWord.word.startsWith(prefix)
  );
};
