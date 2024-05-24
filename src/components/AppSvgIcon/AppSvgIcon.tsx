declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null
}

import React from "react"

import { Icon, IconProps } from "@mui/material"

import useStyles from "./AppSvgIcon.styles"

export interface AppSvgIconProps extends IconProps {
  strokeColor?: boolean
  component?: React.ElementType
}

const AppSvgIcon = (props: AppSvgIconProps, ref: React.ForwardedRef<any>) => {
  const { strokeColor, className, ...rest } = props

  const { classes, cx } = useStyles()

  const appSvgIconClasses = cx(classes.root, {
    [className as string]: !!className,
    [classes.strokeColor]: !!strokeColor,
  })

  return <Icon ref={ref} className={appSvgIconClasses} {...rest} />
}

const AppSvgIconWithRef = React.forwardRef(AppSvgIcon)

export default AppSvgIconWithRef
