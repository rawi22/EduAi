import { useState } from 'react';
import { useAuthStore } from '../store/auth';
import { Button } from './Button';
import { Upload } from 'lucide-react';

export function MaterialsUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [subject, setSubject] = useState('');
  const [teacher, setTeacher] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const { user } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !subject || !teacher) {
      setError('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', user?.id || '');
    formData.append('subject', subject);
    formData.append('teacher', teacher);

    try {
      // Create a FormData object for the file upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('user_id', user?.id || '');
      formData.append('subject', subject);
      formData.append('teacher', teacher);

      // Send the file to the FastAPI backend
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'فشل رفع الملف');
      }

      const data = await response.json();
      console.log('Upload successful:', data);

      setSuccess(true);
      setFile(null);
      setSubject('');
      setTeacher('');
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('حدث خطأ أثناء رفع الملف');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">رفع المواد الدراسية</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الملف
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="w-12 h-12 text-gray-400 mb-2" />
              <span className="text-gray-600">
                {file ? file.name : 'اختر ملفًا أو اسحبه هنا'}
              </span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            المادة
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">اختر المادة</option>
            <option value="math">الرياضيات</option>
            <option value="science">العلوم</option>
            <option value="arabic">اللغة العربية</option>
            <option value="english">اللغة الإنجليزية</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            المعلم
          </label>
          <input
            type="text"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
            placeholder="اسم المعلم"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="text-green-500 text-sm text-center">
            تم رفع الملف بنجاح
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={uploading}
        >
          {uploading ? 'جارٍ الرفع...' : 'رفع الملف'}
        </Button>
      </form>
    </div>
  );
}