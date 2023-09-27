async function fetchUrl(url: string) {
  // 既定のオプションには * が付いています
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  });
  return response;
}

export default fetchUrl;
