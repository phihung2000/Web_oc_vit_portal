/* eslint-disable @next/next/no-img-element */
import { Box, Button, Grid } from "@mui/material"
import useStyles from "./Home.styles"
import React from "react"
import { observer } from "mobx-react"
import HeaderMobile from "../components/HeaderMobile"
import Product from "../components/Product"
import Category from "../components/Category"

type MenuLeftType = {
  childrenChild?: React.ReactNode
}

const Home = (props: MenuLeftType) => {
  const { childrenChild, ...rest } = props
  const { classes, cx } = useStyles()
  const [menuIndex, setMenuIndex] = React.useState(0)
  const [openModal, setOpenModal] = React.useState(false)
  return (
    <Grid container className={cx(classes.root)}>
      <Grid item xs={12} className={classes.header}>
        <HeaderMobile />
      </Grid>
      <Grid item xs={12} className={classes.containerBody}>
        <Grid item xs={3} className={classes.containerLeft}>
          <span className={classes.title}>QUẢN LÝ WEB ỐC VÍT</span>
          <div className={classes.contentLeft}>
            <Button variant="contained" color="primary" className={classes.buttonManager} onClick={() => setMenuIndex(0)}>Quản lý sản phẩm</Button>
            <Button variant="contained" color="primary" className={classes.buttonManager} onClick={() => setMenuIndex(1)}>Quản lý loại sản phẩm</Button>
            <Button variant="contained" color="primary" className={classes.buttonManager} onClick={() => setOpenModal(true)}>Đăng xuất</Button>
          </div>
        </Grid>
        <Grid item xs={9} className={classes.containerRight}>
          {menuIndex === 0 && <Product />}
          {menuIndex === 1 && <Category />}
        </Grid>
      </Grid>
      {openModal && <div className={classes.modal}>
        <div className={classes.containerModal}>
          <span className={classes.titleAsk}>Bạn có muốn đăng xuất</span>
          <div className={classes.contentModal}>
            <Button variant="contained" color="primary" className={classes.buttonCancel} onClick={() => setOpenModal(false)}>Huỷ</Button>
            <Button variant="contained" color="primary" className={classes.buttonSuccess} onClick={() => setOpenModal(false)}>Đổng Ý</Button>
          </div>
        </div>
      </div>}
    </Grid>
  )
}

export default observer(Home)
