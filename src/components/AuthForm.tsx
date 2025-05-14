import { useState } from 'react';
import { useAuthStore } from '../store/auth';
import { supabase } from '../lib/supabase';
import { Button } from './Button';

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastSignupAttempt, setLastSignupAttempt] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState<boolean | null>(null);
  const { signIn, signUp } = useAuthStore();

  // 60 second cooldown period
  const COOLDOWN_PERIOD = 60 * 1000;

  const canAttemptSignup = () => {
    if (!lastSignupAttempt) return true;
    const timeSinceLastAttempt = Date.now() - lastSignupAttempt;
    return timeSinceLastAttempt >= COOLDOWN_PERIOD;
  };

  const getRemainingCooldownTime = () => {
    if (!lastSignupAttempt) return 0;
    const timeSinceLastAttempt = Date.now() - lastSignupAttempt;
    return Math.max(0, Math.ceil((COOLDOWN_PERIOD - timeSinceLastAttempt) / 1000));
  };

  const resendVerificationEmail = async () => {
    setError(null);
    setResendSuccess(null);
    
    try {
      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (resendError) {
        setError(resendError.message);
        setResendSuccess(false);
      } else {
        setResendSuccess(true);
      }
    } catch (err) {
      console.error('Error resending verification email:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('فشل في إعادة إرسال رابط التحقق');
      }
      setResendSuccess(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResendSuccess(null);

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        if (!canAttemptSignup()) {
          const remainingTime = getRemainingCooldownTime();
          setError(`يرجى الانتظار ${remainingTime} ثانية قبل المحاولة مرة أخرى`);
          return;
        }
        setLastSignupAttempt(Date.now());
        await signUp(email, password);
        setResendSuccess(true); // Show success message after signup
      }
    } catch (error) {
      console.error('Authentication error:', error);
      if (error instanceof Error) {
        if (error.message.includes('Email not confirmed')) {
          setError('يرجى تأكيد بريدك الإلكتروني. انقر على زر إعادة إرسال رابط التحقق أدناه.');
        } else {
          setError(error.message);
        }
      } else {
        setError('حدث خطأ أثناء المصادقة');
      }
    }
  };

  const remainingTime = getRemainingCooldownTime();
  const isSignupDisabled = !isLogin && !canAttemptSignup();

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            البريد الإلكتروني
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            كلمة المرور
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {resendSuccess && (
          <div className="text-green-500 text-sm text-center">
            تم إرسال رابط التحقق إلى بريدك الإلكتروني
          </div>
        )}

        {!isLogin && remainingTime > 0 && (
          <div className="text-gray-600 text-sm text-center">
            يرجى الانتظار {remainingTime} ثانية قبل المحاولة مرة أخرى
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full"
          disabled={isSignupDisabled}
        >
          {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
        </Button>

        {error?.includes('Email not confirmed') && (
          <button
            type="button"
            onClick={resendVerificationEmail}
            className="w-full mt-2 text-primary hover:text-primary-dark text-sm"
          >
            إعادة إرسال رابط التحقق
          </button>
        )}
      </form>
      
      <button
        onClick={() => {
          setIsLogin(!isLogin);
          setError(null);
          setResendSuccess(null);
        }}
        className="mt-4 text-primary hover:text-primary-dark text-sm w-full text-center"
      >
        {isLogin ? 'ليس لديك حساب؟ سجل الآن' : 'لديك حساب؟ سجل دخولك'}
      </button>
    </div>
  );
}