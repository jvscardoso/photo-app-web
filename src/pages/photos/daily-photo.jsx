import React from 'react'
import {Button} from "@mui/material";
import {RouterLink} from "../../components/router-link/index.js";

const DailyPhotoPage = () => {
  return (
    <>
      <p> Daily photo </p>
      <Button component={RouterLink} href="/auth/login">
        Login
      </Button>
    </>
  )
}
export default DailyPhotoPage