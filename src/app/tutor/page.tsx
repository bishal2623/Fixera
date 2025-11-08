'use client';
import AITutor from '@/components/features/ai-tutor';
import ProtectedRoute from '@/components/auth/protected-route';

export default function AITutorPage() {
  return (
    <ProtectedRoute>
      <AITutor />
    </ProtectedRoute>
  );
}
