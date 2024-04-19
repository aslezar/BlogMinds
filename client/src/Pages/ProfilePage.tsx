import * as React from "react"
import PropTypes from "prop-types"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import MyBlogs from "../components/MyBlogs"
import MyAssets from "../components/MyAssets"
import MyProfile from "../components/MyProfile"

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
const ProfilePage = () => {
  const [value, setValue] = React.useState(0)
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue)
    console.log(event)
  }

  return (
    <Box className="w-11/12 mx-auto">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{
            style: {
              background: "#9674d4",
            },
          }}
        >
          <Tab
            label="My profile"
            {...a11yProps(0)}
            className="hover:text-highlight"
          />
          <Tab
            label="assets"
            {...a11yProps(1)}
            className="hover:text-highlight"
          />
          <Tab
            label="Your blogs"
            {...a11yProps(2)}
            className="hover:text-highlight"
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <MyProfile />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MyAssets />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <MyBlogs />
      </CustomTabPanel>
    </Box>
  )
}

export default ProfilePage
