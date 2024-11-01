export interface Task {
  id?: string;
  description: string;
  estimateAt: Date;
  doneAt?: Date;
}