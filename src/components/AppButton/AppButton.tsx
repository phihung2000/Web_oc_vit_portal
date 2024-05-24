declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null
}

import React from "react"

import { ButtonProps, Button } from "@mui/material"

import useStyles from "./AppButton.styles"
import { commonConfig } from "@/utils/config"

export type AppButtonProps = ButtonProps & {
  borderRadius?: "rounded" | "roundedCircle"
  edge?: "start" | "end"
}

const AppButton = (
  props: AppButtonProps & { [x: string]: any },
  ref: React.ForwardedRef<HTMLButtonElement>,
) => {
  const {
    borderRadius = "rounded",
    className,
    edge,
    classes: muiClasses,
    ...rest
  } = props

  const { classes, cx } = useStyles()

  const appButtonClasses = cx({
    [className as string]: !!className,
    [classes.borderRadiusRoundedCircle]: borderRadius === "roundedCircle",
    [classes.borderRadiusRounded]: borderRadius === "rounded",
    [`${classes.edgeStart} ${commonConfig.APP_NAME}-AppButton-edgeStart`]:
      edge === "start",
    [`${classes.edgeEnd} ${commonConfig.APP_NAME}-AppButton-edgeEnd`]:
      edge === "end",
  })

  return (
    <Button
      className={appButtonClasses}
      ref={ref}
      classes={{
        ...muiClasses,
        contained: cx(classes.contained, {
          [muiClasses?.contained as string]: !!muiClasses?.contained,
        }),
        sizeSmall: cx(classes.sizeSmall, {
          [muiClasses?.sizeSmall as string]: !!muiClasses?.sizeSmall,
        }),
        sizeMedium: cx(classes.sizeMedium, {
          [muiClasses?.sizeMedium as string]: !!muiClasses?.sizeMedium,
        }),
        sizeLarge: cx(classes.sizeLarge, {
          [muiClasses?.sizeLarge as string]: !!muiClasses?.sizeLarge,
        }),
        disableElevation: cx(classes.disableElevation, {
          [muiClasses?.disableElevation as string]:
            !!muiClasses?.disableElevation,
        }),
      }}
      {...rest}
    />
  )
}

const AppButtonWithRef = React.forwardRef(AppButton)

export default AppButtonWithRef
