import SingletonRouter, { Router } from "next/router";

import alertDialog from "@/services/alertDialog";

import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { Typography } from "@mui/material";

type OnLeavePageConfirmationProps = {
  shouldConfirmLeave?: boolean;
  message?: string;
};

const useOnLeavePageConfirmation = (props: OnLeavePageConfirmationProps) => {
  const { t } = useTranslation();

  const {
    shouldConfirmLeave = false,
    message = t("Changes you made may not be saved"),
  } = props;

  useEffect(() => {
    if (!(SingletonRouter as any).router?.change) {
      return;
    }

    const originalChangeFunction = (SingletonRouter as any).router.change;
    const originalOnBeforeUnloadFunction = window.onbeforeunload;

    /*
     * Modifying the window.onbeforeunload event stops the browser tab/window from
     * being closed or refreshed. Since it is not possible to alter the close or reload
     * alert message, an empty string is passed to trigger the alert and avoid confusion
     * about the option to modify the message.
     */
    if (shouldConfirmLeave) {
      window.onbeforeunload = () => "";
    } else {
      window.onbeforeunload = originalOnBeforeUnloadFunction;
    }

    /*
     * Overriding the router.change function blocks Next.js route navigations
     * and disables the browser's back and forward buttons. This opens up the
     * possibility to use the window.confirm alert instead.
     */
    if (shouldConfirmLeave) {
      (SingletonRouter as any).router.change = async (...args: any[]) => {
        const [historyMethod, , as] = args;
        const currentUrl = (SingletonRouter as any).router?.state.asPath.split(
          "?"
        )[0];
        const changedUrl = as.split("?")[0];
        const hasNavigatedAwayFromPage = currentUrl !== changedUrl;
        const wasBackOrForwardBrowserButtonClicked =
          historyMethod === "replaceState";
        let confirmed = false;

        if (hasNavigatedAwayFromPage) {
          const { isConfirmed } = await alertDialog.fire({
            title: (
              <Typography variant="inherit" textTransform="capitalize">
                {t("Leave page?")}
              </Typography>
            ),
            content: message,
            confirmButtonProps: {
              color: "blue",
              variant: "contained",
            },
            cancelButtonProps: {
              color: "blue",
              variant: "outlined",
            },
          });

          confirmed = isConfirmed!!;
        }

        if (confirmed) {
          (Router as any).prototype.change.apply(
            (SingletonRouter as any).router,
            args
          );
        } else if (
          wasBackOrForwardBrowserButtonClicked &&
          hasNavigatedAwayFromPage
        ) {
          /*
           * The URL changes even if the user clicks "false" to navigate away from the page.
           * It is necessary to update it to reflect the current URL.
           */
          await (SingletonRouter as any).router?.push(
            (SingletonRouter as any).router?.state.asPath
          );

          /*
           * @todo
           *   I attempted to determine if the user clicked the forward or back button on the browser,
           *   but was unable to find a solution after several hours of effort. As a result, I temporarily
           *   hardcoded it to assume the back button was clicked, since that is the most common scenario.
           *   However, this may cause issues with the URL if the forward button is actually clicked.
           *   I hope that a solution can be found in the future.
           */
          const browserDirection = "back";

          browserDirection === "back"
            ? history.go(1) // back button
            : history.go(-1); // forward button
        }
      };
    }

    /*
     * When the component is unmounted, the original change function is assigned back.
     */
    return () => {
      (SingletonRouter as any).router.change = originalChangeFunction;
      window.onbeforeunload = originalOnBeforeUnloadFunction;
    };
  }, [shouldConfirmLeave, message]);
};

export default useOnLeavePageConfirmation;
