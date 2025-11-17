import { PencilSquareIcon } from '@heroicons/react/24/outline';
import * as React from 'react';
import { Tool } from '../screens/Index';

export interface IToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: IToolCardProps) {
  return (
    <div
      key={tool.id}
      className="h-48 group relative flex flex-col justify-between rounded-md shadow-slate-900 shadow-md p-4 bg-gradient-to-r from-slate-800 to-slate-700"
    >
      <div>
        <div className="text-xl mb-2 font-bold">{tool.title}</div>
        <div className="">{tool.description}</div>
      </div>
      <a className="text-slate-200" href={tool.url}>
        {tool.url}
      </a>
      <PencilSquareIcon className="h-6 w-6 text-blue-500 hidden group-hover:block absolute top-4 right-4 cursor-pointer" />
    </div>
  );
}
