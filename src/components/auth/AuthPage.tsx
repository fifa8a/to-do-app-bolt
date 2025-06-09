import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { CheckSquare } from 'lucide-react';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <CheckSquare size={32} className="text-primary-600 dark:text-primary-500 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Leo's To-do</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your tasks efficiently with our elegant to-do application
          </p>
        </div>

        {isLogin ? (
          <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
        ) : (
          <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}