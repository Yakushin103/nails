'use client';

import { useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Video from 'next-video'
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
  Maximize2,
  Volume2,
  VolumeX,
  SkipForward,
  SkipBack
} from 'lucide-react';
import Button from '@/components/ui/Button';

// Временные данные
const courseData = {
  id: '1',
  title: 'Комбинированный маникюр',
  lessons: [
    { id: 1, title: 'Введение в курс', duration: '15:00', isCompleted: true, isUnlocked: true, videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { id: 2, title: 'Анатомия ногтевой пластины', duration: '30:00', isCompleted: true, isUnlocked: true, videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { id: 3, title: 'Выбор инструментов', duration: '25:00', isCompleted: false, isUnlocked: true, videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { id: 4, title: 'Подготовка к работе', duration: '20:00', isCompleted: false, isUnlocked: true, videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { id: 5, title: 'Техника комбинированного маникюра', duration: '02:00:00', isCompleted: false, isUnlocked: true, videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { id: 6, title: 'Работа с разными типами кутикулы', duration: '45:00', isCompleted: false, isUnlocked: false, videoUrl: '' },
    { id: 7, title: 'Финальная отделка и покрытие', duration: '30:00', isCompleted: false, isUnlocked: false, videoUrl: '' },
  ]
};

export default function WatchCoursePage() {
  const params = useParams();
  const [currentLesson, setCurrentLesson] = useState(courseData.lessons[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentIndex = courseData.lessons.findIndex(l => l.id === currentLesson.id);
  const nextLesson = courseData.lessons[currentIndex + 1];
  const prevLesson = courseData.lessons[currentIndex - 1];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex h-screen">
        {/* Sidebar with lessons */}
        <div className="w-96 bg-gray-800 text-white flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <Link href="/account/courses" className="flex items-center gap-2 text-gray-300 hover:text-white mb-4">
              <ChevronLeft className="w-4 h-4" />
              Назад к курсам
            </Link>
            <h2 className="text-xl font-bold">{courseData.title}</h2>
            <p className="text-sm text-gray-400 mt-1">
              Прогресс: {Math.round((courseData.lessons.filter(l => l.isCompleted).length / courseData.lessons.length) * 100)}%
            </p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {courseData.lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                onClick={() => lesson.isUnlocked && setCurrentLesson(lesson)}
                className={`w-full p-4 text-left hover:bg-gray-700 transition-colors ${currentLesson.id === lesson.id ? 'bg-gray-700' : ''
                  } ${!lesson.isUnlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                  {lesson.isUnlocked && currentLesson.id !== lesson.id && (
                    <Play className="w-4 h-4 text-primary-500" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Additional resources */}
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
          <div className="flex-1 bg-black flex items-center justify-center relative">
            <div className="w-full max-w-6xl">
              <Video
                src={currentLesson.videoUrl}
                controls
                className="w-full"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            </div>
          </div>

          {/* Lesson Info & Navigation */}
          <div className="bg-gray-800 text-white p-6">
            <h3 className="text-xl font-bold mb-2">{currentLesson.title}</h3>
            <p className="text-gray-300 mb-4">
              В этом уроке вы изучите основы комбинированного маникюра. Мы рассмотрим правильную технику, выбор инструментов и частые ошибки.
            </p>

            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                {prevLesson && prevLesson.isUnlocked && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentLesson(prevLesson);
                      setIsPlaying(false);
                    }}
                    className="!border-gray-600 !text-white hover:!bg-gray-700"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Предыдущий урок
                  </Button>
                )}

                {nextLesson && nextLesson.isUnlocked && (
                  <Button
                    onClick={() => {
                      setCurrentLesson(nextLesson);
                      setIsPlaying(false);
                    }}
                  >
                    Следующий урок
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
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

              <div className="text-sm text-gray-400">
                {currentIndex + 1} из {courseData.lessons.length} уроков
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}