export default interface Post {
  title?: string;
  link: string;
  id: string;
  pubDate: string;
  kor: string;
  eng: string;
  selectedWords: string[];
  korSplit: string[];
  engSplit: string[];
}
