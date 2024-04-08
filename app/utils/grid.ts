import { calculateCardHeight } from "~/components/card";
import { Post } from "~/models/post.server";

export function divideItemsIntoColumns(
  posts: Post[],
  columnCount: number
): Post[][] {
  const columns = Array.from({ length: columnCount }, (): Post[] => []);

  posts.forEach((post, index) => {
    const columnIndex = index % columnCount;
    columns[columnIndex].push(post);
  });

  return columns;
}

export function generateGridTemplateAreas(posts: Post[], columnCount: number) {
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
