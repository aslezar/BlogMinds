import React from "react"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import MyBlogs from "../components/MyBlogs"
import MyAssets from "../components/MyAssets"
import MyProfile from "../components/MyProfile"
import { useSearchParams } from "react-router-dom"

type CustomTabPanelType = {
  children: React.ReactNode
  index: number
  value: number
}

const CustomTabPanel: React.FC<CustomTabPanelType> = ({
  children,
  value,
  index,
  ...other
}) => {
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}
const tabMap = [
  {
    label: "Profile",
    value: "profile",
    component: <MyProfile />,
  },
  {
    label: "Assets",
    value: "assets",
    component: <MyAssets />,
  },
  {
    label: "Blogs",
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
      <Box sx={{ borderBottom: 1, borderColor: "divider" }} className="mx-16">
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="basic tabs example"
        >
          {tabMap.map((tab, index) => (
            <Tab
              label={tab.label}
              {...a11yProps(index)}
              className="hover:text-highlight !text-xs"
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
