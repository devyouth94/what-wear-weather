type ApiOptions = {
  params?: Record<string, unknown>;
} & Omit<RequestInit, 'method'>;

export const get = async <T>(
  apiUrl: string,
  options: ApiOptions = {},
): Promise<T> => {
  const { params, ...rest } = options;

  const searchParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, values]) => {
      searchParams.append(
        key,
        typeof values === 'string' ? values : String(values),
      );
    });
  }

  const fullUrl = params ? `${apiUrl}?${searchParams.toString()}` : apiUrl;

  const response = await fetch(fullUrl, {
    ...rest,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...rest.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const post = async (
  apiUrl: string,
  body: BodyInit,
  options: Omit<RequestInit, 'body' | 'method'> = {},
) => {
  const response = await fetch(apiUrl, { ...options, method: 'POST', body });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
};
