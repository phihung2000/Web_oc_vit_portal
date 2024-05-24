declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null
}

import React from "react"

import NextLink from "next/link"

import { Link } from "@mui/material"

import type { LinkProps } from "@mui/material"

export interface AppLinkProps extends LinkProps {
  component?: React.ElementType<any>
}

const AppLink = (props: AppLinkProps, ref: React.ForwardedRef<any>) => {
  const { component: controlledComponent, ...rest } = props

  return (
    <Link
      ref={ref}
      component={NextLink}
      underline="none"
      color="initial"
      href=""
      {...rest}
    />
  )
}

const AppLinkWithRef = React.forwardRef(AppLink)

export default AppLinkWithRef
