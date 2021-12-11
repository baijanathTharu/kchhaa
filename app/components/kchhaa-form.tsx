export const KchhaaForm = () => {
  return (
    <section className='mx-4 py-4 bg-white rounded-md shadow-md'>
      <div className='w-full mt-2'>
        <textarea className='block w-full h-40 px-4 py-2 resize-none text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring'></textarea>

        <div className='mt-4'>
          <button className='w-36 px-4 py-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'>
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};
