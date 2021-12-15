interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ name: string; value: string }>;
  title: string;
}

export const Select = (args: IProps) => {
  const { title, options, ...props } = args;
  return (
    <select
      className='select select-bordered w-full max-w-xs bg-neutral text-white'
      {...props}
    >
      <option disabled={true} defaultValue={title}>
        {title}
      </option>
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
