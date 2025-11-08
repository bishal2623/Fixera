'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BookOpen, Loader2, User, Target } from 'lucide-react';
import type { PersonalizeTutoringContentOutput } from '@/ai/flows/personalize-tutoring-content';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getPersonalizedTutoring } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  studentName: z.string().min(2, { message: 'Please enter a name.' }),
  learningStyle: z.enum(['visual', 'auditory', 'kinesthetic'], { required_error: 'Please select a learning style.' }),
  performanceData: z.string().min(10, { message: 'Please provide some performance data.' }),
  contentTopic: z.string().min(3, { message: 'Please enter a topic.' }),
  desiredFormat: z.enum(['text', 'images', 'interactive examples'], { required_error: 'Please select a format.' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function PersonalizedTutor() {
  const [content, setContent] = useState<PersonalizeTutoringContentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setContent(null);
    try {
      const result = await getPersonalizedTutoring(values);
      setContent(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to generate tutoring content. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <header className="space-y-2">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">AI-Personalized Tutoring</h1>
        <p className="text-muted-foreground md:text-xl">
          Adaptive AI that tailors educational content and pace to the user's learning style and performance.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Student Profile</CardTitle>
            <CardDescription>Enter the learner's details to personalize the content.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="studentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Alex Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="learningStyle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Learning Style</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a learning style" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="visual">Visual</SelectItem>
                          <SelectItem value="auditory">Auditory</SelectItem>
                          <SelectItem value="kinesthetic">Kinesthetic</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="performanceData"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Past Performance & Struggles</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'Struggles with algebraic equations, excels at geometry. Finds long texts boring.'"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contentTopic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content Topic</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Photosynthesis" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="desiredFormat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Desired Format</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a content format" />
                          </Trigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="images">Images</SelectItem>
                          <SelectItem value="interactive examples">Interactive Examples</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <BookOpen className="mr-2" />
                      Generate Lesson
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Personalized Content</CardTitle>
            <CardDescription>The AI has generated the following lesson plan for you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {isLoading && (
              <div className="flex justify-center items-center h-full min-h-[400px]">
                <Loader2 className="size-8 animate-spin text-primary" />
              </div>
            )}
            {!isLoading && !content && (
              <div className="flex flex-col items-center justify-center text-center text-muted-foreground min-h-[400px] p-8 border-2 border-dashed rounded-lg bg-background">
                <User className="size-12 mb-4" />
                <p className="font-medium">Your personalized lesson plan will appear here.</p>
                <p className="text-sm">Fill out the student profile to get started.</p>
              </div>
            )}
            {content && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center"><Target className="mr-2 text-accent size-5"/> Suggested Pace</h3>
                  <p className="text-secondary-foreground bg-secondary p-4 rounded-lg">{content.suggestedPace}</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center"><BookOpen className="mr-2 text-accent size-5"/> Personalized Content</h3>
                  <div className="text-secondary-foreground bg-secondary p-4 rounded-lg whitespace-pre-wrap">{content.personalizedContent}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
