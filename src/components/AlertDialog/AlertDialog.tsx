import { useEffect, useRef, useState } from "react"

import { eventBusService } from "@/services"
import { ALERT_DIALOG_FIRE } from "@/utils/constants/eventBusCommon.constants"
import { AlertDialogOptions } from "@/services/alertDialog"
import { isEmpty } from "@/utils/helpers/common"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material"
import AppButton from "@/components/AppButton"

import { useTranslation } from "next-i18next"
import { useEventCallback } from "@/hooks"

import useStyles from "./AlertDialog.styles"

const defaultConfirmButtonProps: Partial<
  AlertDialogOptions["confirmButtonProps"]
> = {
  show: true,
  children: "Ok",
  color: "primary",
  variant: "contained",
}
const defaultCancelButtonProps: Partial<
  AlertDialogOptions["cancelButtonProps"]
> = {
  show: true,
  children: "Cancel",
  color: "primary",
  variant: "outlined",
}

const AlertDialog = () => {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<AlertDialogOptions>({
    title: "",
    content: "",
    actions: null,
    disabledActions: false,
    confirmButtonProps: {
      ...defaultConfirmButtonProps,
      children: t(defaultConfirmButtonProps.children as unknown as string),
    },
    cancelButtonProps: {
      ...defaultCancelButtonProps,
      children: t(defaultCancelButtonProps.children as unknown as string),
    },
  })

  // const confirmButtonPropsShow = !!options.confirmButtonProps?.show
  // const cancelButtonPropsShow = !!options.cancelButtonProps?.show

  const {
    title,
    content,
    disabledActions,
    actions,
    confirmButtonProps,
    cancelButtonProps,
  } = options

  const { show: confirmButtonPropsShow, ...otherConfirmButtonProps } =
    confirmButtonProps || {}
  const { show: cancelButtonPropsShow, ...otherCancelButtonProps } =
    cancelButtonProps || {}

  const resolveRef = useRef<Function | null>(null)
  const resolve = resolveRef.current

  const handleClose = (params: any) => {
    setOpen(false)
    resolve && resolve(params)
    removePromiseMethod()
  }
  const removePromiseMethod = () => {
    resolveRef.current = null
  }

  const updateOptions = useEventCallback(
    (data: any, resolveFromPromise: any) => {
      resolveRef.current = resolveFromPromise
      setOptions({
        ...options,
        ...data,
        confirmButtonProps: {
          ...defaultConfirmButtonProps,
          children: t(defaultConfirmButtonProps.children as unknown as string),
          ...data?.confirmButtonProps,
        },
        cancelButtonProps: {
          ...defaultCancelButtonProps,
          children: t(defaultCancelButtonProps.children as unknown as string),
          ...data?.cancelButtonProps,
        },
      })
      setOpen(true)
    },
  )

  const { classes, cx } = useStyles()

  useEffect(() => {
    eventBusService.on(ALERT_DIALOG_FIRE, updateOptions)
    return () => {
      eventBusService.remove(ALERT_DIALOG_FIRE, updateOptions)
      removePromiseMethod()
    }
  }, [])

  return (
    <Dialog
      open={open}
      classes={{
        paper: classes.dialogPaper,
      }}
      maxWidth="sm"
      onClose={() => handleClose({ isConfirmed: false })}>
      {!isEmpty(title) && (
        <DialogTitle className={classes.dialogTitle} align="center">
          <Typography fontWeight={700} align="center" component="span">
            {title}
          </Typography>
        </DialogTitle>
      )}
      {!isEmpty(content) && (
        <DialogContent className={classes.dialogContent}>
          <Typography align="center">{content}</Typography>
        </DialogContent>
      )}
      {!disabledActions && (
        <DialogActions className={classes.dialogActions}>
          {Array.isArray(actions) ? (
            actions.map((action, actIndex) => (
              <AppButton
                key={actIndex}
                onClick={() =>
                  handleClose({ payload: action.payload, name: action.name })
                }
                color="primary"
                autoFocus
                {...action.buttonProps}>
                {action.children}
              </AppButton>
            ))
          ) : actions ? (
            actions
          ) : (
            <>
              {cancelButtonPropsShow && (
                <AppButton
                  {...otherCancelButtonProps}
                  className={cx(
                    otherCancelButtonProps?.className &&
                      otherCancelButtonProps.className,
                  )}
                  onClick={() => handleClose({ isConfirmed: false })}
                />
              )}
              {confirmButtonPropsShow && (
                <AppButton
                  {...otherConfirmButtonProps}
                  className={cx(
                    otherConfirmButtonProps?.className &&
                      otherConfirmButtonProps.className,
                  )}
                  onClick={() => handleClose({ isConfirmed: true })}
                />
              )}
            </>
          )}
        </DialogActions>
      )}
    </Dialog>
  )
}

export default AlertDialog
