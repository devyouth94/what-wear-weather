import { XMLParser } from 'fast-xml-parser';

type ApiOptions = {
  params?: Record<string, unknown>;
} & Omit<RequestInit, 'method'>;

const getParams = (params: Record<string, unknown>) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, values]) => {
    if (values) {
      searchParams.append(key, String(values));
    }
  });

  return searchParams.toString();
};

export const get = async <T>(
  apiUrl: string,
  options: ApiOptions = {},
): Promise<T> => {
  const { params, ...rest } = options;

  const fullUrl = params ? `${apiUrl}?${getParams(params)}` : apiUrl;

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

export const del = async (
  apiUrl: string,
  options: Omit<RequestInit, 'method'> = {},
) => {
  const response = await fetch(apiUrl, { ...options, method: 'DELETE' });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
};

export const kmaApi = async <T>(
  apiUrl: string,
  options: ApiOptions = {},
): Promise<T> => {
  const { params, ...rest } = options;

  const fullUrl = params ? `${apiUrl}?${getParams(params)}` : apiUrl;

  const response = await fetch(fullUrl, {
    ...rest,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...rest.headers,
    },
  });

  const responseText = await response.text();
  const isXml =
    responseText.trim().startsWith('<') &&
    responseText.includes('OpenAPI_ServiceResponse');

  if (isXml) {
    const parser = new XMLParser();
    const xmlData = parser.parse(responseText);

    const errorMsg = xmlData.OpenAPI_ServiceResponse?.cmmMsgHeader?.errMsg;
    const reasonCode =
      xmlData.OpenAPI_ServiceResponse?.cmmMsgHeader?.returnReasonCode;

    throw new Error(`기상청 API 오류: ${errorMsg}, 오류 코드 ${reasonCode})`);
  }

  return JSON.parse(responseText);
};
