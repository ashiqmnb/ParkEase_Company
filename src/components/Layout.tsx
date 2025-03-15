import { Box } from "@mui/material"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import { Navigate, Outlet } from "react-router-dom"

const Layout = () => {

  const isAuthenticated = localStorage.getItem("token")

  return (
    <Box
      sx={{
        height:'100vh',
        display:'flex',
      }}
    >
        <Sidebar/>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ 
              height:{xs:'50px', md:'70px'}, 
              width: '100%' 
            }}>
            <Navbar />
          </Box>
          <Box sx={{ flex: 1, overflow: "auto" }}>
            {isAuthenticated ? <Outlet/> : <Navigate to={'auth/login'}/>}
          </Box>
        </Box>
    </Box>
  )
}

export default Layout
