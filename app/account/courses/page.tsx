'use client';

import { useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Video from 'next-video';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  CheckCircle,
  Lock,
  FileText,
  Download,
  MessageCircle,
  Volume2,
  VolumeX
} from 'lucide-react';
import Button from '@/components/ui/Button';

// Временные данные (позже из БД)
const courseData = {
  id: '1',
  title: 'Комбинированный маникюр',
  lessons: [
    { id: 1, title: 'Введение в курс', duration: '15:00', isCompleted: false, isUnlocked: true, videoUrl: '/videos/intro.mp4' },
    { id: 2, title: 'Анатомия ногтевой пластины', duration: '30:00', isCompleted: false, isUnlocked: true, videoUrl: '/videos/anatomy.mp4' },
    { id: 3, title: 'Выбор инструментов', duration: '25:00', isCompleted: false, isUnlocked: true, videoUrl: '/videos/tools.mp4' },
  ]
};

export default function WatchLessonPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const lessonId = parseInt(params.lessonId as string);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const currentLesson = courseData.lessons.find(l => l.id === lessonId);
  const currentIndex = courseData.lessons.findIndex(l => l.id === lessonId);
  const nextLesson = courseData.lessons[currentIndex + 1];
  const prevLesson = courseData.lessons[currentIndex - 1];

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Урок не найден</h2>
          <Link href="/account/courses">
            <Button>Вернуться к курсам</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-96 bg-gray-800 text-white flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <Link href="/account/courses" className="flex items-center gap-2 text-gray-300 hover:text-white mb-4">
              <ChevronLeft className="w-4 h-4" />
              Назад к курсам
            </Link>
            <h2 className="text-xl font-bold">{courseData.title}</h2>
            <p className="text-sm text-gray-400 mt-1">
              Урок {currentIndex + 1} из {courseData.lessons.length}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {courseData.lessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                href={`/account/courses/${courseId}/watch/${lesson.id}`}
                className={`block p-4 hover:bg-gray-700 transition-colors ${lesson.id === lessonId ? 'bg-gray-700' : ''
                  } ${!lesson.isUnlocked ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-gray-400">Урок {index + 1}</span>
                      {lesson.isCompleted && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                      {!lesson.isUnlocked && (
                        <Lock className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                    <div className="font-medium">{lesson.title}</div>
                    <div className="text-sm text-gray-400 mt-1">{lesson.duration}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-700 p-4 space-y-3">
            <button className="flex items-center gap-2 text-gray-300 hover:text-white w-full">
              <FileText className="w-4 h-4" />
              <span>Дополнительные материалы</span>
            </button>
            <button className="flex items-center gap-2 text-gray-300 hover:text-white w-full">
              <Download className="w-4 h-4" />
              <span>Скачать конспект</span>
            </button>
            <button className="flex items-center gap-2 text-gray-300 hover:text-white w-full">
              <MessageCircle className="w-4 h-4" />
              <span>Задать вопрос</span>
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-black flex items-center justify-center">
            <div className="w-full max-w-6xl">
              <Video
                src={currentLesson.videoUrl}
                controls={true}
                className="w-full"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            </div>
          </div>

          <div className="bg-gray-800 text-white p-6">
            <h3 className="text-xl font-bold mb-2">{currentLesson.title}</h3>
            <p className="text-gray-300 mb-4">
              В этом уроке вы изучите основы комбинированного маникюра.
            </p>

            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                {prevLesson && prevLesson.isUnlocked && (
                  <Link href={`/account/courses/${courseId}/watch/${prevLesson.id}`}>
                    <Button variant="outline" className="!border-gray-600 !text-white hover:!bg-gray-700">
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Предыдущий урок
                    </Button>
                  </Link>
                )}

                {nextLesson && nextLesson.isUnlocked && (
                  <Link href={`/account/courses/${courseId}/watch/${nextLesson.id}`}>
                    <Button>
                      Следующий урок
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}

                {!nextLesson && (
                  <Link href="/account/courses">
                    <Button>
                      Завершить курс
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}