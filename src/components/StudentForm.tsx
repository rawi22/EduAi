import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './Button';
import { useAuthStore } from '../store/auth';
import { Loader2 } from 'lucide-react';

interface StudentFormData {
  name: string;
  school: string;
  grade: string;
  subject: string;
  notes: string;
}

export function StudentForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<StudentFormData>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const onSubmit = async (data: StudentFormData) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Store in Firestore via Supabase
      const response = await fetch('/api/student/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
          ...data
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to save student data');
      }

      setSuccess(true);
      reset();
    } catch (error) {
      console.error('Error saving student data:', error);
      setError('حدث خطأ أثناء حفظ البيانات. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">معلومات الطالب</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            اسم الطالب
          </label>
          <input
            id="name"
            {...register('name', { required: 'هذا الحقل مطلوب' })}
            className="w-full p-2 border rounded-md"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
            اسم المدرسة
          </label>
          <input
            id="school"
            {...register('school')}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
            الصف الدراسي
          </label>
          <select
            id="grade"
            {...register('grade', { required: 'هذا الحقل مطلوب' })}
            className="w-full p-2 border rounded-md"
          >
            <option value="">اختر الصف</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                الصف {i + 1}
              </option>
            ))}
          </select>
          {errors.grade && (
            <span className="text-red-500 text-sm">{errors.grade.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            المادة الدراسية
          </label>
          <select
            id="subject"
            {...register('subject', { required: 'هذا الحقل مطلوب' })}
            className="w-full p-2 border rounded-md"
          >
            <option value="">اختر المادة</option>
            <option value="math">الرياضيات</option>
            <option value="arabic">اللغة العربية</option>
            <option value="english">اللغة الإنجليزية</option>
            <option value="science">العلوم</option>
          </select>
          {errors.subject && (
            <span className="text-red-500 text-sm">{errors.subject.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            ملاحظات إضافية
          </label>
          <textarea
            id="notes"
            {...register('notes')}
            className="w-full p-2 border rounded-md h-24"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="text-green-500 text-sm text-center">
            تم حفظ المعلومات بنجاح
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            'حفظ المعلومات'
          )}
        </Button>
      </form>
    </div>
  );
}