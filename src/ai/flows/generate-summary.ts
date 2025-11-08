'use server';
/**
 * @fileOverview A flow for generating a session summary for the AI Tutor.
 *
 * - generateSummary - A function that generates a session summary.
 * - GenerateSummaryInput - The input type for the generateSummary function.
 * - GenerateSummaryOutput - The return type for the generateSummary function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

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
  summary: z.string().describe("A comprehensive summary of the user's learning session."),
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
  Based on the conversation, generate a comprehensive session summary using the following format EXACTLY.

  # 📚 Your Learning Session Summary
   
  ## 🎓 What You Learned Today
  - ✅ [Concept 1]: [One-line description] - **Mastered**
  - ✅ [Concept 2]: [One-line description] - **Mastered**
  - 🔄 [Concept 3]: [One-line description] - **Needs practice**
  - 📝 [Concept 4]: [One-line description] - **Review recommended**
   
  ## 💡 Key Breakthroughs ("Aha Moments")
  - **[Timestamp or "Early in session"]**: You realized that [specific insight]. This is huge because [why it matters].
  - **[Timestamp]**: When we used the [analogy/example], you said "[quote their reaction]" - that's exactly the right mental model!
   
  ## 🎯 Areas to Practice
  1. **[Skill/Concept]**: Try [specific practice suggestion]. This will solidify [learning goal].
  2. **[Skill/Concept]**: [Why this needs more work] → Practice by [concrete activity].
   
  ## 🚀 Recommended Next Steps
  Based on what you've learned, here's your optimal learning path:
  1. **Next topic**: [Topic name] - You're ready for this because [reason based on today's learning]
  2. **Then explore**: [Topic name] - This builds naturally on [today's concepts]
  3. **Challenge yourself**: [Advanced topic] - Once you're comfortable with the above
   
  ## 📊 Session Stats
  - Topics explored: [Analyze from history]
  - Questions answered: [Analyze from history]
  - Mistakes analyzed and learned from: [Analyze from history]
  - Session duration: [Analyze from history]
   
  ## 🌟 Progress Celebration
  [Specific, genuine encouragement about their growth. Reference something concrete they did well or improved on. Make it personal, not generic.]
   
  **Keep learning - you're doing amazing! 🚀**

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
