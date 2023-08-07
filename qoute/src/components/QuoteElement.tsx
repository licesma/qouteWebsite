import {
  ConversationQuote,
  ConversationQuoteData,
  QuoteData,
  StandardQuoteData,
} from "@/types/QuoteData";
import { Inter, Montserrat } from "@next/font/google";
import * as React from "react";
import styles from "./Quote.module.css";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

interface QuoteElementProps {
  quoteData: QuoteData;
  hideAuthor?: boolean;
  hideSource?: boolean;
}

export const QuoteElement: React.FunctionComponent<QuoteElementProps> = (
  props
) => {
  const { quoteData: data, hideAuthor, hideSource } = props;

  return data.isConversation ? (
    <ConversationQuoteElement
      quoteData={data as ConversationQuoteData}
      hideAuthor={hideAuthor}
      hideSource={hideSource}
    />
  ) : (
    <StandardQuoteElement
      quoteData={data as StandardQuoteData}
      hideAuthor={hideAuthor}
      hideSource={hideSource}
    />
  );
};

interface StandardQuoteElementProps {
  quoteData: StandardQuoteData;
  hideAuthor?: boolean;
  hideSource?: boolean;
}

export const StandardQuoteElement: React.FunctionComponent<
  StandardQuoteElementProps
> = (props) => {
  const { quoteData: data, hideAuthor, hideSource } = props;

  return (
    <div className={styles.container}>
      <div className={styles.activeBar} />
      <div className={styles.textContainer}>
        <div className={`${montserrat.className}`}>{`“${data.quote}”`}</div>
        {(data.author && !hideAuthor) || (data.source && !hideSource) ? (
          <div className={`${styles.author} ${montserrat.className}`}>
            — {data.author && !hideAuthor ? `${data.author}, ` : undefined}
            {data.source && !hideSource ? (
              <span className={styles.reference}>{data.source}</span>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

interface ConversationQuoteElementProps {
  quoteData: ConversationQuoteData;
  hideAuthor?: boolean;
  hideSource?: boolean;
}

export const ConversationQuoteElement: React.FunctionComponent<
  ConversationQuoteElementProps
> = (props) => {
  const { quoteData: data, hideAuthor, hideSource } = props;

  return (
    <div className={styles.container}>
      <div className={styles.activeBar} />
      <div className={styles.textContainer}>
        {data.conversation.map((conversationElement, index) => (
          <ConversationItem
            key={index}
            quote={conversationElement.quote}
            interlocutor={conversationElement.interlocutor}
          />
        ))}
        <div className={styles.sourceData}>
          {(data.author && !hideAuthor) || (data.source && !hideSource) ? (
            <div className={`${styles.author} ${montserrat.className}`}>
              — {data.author && !hideAuthor ? `${data.author}, ` : undefined}
              {data.source && !hideSource ? (
                <span className={styles.reference}>{data.source}</span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export const ConversationItem: React.FunctionComponent<ConversationQuote> = (
  props
) => {
  const { quote, interlocutor } = props;

  return (
    <div className={`${montserrat.className}`}>
      {`“${quote}”   `}
      <span className={`${styles.interlocutor} ${montserrat.className}`}>
        - {interlocutor}
      </span>
    </div>
  );
};
