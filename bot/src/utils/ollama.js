import { Ollama } from 'ollama';

export const ollama = new Ollama({ host: `${process.env.OLLAMA_URL}` });
