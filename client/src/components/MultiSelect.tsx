import React from "react"
import { Category } from "../definitions"

type MultiSelectProps = {
  value: Category[]
  onChange: (selectedOptions: Category[]) => void
  placeholder: string
}
function MultiSelect({ value, onChange, placeholder }: MultiSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleOption = (option: Category) => {
    const isSelected = value.includes(option)
    if (isSelected) onChange(value.filter((item) => item !== option))
    else onChange([...value, option])
  }

  return (
    <div className="relative my-1 text-gray-700 text-[15px]">
      <button
        type="button"
        className="border border-gray-300 rounded-md px-4 py-2 flex items-center justify-between w-full capitalize"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value.length === 0 ? placeholder : value.join(", ")}
        <svg
          className="h-5 w-5 ml-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fillRule="evenodd"
            d="M10 12a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm14 0a6 6 0 11-12 0 6 6 0 0112 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 top-full left-0 mt-1 w-full bg-white rounded-md border border-gray-300 shadow-lg overflow-y-scroll">
          {Object.values(Category).map(
            (option) =>
              option !== Category.All && (
                <div
                  key={option}
                  className={`px-4 py-2 cursor-pointer capitalize hover:bg-highlight hover:text-white  ${
                    value.includes(option) ? "bg-gray-100" : ""
                  }`}
                  onClick={() => toggleOption(option)}
                >
                  {option}
                </div>
              ),
          )}
        </div>
      )}
    </div>
  )
}
export default MultiSelect
