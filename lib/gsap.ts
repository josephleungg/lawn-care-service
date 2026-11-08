"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const EASE_OUT = "expo.out";

export { gsap, ScrollTrigger, SplitText, useGSAP };
