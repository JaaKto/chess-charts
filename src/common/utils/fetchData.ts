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
    const requestTime = addMinutes(new Date(), 1).toString()
    localStorage.setItem("block-request-time", requestTime)
    throw new Error(res.statusText)
  }
  localStorage.removeItem("block-request-time")
  return res
}

const isRequestBlock: () => boolean = () =>
  !!localStorage.getItem("block-request-time") &&
  new Date() < new Date(localStorage.getItem("block-request-time") || "")

export const fetchData = <T>(endpoint: string): Promise<T | string> => {
  if (isRequestBlock()) {
    return new Promise<string>((reject) => reject("requestBloker"))
  } else {
    return fetch(endpoint, { method: "GET" })
      .then(handleError)
      .then(handleTooManyRequest)
      .then((res) => res.json())
  }
}
