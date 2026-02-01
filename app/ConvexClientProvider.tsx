'use client'

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";
import { LazyMotion, domAnimation } from "framer-motion";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const convex = useMemo(
    () => new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!),
    []
  );

  return (
    <ConvexProvider client={convex}>
      <LazyMotion features={domAnimation}>
        {children}
      </LazyMotion>
    </ConvexProvider>
  );
}
