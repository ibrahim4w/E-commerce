

export const SearchProduct = () => {


  return (
    <div className=" flex justify-center text-center mt-10">
      <input
        type="search"
        id="searchInput"
        className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:shadow-green-600 shadow-sm focus:border-green-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 outline-none placeholder:text-gray-600"
        placeholder="Search"
        required
        // onChange={handleSearch}
        // value={searchTerm}
      />
    </div>
  );
};
