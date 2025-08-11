export interface IUrl {
  _id?: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ShortenUrlRequest {
  originalUrl: string;
}

export interface ShortenUrlResponse {
  success: boolean;
  data?: {
    originalUrl: string;
    shortUrl: string;
    shortCode: string;
  };
  message?: string;
}

export interface AnalyticsResponse {
  success: boolean;
  data?: {
    urls: IUrl[];
    totalUrls: number;
    totalClicks: number;
  };
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  statusCode?: number;
}
