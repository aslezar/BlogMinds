import React from "react"
import PropTypes from "prop-types"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import MyBlogs from "../components/MyBlogs"
import MyAssets from "../components/MyAssets"
import MyProfile from "../components/MyProfile"
import { useSearchParams } from "react-router-dom"


function CustomTabPanel(props: any) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}
const tabMap = [
  {
    label: "My profile",
    value: "profile",
    component: <MyProfile />,
  },
  {
    label: "My Assets",
    value: "assets",
    component: <MyAssets />,
  },
  {
    label: "My blogs",
    value: "blogs",
    component: <MyBlogs />,
  },
]
const ProfilePage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const tabValue = searchParams.get("tab") || tabMap[0].value
  const value = tabMap.findIndex((tab) => tab.value === tabValue)

  const handleChange = (_event: any, newValue: any) => {
    setSearchParams({ tab: tabMap[newValue].value })
  }

  React.useEffect(() => {
    if (!searchParams.get("tab")) setSearchParams({ tab: tabMap[0].value })
  }, [])

  return (
    <Box className="w-11/12 mx-auto">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          aria-label="basic tabs example"
          centered
          TabIndicatorProps={{
            style: {
              background: "#9674d4",
            },
          }}
        >
          {tabMap.map((tab, index) => (
            <Tab
              label={tab.label}
              {...a11yProps(index)}
              className="hover:text-highlight"
              key={index}
            />
          ))}
        </Tabs>
      </Box>
      {tabMap.map((tab, index) => (
        <CustomTabPanel value={value} index={index} key={index}>
          {tab.component}
        </CustomTabPanel>
      ))}
    </Box>
  )
}

export default ProfilePage
