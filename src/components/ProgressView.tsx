import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Book, Clock, Award } from 'lucide-react';
import { useAuthStore } from '../store/auth';

interface Activity {
  id: string;
  type: 'question' | 'upload' | 'achievement';
  subject: string;
  timestamp: any;
  content: string;
}

interface ProgressData {
  subject: string;
  score: number;
  interactions: number;
}

export function ProgressView() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [progressData, setProgressData] = useState<ProgressData[]>([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!user) return;
      
      setLoading(true);
      
      try {
        // Fetch student activities
        const activitiesResponse = await fetch(`/api/retrieve?user_id=${user.id}&topic=all`);
        const activitiesData = await activitiesResponse.json();
        
        // Fetch interactions for progress data
        const interactionsResponse = await fetch(`/api/student/${user.id}`);
        const interactionsData = await interactionsResponse.json();
        
        // Process activities
        if (activitiesData.materials) {
          const processedActivities = activitiesData.materials.map((material: any) => ({
            id: material.id,
            type: 'upload',
            subject: material.subject,
            timestamp: material.uploaded_at,
            content: material.file_url
          })).slice(0, 5);
          
          setActivities(processedActivities);
        }
        
        // Generate sample progress data (in a real app, this would come from the backend)
        const subjects = ['math', 'science', 'arabic', 'english', 'hebrew'];
        const sampleProgressData = subjects.map(subject => ({
          subject: t(`subjects.${subject}`),
          score: Math.floor(Math.random() * 100),
          interactions: Math.floor(Math.random() * 50)
        }));
        
        setProgressData(sampleProgressData);
      } catch (error) {
        console.error('Error fetching progress data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudentData();
  }, [user, t]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">{t('progress.title')}</h2>
      
      {/* Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">{t('progress.overview')}</h3>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={progressData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#8884d8" name={t('progress.score')} />
              <Bar dataKey="interactions" fill="#82ca9d" name={t('progress.interactions')} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">{t('progress.activities')}</h3>
        
        {activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start p-3 border rounded-md">
                <div className="bg-indigo-100 p-2 rounded-full mr-3">
                  {activity.type === 'question' && <Clock className="w-5 h-5 text-indigo-600" />}
                  {activity.type === 'upload' && <Book className="w-5 h-5 text-indigo-600" />}
                  {activity.type === 'achievement' && <Award className="w-5 h-5 text-indigo-600" />}
                </div>
                <div>
                  <p className="font-medium">
                    {activity.type === 'upload' ? t('upload.title') : activity.type}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t(`subjects.${activity.subject}`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            {t('progress.noData')}
          </div>
        )}
      </div>
    </div>
  );
}