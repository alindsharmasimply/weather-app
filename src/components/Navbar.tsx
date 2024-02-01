import React from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { MdMyLocation, MdSunny } from 'react-icons/md';
import SearchBar from './SearchBar';

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <p className="flex items-center justify-center gap-2">
          <h1 className="text-gray-500 text-3xl">Weather</h1>
          <MdSunny className="text-3xl mt-1 text-yellow-400" />
        </p>
        <section className="flex">
          <MdMyLocation className="text-3xl" />
          <IoLocationOutline className="text-3xl" />
          <p className="text-gray-900/80">India</p>
          <SearchBar />
        </section>
      </div>
    </nav>
  );
}
