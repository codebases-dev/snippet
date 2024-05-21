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

export async function getHighlightCodes(codes: string[], apiUrl: string) {
  const response = await fetch(apiUrl + "/highlight/batch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      codes: codes.map((code) => ({ code, language: "js" })),
    }),
  })
    .then<{
      results: {
        index: number;
        html: string;
      }[];
    }>((res) => res.json())
    .catch(() => {
      throw new Error("Failed to highlight code");
    });

  return response.results;
}
