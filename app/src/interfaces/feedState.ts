import Post from "./post";

export default interface FeedState {
  posts: Post[];
  error: unknown;
  isLoading: boolean;
  postOnDisplay: Post | null;
  setPostOnDisplay: (post: Post) => void;
  wordsSelected: WordSelected[];
  setWordsSelected: (selecteds: WordSelected[]) => void;
}

export interface WordSelected {
  id: string;
  value: string;
}
