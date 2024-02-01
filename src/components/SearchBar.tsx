import { cn } from '@/utils/cn';
import React from 'react';
import { FiSearch } from 'react-icons/fi';

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  className?: string;
};

export default function SearchBar(props: Props) {
  return (
    <form
      className={cn(
        'flex relative items-center justify-center h-10',
        props.className
      )}
      onSubmit={props.onSubmit}
    >
      <input
        type="text"
        placeholder="Search location..."
        className="px-4 py-2 w-[230px] rounded-l-md border border-gray-400 focus:outline-none focus:border-blue-400 h-full"
        onChange={props.onChange}
      />
      <button
        className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none 
      hover:bg-blue-600 whitespace-nowrap h-full"
      >
        <FiSearch />
      </button>
    </form>
  );
}
