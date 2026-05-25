// src/loader.ts
import { sep } from "path";

// src/transform.ts
import { parse } from "@babel/parser";
import _traverse from "@babel/traverse";
import * as t from "@babel/types";
var traverse = typeof _traverse.default === "function" ? _traverse.default : _traverse;
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
    ast = parse(code, {
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
    if (resource.includes(`${sep}node_modules${sep}`)) {
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
  if (to.startsWith(`${from}${sep}`)) return to.slice(from.length + 1);
  if (to.startsWith(`${from}/`)) return to.slice(from.length + 1);
  return to;
}
function toPosix(p) {
  return p.split(sep).join("/");
}
export {
  pinpointLoader as default
};
//# sourceMappingURL=loader.js.map