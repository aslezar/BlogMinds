declare module 'wordnet-db';

export interface WordNet {
    synonyms(word: string): Promise<string[]>;
}
