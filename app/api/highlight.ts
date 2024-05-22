export async function getHighlightCode(code: string, apiUrl: string) {
  return await fetch(apiUrl + "/highlight", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
      language: "js",
    }),
  })
    .then<{ html: string }>((res) => res.json())
    .catch(() => {
      throw new Error("Failed to highlight code");
    });
}
