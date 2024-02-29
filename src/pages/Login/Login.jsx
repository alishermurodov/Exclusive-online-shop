import React, { useState } from 'react'
import styles from './login.module.css'

//mui
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from "@mui/material";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleLogin } from '../../store/features/auth/authSlice';

const Login = () => {
    //dispatch 
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //show password toggle
    const [showPassword, setShowPassword] = useState(true);
    //translation
    const { t, i18n } = useTranslation()
    //loading
    const loading = useSelector(state => state.auth.loading)
    //isAuth
    const isAuth = useSelector(state => state.auth.isAuth)
    //data
    const [fillAuth, setFillAuth] = useState({
        email: '',
        password: '',
    })
    //warnings
    const [emailWarning, setEmailWarning] = useState(false)
    const [passwordWarning, setPasswordWarning] = useState(false)


    return (
        <>
            <div className={styles.conatinerMain}>
                <div className={styles.containerInputs}>
                    <div className="">
                        <h1 style={{
                            fontSize: 36,
                            fontWeight: 500,
                        }}>{t("Log in to ")}Exclusive</h1>
                        <p>{t("Enter your details below")}</p>
                    </div>
                    <div className={styles.inputsBlock}>
                        {
                            emailWarning ?
                                <p className={styles.warning}>Please fill your email</p> :
                                null
                        }
                        <TextField
                            sx={{
                                width: "320px",
                                "& .MuiInputBase-input": {
                                    // color: 'white',
                                    bgcolor: '#fafafa',
                                    borderRadius: '4px'
                                },
                            }}
                            id="outlined-basic"
                            label={("Email")}
                            variant="outlined"
                            value={fillAuth.email}
                            onChange={(e) => setFillAuth({ ...fillAuth, email: e.target.value })}
                        />
                        {
                            passwordWarning ?
                                <p className={styles.warning}>Please fill your password</p> :
                                null
                        }
                        <FormControl sx={{ width: "320px" }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">
                                {t("Password")}
                            </InputLabel>
                            <OutlinedInput
                                sx={{
                                    "& .MuiInputBase-input": {
                                        // color: 'white',
                                        bgcolor: '#fafafa',
                                        borderRadius: '4px'
                                    },
                                }}
                                id="outlined-adornment-password"
                                type={showPassword ? "password" : "text"}
                                value={fillAuth.password}
                                onChange={(e) => setFillAuth({ ...fillAuth, password: e.target.value })}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            edge="end"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </div>
                    <div>
                        <Button
                            sx={{ height: "50px", width: "140px" }}
                            color="error"
                            variant="contained"
                            disabled={loading}
                            onClick={() => {
                                dispatch(handleLogin(fillAuth, navigate))
                                fillAuth.password.length == 0 ? setPasswordWarning(true) : setPasswordWarning(false)
                                fillAuth.email.length == 0 ? setEmailWarning(true) : setEmailWarning(false)
                            }}
                        >
                            {t("Log In")}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login