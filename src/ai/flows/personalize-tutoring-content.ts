'use server';
/**
 * @fileOverview This file defines a Genkit flow for personalizing tutoring content based on a student's learning style and performance.
 *
 * - personalizeTutoringContent - A function that takes student data and content requirements to tailor educational content.
 * - PersonalizeTutoringContentInput - The input type for the personalizeTutoringContent function.
 * - PersonalizeTutoringContentOutput - The return type for the personalizeTutoringContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeTutoringContentInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  learningStyle: z
    .string()
    .describe(
      'The learning style of the student (e.g., visual, auditory, kinesthetic).'
    ),
  performanceData: z
    .string()
    .describe(
      'Data on the student’s past performance, including topics they struggle with and areas where they excel.'
    ),
  contentTopic: z.string().describe('The topic for which content needs to be tailored.'),
  desiredFormat: z
    .string()
    .describe(
      'The desired format of the content (e.g., text, images, interactive examples).'
    ),
});
export type PersonalizeTutoringContentInput = z.infer<
  typeof PersonalizeTutoringContentInputSchema
>;

const PersonalizeTutoringContentOutputSchema = z.object({
  personalizedContent: z
    .string()
    .describe('The tailored educational content based on the student data.'),
  suggestedPace: z
    .string()
    .describe('A suggested pace for delivering the content to the student.'),
});
export type PersonalizeTutoringContentOutput = z.infer<
  typeof PersonalizeTutoringContentOutputSchema
>;

export async function personalizeTutoringContent(
  input: PersonalizeTutoringContentInput
): Promise<PersonalizeTutoringContentOutput> {
  return personalizeTutoringContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeTutoringContentPrompt',
  input: {schema: PersonalizeTutoringContentInputSchema},
  output: {schema: PersonalizeTutoringContentOutputSchema},
  prompt: `You are an AI tutor expert at tailoring educational content to individual students.

  Based on the student's learning style, performance data, the content topic, and the desired format, create personalized educational content and suggest a pace for delivery.

  Student Name: {{{studentName}}}
  Learning Style: {{{learningStyle}}}
  Performance Data: {{{performanceData}}}
  Content Topic: {{{contentTopic}}}
  Desired Format: {{{desiredFormat}}}

  Create personalized content:
  `,
});

const personalizeTutoringContentFlow = ai.defineFlow(
  {
    name: 'personalizeTutoringContentFlow',
    inputSchema: PersonalizeTutoringContentInputSchema,
    outputSchema: PersonalizeTutoringContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
