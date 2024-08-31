export interface SantaRequest {
  name: string;
  message: string;
}

export interface SantaResponse {
  message: string;
}

export interface ApiErrorResponse {
  status: string;
  title: string;
  message: string;
}

export interface ErrorWithData {
  data: ApiErrorResponse;
}
