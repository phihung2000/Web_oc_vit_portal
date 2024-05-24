import React from "react"
import { AppButtonProps } from "@/components/AppButton"
import { eventBusService } from "@/services"
import { ALERT_DIALOG_FIRE } from "@/utils/constants/eventBusCommon.constants"

export type AlertDialogOptionsButton = {
  show?: boolean
} & AppButtonProps

export interface AlertDialogOptions {
  title?: React.ReactNode | string | null | number
  content?: React.ReactNode | string | null | number
  disabledActions?: boolean
  actions?:
    | {
        payload?: any
        name?: string
        children?: React.ReactNode | string | null | number
        buttonProps?: Omit<AppButtonProps, "children">
      }[]
    | React.ReactNode
    | null
  confirmButtonProps?: AlertDialogOptionsButton
  cancelButtonProps?: AlertDialogOptionsButton
}

export const fire = (
  message?: string | AlertDialogOptions,
  options?: AlertDialogOptions,
): Promise<{
  isConfirmed?: boolean
  name?: string
  payload?: Object
}> => {
  if (typeof message === "string") {
    const { content, ...otherOptions } = options || {}
    return eventBusService.asyncDispatch(ALERT_DIALOG_FIRE, {
      content: message,
      ...otherOptions,
    }) as Promise<{ isConfirmed?: boolean }>
  }
  return eventBusService.asyncDispatch(ALERT_DIALOG_FIRE, message) as Promise<{
    isConfirmed?: boolean
    name?: string
    payload?: Object
  }>
}
