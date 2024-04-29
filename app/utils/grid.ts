import { calculateCardHeight } from "~/components/card";
import { Snippet } from "~/models/snippet.server";

export function divideItemsIntoColumns(
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

export function generateGridTemplateAreas(
  posts: Snippet[],
  columnCount: number
) {
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
