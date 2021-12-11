export const Posts = () => {
  return (
    <>
      {Array.from(Array(10).keys()).map((e, i) => {
        return (
          <div
            key={i}
            className='mx-auto overflow-hidden bg-white rounded-lg shadow-lg'
          >
            <div className='p-6'>
              <div>
                <div className='mt-4'>
                  <div className='flex items-center'>
                    <div className='flex items-center'>
                      <img
                        className='object-cover h-10 rounded-full'
                        src='https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60'
                        alt='Avatar'
                      />
                      <a href='#' className='mx-2 font-semibold text-gray-700'>
                        Jone Doe
                      </a>
                    </div>
                    <span className='mx-1 text-xs text-gray-600'>
                      21 SEP 2015
                    </span>
                  </div>
                </div>

                <span className='text-xs font-medium text-blue-600 uppercase'>
                  Education
                </span>
                <a
                  href='#'
                  className='block mt-2 text-2xl font-semibold text-gray-800  hover:text-gray-600 hover:underline'
                >
                  I Built A Successful Blog In One Year
                </a>
                <p className='mt-2 text-sm text-gray-600'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Molestie parturient et sem ipsum volutpat vel. Natoque sem et
                  aliquam mauris egestas quam volutpat viverra. In pretium nec
                  senectus erat. Et malesuada lobortis.
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
