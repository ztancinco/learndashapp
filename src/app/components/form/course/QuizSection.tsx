import React from 'react';
import InputField from './fields/InputField';  // Assuming InputField is in the fields folder
import { TrashIcon } from '@heroicons/react/24/solid';

interface Quiz {
  title: string;
  description: string;
  options: string[];
  correctAnswer: number;
  isMultipleChoice: boolean;
}

interface QuizSectionProps {
  quiz: Quiz;
  index: number;
  onChange: <T extends keyof Quiz>(index: number, field: T, value: Quiz[T]) => void;
  onDelete: (index: number) => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({ quiz, index, onChange, onDelete }) => (
  <div className="mb-4 p-4 bg-gray-100 rounded-lg relative">
    <button type="button" onClick={() => onDelete(index)} className="absolute top-2 right-2 text-red-600 hover:text-red-800">
      <TrashIcon className="h-5 w-5" />
    </button>
    <InputField label="Quiz Title" value={quiz.title} onChange={(e) => onChange(index, 'title', e.target.value)} />
    <InputField label="Quiz Description" value={quiz.description} onChange={(e) => onChange(index, 'description', e.target.value)} />

    <div className="mb-2">
      <label className="flex items-center text-sm font-medium text-gray-700">
        <input type="checkbox" checked={quiz.isMultipleChoice} onChange={(e) => onChange(index, 'isMultipleChoice', e.target.checked)} className="mr-2" />
        Is multiple choice
      </label>
    </div>

    {quiz.isMultipleChoice ? (
      <>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">Quiz Options</label>
          {quiz.options.map((option: string, optionIndex: number) => (
            <InputField
              key={optionIndex}
              label={`Option ${optionIndex + 1}`}
              value={option}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const newOptions: string[] = [...quiz.options];
                newOptions[optionIndex] = e.target.value;
                onChange(index, 'options', newOptions);
              }}
            />
          ))}
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">Correct Answer</label>
          <select
            value={quiz.correctAnswer}
            onChange={(e) => onChange(index, 'correctAnswer', parseInt(e.target.value))}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            {quiz.options.map((_, optionIndex: number) => (
              <option key={optionIndex} value={optionIndex}>
                Option {optionIndex + 1}
              </option>
            ))}
          </select>
        </div>
      </>
    ) : (
      <InputField label="Answer" value={quiz.options[0]} onChange={(e) => onChange(index, 'options', [e.target.value])} />
    )}
  </div>
);

export default QuizSection;
