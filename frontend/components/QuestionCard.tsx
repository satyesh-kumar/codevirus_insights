import React from 'react';
import { Link } from 'react-router-dom';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  theme: 'light' | 'dark';
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, theme }) => {
  const topAnswer = question.answers.length > 0 ? question.answers[0] : null;

  const cardBg =
    theme === 'dark'
      ? 'bg-slate-900 border-slate-800 hover:border-blue-800'
      : 'bg-white border-slate-200 hover:border-blue-200';

  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-600';
  const subCard =
    theme === 'dark'
      ? 'bg-slate-800/50 border-slate-800'
      : 'bg-slate-50 border-slate-100';

  return (
    <div className={`rounded-lg border shadow-sm overflow-hidden transition-colors ${cardBg}`}>
      <div className="p-4">
        {/* Author */}
        <div className="flex items-center gap-2 mb-2">
          <img src={question.author.avatar} className="w-8 h-8 rounded-full" />

          <div className="flex flex-col">
            <span className={`text-sm font-bold ${textPrimary}`}>
              {question.author.name}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
              {question.timestamp} • {question.topic}
            </span>
          </div>
        </div>

        {/* Title */}
        <Link to={`/question/${question.id}`} className="block group">
          <h2 className={`text-lg font-bold mb-2 group-hover:text-blue-600 ${textPrimary}`}>
            {question.title}
          </h2>
        </Link>

        {/* Content */}
        {question.content && (
          <p className={`text-sm mb-4 line-clamp-3 ${textSecondary}`}>
            {question.content}
          </p>
        )}

        {/* Image */}
        {question.imageUrl && (
          <div className="relative mb-4 overflow-hidden rounded">
            <img src={question.imageUrl} className="w-full h-64 object-cover" />
          </div>
        )}

        {/* Top answer */}
        {topAnswer && (
          <div className={`p-4 rounded-lg border mb-4 border-l-4 border-l-blue-400 ${subCard}`}>
            <p className={`text-sm line-clamp-2 ${textSecondary}`}>
              {topAnswer.content}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
