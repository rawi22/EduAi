import { useState } from 'react';
import { useAuthStore } from '../store/auth';
import { Button } from './Button';

export function ProfileSettings() {
  const [language, setLanguage] = useState('ar');
  const [notifications, setNotifications] = useState(true);
  const [dataSharing, setDataSharing] = useState(true);
  const [success, setSuccess] = useState(false);
  
  const { user, signOut } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // TODO: Implement settings update
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">الإعدادات</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            لغة التطبيق
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="ar">العربية</option>
            <option value="he">עברית</option>
          </select>
        </div>

        <div>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="h-4 w-4 text-primary rounded"
            />
            <span className="text-gray-700">تفعيل الإشعارات</span>
          </label>
        </div>

        <div>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={dataSharing}
              onChange={(e) => setDataSharing(e.target.checked)}
              className="h-4 w-4 text-primary rounded"
            />
            <span className="text-gray-700">السماح بمشاركة البيانات للتحسين</span>
          </label>
        </div>

        {success && (
          <div className="text-green-500 text-sm text-center">
            تم حفظ الإعدادات بنجاح
          </div>
        )}

        <div className="space-y-4">
          <Button type="submit" className="w-full">
            حفظ الإعدادات
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={() => signOut()}
          >
            تسجيل الخروج
          </Button>
        </div>
      </form>
    </div>
  );
}