import React from "react"
// import InputBase from "@mui/material/InputBase"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { Category } from "../definitions"
import { useSearchParams } from "react-router-dom"

// const ariaLabel = { "aria-label": "search blogs by topic" }
const categories = Object.values(Category)

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get("category")?.toLowerCase() || Category.All
  const handleChange = (_event: React.SyntheticEvent, newValue: Category) => {
    setSearchParams({ category: newValue.toString().toLowerCase() })
  }

  // const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchParams({ category: event.target.value })
  // }

  return (
    <div className="sticky top-16 md:top-[4.7rem] bg-white">
      <Tabs
        value={category}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
        variant="scrollable"
        scrollButtons="auto"
        className="bg-white"
      >
        {categories.map((category) => (
          <Tab
            // label={category}
            value={category}
            label={category === Category.All ? "For You" : category}
            key={category}
            disableRipple
            className="!text-xs md:!text-[0.9rem] !capitalize"
            onClick={() => {
              setTimeout(() => {
                window.scrollTo({ top: 0 })
              }, 500)
            }}
          />
        ))}
      </Tabs>
      {/* <InputBase
        placeholder="Search by topic"
        inputProps={ariaLabel}
        value={categories.some((cat) => cat === category) ? "" : category}
        onChange={handleSearch}
        onEnded={() => setSearchParams({ category: "" })}
        type="text"
        className="text-xs md:text-[0.9rem]"
      /> */}
    </div>
  )
}

export default Categories
