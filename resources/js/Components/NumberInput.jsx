import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function NumberInput(
  {
    id = "",
    type = "number",
    className = "",
    isFocused = false,
    min = 0,
    ...props
  },
  ref
) {
  const input = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <input
      {...props}
      type={type}
      className={
        " relative border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm " +
        className
      }
      ref={input}
      min={min}
      id={id}
    />
  );
});
