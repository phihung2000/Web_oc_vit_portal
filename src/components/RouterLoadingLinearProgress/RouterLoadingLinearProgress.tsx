import { useEffect, useState } from "react";

import { LinearProgress } from "@mui/material";

import { useRouter } from "next/router";

import useStyles from "./RouterLoadingLinearProgress.styles";
import { useEventCallback } from "@/hooks";

const RouterLoadingLinearProgress = () => {
  const [progress, setProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);

  const { classes } = useStyles();

  const router = useRouter();

  const handleRouteChangeStart = useEventCallback(() => {
    setProgress(0);
    setShowProgressBar(true);
  });

  const handleRouteChangeComplete = useEventCallback(() => {
    setProgress(100);
  });

  useEffect(() => {
    if (progress === 100) {
      const timer = setInterval(() => {
        setShowProgressBar(false);
      }, 500);
      return () => {
        clearInterval(timer);
      };
    }
  }, [progress]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) return oldProgress;
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 99);
      });
    }, 500);

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      clearInterval(timer);
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  if (!showProgressBar) return null;

  return (
    <LinearProgress
      className={classes.root}
      variant="determinate"
      value={progress}
    />
  );
};

export default RouterLoadingLinearProgress;
