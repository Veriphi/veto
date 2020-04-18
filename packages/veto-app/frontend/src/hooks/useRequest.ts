import useSWR, { ConfigInterface, responseInterface } from 'swr'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

export type GetRequest = AxiosRequestConfig

interface Return<Data, Error>
  extends Pick<responseInterface<AxiosResponse<Data>, AxiosError<Error>>, 'isValidating' | 'revalidate' | 'error'> {
  data: Data | undefined
  response: AxiosResponse<Data> | undefined
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<ConfigInterface<AxiosResponse<Data>, AxiosError<Error>>, 'initialData'> {
  initialData?: Data
}

export default function useRequest<Data, E extends Error = Error>(
  request: GetRequest,
  { initialData, ...config }: Config<Data, E> = {},
): Return<Data, E> {
  const { data: response, error, isValidating, revalidate } = useSWR<AxiosResponse<Data>, AxiosError<E>>(
    request && JSON.stringify(request),
    () => axios(request),
    {
      ...config,
      initialData: initialData && {
        status: 200,
        statusText: 'InitialData',
        config: request,
        headers: {},
        data: initialData,
      },
    },
  )

  return {
    data: response?.data,
    response,
    error,
    isValidating,
    revalidate,
  }
}
