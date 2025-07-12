import React from 'react'
import styles from './notFound.module.css'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const NotFound = () => {
  console.log();
  return (
    <>
      <div className={styles.container}>
        <p style={{ fontSize: 14 }}><span style={{ opacity: .4 }}>Home / </span>404 Error</p>
        <div className="">
          <h1 className={styles.notFound}>404 Not Found🛠️</h1>
          <p style={{ textAlign: 'center' }}>Your visited page not found. You may go home page.</p>
        </div>
        <div className={styles.notFoundButton}>
          <Link to={'/'}>
            <Button
              sx={{ height: "46px", width: "190px", fontSize: "12px" }}
              color="error"
              variant="contained"
            >
              Back to home page
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default NotFound