'use client';
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Pinpoint: () => Pinpoint
});
module.exports = __toCommonJS(src_exports);

// src/component.tsx
var import_react = require("react");
function Pinpoint() {
  (0, import_react.useEffect)(() => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Pinpoint
});
//# sourceMappingURL=index.cjs.map