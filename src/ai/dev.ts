'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/code-refactor-suggestions.ts';
import '@/ai/flows/generate-creative-prompts.ts';
import '@/ai/flows/tutor.ts';
import '@/ai/flows/suggest-follow-ups.ts';
import '@/ai/flows/simplify-concept.ts';
import '@/ai/flows/generate-summary.ts';
