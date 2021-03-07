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

const addMinutes = (date: Date, minutes: number): Date => {
  return new Date(date.getTime() + minutes * 60000)
}

const handleTooManyRequest = (res: Response) => {
  if (res.status === 429) {
    const requestTime = addMinutes(new Date(), 1).toDateString()
    localStorage.setItem("block-request-time", requestTime)
    throw new Error(res.statusText)
  }
  localStorage.removeItem("block-request-time")
  return res
}
const isRequestBlock = (): boolean => {
  const blockRequestTime = localStorage.getItem("block-request-time") || ""
  return new Date().getTime() - new Date(blockRequestTime).getTime() > 0
}

export const fetchData = <T>(
  endpoint: string,
  options = {} as Options,
): boolean | Promise<T> =>
  !isRequestBlock &&
  fetch(endpoint, {
    method: options.method || "GET",
    headers: options.headers,
    body: JSON.stringify(options.body),
  })
    .then(handleError)
    .then(handleTooManyRequest)
    .then((res) => res.json())
