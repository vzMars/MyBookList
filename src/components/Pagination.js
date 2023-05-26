const Pagination = ({
  resultsPerPage,
  totalResults,
  currentPage,
  paginate,
}) => {
  if (totalResults < 1) return null;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='my-16'>
      <ul className='hidden md:flex -space-x-px justify-center'>
        <li>
          <button
            onClick={() =>
              paginate(currentPage === 1 ? currentPage : currentPage - 1)
            }
            className='px-3 py-2 ml-0 leading-tight text-white bg-neutral-800 border border-neutral-700 rounded-l-lg hover:bg-neutral-700 '
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((num) => (
          <li key={num}>
            <button
              onClick={() => paginate(num)}
              className={`px-3 py-2 leading-tight border ${
                num === currentPage
                  ? ' bg-blue-100 border-blue-800 hover:bg-blue-50 text-black'
                  : 'bg-blue-900 hover:bg-blue-800 border-blue-800 text-white'
              }`}
            >
              {num}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() =>
              paginate(
                currentPage === pageNumbers.length
                  ? currentPage
                  : currentPage + 1
              )
            }
            className='px-3 py-2 leading-tight text-white bg-neutral-800 border border-neutral-700 rounded-r-lg hover:bg-neutral-700 '
          >
            Next
          </button>
        </li>
      </ul>
      <ul className='flex justify-between mb-5 md:hidden'>
        <li>
          <button
            onClick={() =>
              paginate(currentPage === 1 ? currentPage : currentPage - 1)
            }
            className='px-3 py-2 ml-0 leading-tight text-white bg-neutral-800 border border-neutral-700 rounded-lg hover:bg-neutral-700 '
          >
            Previous
          </button>
        </li>
        <li>
          <button
            onClick={() =>
              paginate(
                currentPage === pageNumbers.length
                  ? currentPage
                  : currentPage + 1
              )
            }
            className='px-3 py-2 leading-tight text-white bg-neutral-800 border border-neutral-700 rounded-lg hover:bg-neutral-700 '
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
