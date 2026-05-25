"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/loader.ts
var loader_exports = {};
__export(loader_exports, {
  default: () => pinpointLoader
});
module.exports = __toCommonJS(loader_exports);
var import_node_path = require("path");

// src/transform.ts
var import_parser = require("@babel/parser");
var import_traverse = __toESM(require("@babel/traverse"), 1);
var t = __toESM(require("@babel/types"), 1);
var traverse = typeof import_traverse.default.default === "function" ? import_traverse.default.default : import_traverse.default;
var ATTR = "data-pp-loc";
function transformJsx(code, opts) {
  if (!/<[A-Za-z]/.test(code)) return null;
  const plugins = [
    "jsx",
    "decorators-legacy",
    "classProperties"
  ];
  if (opts.ts) plugins.unshift("typescript");
  let ast;
  try {
    ast = (0, import_parser.parse)(code, {
      sourceType: "module",
      // biome-ignore lint/suspicious/noExplicitAny: babel plugin tuple typing
      plugins,
      tokens: false,
      errorRecovery: true
    });
  } catch {
    return null;
  }
  let mutated = false;
  traverse(ast, {
    JSXOpeningElement(path) {
      const node = path.node;
      const name = node.name;
      if (t.isJSXMemberExpression(name)) {
      } else if (t.isJSXIdentifier(name)) {
        if (name.name === "Fragment") return;
      } else if (t.isJSXNamespacedName(name)) {
        return;
      }
      const has = node.attributes.some(
        (a) => t.isJSXAttribute(a) && t.isJSXIdentifier(a.name) && a.name.name === ATTR
      );
      if (has) return;
      const loc = node.loc?.start;
      if (!loc) return;
      const value = `${opts.relPath}:${loc.line}:${loc.column + 1}`;
      const attr = t.jsxAttribute(t.jsxIdentifier(ATTR), t.stringLiteral(value));
      node.attributes.push(attr);
      mutated = true;
    }
  });
  if (!mutated) return null;
  return spliceAttributes(code, ast, opts.relPath);
}
function spliceAttributes(code, ast, relPath) {
  const points = [];
  traverse(ast, {
    JSXOpeningElement(path) {
      const node = path.node;
      const loc = node.loc?.start;
      if (!loc) return;
      const added = node.attributes.find(
        (a) => t.isJSXAttribute(a) && t.isJSXIdentifier(a.name) && a.name.name === ATTR && t.isStringLiteral(a.value) && a.value.value === `${relPath}:${loc.line}:${loc.column + 1}`
      );
      if (!added) return;
      const name = node.name;
      const nameEnd = name.end;
      if (typeof nameEnd !== "number") return;
      const value = `${relPath}:${loc.line}:${loc.column + 1}`;
      points.push({ pos: nameEnd, insertion: ` ${ATTR}="${escapeAttr(value)}"` });
    }
  });
  if (points.length === 0) return code;
  points.sort((a, b) => b.pos - a.pos);
  let out = code;
  for (const p of points) {
    out = out.slice(0, p.pos) + p.insertion + out.slice(p.pos);
  }
  return out;
}
function escapeAttr(s) {
  return s.replace(/"/g, "&quot;");
}

// src/loader.ts
function pinpointLoader(source) {
  const cb = this.async();
  try {
    const resource = this.resourcePath;
    if (!/\.(t|j)sx$/.test(resource)) {
      cb(null, source);
      return;
    }
    if (resource.includes(`${import_node_path.sep}node_modules${import_node_path.sep}`)) {
      cb(null, source);
      return;
    }
    const rel = toPosix(relativeFrom(this.rootContext, resource));
    const ts = /\.tsx$/.test(resource);
    const transformed = transformJsx(source, { relPath: rel, ts });
    cb(null, transformed ?? source);
  } catch (e) {
    cb(e instanceof Error ? e : new Error(String(e)));
  }
}
function relativeFrom(from, to) {
  if (to.startsWith(`${from}${import_node_path.sep}`)) return to.slice(from.length + 1);
  if (to.startsWith(`${from}/`)) return to.slice(from.length + 1);
  return to;
}
function toPosix(p) {
  return p.split(import_node_path.sep).join("/");
}
//# sourceMappingURL=loader.cjs.map