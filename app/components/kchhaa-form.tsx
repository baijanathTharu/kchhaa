export const KchhaaForm = () => {
  return (
    <section className='mx-4 py-4 bg-primary text-primary-content rounded-md shadow-md'>
      <div className='w-full mt-2'>
        <textarea
          className='textarea textarea-primary text-primary-content opacity-90 bg-primary w-full h-40 resize-none'
          placeholder='kchhaa...'
        ></textarea>

        <div className='mt-4'>
          <button className='w-36 px-4 py-2 btn btn-neutral animate-pulse'>
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};
