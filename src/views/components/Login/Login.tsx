import React, { use, useEffect } from "react";
import useStyles from "./Login.styles";
import { Button, ButtonGroup, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as Yup from 'yup';
import axios from "axios";
import Cookies from 'js-cookie';
import router from "next/router";
import { hashPassword, setAuthToken, verifyPassword } from "@/utils/hashPassword";
import { gotoPage } from "@/utils/helpers/common";

const validationSchema = Yup.object({
    useName: Yup.string().required('必填項目'),
    passWord: Yup.string().required('必填項目'),
});
const Login = () => {
    const { classes } = useStyles();
    const initValue = {
        useName: '',
        passWord: ''
    };
    const [showPassword, setShowPassword] = React.useState(false);
    const [buttonActive, setButtonActive] = React.useState<boolean>(false);
    const [isLoginError, setIsLoginError] = React.useState<string>('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const formik = useFormik({
        initialValues: initValue,
        validationSchema: validationSchema,
        onSubmit: async(values) => {
            console.log(values)
            try {
            const isPasswordCorrect = await verifyPassword(values.passWord, values.useName);
                if(isPasswordCorrect) {
                    setAuthToken();
                    gotoPage('/');
                }
                else {
                    setIsLoginError('sai tài khoản hoặc mật khẩu');
                }
              } catch (error) {
                console.error(error);
              }
        }
    });
    const handleSubmit = () => {
        formik.handleSubmit();
        console.log(formik.errors);
    }

    useEffect(() => {
        if (formik.values.useName && formik.values.passWord) {
            setButtonActive(true)
        } else {
            setButtonActive(false)
        }
    }, [formik.values.useName, formik.values.passWord])

    return (
        <div className={classes.root}>
            <span className={classes.title}>Chào mừng trở lại!</span>
            <div className={classes.contentInput}>
                <FormControl sx={{ m: 1, width: '25%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-userName" >Xin vui lòng điền số điện thoại của bạn</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-userName"
                        type='numeric'
                        name="useName"
                        value={formik.values.useName}
                        onChange={formik.handleChange}
                        startAdornment={
                            <InputAdornment position="start">
                                <span className={classes.codeCountry}>+84</span>
                            </InputAdornment>
                        }
                        label="Xin vui lòng điền số điện thoại của bạn"
                        fullWidth
                    />
                    {formik.errors.useName && formik.touched.useName && 
                        <span className={classes.error}>{String(formik.errors.useName)}</span>
                    }
                </FormControl>
                <FormControl sx={{ m: 1, width: '25%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password" >Vui lòng nhập mật khẩu của bạn</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        name="passWord"
                        value={formik.values.passWord}
                        onChange={formik.handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Vui lòng nhập mật khẩu của bạn"
                        fullWidth
                    />
                    {formik.errors.passWord && formik.touched.passWord && 
                        <span className={classes.error}>{String(formik.errors.passWord)}</span>
                    }
                    {isLoginError && <span className={classes.error}>{isLoginError}</span>}
                </FormControl>
            </div>
            <div className={classes.contentButtonLogin}>
                <Button variant="contained" onClick={() => handleSubmit()} className={buttonActive ? classes.buttonLoginActivities :classes.buttonLogin}>
                    Đăng nhập
                </Button>
            </div>
        </div>
    )
};
export default Login;