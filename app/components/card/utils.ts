import { Snippet } from "~/models/snippet.server";
import { generateGridTemplateAreas } from "~/utils/grid";

function calculateCodeLineCount(code: string) {
  return code.endsWith("\n")
    ? code.split("\n").length - 1
    : code.split("\n").length;
}

export function calculateCardHeight(post: Snippet) {
  const codeLineCount = calculateCodeLineCount(post.code);
  return codeLineCount * 1.5 + 11.5;
}

export function generateCardStyleHtml(snippets: Snippet[]) {
  return `
    <style>
      .card-list {
        display: grid;
        grid-template-areas: ${generateGridTemplateAreas(snippets, 4)};
        grid-template-columns: repeat(4, 28rem);
      }
      
      .card-list > li {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        padding-bottom: 1rem;
      }
      
      @media (max-width: calc(28rem * 4 + 1rem)) {
        .card-list {
          grid-template-areas: ${generateGridTemplateAreas(snippets, 3)};
          grid-template-columns: repeat(3, 28rem);
        }
      }
      
      @media (max-width: calc(28rem * 3 + 1rem)) {
        .card-list {
          grid-template-areas: ${generateGridTemplateAreas(snippets, 2)};
          grid-template-columns: repeat(2, 28rem);
        }
      }
      
      @media (max-width: calc(28rem * 2 + 1rem)) {
        .card-list {
          display: block;
          width: 100%;
          grid-template-areas: ${generateGridTemplateAreas(snippets, 1)};
          grid-template-columns: 1fr;
        }
        
        .card-list > li {
          padding-left: 0;
          padding-right: 0;
        }
      }
    </style>
  `;
}
