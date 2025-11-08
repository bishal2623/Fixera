'use server';
/**
 * @fileOverview A flow for generating a session summary for the AI Tutor.
 *
 * - generateSummary - A function that generates a session summary.
 * - GenerateSummaryInput - The input type for the generateSummary function.
 * - GenerateSummaryOutput - The return type for the generateSummary function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MessageSchema = z.object({
  id: z.number(),
  role: z.enum(['student', 'tutor']),
  content: z.string(),
});

const GenerateSummaryInputSchema = z.object({
  history: z.array(MessageSchema).describe('The entire chat history between the student and the tutor.'),
});
export type GenerateSummaryInput = z.infer<typeof GenerateSummaryInputSchema>;

const GenerateSummaryOutputSchema = z.object({
  summary: z.string().describe('A clean, Markdown-formatted summary of the key concepts, main topics learned, and any important definitions.'),
});
export type GenerateSummaryOutput = z.infer<typeof GenerateSummaryOutputSchema>;

export async function generateSummary(input: GenerateSummaryInput): Promise<GenerateSummaryOutput> {
  return generateSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSummaryPrompt',
  input: { schema: GenerateSummaryInputSchema },
  output: { schema: GenerateSummaryOutputSchema },
  prompt: `You are a study-note assistant. Read this entire conversation between a tutor and a student.
  Respond ONLY with a clean, Markdown-formatted summary of the key concepts, main topics learned, and any important definitions.
  Start with the title 'My Study Notes'.

  Conversation History:
  {{#each history}}
  {{role}}: {{content}}
  {{/each}}
  `,
});

const generateSummaryFlow = ai.defineFlow(
  {
    name: 'generateSummaryFlow',
    inputSchema: GenerateSummaryInputSchema,
    outputSchema: GenerateSummaryOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
