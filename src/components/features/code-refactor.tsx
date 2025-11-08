'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BrainCircuit, Loader2, Sparkles, Wand2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getCodeRefactorSuggestions } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import type { CodeRefactorSuggestionsOutput } from '@/ai/flows/code-refactor-suggestions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CodeRefactor() {
  const router = useRouter();
  const [codeSnippet, setCodeSnippet] = useState('');
  const [codingStyle, setCodingStyle] = useState('');
  const [result, setResult] =
    useState<CodeRefactorSuggestionsOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!codeSnippet.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      const apiResult = await getCodeRefactorSuggestions({
        code: codeSnippet,
        codingStyle: codingStyle,
      });
      setResult(apiResult);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to get refactoring suggestions. Please try again.',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b border-border p-4 flex items-center gap-4 sticky top-0 z-10 md:hidden">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Code Refactor Tool</h1>
          <div className="text-sm text-muted-foreground">
            Get AI-powered refactoring suggestions tailored to your coding style
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="space-y-2 hidden md:block">
            <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Code Refactor Tool
            </h1>
            <div className="text-muted-foreground md:text-xl">
              Get AI-powered refactoring suggestions tailored to your coding
              style.
            </div>
          </div>
          {/* Input Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Input Your Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label
                  htmlFor="code-snippet"
                  className="text-sm font-medium mb-2 block"
                >
                  Code Snippet
                </Label>
                <Textarea
                  id="code-snippet"
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  placeholder="Paste your code here..."
                  className="min-h-[300px] font-mono text-sm bg-secondary/50"
                />
              </div>

              <div>
                <Label
                  htmlFor="coding-style"
                  className="text-sm font-medium mb-2 block"
                >
                  Preferred Coding Style (Optional)
                </Label>
                <Input
                  id="coding-style"
                  value={codingStyle}
                  onChange={(e) => setCodingStyle(e.target.value)}
                  placeholder="e.g., 'Functional programming with immutable data structures', 'Google Python Style Guide'"
                />
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !codeSnippet.trim()}
                className="w-full"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Analyze Code
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Suggestions Section */}
          {isAnalyzing && (
            <div className="flex justify-center items-center h-full min-h-[300px]">
              <Loader2 className="size-8 animate-spin text-primary" />
            </div>
          )}

          {result && (
             <Card className="shadow-lg animate-fade-in">
              <CardHeader>
                <CardTitle>Refactoring Result</CardTitle>
                <CardDescription>The AI has analyzed your code and provided the following improvements.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-secondary/30 p-4 rounded-lg border">
                  <h3 className="font-semibold mb-2 flex items-center gap-2"><Wand2 className="text-accent" /> AI Explanation</h3>
                  <p className="text-sm text-muted-foreground">{result.explanation}</p>
                </div>
                
                <Tabs defaultValue="side-by-side">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="side-by-side">Side-by-Side</TabsTrigger>
                    <TabsTrigger value="after">Refactored</TabsTrigger>
                  </TabsList>
                  <TabsContent value="side-by-side">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Before</Label>
                        <Textarea
                          readOnly
                          value={codeSnippet}
                          className="mt-1 font-mono text-sm h-96 bg-background"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">After</Label>
                         <Textarea
                          readOnly
                          value={result.refactoredCode}
                          className="mt-1 font-mono text-sm h-96 bg-background"
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="after">
                     <div className="mt-4">
                        <Label className="text-xs text-muted-foreground">Refactored Code</Label>
                         <Textarea
                          readOnly
                          value={result.refactoredCode}
                          className="mt-1 font-mono text-sm h-96 bg-background"
                        />
                      </div>
                  </TabsContent>
                </Tabs>
                
              </CardContent>
            </Card>
          )}

          {!isAnalyzing && !result && (
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground min-h-[300px] p-8 border-2 border-dashed rounded-lg bg-background">
              <BrainCircuit className="size-12 mb-4" />
              <p className="font-medium">
                Your refactoring suggestions will appear here.
              </p>
              <p className="text-sm">
                Enter some code and let our AI help you improve it.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
