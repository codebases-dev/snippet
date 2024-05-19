import { Snippet } from "~/models/snippet.server";

function calculateCardHeight(post: Snippet) {
  const codeLineCount = calculateCodeLineCount(post.code);
  return codeLineCount * 1.5 + 11.5;
}

function divideItemsIntoColumns(
  posts: Snippet[],
  columnCount: number
): Snippet[][] {
  const columns = Array.from({ length: columnCount }, (): Snippet[] => []);

  posts.forEach((post, index) => {
    const columnIndex = index % columnCount;
    columns[columnIndex].push(post);
  });

  return columns;
}

function generateGridTemplateAreas(posts: Snippet[], columnCount: number) {
  const dividedColumns = divideItemsIntoColumns(posts, columnCount);

  const gridTemplateAreaBlocks = dividedColumns.map((columnItems) => {
    return columnItems.reduce((acc, item) => {
      const cardHeightWithPadding = (calculateCardHeight(item) + 1) * 2;
      const rows = Array.from(
        { length: cardHeightWithPadding },
        () => `item${item.id}`
      );
      return acc.concat(rows);
    }, [] as string[]);
  });

  const maxRows = Math.max(
    ...gridTemplateAreaBlocks.map((block) => block.length)
  );

  const gridTemplateAreas = Array.from(
    { length: maxRows },
    (_, rowIndex) =>
      `"${gridTemplateAreaBlocks.reduce(
        (acc, block) =>
          acc === ""
            ? `${block[rowIndex] || "."}`
            : `${acc} ${block[rowIndex] || "."}`,
        ""
      )}"`
  ).join(" ");

  return gridTemplateAreas;
}

function calculateCodeLineCount(code: string) {
  return code.endsWith("\n")
    ? code.split("\n").length - 1
    : code.split("\n").length;
}

export function generateGridStyleHtml(
  snippets: Snippet[],
  gridContainerClassName: string
) {
  return `
    <style>
      .${gridContainerClassName} {
        display: grid;
        grid-template-areas: ${generateGridTemplateAreas(snippets, 4)};
        grid-template-columns: repeat(4, 28rem);
      }
      
      .${gridContainerClassName} > * {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        padding-bottom: 1rem;
      }
      
      @media (max-width: calc(28rem * 4 + 1rem)) {
        .${gridContainerClassName} {
          grid-template-areas: ${generateGridTemplateAreas(snippets, 3)};
          grid-template-columns: repeat(3, 28rem);
        }
      }
      
      @media (max-width: calc(28rem * 3 + 1rem)) {
        .${gridContainerClassName} {
          grid-template-areas: ${generateGridTemplateAreas(snippets, 2)};
          grid-template-columns: repeat(2, 28rem);
        }
      }
      
      @media (max-width: calc(28rem * 2 + 1rem)) {
        .${gridContainerClassName} {
          display: block;
          width: 100%;
          grid-template-areas: ${generateGridTemplateAreas(snippets, 1)};
          grid-template-columns: 1fr;
        }
        
        .${gridContainerClassName} > * {
          padding-left: 0;
          padding-right: 0;
        }
      }
    </style>
  `;
}
