import React from 'react';

interface SearchBarProps {
  query: string;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, placeholder }) => {
  return (
    <div className="w-full flex justify-center mt-8 bg-[#0a0a0a] p-6">
      <form className="flex w-full max-w-xl bg-[#1e1e1e] rounded-lg overflow-hidden shadow-md">
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder={placeholder}
          className="flex-grow px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-[#3b82f6] hover:bg-[#1e40af] text-white px-6 py-3 font-medium cursor-pointer transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
