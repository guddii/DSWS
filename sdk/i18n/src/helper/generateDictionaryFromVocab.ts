import { LitVocabTerm } from "@inrupt/lit-vocab-term";

const isLitVocabTerm = (vocab: any): vocab is LitVocabTerm => {
  return vocab instanceof LitVocabTerm;
};

export const generateDictionaryFromVocab = (
  vocabs: object,
  language = "en"
) => {
  return Object.fromEntries(
    Object.values(vocabs)
      .filter(isLitVocabTerm)
      .map((vocab) => {
        return [vocab.value, vocab.asLanguage(language).label];
      })
  );
};
