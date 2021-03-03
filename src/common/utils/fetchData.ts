type ObjectMap = { [key: string]: unknown }

interface Options {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  headers?: Headers
  body?: ObjectMap
}

const handleError = (res: Response) => {
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  return res
}

const handleTooManyRequest = (res: Response) => {
  if (res.status === 429) {
    // ToDo store too many request info & block sendig new requests for 1min
    throw new Error(res.statusText)
  }
  return res
}

export const fetchData = <T>(
  endpoint: string,
  options = {} as Options,
): Promise<T> =>
  fetch(endpoint, {
    method: options.method || "GET",
    headers: options.headers,
    body: JSON.stringify(options.body),
  })
    .then(handleError)
    .then(handleTooManyRequest)
    .then((res) => res.json())
