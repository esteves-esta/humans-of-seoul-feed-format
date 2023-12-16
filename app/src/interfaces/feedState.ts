import Post from "./post";

export default interface FeedState {
  posts: Post[];
  error: unknown;
  isLoading: boolean;
  postOnDisplay: Post | null;
  setPostOnDisplay: (post: Post) => void;
  wordsSelected: WordSelected;
  setWordsSelected: (selecteds: WordSelected) => void;
}

type WordSelected = { [key in number]: { [key in number]: string[] } };

// const t: FeedState = {
//   posts: [],
//   error: undefined,
//   isLoading: false,
//   postOnDisplay: undefined,
//   setPostOnDisplay: function (post: Post): void {
//     throw new Error("Function not implemented.");
//   },
//   wordsSelected: {34: {234: ['oi']}},
//   setWordsSelected: function (selecteds: WordSelected): void {
//     throw new Error("Function not implemented.");
//   }
// };
// console.log(t)