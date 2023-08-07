import { EditablePersona } from "@/components/EditablePersona";
import { NavigationBar } from "@/components/NavigationBar";
import { useAuthorName, useAuthorSources } from "@/components/api/AuthorApi";
import {
  useAuthorPicture,
  useUpdateAuthorPicture,
} from "@/components/firebase/Hook/AuthorPicture";
import { inter_cn, montse_cn, nuno_cn } from "@/components/fonts";
import { StandardQuoteData } from "@/types/QuoteData";
import { Switch } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import styles from "./author.module.css";

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
  const { data: sources } = useAuthorSources(authorId);
  const [isSwitchInGutenly, setIsSwitchInGutenly] = React.useState(false);
  const { data: authorPicture } = useAuthorPicture(authorId);
  const authorPictureMutator = useUpdateAuthorPicture(authorId);

  const changedSources = sources
    ? [...sources, ...sources, ...sources, ...sources, ...sources, ...sources]
    : [];

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
          <div className={styles.popularBooksContainer}>
            <div className={inter_cn(styles.popularBooks)}>
              {changedSources?.map((source, index) =>
                getBook(source.name, index)
              )}
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
