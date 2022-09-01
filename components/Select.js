export default function Select({ label, id, name, className, defaultValue, onChange, children, ...rest }) {
  return (
    <div className="mb-4">
      {label &&
        <label htmlFor={name} className="block font-medium text-sm text-neutral-800 dark:text-gray-200">
          {label}
        </label>
      }
      <select
        {...rest}
        id={id}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        className={`
          ${className ? className + " " : ""}
          cursor-pointer mt-2 block w-full px-2.5 py-[0.6rem] text-sm rounded-md transition-all
          dark:text-white bg-white dark:bg-neutral-900  
          border border-gray-300 dark:border-neutral-700 
          focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 outline-none
        `}
      >
        {children}
      </select>
    </div>
  )
}

Select.option = ({ value, children, ...rest }) => {
  return (
    <option value={value} {...rest}>
      {children}
    </option>
  )
}