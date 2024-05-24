import React from "react"
import useStyles from "./HeaderMobile.styles"
import AppSvgIcon from "@/components/AppSvgIcon"
import { ReactComponent as Logo } from "@/assets/icons/logo.svg"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const HeaderMobile = () => {
    const {classes} = useStyles()
    return (
        <div className={classes.root}>
            <AppSvgIcon component={Logo} className={classes.img}/>
            <div className={classes.contentUser}>
                <span className={classes.name}>admin</span>
                <AccountCircleIcon />
            </div>
        </div>
    )
}
export default HeaderMobile;