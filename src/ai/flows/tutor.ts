'use server';

/**
 * @fileOverview Provides conversational tutoring assistance.
 *
 * - getTutorResponse - A function that takes a conversation history and returns a tutor response.
 * - TutorResponseInput - The input type for the getTutorResponse function.
 * - TutorResponseOutput - The return type for the getTutorResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['student', 'tutor']),
  content: z.string(),
});

const TutorResponseInputSchema = z.object({
  history: z.array(MessageSchema),
  question: z.string().describe('The latest question from the student.'),
});

export type TutorResponseInput = z.infer<typeof TutorResponseInputSchema>;

const TutorResponseOutputSchema = z.object({
  response: z.string().describe('The AI tutor\'s response to the student.'),
});

export type TutorResponseOutput = z.infer<typeof TutorResponseOutputSchema>;

export async function getTutorResponse(
  input: TutorResponseInput
): Promise<TutorResponseOutput> {
  return tutorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tutorPrompt',
  input: {schema: TutorResponseInputSchema},
  output: {schema: TutorResponseOutputSchema},
  prompt: `You are an AI tutor. Your goal is to guide the student to the answer, not to give it away.
  Ask leading questions and encourage them to think through the problem.
  The conversation history is provided below.

  History:
  {{#each history}}
  {{role}}: {{content}}
  {{/each}}

  Student's latest question:
  {{question}}
  `,
});

const tutorFlow = ai.defineFlow(
  {
    name: 'tutorFlow',
    inputSchema: TutorResponseInputSchema,
    outputSchema: TutorResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
