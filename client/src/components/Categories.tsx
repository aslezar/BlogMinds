import React from "react"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { Category } from "../definitions"
import { useSearchParams } from "react-router-dom"

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get("category") || "all"
  const handleChange = (_event: React.SyntheticEvent, newValue: Category) => {
    setSearchParams({ category: newValue })
  }
  return (
    <Tabs
      TabIndicatorProps={{
        style: { display: "none" },
      }}
      value={category}
      onChange={handleChange}
      indicatorColor="secondary"
      textColor="secondary"
      variant="scrollable"
      scrollButtons="auto"
      className="w-[90%] bg-white"
    >
      {Object.values(Category).map((category) => (
        <Tab
          // label={category}
          value={category}
          label={category === "all" ? "For You" : category}
          key={category}
          disableRipple
          className="!text-[0.9rem] !capitalize"
          // scroll to top onClick
          onClick={() => {
            setTimeout(() => {
              window.scrollTo({ top: 0 })
            }, 500)
          }}
        />
      ))}
    </Tabs>
  )
}

export default Categories
