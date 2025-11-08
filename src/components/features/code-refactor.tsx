'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BrainCircuit, Loader2 } from 'lucide-react';
import type { CodeRefactorSuggestionsOutput } from '@/ai/flows/code-refactor-suggestions';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { getCodeRefactorSuggestions } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  code: z.string().min(10, { message: 'Please enter some code to refactor.' }),
  codingStyle: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CodeRefactor() {
  const [suggestions, setSuggestions] = useState<CodeRefactorSuggestionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
      codingStyle: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setSuggestions(null);
    try {
      const result = await getCodeRefactorSuggestions(values);
      setSuggestions(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to get refactoring suggestions. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <header className="space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Code Refactor Tool</h1>
        <p className="text-muted-foreground md:text-xl">
          Get AI-powered refactoring suggestions tailored to your coding style.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Input Your Code</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code Snippet</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste your code here..."
                          className="min-h-[300px] font-code text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="codingStyle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Coding Style (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'Functional programming with immutable data structures', 'Google Python Style Guide'"
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
                      <BrainCircuit className="mr-2" />
                      Analyze & Suggest
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>AI Suggestions</CardTitle>
            <CardDescription>Refactors suggested by the AI based on your input.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading && (
              <div className="flex justify-center items-center h-full min-h-[300px]">
                <Loader2 className="size-8 animate-spin text-primary" />
              </div>
            )}
            {!isLoading && !suggestions && (
              <div className="flex flex-col items-center justify-center text-center text-muted-foreground min-h-[300px] p-8 border-2 border-dashed rounded-lg bg-background">
                <BrainCircuit className="size-12 mb-4" />
                <p className="font-medium">Your refactoring suggestions will appear here.</p>
                <p className="text-sm">Enter some code and let our AI help you improve it.</p>
              </div>
            )}
            {suggestions?.suggestions && (
              <ul className="space-y-4 list-decimal list-inside bg-secondary p-6 rounded-lg text-secondary-foreground">
                {suggestions.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm leading-relaxed ml-4">{suggestion}</li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
