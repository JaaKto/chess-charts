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
    .then((res) => res.json())
