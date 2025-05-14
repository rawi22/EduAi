import { useState } from 'react';
import { Book, Brain, BarChart, Upload, Settings } from 'lucide-react';
import { StudentForm } from './StudentForm';
import { ChatInterface } from './ChatInterface';
import { MaterialsUpload } from './MaterialsUpload';
import { ProgressView } from './ProgressView';
import { ProfileSettings } from './ProfileSettings';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'profile' | 'chat' | 'progress' | 'upload' | 'settings'>('profile');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">لوحة التحكم</h1>
          
          <div className="flex border-b mb-6">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 ${
                activeTab === 'profile'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500'
              }`}
            >
              <Book className="inline-block w-5 h-5 ml-2" />
              الملف الشخصي
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 ${
                activeTab === 'chat'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500'
              }`}
            >
              <Brain className="inline-block w-5 h-5 ml-2" />
              المعلم الذكي
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-4 py-2 ${
                activeTab === 'progress'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500'
              }`}
            >
              <BarChart className="inline-block w-5 h-5 ml-2" />
              التقدم
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-2 ${
                activeTab === 'upload'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500'
              }`}
            >
              <Upload className="inline-block w-5 h-5 ml-2" />
              رفع المواد
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 ${
                activeTab === 'settings'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500'
              }`}
            >
              <Settings className="inline-block w-5 h-5 ml-2" />
              الإعدادات
            </button>
          </div>

          {activeTab === 'profile' && <StudentForm />}
          {activeTab === 'chat' && <ChatInterface />}
          {activeTab === 'progress' && <ProgressView />}
          {activeTab === 'upload' && <MaterialsUpload />}
          {activeTab === 'settings' && <ProfileSettings />}
        </div>
      </div>
    </div>
  );
}