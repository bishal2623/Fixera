'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Chrome, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
// import { useAuth, useFirestore } from '@/firebase';
// import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
// import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState<null | 'google' | 'email'>(null);
  const router = useRouter();
  // const auth = useAuth();
  // const firestore = useFirestore();
  const { toast } = useToast();

  const handleAuthSuccess = async (user: any) => {
    // if (isSignUp) {
    //     const userRef = doc(firestore, 'users', user.uid);
    //     await setDoc(userRef, {
    //         uid: user.uid,
    //         email: user.email,
    //         displayName: user.displayName,
    //         photoURL: user.photoURL,
    //         createdAt: serverTimestamp()
    //     }, { merge: true });
    // }
    router.push('/');
  };
  
  const handleAuthError = (error: any) => {
    console.error(error);
    toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: error.message || "An unexpected error occurred. Please try again."
    });
  }

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading('email');
    // const form = event.target as HTMLFormElement;
    // const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    // const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    // try {
    //     const userCredential = await signInWithEmailAndPassword(auth, email, password);
    //     await handleAuthSuccess(userCredential.user);
    // } catch(error) {
    //     handleAuthError(error);
    // } finally {
    //     setIsLoading(null);
    // }
  };
  
  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading('email');
    // const form = event.target as HTMLFormElement;
    // const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    // const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    // try {
    //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //     await handleAuthSuccess(userCredential.user);
    // } catch(error) {
    //     handleAuthError(error);
    // } finally {
    //     setIsLoading(null);
    // }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading('google');
    // const provider = new GoogleAuthProvider();
    // try {
    //     const result = await signInWithPopup(auth, provider);
    //     await handleAuthSuccess(result.user);
    // } catch (error) {
    //     handleAuthError(error);
    // } finally {
    //     setIsLoading(null);
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            {isSignUp ? 'Create an Account' : 'Welcome Back'}
          </CardTitle>
          <CardDescription>
            {isSignUp
              ? 'Enter your details to get started.'
              : 'Sign in to continue to AI Co-Builder.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={true || isLoading !== null}>
              {isLoading === 'google' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Chrome className="mr-2 h-4 w-4" />}
              Continue with Google
            </Button>
            <div className="flex items-center space-x-2">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">OR</span>
              <Separator className="flex-1" />
            </div>
            <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required disabled={true || isLoading !== null} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required disabled={true || isLoading !== null} />
              </div>
              <Button type="submit" className="w-full" disabled={true || isLoading !== null}>
                {isLoading === 'email' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </Button>
            </form>
          </div>
          <div className="mt-6 text-center text-sm">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary hover:underline"
              disabled={true || isLoading !== null}
            >
              {isSignUp
                ? 'Already have an account? Sign In'
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
