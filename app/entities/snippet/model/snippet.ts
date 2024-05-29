export interface Snippet {
  id: string;
  title: string;
  code: string;
  highlightedCodeHtml: string;
  language: string;
  postedAt: string;
  user: {
    id: string;
    username: string;
    displayName: string;
    imageUrl?: string;
  };
}
