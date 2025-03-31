export interface Mission {
    _id?: string;  // Optional since new missions won't have an ID yet
    name: string;
    status: string;
    location: string;
    date: string;
  }