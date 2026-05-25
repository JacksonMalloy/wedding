'use client';

// src/component.tsx
import { useEffect } from "react";
function Pinpoint() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    if (typeof document === "undefined") return;
    if (document.getElementById("__pinpoint-script")) return;
    const s = document.createElement("script");
    s.id = "__pinpoint-script";
    s.src = "/__pinpoint/widget.js";
    s.defer = true;
    document.head.appendChild(s);
  }, []);
  return null;
}
export {
  Pinpoint
};
//# sourceMappingURL=index.js.map