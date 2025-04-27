
export const validateApiKey = async (apiKey: string): Promise<void> => {
  const testResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=test&key=${apiKey}`
  );

  if (!testResponse.ok) {
    const errorData = await testResponse.json();
    if (errorData.error?.errors?.some((e: any) => e.reason === "keyInvalid")) {
      throw new Error("Chave de API inválida. Verifique se a chave foi digitada corretamente.");
    }
  }
};
