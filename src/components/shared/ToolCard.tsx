import { PencilSquareIcon, CheckIcon, XCircleIcon } from '@heroicons/react/24/outline';
import * as React from 'react';
import { Tool } from '../screens/Index';
import { useState } from 'react';
import clsx from 'clsx';

export interface IToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: IToolCardProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const toggleIsEdit = () => {
    setIsEdit((prevIsEdit) => !prevIsEdit);
  };

  const [inputData, setInputData] = useState<Partial<Tool>>(tool);

  const inputClasses = clsx('bg-transparent', 'border-0', 'cursor-pointer', 'py-2', 'px-4', 'rounded-md');

  return (
    <div
      key={inputData.id}
      className="h-48 group relative flex flex-col justify-between rounded-md shadow-slate-900 shadow-md p-4 bg-gradient-to-r from-slate-800 to-slate-700"
    >
      <div>
        <input
          className={clsx(inputClasses, 'text-xl mb-2 font-bold text-slate-500', {
            'bg-gray-900': isEdit,
            'cursor-text': isEdit,
          })}
          value={inputData.title}
        />
        <input
          className={clsx(inputClasses, {
            'bg-gray-900': isEdit,
            'cursor-text': isEdit,
          })}
          value={inputData.description}
        />
      </div>
      <input
        className={clsx(inputClasses, 'text-slate-200', {
          'bg-gray-900': isEdit,
          'cursor-text': isEdit,
        })}
        value={inputData.url}
      />

      {isEdit ? (
        <>
          <CheckIcon className="h-6 w-6 text-green-500 absolute top-4 right-12 cursor-pointer" />
          <XCircleIcon className="h-6 w-6 text-red-500 absolute top-4 right-4 cursor-pointer" />
        </>
      ) : (
        <button
          className="btn btn-actice btn-ghost hidden group-hover:block absolute top-4 right-4"
          onClick={toggleIsEdit}
        >
          <PencilSquareIcon className="h-6 w-6 text-slate-50 cursor-pointer" />
        </button>
      )}
    </div>
  );
}
