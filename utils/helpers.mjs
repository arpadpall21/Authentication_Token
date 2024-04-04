import { readFileSync } from 'node:fs';

export function getConfig() {
  return JSON.parse(readFileSync('./config.json'));
}
