'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Brain, BookOpen, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getTutorAIResponse, getFollowUpSuggestions, getSimplifiedConcept, getSessionSummary } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';


interface Message {
  id: number;
  role: 'student' | 'tutor';
  content: string;
}

export default function AITutor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'tutor',
      content:
        "Hi! I'm your AI tutor. I won't give you direct answers, but I'll guide you through problems step by step. What would you like help with today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);
  const [isSimplifying, setIsSimplifying] = useState<number | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [summary, setSummary] = useState('');
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);


  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSend = async (messageContent?: string) => {
    const content = messageContent || input;
    if (!content.trim() || isLoading) return;
    setFollowUpQuestions([]);

    const studentMessage: Message = { id: messages.length + 1, role: 'student', content };
    const newMessages = [...messages, studentMessage];
    setMessages(newMessages);
    const question = content;
    setInput('');
    setIsLoading(true);

    try {
      const result = await getTutorAIResponse({
        history: messages,
        question: question,
      });
      const tutorResponse: Message = {
        id: newMessages.length + 1,
        role: 'tutor',
        content: result.response,
      };
      setMessages([...newMessages, tutorResponse]);
      
      const suggestions = await getFollowUpSuggestions({ answer: result.response });
      setFollowUpQuestions(suggestions.questions);

    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to get a response from the tutor. Please try again.',
      });
      setMessages(messages); // Revert to previous messages on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleSimplify = async (message: Message) => {
    if (isSimplifying === message.id) return;
    setIsSimplifying(message.id);
    try {
        const result = await getSimplifiedConcept({ concept: message.content });
        const simplifiedMessage: Message = {
            id: messages.length + 1,
            role: 'tutor',
            content: `✨ Here's a simpler take on that:\n\n${result.explanation}`
        };
        setMessages(prev => [...prev, simplifiedMessage]);
    } catch (error) {
        console.error(error);
        toast({
            variant: 'destructive',
            title: 'An error occurred',
            description: 'Failed to simplify the concept. Please try again.',
        });
    } finally {
        setIsSimplifying(null);
    }
  };

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    try {
        const result = await getSessionSummary({ history: messages });
        setSummary(result.summary);
        setIsSummaryOpen(true);
    } catch (error) {
        console.error(error);
        toast({
            variant: 'destructive',
            title: 'An error occurred',
            description: 'Failed to generate the session summary. Please try again.',
        });
    } finally {
        setIsGeneratingSummary(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="bg-background/80 backdrop-blur-sm border-b border-border p-4 flex items-center gap-4 sticky top-0 z-10">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">AI Tutor</h1>
          <div className="text-sm text-muted-foreground">
            Learn through guided problem solving
          </div>
        </div>
        <Button
            variant="outline"
            size="sm"
            onClick={handleGenerateSummary}
            disabled={isGeneratingSummary || messages.length <= 1}
        >
            {isGeneratingSummary ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <BookOpen className="w-4 h-4 mr-2" />}
            Summary
        </Button>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 overflow-hidden">
        <Card className="lg:col-span-2 shadow-lg flex flex-col overflow-hidden">
          <CardHeader>
            <CardTitle>Conversation</CardTitle>
          </CardHeader>
          <ScrollArea className="flex-1 p-6 space-y-4" ref={scrollAreaRef}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  'flex animate-fade-in mb-2',
                  msg.role === 'student' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[80%] px-4 py-3 rounded-2xl group relative',
                    msg.role === 'student'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary'
                  )}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  {msg.role === 'tutor' && !msg.content.startsWith("✨") && (
                      <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1/2 -right-10 -translate-y-1/2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleSimplify(msg)}
                          disabled={isSimplifying === msg.id}
                      >
                          {isSimplifying === msg.id ? <Loader2 className="w-4 h-4 animate-spin" /> :<Brain className="w-4 h-4" />}
                          <span className="sr-only">Simplify</span>
                      </Button>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-secondary px-4 py-3 rounded-2xl">
                  <div className="flex gap-2 items-center">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span
                      className="w-2 h-2 rounded-full bg-primary animate-pulse"
                      style={{ animationDelay: '0.2s' }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-primary animate-pulse"
                      style={{ animationDelay: '0.4s' }}
                    />
                  </div>
                </div>
              </div>
            )}
             {followUpQuestions.length > 0 && !isLoading && (
                <div className="flex justify-start animate-fade-in pt-4">
                    <div className="flex flex-col items-start gap-2">
                        <p className="text-xs text-muted-foreground">Ask a follow-up...</p>
                        <div className="flex flex-wrap gap-2">
                        {followUpQuestions.map((q, i) => (
                            <Button
                                key={i}
                                variant="outline"
                                size="sm"
                                onClick={() => handleSend(q)}
                            >
                                {q}
                            </Button>
                        ))}
                        </div>
                    </div>
                </div>
            )}
          </ScrollArea>

          <div className="border-t border-border p-4 bg-background/95">
            <div className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask your question or share your thinking..."
                disabled={isLoading}
              />
              <Button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-6 shadow-lg">
            <h3 className="font-semibold mb-3 text-lg">How I Help You Learn</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>I guide you with hints, not direct answers</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>
                  I ask questions to help you think through problems
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>I encourage you to explain your reasoning</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>I celebrate your progress and correct thinking</span>
              </li>
            </ul>
          </Card>
          <Card className="p-6 shadow-lg">
            <h3 className="font-semibold mb-3 text-lg">Example Topics</h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Algebra',
                'Geometry',
                'Calculus',
                'Physics',
                'Chemistry',
                'Biology',
              ].map((topic) => (
                <span
                  key={topic}
                  className="px-3 py-1 rounded-full bg-secondary text-xs border"
                >
                  {topic}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <AlertDialog open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>My Study Notes</AlertDialogTitle>
            <AlertDialogDescription>A summary of your learning session.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="prose prose-sm max-h-[60vh] overflow-y-auto">
            <pre className="whitespace-pre-wrap font-sans text-sm">{summary}</pre>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsSummaryOpen(false)}>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
