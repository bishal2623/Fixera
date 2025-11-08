'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Sparkles } from 'lucide-react';
import type { GenerateCreativePromptsOutput } from '@/ai/flows/generate-creative-prompts';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { getCreativePrompt } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  input: z.string().min(3, { message: 'Please enter a topic or idea.' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreativeCanvas() {
  const [prompt, setPrompt] = useState<GenerateCreativePromptsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setPrompt(null);
    try {
      const result = await getCreativePrompt(values);
      setPrompt(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to generate a creative prompt. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <header className="space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Co-Creative Canvas</h1>
        <p className="text-muted-foreground md:text-xl">
          Enhance your creative projects with AI-suggested design elements, story snippets, or artistic prompts.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Your Idea</CardTitle>
            <CardDescription>Tell the AI what you're working on to get a creative boost.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="input"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic, theme, or starting point</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'A cyberpunk detective story', 'A logo for a coffee shop', 'A sad song about robots'"
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="mr-2" />
                      Generate Prompt
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="flex flex-col shadow-lg">
          <CardHeader>
            <CardTitle>AI-Generated Prompt</CardTitle>
            <CardDescription>Your co-creative spark from the AI.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-center justify-center p-6">
            {isLoading && <Loader2 className="size-8 animate-spin text-primary" />}
            {!isLoading && !prompt && (
              <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg h-full bg-background">
                <Sparkles className="size-12 mb-4 text-accent" />
                <p className="font-medium">Your creative prompt will appear here.</p>
                <p className="text-sm">Describe your idea and let the AI inspire you.</p>
              </div>
            )}
            {prompt?.prompt && (
              <blockquote className="border-l-4 border-accent bg-secondary p-6 rounded-r-lg text-lg font-medium text-secondary-foreground">
                {prompt.prompt}
              </blockquote>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
