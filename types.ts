
export interface ServiceTier {
  price: string;
  deadline: string;
  description: string;
}

export interface Lecture {
  title: string;
  price: string;
  description: string;
  icon: string;
}

export interface GroundingSource {
  web?: {
    uri: string;
    title: string;
  };
}

export interface FileData {
  mimeType: string;
  data: string; // base64 encoded string
  name: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  sources?: GroundingSource[];
  file?: FileData;
}
