export interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'Sightseeing' | 'Food' | 'Culture';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
