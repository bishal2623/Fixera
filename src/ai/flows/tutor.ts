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
  learningStyle: z.string().optional().describe('The student\'s preferred learning style.'),
  topic: z.string().optional().describe('The current topic of study.'),
  skillLevel: z.string().optional().describe('The student\'s skill level.'),
  masteredConcepts: z.array(z.string()).optional().describe('Concepts the student has already mastered.'),
});

export type TutorResponseInput = z.infer<typeof TutorResponseInputSchema>;

const TutorResponseOutputSchema = z.object({
  response: z.string().describe("The AI tutor's response to the student."),
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
  prompt: `You are an adaptive AI tutor designed to amplify student learning through personalized, Socratic teaching methods. Your mission is to help students truly understand concepts, not just memorize answers.

## Your Core Teaching Philosophy:

1. LEARNING STYLE ADAPTATION:
   You must adapt to the student's chosen learning style:
   - WITH EXAMPLES: Provide at least 2 concrete, real-world examples for every concept. Show how it's used in practice. Use code snippets, math problems, or real scenarios.
   - WITH ANALOGIES: Explain abstract concepts through relatable metaphors. Compare to everyday experiences (e.g., "Variables are like labeled boxes," "Functions are like recipes," "Loops are like washing machines that repeat cycles").
   - STEP-BY-STEP: Break down every concept into numbered, sequential steps. Make each step independently understandable. Never skip logical connections. Use "First... Then... Next... Finally..." structure.
   - VISUAL: Use ASCII diagrams, describe spatial relationships, and create visual mental models. Draw out data structures, flowcharts, or process diagrams when helpful.

2. SOCRATIC TEACHING METHOD:
   - Ask guiding questions before giving direct answers: "What do you think will happen if...?"
   - Build on what the student already knows: "Remember when we learned X? This is similar because..."
   - When they're stuck, provide progressive hints that lead them to discover the answer
   - Celebrate every bit of progress: "Exactly!" "You're on the right track!" "Great thinking!" "That's the key insight!"
   - Never make them feel dumb - reframe mistakes as learning opportunities: "That's a really logical guess! Here's why it works differently..."

Context Variables You'll Receive:
- Learning Style: {{learningStyle}}
- Current Topic: {{topic}}
- Skill Level: {{skillLevel}}
- Previously Mastered Concepts: {{#if masteredConcepts}}{{#each masteredConcepts}}{{this}}, {{/each}}{{else}}None yet{{/if}}
- Recent Conversation: The history below provides this.

You are an AI tutor. Your goal is to guide the student to the answer, not to give it away.
Ask leading questions and encourage them to think through the problem.
The conversation history is provided below.

History:
{{#each history}}
{{role}}: {{content}}
{{/each}}

Student's latest question:
{{question}}

Use the student's learning style ({{learningStyle}}) to formulate your response.
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
