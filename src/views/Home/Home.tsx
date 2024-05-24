/* eslint-disable @next/next/no-img-element */
import { Box, Grid } from "@mui/material"
import useStyles from "./Home.styles"
import React from "react"
import { observer } from "mobx-react"

type MenuLeftType = {
  childrenChild?: React.ReactNode
}

const Home = (props: MenuLeftType) => {
  const { childrenChild, ...rest } = props
  const { classes, cx } = useStyles()

  return (
    <Grid container className={cx(classes.root)}>
    
    </Grid>
  )
}

export default observer(Home)
