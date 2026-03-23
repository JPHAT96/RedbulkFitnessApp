export interface VideoRecommendation {
  id: number;
  title: string;
  focus: string;
  dayLabel: string;
  videoUrl: string;
}

export interface WebhookResponse {
  videoRecommendations: VideoRecommendation[];
}

export enum AppState {
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}
