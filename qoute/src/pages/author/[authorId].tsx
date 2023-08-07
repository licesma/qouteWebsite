import { ChangePictureModal } from "@/components/ChangePictureModal";
import { EditablePersona } from "@/components/EditablePersona";
import { NavigationBar } from "@/components/NavigationBar";
import { Persona } from "@/components/Persona";
import { ULink } from "@/components/ULink";
import {
  useAuthorName,
  useAuthorTopQuotes,
  useAuthorTopSources,
} from "@/components/api/AuthorApi";
import {
  useAuthorPicture,
  useUpdateAuthorPicture,
} from "@/components/firebase/Hook/AuthorPicture";
import { inter_cn, montse_cn, nuno_cn } from "@/components/fonts";
import { StandardQuoteData } from "@/types/QuoteData";
import { Switch } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import styles from "./author.module.css";

const MAX_SOURCES = 5;
const MAX_QUOTES = 6;

const GABO_ID = "dEkqD6RmBo9D8zjmUKMF";
const TARA_ID = "1fXFvWBAHBbcBjGs7rbS";

export default function AuthorBasePage() {
  const router = useRouter();
  const authorId: string | undefined =
    typeof router.query.authorId === "string"
      ? router.query.authorId
      : undefined;

  return authorId ? <AuthorPage authorId={authorId} /> : null;
}

export const AuthorPage: React.FunctionComponent<{ authorId: string }> = (
  props
) => {
  const { authorId } = props;
  const { data: name } = useAuthorName(authorId);
  const { data: topSources } = useAuthorTopSources(authorId, MAX_SOURCES);
  const { data: topQuotes } = useAuthorTopQuotes(authorId, MAX_QUOTES);
  const [isSwitchInGutenly, setIsSwitchInGutenly] = React.useState(false);
  const { data: authorPicture } = useAuthorPicture(authorId);
  const authorPictureMutator = useUpdateAuthorPicture(authorId);

  return (
    <main className={styles.main}>
      <NavigationBar />
      <div className={styles.authorPageContainer}>
        <div className={styles.authorContainer}>
          <div className={styles.authorHeader}>
            <EditablePersona
              size={200}
              name={name}
              imageLink={authorPicture}
              updateImageCallback={(file: Blob) => {
                authorPictureMutator.mutate(file);
              }}
            />
            <div className={styles.nameAndSwitch}>
              <h1 className={inter_cn(styles.authorName)}>{name}</h1>
              <Switch
                className={styles.switch}
                style={{
                  marginLeft: "auto",
                  backgroundColor: isSwitchInGutenly ? "green" : undefined,
                }}
                checkedChildren={"Your Library"}
                unCheckedChildren={"Public Profile"}
                onChange={() => {
                  setIsSwitchInGutenly((prev) => !prev);
                }}
              />
            </div>
          </div>
          <div className={inter_cn(styles.gutenlySelectionContainer)}>
            <div className={styles.sectionLabel}>Gutenly Selection</div>
            <div className={montse_cn(styles.gutenlySelection)}>
              {"“"}La vida no es lo que uno vivió, sino lo que recuerda y cómo
              lo recuerda para contarla
              {"”"}
            </div>
          </div>
          <div className={styles.popularBooksContainer}>
            <div className={inter_cn(styles.sectionHeader)}>
              <div className={inter_cn(styles.sectionLabel)}>Books</div>
              <ULink
                className={nuno_cn(styles.seeAllLink)}
                href={`/author/sources/${authorId}`}
              >
                All books
              </ULink>
            </div>
            <div className={inter_cn(styles.popularBooks)}>
              {topSources?.map((source, index) => getBook(source.name, index))}
            </div>
          </div>
          <div className={styles.popularQuotesContainer}>
            <div className={inter_cn(styles.sectionHeader)}>
              <div className={inter_cn(styles.sectionLabel)}>Quotes</div>
              <ULink
                className={nuno_cn(styles.seeAllLink)}
                href={`/author/quotes/${authorId}`}
              >
                All quotes
              </ULink>
            </div>
            <div className={inter_cn(styles.popularQuotes)}>
              {topQuotes?.map((quote, index) => getQuote(quote, index))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export function getBook(name: string, index: number) {
  return (
    <div key={index} className={styles.authorBookCard}>
      <Image
        className={styles.authorBookImage}
        alt={"ok"}
        width={150}
        height={180}
        src={"/book_placeholder.svg"}
      />
      <div className={styles.authorBookTitle}>{name}</div>
    </div>
  );
}

export function getQuote(data: StandardQuoteData, index: number) {
  return (
    <div key={index} className={styles.authorQuoteCard}>
      <div className={styles.authorQuote}>{data.quote}</div>
      <div className={styles.authorQuoteSource}>-{data.source}</div>
    </div>
  );
}
