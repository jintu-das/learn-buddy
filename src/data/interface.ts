export interface Course {
  id: number;
  name: string;
  author: string;
  type: string;
  description: string;
  rating: number;
  duration: number;
  students: number;
  image: string;
  bestseller: boolean;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  video_url: string;
  questions: Question[];
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}
