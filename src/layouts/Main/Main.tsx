import { useEffect, useState } from "react"

import useStyles from "./Main.styles"
import Home from "@/views/Home"

type MainProps = {
  children: React.ReactNode
}

const Main = (props: MainProps) => {
  const { children } = props

  const { classes } = useStyles()

  return (
    <div className={classes.root}>
      <Home childrenChild={children}/>
    </div>
  )
}

export default Main
