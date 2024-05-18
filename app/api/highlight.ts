export async function getHighlightCode(code: string, apiUrl: string) {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: code,
  });

  if (!response.ok) {
    throw new Error("Failed to highlight code");
  }

  return response.text();
}
