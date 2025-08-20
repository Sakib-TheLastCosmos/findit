"use client";

import Lottie from "lottie-react";
import loadingAnimation from "../../components/animations/loading.json";

export default function Loader() {
  return <Lottie animationData={loadingAnimation} loop={true} />;
}
