import React, { useEffect } from 'react';
import { Book, Brain, BarChart as ChartBar, GraduationCap, Sparkles, Users, Target } from 'lucide-react';
import { Button } from './components/Button';
import { AuthForm } from './components/AuthForm';
import { Dashboard } from './components/Dashboard';
import { useAuthStore } from './store/auth';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import './i18n'; // Import i18n configuration

function App() {
  const { user, loading } = useAuthStore();
  const { t, i18n } = useTranslation();

  // Initialize language from localStorage or default to Arabic
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'ar';
    i18n.changeLanguage(savedLanguage);
    document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
  }, [i18n]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (user) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="absolute top-4 right-4">
              <LanguageSwitcher />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              {t('app.tagline')}
              <span className="inline-block">
                <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-yellow-300 ml-2 animate-pulse" />
              </span>
            </h1>
            <p className="text-xl mb-8 text-white/90">
              منصة تعليمية ذكية تساعد طفلك على التفوق في المدرسة من خلال معلم خاص يعمل بالذكاء الاصطناعي
            </p>
            <Button className="text-lg px-8 py-4">
              {t('auth.startJourney')}
            </Button>
          </div>
        </div>
      </header>

      {/* Auth Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto glass-card p-8">
            <AuthForm />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-white to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">+10,000</h3>
              <p className="text-gray-600">طالب نشط</p>
            </div>
            <div className="glass-card p-8 text-center">
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">95%</h3>
              <p className="text-gray-600">نسبة النجاح</p>
            </div>
            <div className="glass-card p-8 text-center">
              <Book className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">+50</h3>
              <p className="text-gray-600">مادة دراسية</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">كيف يعمل؟</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:rotate-6 transition-transform duration-300">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">أدخل معلومات الطالب</h3>
              <p className="text-gray-600 text-center">سجل تفاصيل طفلك والمواد التي يحتاج المساعدة فيها</p>
            </div>
            <div className="card group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:rotate-6 transition-transform duration-300">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">تعلم مع المعلم الذكي</h3>
              <p className="text-gray-600 text-center">استفد من دروس تفاعلية مخصصة وفقاً لاحتياجات طفلك</p>
            </div>
            <div className="card group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:rotate-6 transition-transform duration-300">
                <ChartBar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">تابع التقدم</h3>
              <p className="text-gray-600 text-center">احصل على تقارير منتظمة عن تقدم طفلك وأدائه</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">لماذا {t('app.name')}؟</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card p-8 hover:scale-105 transition-transform duration-300">
              <Book className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">منهج مدرسي معتمد</h3>
              <p className="text-gray-600">دروس متوافقة مع المنهج المدرسي الرسمي</p>
            </div>
            <div className="glass-card p-8 hover:scale-105 transition-transform duration-300">
              <Brain className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">تعلم ذكي</h3>
              <p className="text-gray-600">يتكيف مع مستوى الطالب ويحدد نقاط الضعف</p>
            </div>
            <div className="glass-card p-8 hover:scale-105 transition-transform duration-300">
              <ChartBar className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">تقارير مفصلة</h3>
              <p className="text-gray-600">متابعة مستمرة لتقدم الطالب مع تقارير دورية</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center glass-card p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">ابدأ رحلة النجاح اليوم</h2>
            <p className="text-xl text-gray-600 mb-8">انضم إلى آلاف الطلاب الذين يتفوقون مع {t('app.name')}</p>
            <Button variant="secondary" className="text-lg px-8">
              {t('auth.registerButton')}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-right">
            <div>
              <h3 className="text-xl font-bold mb-4">عن {t('app.name')}</h3>
              <p className="text-gray-300">منصة تعليمية ذكية تساعد الطلاب على التفوق في دراستهم</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
              <p className="text-gray-300">البريد الإلكتروني: info@ustazkai.com</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">تابعنا</h3>
              <div className="flex justify-center md:justify-start space-x-4">
                <a href="#" className="text-white hover:text-gray-300">Twitter</a>
                <a href="#" className="text-white hover:text-gray-300 mr-4">Facebook</a>
                <a href="#" className="text-white hover:text-gray-300 mr-4">Instagram</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p>جميع الحقوق محفوظة © {new Date().getFullYear()} {t('app.name')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;