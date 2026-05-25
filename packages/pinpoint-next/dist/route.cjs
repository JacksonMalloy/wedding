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

// src/route.ts
var route_exports = {};
__export(route_exports, {
  GET: () => GET,
  PATCH: () => PATCH,
  POST: () => POST,
  dynamic: () => dynamic,
  runtime: () => runtime
});
module.exports = __toCommonJS(route_exports);
var import_node_buffer2 = require("buffer");
var import_nanoid = require("nanoid");

// src/__generated__/widget.ts
var WIDGET_SOURCE = '"use strict";var PinpointWidget=(()=>{function oe(e,t){if(e.match(/^[a-z]+:\\/\\//i))return e;if(e.match(/^\\/\\//))return window.location.protocol+e;if(e.match(/^[a-z]+:/i))return e;let r=document.implementation.createHTMLDocument(),n=r.createElement("base"),o=r.createElement("a");return r.head.appendChild(n),r.body.appendChild(o),t&&(n.href=t),o.href=e,o.href}var ie=(()=>{let e=0,t=()=>`0000${(Math.random()*36**4<<0).toString(36)}`.slice(-4);return()=>(e+=1,`u${t()}${e}`)})();function w(e){let t=[];for(let r=0,n=e.length;r<n;r++)t.push(e[r]);return t}var C=null;function U(e={}){return C||(e.includeStyleProperties?(C=e.includeStyleProperties,C):(C=w(window.getComputedStyle(document.documentElement)),C))}function _(e,t){let n=(e.ownerDocument.defaultView||window).getComputedStyle(e).getPropertyValue(t);return n?parseFloat(n.replace("px","")):0}function Ue(e){let t=_(e,"border-left-width"),r=_(e,"border-right-width");return e.clientWidth+t+r}function Be(e){let t=_(e,"border-top-width"),r=_(e,"border-bottom-width");return e.clientHeight+t+r}function W(e,t={}){let r=t.width||Ue(e),n=t.height||Be(e);return{width:r,height:n}}function ae(){let e,t;try{t=process}catch{}let r=t&&t.env?t.env.devicePixelRatio:null;return r&&(e=parseInt(r,10),Number.isNaN(e)&&(e=1)),e||window.devicePixelRatio||1}var y=16384;function se(e){(e.width>y||e.height>y)&&(e.width>y&&e.height>y?e.width>e.height?(e.height*=y/e.width,e.width=y):(e.width*=y/e.height,e.height=y):e.width>y?(e.height*=y/e.width,e.width=y):(e.width*=y/e.height,e.height=y))}function ce(e,t={}){return e.toBlob?new Promise(r=>{e.toBlob(r,t.type?t.type:"image/png",t.quality?t.quality:1)}):new Promise(r=>{let n=window.atob(e.toDataURL(t.type?t.type:void 0,t.quality?t.quality:void 0).split(",")[1]),o=n.length,i=new Uint8Array(o);for(let a=0;a<o;a+=1)i[a]=n.charCodeAt(a);r(new Blob([i],{type:t.type?t.type:"image/png"}))})}function T(e){return new Promise((t,r)=>{let n=new Image;n.onload=()=>{n.decode().then(()=>{requestAnimationFrame(()=>t(n))})},n.onerror=r,n.crossOrigin="anonymous",n.decoding="async",n.src=e})}async function Oe(e){return Promise.resolve().then(()=>new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then(t=>`data:image/svg+xml;charset=utf-8,${t}`)}async function le(e,t,r){let n="http://www.w3.org/2000/svg",o=document.createElementNS(n,"svg"),i=document.createElementNS(n,"foreignObject");return o.setAttribute("width",`${t}`),o.setAttribute("height",`${r}`),o.setAttribute("viewBox",`0 0 ${t} ${r}`),i.setAttribute("width","100%"),i.setAttribute("height","100%"),i.setAttribute("x","0"),i.setAttribute("y","0"),i.setAttribute("externalResourcesRequired","true"),o.appendChild(i),i.appendChild(e),Oe(o)}var p=(e,t)=>{if(e instanceof t)return!0;let r=Object.getPrototypeOf(e);return r===null?!1:r.constructor.name===t.name||p(r,t)};function ze(e){let t=e.getPropertyValue("content");return`${e.cssText} content: \'${t.replace(/\'|"/g,"")}\';`}function Ve(e,t){return U(t).map(r=>{let n=e.getPropertyValue(r),o=e.getPropertyPriority(r);return`${r}: ${n}${o?" !important":""};`}).join(" ")}function je(e,t,r,n){let o=`.${e}:${t}`,i=r.cssText?ze(r):Ve(r,n);return document.createTextNode(`${o}{${i}}`)}function ue(e,t,r,n){let o=window.getComputedStyle(e,r),i=o.getPropertyValue("content");if(i===""||i==="none")return;let a=ie();try{t.className=`${t.className} ${a}`}catch{return}let s=document.createElement("style");s.appendChild(je(a,r,o,n)),t.appendChild(s)}function de(e,t,r){ue(e,t,":before",r),ue(e,t,":after",r)}var fe="application/font-woff",pe="image/jpeg",We={woff:fe,woff2:fe,ttf:"application/font-truetype",eot:"application/vnd.ms-fontobject",png:"image/png",jpg:pe,jpeg:pe,gif:"image/gif",tiff:"image/tiff",svg:"image/svg+xml",webp:"image/webp"};function qe(e){let t=/\\.([^./]*?)$/g.exec(e);return t?t[1]:""}function A(e){let t=qe(e).toLowerCase();return We[t]||""}function Ge(e){return e.split(/,/)[1]}function I(e){return e.search(/^(data:)/)!==-1}function G(e,t){return`data:${t};base64,${e}`}async function K(e,t,r){let n=await fetch(e,t);if(n.status===404)throw new Error(`Resource "${n.url}" not found`);let o=await n.blob();return new Promise((i,a)=>{let s=new FileReader;s.onerror=a,s.onloadend=()=>{try{i(r({res:n,result:s.result}))}catch(l){a(l)}},s.readAsDataURL(o)})}var q={};function Ke(e,t,r){let n=e.replace(/\\?.*/,"");return r&&(n=e),/ttf|otf|eot|woff2?/i.test(n)&&(n=n.replace(/.*\\//,"")),t?`[${t}]${n}`:n}async function L(e,t,r){let n=Ke(e,t,r.includeQueryParams);if(q[n]!=null)return q[n];r.cacheBust&&(e+=(/\\?/.test(e)?"&":"?")+new Date().getTime());let o;try{let i=await K(e,r.fetchRequestInit,({res:a,result:s})=>(t||(t=a.headers.get("Content-Type")||""),Ge(s)));o=G(i,t)}catch(i){o=r.imagePlaceholder||"";let a=`Failed to fetch resource: ${e}`;i&&(a=typeof i=="string"?i:i.message),a&&console.warn(a)}return q[n]=o,o}async function Xe(e){let t=e.toDataURL();return t==="data:,"?e.cloneNode(!1):T(t)}async function Ye(e,t){if(e.currentSrc){let i=document.createElement("canvas"),a=i.getContext("2d");i.width=e.clientWidth,i.height=e.clientHeight,a?.drawImage(e,0,0,i.width,i.height);let s=i.toDataURL();return T(s)}let r=e.poster,n=A(r),o=await L(r,n,t);return T(o)}async function Je(e,t){var r;try{if(!((r=e?.contentDocument)===null||r===void 0)&&r.body)return await M(e.contentDocument.body,t,!0)}catch{}return e.cloneNode(!1)}async function Ne(e,t){return p(e,HTMLCanvasElement)?Xe(e):p(e,HTMLVideoElement)?Ye(e,t):p(e,HTMLIFrameElement)?Je(e,t):e.cloneNode(me(e))}var Qe=e=>e.tagName!=null&&e.tagName.toUpperCase()==="SLOT",me=e=>e.tagName!=null&&e.tagName.toUpperCase()==="SVG";async function Ze(e,t,r){var n,o;if(me(t))return t;let i=[];return Qe(e)&&e.assignedNodes?i=w(e.assignedNodes()):p(e,HTMLIFrameElement)&&(!((n=e.contentDocument)===null||n===void 0)&&n.body)?i=w(e.contentDocument.body.childNodes):i=w(((o=e.shadowRoot)!==null&&o!==void 0?o:e).childNodes),i.length===0||p(e,HTMLVideoElement)||await i.reduce((a,s)=>a.then(()=>M(s,r)).then(l=>{l&&t.appendChild(l)}),Promise.resolve()),t}function et(e,t,r){let n=t.style;if(!n)return;let o=window.getComputedStyle(e);o.cssText?(n.cssText=o.cssText,n.transformOrigin=o.transformOrigin):U(r).forEach(i=>{let a=o.getPropertyValue(i);i==="font-size"&&a.endsWith("px")&&(a=`${Math.floor(parseFloat(a.substring(0,a.length-2)))-.1}px`),p(e,HTMLIFrameElement)&&i==="display"&&a==="inline"&&(a="block"),i==="d"&&t.getAttribute("d")&&(a=`path(${t.getAttribute("d")})`),n.setProperty(i,a,o.getPropertyPriority(i))})}function tt(e,t){p(e,HTMLTextAreaElement)&&(t.innerHTML=e.value),p(e,HTMLInputElement)&&t.setAttribute("value",e.value)}function nt(e,t){if(p(e,HTMLSelectElement)){let n=Array.from(t.children).find(o=>e.value===o.getAttribute("value"));n&&n.setAttribute("selected","")}}function rt(e,t,r){return p(t,Element)&&(et(e,t,r),de(e,t,r),tt(e,t),nt(e,t)),t}async function ot(e,t){let r=e.querySelectorAll?e.querySelectorAll("use"):[];if(r.length===0)return e;let n={};for(let i=0;i<r.length;i++){let s=r[i].getAttribute("xlink:href");if(s){let l=e.querySelector(s),g=document.querySelector(s);!l&&g&&!n[s]&&(n[s]=await M(g,t,!0))}}let o=Object.values(n);if(o.length){let i="http://www.w3.org/1999/xhtml",a=document.createElementNS(i,"svg");a.setAttribute("xmlns",i),a.style.position="absolute",a.style.width="0",a.style.height="0",a.style.overflow="hidden",a.style.display="none";let s=document.createElementNS(i,"defs");a.appendChild(s);for(let l=0;l<o.length;l++)s.appendChild(o[l]);e.appendChild(a)}return e}async function M(e,t,r){return!r&&t.filter&&!t.filter(e)?null:Promise.resolve(e).then(n=>Ne(n,t)).then(n=>Ze(e,n,t)).then(n=>rt(e,n,t)).then(n=>ot(n,t))}var ge=/url\\(([\'"]?)([^\'"]+?)\\1\\)/g,it=/url\\([^)]+\\)\\s*format\\((["\']?)([^"\']+)\\1\\)/g,at=/src:\\s*(?:url\\([^)]+\\)\\s*format\\([^)]+\\)[,;]\\s*)+/g;function st(e){let t=e.replace(/([.*+?^${}()|\\[\\]\\/\\\\])/g,"\\\\$1");return new RegExp(`(url\\\\([\'"]?)(${t})([\'"]?\\\\))`,"g")}function ct(e){let t=[];return e.replace(ge,(r,n,o)=>(t.push(o),r)),t.filter(r=>!I(r))}async function lt(e,t,r,n,o){try{let i=r?oe(t,r):t,a=A(t),s;if(o){let l=await o(i);s=G(l,a)}else s=await L(i,a,n);return e.replace(st(t),`$1${s}$3`)}catch{}return e}function ut(e,{preferredFontFormat:t}){return t?e.replace(at,r=>{for(;;){let[n,,o]=it.exec(r)||[];if(!o)return"";if(o===t)return`src: ${n};`}}):e}function X(e){return e.search(ge)!==-1}async function B(e,t,r){if(!X(e))return e;let n=ut(e,r);return ct(n).reduce((i,a)=>i.then(s=>lt(s,a,t,r)),Promise.resolve(n))}async function R(e,t,r){var n;let o=(n=t.style)===null||n===void 0?void 0:n.getPropertyValue(e);if(o){let i=await B(o,null,r);return t.style.setProperty(e,i,t.style.getPropertyPriority(e)),!0}return!1}async function dt(e,t){await R("background",e,t)||await R("background-image",e,t),await R("mask",e,t)||await R("-webkit-mask",e,t)||await R("mask-image",e,t)||await R("-webkit-mask-image",e,t)}async function ft(e,t){let r=p(e,HTMLImageElement);if(!(r&&!I(e.src))&&!(p(e,SVGImageElement)&&!I(e.href.baseVal)))return;let n=r?e.src:e.href.baseVal,o=await L(n,A(n),t);await new Promise((i,a)=>{e.onload=i,e.onerror=t.onImageErrorHandler?(...l)=>{try{i(t.onImageErrorHandler(...l))}catch(g){a(g)}}:a;let s=e;s.decode&&(s.decode=i),s.loading==="lazy"&&(s.loading="eager"),r?(e.srcset="",e.src=o):e.href.baseVal=o})}async function pt(e,t){let n=w(e.childNodes).map(o=>Y(o,t));await Promise.all(n).then(()=>e)}async function Y(e,t){p(e,Element)&&(await dt(e,t),await ft(e,t),await pt(e,t))}function he(e,t){let{style:r}=e;t.backgroundColor&&(r.backgroundColor=t.backgroundColor),t.width&&(r.width=`${t.width}px`),t.height&&(r.height=`${t.height}px`);let n=t.style;return n!=null&&Object.keys(n).forEach(o=>{r[o]=n[o]}),e}var be={};async function ye(e){let t=be[e];if(t!=null)return t;let n=await(await fetch(e)).text();return t={url:e,cssText:n},be[e]=t,t}async function we(e,t){let r=e.cssText,n=/url\\(["\']?([^"\')]+)["\']?\\)/g,i=(r.match(/url\\([^)]+\\)/g)||[]).map(async a=>{let s=a.replace(n,"$1");return s.startsWith("https://")||(s=new URL(s,e.url).href),K(s,t.fetchRequestInit,({result:l})=>(r=r.replace(a,`url(${l})`),[a,l]))});return Promise.all(i).then(()=>r)}function xe(e){if(e==null)return[];let t=[],r=/(\\/\\*[\\s\\S]*?\\*\\/)/gi,n=e.replace(r,""),o=new RegExp("((@.*?keyframes [\\\\s\\\\S]*?){([\\\\s\\\\S]*?}\\\\s*?)})","gi");for(;;){let l=o.exec(n);if(l===null)break;t.push(l[0])}n=n.replace(o,"");let i=/@import[\\s\\S]*?url\\([^)]*\\)[\\s\\S]*?;/gi,a="((\\\\s*?(?:\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\/)?\\\\s*?@media[\\\\s\\\\S]*?){([\\\\s\\\\S]*?)}\\\\s*?})|(([\\\\s\\\\S]*?){([\\\\s\\\\S]*?)})",s=new RegExp(a,"gi");for(;;){let l=i.exec(n);if(l===null){if(l=s.exec(n),l===null)break;i.lastIndex=s.lastIndex}else s.lastIndex=i.lastIndex;t.push(l[0])}return t}async function mt(e,t){let r=[],n=[];return e.forEach(o=>{if("cssRules"in o)try{w(o.cssRules||[]).forEach((i,a)=>{if(i.type===CSSRule.IMPORT_RULE){let s=a+1,l=i.href,g=ye(l).then(m=>we(m,t)).then(m=>xe(m).forEach(E=>{try{o.insertRule(E,E.startsWith("@import")?s+=1:o.cssRules.length)}catch(F){console.error("Error inserting rule from remote css",{rule:E,error:F})}})).catch(m=>{console.error("Error loading remote css",m.toString())});n.push(g)}})}catch(i){let a=e.find(s=>s.href==null)||document.styleSheets[0];o.href!=null&&n.push(ye(o.href).then(s=>we(s,t)).then(s=>xe(s).forEach(l=>{a.insertRule(l,a.cssRules.length)})).catch(s=>{console.error("Error loading remote stylesheet",s)})),console.error("Error inlining remote css file",i)}}),Promise.all(n).then(()=>(e.forEach(o=>{if("cssRules"in o)try{w(o.cssRules||[]).forEach(i=>{r.push(i)})}catch(i){console.error(`Error while reading CSS rules from ${o.href}`,i)}}),r))}function gt(e){return e.filter(t=>t.type===CSSRule.FONT_FACE_RULE).filter(t=>X(t.style.getPropertyValue("src")))}async function ht(e,t){if(e.ownerDocument==null)throw new Error("Provided element is not within a Document");let r=w(e.ownerDocument.styleSheets),n=await mt(r,t);return gt(n)}function Ee(e){return e.trim().replace(/["\']/g,"")}function bt(e){let t=new Set;function r(n){(n.style.fontFamily||getComputedStyle(n).fontFamily).split(",").forEach(i=>{t.add(Ee(i))}),Array.from(n.children).forEach(i=>{i instanceof HTMLElement&&r(i)})}return r(e),t}async function Se(e,t){let r=await ht(e,t),n=bt(e);return(await Promise.all(r.filter(i=>n.has(Ee(i.style.fontFamily))).map(i=>{let a=i.parentStyleSheet?i.parentStyleSheet.href:null;return B(i.cssText,a,t)}))).join(`\n`)}async function ve(e,t){let r=t.fontEmbedCSS!=null?t.fontEmbedCSS:t.skipFonts?null:await Se(e,t);if(r){let n=document.createElement("style"),o=document.createTextNode(r);n.appendChild(o),e.firstChild?e.insertBefore(n,e.firstChild):e.appendChild(n)}}async function yt(e,t={}){let{width:r,height:n}=W(e,t),o=await M(e,t,!0);return await ve(o,t),await Y(o,t),he(o,t),await le(o,r,n)}async function wt(e,t={}){let{width:r,height:n}=W(e,t),o=await yt(e,t),i=await T(o),a=document.createElement("canvas"),s=a.getContext("2d"),l=t.pixelRatio||ae(),g=t.canvasWidth||r,m=t.canvasHeight||n;return a.width=g*l,a.height=m*l,t.skipAutoScale||se(a),a.style.width=`${g}`,a.style.height=`${m}`,t.backgroundColor&&(s.fillStyle=t.backgroundColor,s.fillRect(0,0,a.width,a.height)),s.drawImage(i,0,0,a.width,a.height),a}async function ke(e,t={}){let r=await wt(e,t);return await ce(r)}var Ce=1280,xt=1e6,Le="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",Te=Le.split(",")[1]??"";function Et(e){if(e.tagName!=="IMG")return!1;let t=e.src;if(!t)return!1;try{return new URL(t,window.location.href).origin!==window.location.origin}catch{return!0}}function St(e,t="image/png"){return new Promise((r,n)=>{e.toBlob(o=>{o?r(o):n(new Error("canvas.toBlob returned null"))},t)})}async function vt(e){let t=await e.arrayBuffer(),r=new Uint8Array(t),n="",o=32768;for(let i=0;i<r.length;i+=o){let a=r.subarray(i,i+o);n+=String.fromCharCode.apply(null,Array.from(a))}return btoa(n)}async function Ae(e,t){let r=t/e.width,n=document.createElement("canvas");n.width=t,n.height=Math.round(e.height*r);let o=n.getContext("2d");if(!o)throw new Error("no 2d context");return o.drawImage(e,0,0,n.width,n.height),St(n,"image/png")}async function Re(e){let t=n=>!(e&&!e(n)||Et(n)),r;try{r=await ke(document.body,{pixelRatio:1,cacheBust:!1,filter:t,imagePlaceholder:Le,skipFonts:!0})}catch(n){return console.warn("[pinpoint] screenshot capture failed, submitting without image:",n),Te}if(!r)return console.warn("[pinpoint] screenshot capture returned no blob, submitting without image"),Te;try{let n=await createImageBitmap(r);if(n.width>Ce){let i=await Ae(n,Ce);n.close?.(),r=i,n=await createImageBitmap(r)}let o=n.width;for(;r.size>xt&&o>480;){o=Math.round(o*.8);let i=await Ae(n,o);n.close?.(),r=i,n=await createImageBitmap(r)}n.close?.()}catch(n){console.warn("[pinpoint] downscale step failed; using full-size capture:",n)}return vt(r)}function Pe(e,t=4){let r=[],n=e,o=0;for(;n&&n.nodeType===1&&o<t;){let i=n.tagName.toLowerCase();if(i==="html"||i==="body"){r.unshift(i);break}let a=i;if(n.id){a+=`#${CSS.escape(n.id)}`,r.unshift(a);break}let s=n.parentElement;if(s){let l=n.tagName,g=Array.from(s.children).filter(m=>m.tagName===l);if(g.length>1){let m=g.indexOf(n)+1;a+=`:nth-of-type(${m})`}}r.unshift(a),n=s,o++}return r.join(" > ")}function $e(e){let t=e;for(;t&&t.nodeType===1;){let r=t.getAttribute?.("data-pp-loc");if(r){let n=r.split(":");if(n.length>=3){let o=Number(n[n.length-1]),i=Number(n[n.length-2]),a=n.slice(0,n.length-2).join(":");if(Number.isFinite(i)&&Number.isFinite(o)&&a)return{file:a,line:i,col:o}}}t=t.parentElement}return null}var Ie=`\n:host {\n  all: initial;\n  /* color-scheme is one of the few properties that pierces shadow DOM \\u2014\n     force light so the host page\'s dark scheme doesn\'t paint our form\n     controls (textarea, button) with dark browser defaults. */\n  color-scheme: light;\n}\n* { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, \'Inter\', \'Segoe UI\', Roboto, sans-serif; }\n\n.fab {\n  position: fixed;\n  bottom: 20px;\n  right: 20px;\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  background: #111827;\n  color: #fff;\n  border: 0;\n  cursor: pointer;\n  font-size: 22px;\n  box-shadow: 0 6px 16px rgba(0,0,0,0.25);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: transform 120ms ease, background 120ms ease;\n}\n.fab:hover { transform: scale(1.06); background: #1f2937; }\n.fab.active { background: #2563eb; }\n\n.outline {\n  position: fixed;\n  pointer-events: none;\n  border: 2px solid #2563eb;\n  background: rgba(37, 99, 235, 0.08);\n  z-index: 2147483646;\n  transition: all 60ms ease;\n  border-radius: 2px;\n}\n\n.hint {\n  position: fixed;\n  top: 16px;\n  left: 50%;\n  transform: translateX(-50%);\n  background: #111827;\n  color: #fff;\n  padding: 8px 14px;\n  font-size: 13px;\n  border-radius: 6px;\n  box-shadow: 0 4px 10px rgba(0,0,0,0.25);\n}\n\n.composer {\n  position: fixed;\n  width: 320px;\n  background: #fff;\n  border: 1px solid #e5e7eb;\n  border-radius: 10px;\n  box-shadow: 0 10px 25px rgba(0,0,0,0.2);\n  padding: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  /* Override UA popover defaults so our inline top/left win. The UA sheet\n     for [popover] sets inset:0 + margin:auto which would center us. */\n  inset: auto;\n  margin: 0;\n  color: #111827;\n  overflow: visible;\n}\n.composer::backdrop { background: transparent; }\n.composer .meta {\n  font-size: 11px;\n  color: #6b7280;\n  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;\n  word-break: break-all;\n}\n.composer textarea {\n  width: 100%;\n  min-height: 80px;\n  resize: vertical;\n  padding: 8px;\n  font-size: 13px;\n  border: 1px solid #e5e7eb;\n  border-radius: 6px;\n  outline: none;\n  font-family: inherit;\n  background: #fff;\n  color: #111827;\n}\n.composer textarea::placeholder { color: #9ca3af; }\n.composer textarea:focus { border-color: #2563eb; }\n\n.row { display: flex; justify-content: flex-end; gap: 8px; }\n.btn {\n  border: 0;\n  padding: 6px 12px;\n  font-size: 13px;\n  border-radius: 6px;\n  cursor: pointer;\n}\n.btn.primary { background: #2563eb; color: #fff; }\n.btn.primary:disabled { background: #93c5fd; cursor: not-allowed; }\n.btn.ghost { background: transparent; color: #374151; }\n\n.toast {\n  position: fixed;\n  bottom: 80px;\n  right: 20px;\n  background: #111827;\n  color: #fff;\n  padding: 10px 14px;\n  font-size: 13px;\n  border-radius: 6px;\n  box-shadow: 0 6px 16px rgba(0,0,0,0.25);\n}\n.toast.error { background: #b91c1c; }\n\n.status-pill {\n  position: fixed;\n  bottom: 78px;\n  right: 20px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: #111827;\n  color: #fff;\n  padding: 6px 12px 6px 10px;\n  font-size: 12px;\n  border-radius: 999px;\n  box-shadow: 0 4px 12px rgba(0,0,0,0.25);\n  cursor: default;\n  user-select: none;\n}\n.status-pill .spinner {\n  width: 12px;\n  height: 12px;\n  border: 2px solid rgba(255,255,255,0.3);\n  border-top-color: #fff;\n  border-radius: 50%;\n  animation: pp-spin 0.8s linear infinite;\n}\n@keyframes pp-spin {\n  to { transform: rotate(360deg); }\n}\n`;var kt="/__pinpoint/feedback";function J(){let e=document.createElement("div");e.id="pinpoint-root",e.style.position="fixed",e.style.inset="0",e.style.pointerEvents="none",e.style.zIndex="2147483647",document.documentElement.appendChild(e);let t=e.attachShadow({mode:"closed"}),r=document.createElement("style");r.textContent=Ie,t.appendChild(r);let n=document.createElement("button");n.className="fab",n.type="button",n.textContent="\\u{1F4AC}",n.title="Pinpoint \\u2014 pick an element",n.style.pointerEvents="auto",t.appendChild(n);let o=document.createElement("div");o.className="outline",o.style.display="none",t.appendChild(o);let i=document.createElement("div");i.className="status-pill",i.style.pointerEvents="auto",i.style.display="none",t.appendChild(i);let a={mode:"idle",selected:null},s=new Set;function l(){if(s.size===0){i.style.display="none";return}i.style.display="flex";let c=s.size===1?"1 agent running":`${s.size} agents running`;i.innerHTML=`<span class="spinner"></span><span>${c}</span>`,i.title=Array.from(s).join(`\n`)}async function g(c){if(s.has(c))return;s.add(c),l();let d=Date.now()+600*1e3,f=2e3;for(;Date.now()<d;){await new Promise(k=>setTimeout(k,f)),f<5e3&&(f=Math.min(5e3,f+500));try{let k=await fetch(`/__pinpoint/feedback/${c}`);if(!k.ok)break;let u=await k.json();if(u.status&&u.status!=="pending"){let D=u.status==="fixed"?"\\u2713 Fixed":`Agent: ${u.status}`;O(`${D} (${c})`,u.status==="fixed"?"success":"error");break}}catch{}}s.delete(c),l()}function m(){a.mode="picking",n.classList.add("active");let c=document.createElement("div");c.className="hint",c.textContent="Click an element. Esc to cancel.",c.dataset.pp="hint",t.appendChild(c),document.addEventListener("mousemove",F,!0),document.addEventListener("click",N,!0),document.addEventListener("keydown",Q,!0)}function E(){a.mode="idle",n.classList.remove("active"),o.style.display="none";let c=t.querySelector(\'[data-pp="hint"]\');c&&c.remove(),document.removeEventListener("mousemove",F,!0),document.removeEventListener("click",N,!0),document.removeEventListener("keydown",Q,!0)}function F(c){let d=Z(c);d&&Me(d)}function N(c){let d=Z(c);d&&(c.preventDefault(),c.stopPropagation(),a.selected=d,E(),Fe(d))}function Q(c){c.key==="Escape"&&(c.preventDefault(),E())}function Me(c){let d=c.getBoundingClientRect();o.style.display="block",o.style.top=`${d.top}px`,o.style.left=`${d.left}px`,o.style.width=`${d.width}px`,o.style.height=`${d.height}px`}function Z(c){let d=e.style.pointerEvents;e.style.pointerEvents="none";let f=document.elementFromPoint(c.clientX,c.clientY);return e.style.pointerEvents=d,!f||f===e?null:f}function Fe(c){a.mode="composing";let d=$e(c),f=Pe(c),k=d?`${d.file}:${d.line}:${d.col}`:f,u=document.createElement("iframe");u.title="Pinpoint feedback",u.style.position="fixed",u.style.border="0",u.style.background="transparent",u.style.pointerEvents="auto",u.style.zIndex="2147483646",u.style.colorScheme="light",u.style.inset="auto",u.style.margin="0",u.style.padding="0","popover"in HTMLElement.prototype&&u.setAttribute("popover","manual");let D=c.getBoundingClientRect(),ee=344,te=220,He=Math.min(window.innerHeight-te-8,Math.max(8,D.bottom+8)),_e=Math.min(window.innerWidth-ee-8,Math.max(8,D.left));if(u.style.top=`${He}px`,u.style.left=`${_e}px`,u.style.width=`${ee}px`,u.style.height=`${te}px`,u.srcdoc=De(k),t.appendChild(u),"showPopover"in u&&u.getAttribute("popover"))try{u.showPopover()}catch{}function V(){u.remove(),a.mode="idle",a.selected=null,o.style.display="none"}u.addEventListener("load",()=>{let P=u.contentDocument,ne=u.contentWindow;if(!P||!ne)return;let $=P.getElementById("pp-ta"),re=P.getElementById("pp-cancel"),S=P.getElementById("pp-submit"),b=P.getElementById("pp-meta");!$||!re||!S||!b||(d&&(b.classList.add("clickable"),b.title="Open in editor",b.addEventListener("click",async()=>{b.classList.add("loading");try{let h=new URLSearchParams({file:d.file,line:String(d.line),col:String(d.col)}),x=await fetch(`/__pinpoint/open?${h.toString()}`,{method:"POST"});if(!x.ok){let v=await x.json().catch(()=>({}));throw new Error(v.error||`HTTP ${x.status}`)}b.classList.remove("loading"),b.classList.add("ok"),setTimeout(()=>b.classList.remove("ok"),1e3)}catch(h){b.classList.remove("loading"),b.classList.add("err");let x=h instanceof Error?h.message:String(h);b.title=`Failed to open: ${x}`,setTimeout(()=>{b.classList.remove("err"),b.title="Open in editor"},2e3)}})),setTimeout(()=>$.focus(),0),$.addEventListener("input",()=>{S.disabled=$.value.trim().length===0}),ne.addEventListener("keydown",h=>{h.key==="Escape"&&(h.preventDefault(),V())}),re.addEventListener("click",()=>V()),S.addEventListener("click",async()=>{S.disabled=!0,S.textContent="Sending\\u2026";try{let h=await Re(H=>H!==e&&H!==u),x={comment:$.value.trim(),loc:d,selector:f,url:window.location.href,viewport:{w:window.innerWidth,h:window.innerHeight},userAgent:navigator.userAgent,screenshot:h,createdAt:new Date().toISOString()},v=await fetch(kt,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(x)});if(!v.ok){let H=await v.text().catch(()=>"");throw new Error(`HTTP ${v.status}: ${H||v.statusText}`)}let j=await v.json().catch(()=>null);j?.id&&j.agentSpawned&&g(j.id),O("Sent","success"),V()}catch(h){let x=h instanceof Error?h.message:String(h);O(`Error: ${x}`,"error"),S.disabled=!1,S.textContent="Submit"}}))})}function De(c){return`<!doctype html>\n<html><head><meta charset="utf-8"><style>\n  html, body { margin: 0; padding: 0; background: transparent; }\n  * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, \'Inter\', \'Segoe UI\', Roboto, sans-serif; }\n  .card {\n    background: #fff;\n    border: 1px solid #e5e7eb;\n    border-radius: 10px;\n    box-shadow: 0 10px 25px rgba(0,0,0,0.2);\n    padding: 12px;\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n    color: #111827;\n    height: calc(100% - 2px);\n  }\n  .meta {\n    font-size: 11px;\n    color: #6b7280;\n    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;\n    word-break: break-all;\n    padding: 2px 4px;\n    margin: -2px -4px;\n    border-radius: 4px;\n    transition: background 100ms ease, color 100ms ease;\n    user-select: none;\n  }\n  .meta.clickable { cursor: pointer; }\n  .meta.clickable:hover { background: #f3f4f6; color: #111827; }\n  .meta.loading { opacity: 0.5; }\n  .meta.ok { background: #d1fae5; color: #065f46; }\n  .meta.err { background: #fee2e2; color: #991b1b; }\n  textarea {\n    flex: 1;\n    min-height: 80px;\n    resize: none;\n    padding: 8px;\n    font-size: 13px;\n    border: 1px solid #e5e7eb;\n    border-radius: 6px;\n    outline: none;\n    font-family: inherit;\n    background: #fff;\n    color: #111827;\n  }\n  textarea::placeholder { color: #9ca3af; }\n  textarea:focus { border-color: #2563eb; }\n  .row { display: flex; justify-content: flex-end; gap: 8px; }\n  .btn { border: 0; padding: 6px 12px; font-size: 13px; border-radius: 6px; cursor: pointer; font-family: inherit; }\n  .btn.primary { background: #2563eb; color: #fff; }\n  .btn.primary:disabled { background: #93c5fd; cursor: not-allowed; }\n  .btn.ghost { background: transparent; color: #374151; }\n</style></head><body>\n  <div class="card">\n    <div class="meta" id="pp-meta">${(f=>f.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"))(c)}</div>\n    <textarea id="pp-ta" placeholder="Describe the change you want\\u2026"></textarea>\n    <div class="row">\n      <button class="btn ghost" id="pp-cancel" type="button">Cancel</button>\n      <button class="btn primary" id="pp-submit" type="button" disabled>Submit</button>\n    </div>\n  </div>\n</body></html>`}function O(c,d){let f=document.createElement("div");f.className=`toast${d==="error"?" error":""}`,f.textContent=c,t.appendChild(f),setTimeout(()=>f.remove(),2500)}n.addEventListener("click",()=>{a.mode==="picking"?E():a.mode==="idle"&&m()});let z=Ct();z&&(n.title=`Pinpoint \\u2014 press ${z.toUpperCase()} or click to pick`,document.addEventListener("keydown",c=>{Tt(c)||c.key.toLowerCase()===z&&a.mode!=="composing"&&(c.preventDefault(),a.mode==="picking"?E():m())},{capture:!0}))}function Ct(){let e=window;if(e.__pinpointHotkey===!1||e.__pinpointHotkey===null)return null;let t=e.__pinpointHotkey;return typeof t=="string"&&t.length===1?t.toLowerCase():"c"}function Tt(e){if(e.metaKey||e.ctrlKey||e.altKey)return!0;let t=e.target;if(!t)return!1;if(t.isContentEditable)return!0;let r=t.tagName;return r==="INPUT"||r==="TEXTAREA"||r==="SELECT"}typeof window<"u"&&!window.__pinpointMounted&&(window.__pinpointMounted=!0,document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>J(),{once:!0}):J());})();\n';

// src/agent.ts
var import_node_child_process = require("child_process");
var import_node_fs2 = require("fs");
var import_promises2 = require("fs/promises");
var import_node_path2 = require("path");
var import_claude_agent_sdk = require("@anthropic-ai/claude-agent-sdk");

// src/agent-render.ts
function renderMessage(message) {
  switch (message.type) {
    case "assistant":
      return renderAssistant(message);
    case "result":
      return "\n---\n";
    case "user":
      return renderUser(message);
    default:
      return "";
  }
}
function renderInitFooter(message) {
  const mcp = message.mcp_servers.map((s) => `${s.name}=${s.status}`).join(", ");
  const lines = [
    `> _session_ \`${message.session_id}\` \xB7 model \`${message.model}\` \xB7 ${message.permissionMode}`
  ];
  if (mcp) lines.push(`> _mcp_ ${mcp}`);
  lines.push("");
  return `${lines.join("\n")}
`;
}
function renderResultFooter(result) {
  const lines = [];
  if (result.subtype === "success") {
    lines.push(`**Outcome:** success (${result.num_turns} turn${result.num_turns === 1 ? "" : "s"})`);
  } else {
    lines.push(`**Outcome:** \`${result.subtype}\``);
    if (result.errors?.length) {
      lines.push("");
      for (const e of result.errors) lines.push(`> ${e}`);
    }
  }
  lines.push(
    `**Tokens:** in=${result.usage.input_tokens} \xB7 out=${result.usage.output_tokens}` + (result.usage.cache_read_input_tokens ? ` \xB7 cache_read=${result.usage.cache_read_input_tokens}` : "") + (result.usage.cache_creation_input_tokens ? ` \xB7 cache_write=${result.usage.cache_creation_input_tokens}` : "")
  );
  lines.push(`**Cost:** $${result.total_cost_usd.toFixed(4)}`);
  lines.push(`**Duration:** ${(result.duration_ms / 1e3).toFixed(1)}s`);
  return lines.join("  \n");
}
function renderAssistant(message) {
  const blocks = message.message.content;
  if (!Array.isArray(blocks)) return "";
  const out = [];
  for (const block of blocks) {
    if (block.type === "text" && block.text.trim()) {
      out.push(`${block.text}
`);
    } else if (block.type === "tool_use") {
      out.push(renderToolUse(block.name, block.input));
    } else if (block.type === "thinking") {
      out.push("<!-- thinking -->\n");
    }
  }
  if (message.error) {
    out.push(`
> \u26A0\uFE0F  assistant error: \`${message.error}\`
`);
  }
  if (out.length === 0) return "";
  return `${out.join("\n")}
`;
}
function renderUser(message) {
  const content = message.message?.content;
  if (!Array.isArray(content)) return "";
  const chips = [];
  for (const block of content) {
    if (block.type === "tool_result") {
      chips.push(renderToolResult(block));
    }
  }
  if (chips.length === 0) return "";
  return `${chips.join("\n")}
`;
}
function renderToolUse(name, input) {
  const summary = summariseToolInput(name, input);
  return `\`[${name}]\`${summary ? ` ${summary}` : ""}
`;
}
function renderToolResult(block) {
  const status = block.is_error ? "\u2717" : "\u2713";
  return `${status} _tool result_`;
}
function summariseToolInput(name, input) {
  if (input == null || typeof input !== "object") return "";
  const obj = input;
  const fileFields = ["file_path", "path", "filePath", "notebook_path"];
  for (const f of fileFields) {
    if (typeof obj[f] === "string") return `\`${obj[f]}\``;
  }
  if (typeof obj.command === "string") return `\`${truncate(obj.command, 80)}\``;
  if (typeof obj.pattern === "string") return `pattern=\`${truncate(obj.pattern, 60)}\``;
  if (typeof obj.url === "string") return obj.url;
  if (typeof obj.prompt === "string") return `\`${truncate(obj.prompt, 60)}\``;
  if (name.startsWith("mcp__")) {
    const keys = Object.keys(obj);
    const first = keys[0];
    if (keys.length === 1 && first != null && typeof obj[first] !== "object") {
      return `${first}=\`${String(obj[first])}\``;
    }
  }
  return "";
}
function truncate(s, n) {
  if (s.length <= n) return s;
  return `${s.slice(0, n - 1)}\u2026`;
}

// src/storage.ts
var import_node_buffer = require("buffer");
var import_node_fs = require("fs");
var import_promises = require("fs/promises");
var import_node_path = require("path");
var import_zod = require("zod");
var ID_RE = /^[A-Za-z0-9_-]{8,16}$/;
var FeedbackInputSchema = import_zod.z.object({
  comment: import_zod.z.string().min(1).max(8e3),
  loc: import_zod.z.object({
    file: import_zod.z.string().min(1).max(512),
    line: import_zod.z.number().int().min(1).max(1e6),
    col: import_zod.z.number().int().min(0).max(1e6)
  }).nullable(),
  selector: import_zod.z.string().max(2e3),
  url: import_zod.z.string().max(2048),
  viewport: import_zod.z.object({
    w: import_zod.z.number().int().min(1),
    h: import_zod.z.number().int().min(1)
  }),
  userAgent: import_zod.z.string().max(1024),
  screenshot: import_zod.z.string().min(1),
  createdAt: import_zod.z.string().min(1)
});
var StatusSchema = import_zod.z.enum(["pending", "fixed", "wontfix", "deferred"]);
var PatchSchema = import_zod.z.object({
  status: StatusSchema.optional(),
  note: import_zod.z.string().max(8e3).nullable().optional(),
  commitSha: import_zod.z.string().max(64).nullable().optional(),
  agentSessionId: import_zod.z.string().max(128).nullable().optional()
});
var Storage = class {
  root;
  feedbackDir;
  screenshotsDir;
  constructor(root) {
    this.root = root;
    this.feedbackDir = (0, import_node_path.join)(root, ".pinpoint", "feedback");
    this.screenshotsDir = (0, import_node_path.join)(root, ".pinpoint", "screenshots");
  }
  async ensureDirs() {
    await (0, import_promises.mkdir)(this.feedbackDir, { recursive: true });
    await (0, import_promises.mkdir)(this.screenshotsDir, { recursive: true });
  }
  async create(id, input) {
    await this.ensureDirs();
    const pngBuf = import_node_buffer.Buffer.from(input.screenshot, "base64");
    const pngRel = (0, import_node_path.join)("screenshots", `${id}.png`);
    const pngAbs = (0, import_node_path.join)(this.root, ".pinpoint", pngRel);
    await this.atomicWriteBytes(pngAbs, pngBuf);
    const record = {
      id,
      comment: input.comment,
      file: input.loc?.file ?? null,
      line: input.loc?.line ?? null,
      col: input.loc?.col ?? null,
      selector: input.selector,
      url: input.url,
      viewport: input.viewport,
      userAgent: input.userAgent,
      screenshot: pngRel,
      status: "pending",
      note: null,
      commitSha: null,
      agentSessionId: null,
      createdAt: input.createdAt,
      resolvedAt: null
    };
    await this.atomicWriteJson(this.recordPath(id), record);
    return record;
  }
  async list() {
    if (!(0, import_node_fs.existsSync)(this.feedbackDir)) return [];
    const names = await (0, import_promises.readdir)(this.feedbackDir);
    const out = [];
    for (const n of names) {
      if (!n.endsWith(".json") || n.endsWith(".tmp")) continue;
      const id = n.slice(0, -".json".length);
      if (!ID_RE.test(id)) continue;
      try {
        const r = await this.read(id);
        if (r) out.push(r);
      } catch {
      }
    }
    out.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    return out;
  }
  async read(id) {
    if (!ID_RE.test(id)) return null;
    const p = this.recordPath(id);
    if (!(0, import_node_fs.existsSync)(p)) return null;
    const raw = await (0, import_promises.readFile)(p, "utf8");
    const parsed = JSON.parse(raw);
    if (parsed.agentSessionId === void 0) parsed.agentSessionId = null;
    return parsed;
  }
  async readScreenshotBase64(rec) {
    const abs = (0, import_node_path.join)(this.root, ".pinpoint", rec.screenshot);
    if (!(0, import_node_fs.existsSync)(abs)) return null;
    const buf = await (0, import_promises.readFile)(abs);
    return buf.toString("base64");
  }
  async patch(id, patch) {
    const rec = await this.read(id);
    if (!rec) return null;
    const next = { ...rec };
    if (patch.status !== void 0) {
      next.status = patch.status;
      if (patch.status !== "pending" && !next.resolvedAt) {
        next.resolvedAt = (/* @__PURE__ */ new Date()).toISOString();
      }
      if (patch.status === "pending") {
        next.resolvedAt = null;
      }
    }
    if (patch.note !== void 0) next.note = patch.note;
    if (patch.commitSha !== void 0) next.commitSha = patch.commitSha;
    if (patch.agentSessionId !== void 0) next.agentSessionId = patch.agentSessionId;
    await this.atomicWriteJson(this.recordPath(id), next);
    return next;
  }
  recordPath(id) {
    return (0, import_node_path.join)(this.feedbackDir, `${id}.json`);
  }
  async atomicWriteJson(p, data) {
    const tmp = `${p}.tmp`;
    await (0, import_promises.writeFile)(tmp, `${JSON.stringify(data, null, 2)}
`, "utf8");
    await (0, import_promises.rename)(tmp, p);
  }
  async atomicWriteBytes(p, data) {
    const tmp = `${p}.tmp`;
    await (0, import_promises.writeFile)(tmp, data);
    await (0, import_promises.rename)(tmp, p);
  }
};

// src/agent.ts
function resolveAgentMode(env) {
  const v = env.PINPOINT_SPAWN_AGENT;
  if (v === "worktree" || v === "inline") return v;
  return false;
}
async function spawnAgent(ctx) {
  if (ctx.mode === false) return;
  const logsDir = (0, import_node_path2.join)(ctx.projectRoot, ".pinpoint", "logs");
  await (0, import_promises2.mkdir)(logsDir, { recursive: true });
  const logPath = (0, import_node_path2.join)(logsDir, `${ctx.feedback.id}.md`);
  let cwd = ctx.projectRoot;
  const startedAt = (/* @__PURE__ */ new Date()).toISOString();
  if (ctx.mode === "worktree") {
    try {
      cwd = await createWorktree(ctx.projectRoot, ctx.feedback.id, logPath);
    } catch (err) {
      await appendLog(
        logPath,
        renderHeader(
          ctx,
          cwd,
          startedAt,
          /* worktreeReady */
          false
        ) + `
> [pinpoint] worktree creation failed: ${stringifyErr(err)}
`
      );
      return;
    }
  }
  await appendLog(logPath, renderHeader(
    ctx,
    cwd,
    startedAt,
    /* worktreeReady */
    true
  ));
  const prompt = buildPrompt(ctx.feedback, ctx.mode, cwd);
  const permissionMode = resolvePermissionMode(process.env);
  const env = {
    ...process.env,
    PINPOINT_PROJECT_ROOT: ctx.projectRoot
  };
  const options = {
    cwd,
    permissionMode,
    env,
    // Load .mcp.json (and settings) from the worktree / project. The widget
    // depends on the pinpoint MCP server being reachable.
    settingSources: ["user", "project", "local"]
  };
  void consumeStream(ctx, logPath, prompt, options);
}
async function consumeStream(ctx, logPath, prompt, options) {
  let sessionId = null;
  let sessionRecorded = false;
  let resultRendered = false;
  try {
    for await (const message of (0, import_claude_agent_sdk.query)({ prompt, options })) {
      if (!sessionId && "session_id" in message && typeof message.session_id === "string") {
        sessionId = message.session_id;
      }
      if (!sessionRecorded && sessionId) {
        sessionRecorded = true;
        await persistSessionId(ctx.projectRoot, ctx.feedback.id, sessionId);
      }
      if (message.type === "system" && message.subtype === "init") {
        await appendLog(logPath, renderInitFooter(message));
        continue;
      }
      if (message.type === "result") {
        resultRendered = true;
        await appendLog(logPath, renderMessage(message));
        await appendResolution(ctx.projectRoot, ctx.feedback.id, logPath, message);
        continue;
      }
      const chunk = renderMessage(message);
      if (chunk) await appendLog(logPath, chunk);
    }
  } catch (err) {
    await appendLog(
      logPath,
      `
> [pinpoint] agent stream errored: ${stringifyErr(err)}
`
    );
  }
  if (!resultRendered) {
    await appendResolution(ctx.projectRoot, ctx.feedback.id, logPath, null);
  }
}
async function persistSessionId(projectRoot, feedbackId, sessionId) {
  try {
    const storage = new Storage(projectRoot);
    await storage.patch(feedbackId, { agentSessionId: sessionId });
  } catch {
  }
}
async function createWorktree(projectRoot, feedbackId, logPath) {
  if (!(0, import_node_fs2.existsSync)((0, import_node_path2.join)(projectRoot, ".git"))) {
    throw new Error("project root is not a git repository");
  }
  const worktreeDir = (0, import_node_path2.join)(projectRoot, ".pinpoint", "worktrees");
  await (0, import_promises2.mkdir)(worktreeDir, { recursive: true });
  const worktreePath = (0, import_node_path2.join)(worktreeDir, feedbackId);
  const branch = `pinpoint/${feedbackId}`;
  await runGit(projectRoot, ["worktree", "add", "-b", branch, worktreePath], logPath);
  return worktreePath;
}
function runGit(cwd, args, logPath) {
  return new Promise((res, rej) => {
    const child = (0, import_node_child_process.spawn)("git", args, { cwd, stdio: "pipe" });
    let stderr = "";
    child.stderr.on("data", (d) => {
      stderr += d.toString("utf8");
    });
    child.on("error", rej);
    child.on("exit", (code) => {
      if (code === 0) {
        res();
      } else {
        appendLog(logPath, `[pinpoint:git] git ${args.join(" ")} \u2192 exit ${code}
${stderr}
`).catch(
          () => {
          }
        );
        rej(new Error(`git ${args.join(" ")} exited ${code}: ${stderr.trim()}`));
      }
    });
  });
}
async function appendLog(path, text) {
  if (!text) return;
  const h = await (0, import_promises2.open)(path, "a");
  try {
    await h.write(text);
  } finally {
    await h.close();
  }
}
function stringifyErr(e) {
  return e instanceof Error ? e.message : String(e);
}
function resolvePermissionMode(env) {
  const v = env.PINPOINT_AGENT_PERMISSION_MODE;
  if (v === "default" || v === "acceptEdits" || v === "bypassPermissions" || v === "plan" || v === "dontAsk" || v === "auto") {
    return v;
  }
  return "acceptEdits";
}
function renderHeader(ctx, cwd, startedAt, worktreeReady) {
  const rec = ctx.feedback;
  const where = rec.file ? `${rec.file}:${rec.line ?? "?"}${rec.col != null ? `:${rec.col}` : ""}` : rec.selector;
  const branchLine = ctx.mode === "worktree" && worktreeReady ? `branch: pinpoint/${rec.id}
` : "";
  return [
    "---",
    `id: ${rec.id}`,
    `mode: ${ctx.mode}`,
    `target: ${where}`,
    `url: ${rec.url}`,
    `started: ${startedAt}`,
    `cwd: ${cwd}`,
    branchLine.trimEnd(),
    "---",
    "",
    `# Pinpoint feedback \`${rec.id}\``,
    "",
    `**Target:** \`${where}\`  `,
    `**URL:** ${rec.url}  `,
    `**Mode:** ${ctx.mode}${ctx.mode === "worktree" && worktreeReady ? `  \xB7  **Branch:** \`pinpoint/${rec.id}\`` : ""}`,
    "",
    "> **Comment**",
    "> ",
    `> ${rec.comment.split("\n").join("\n> ")}`,
    "",
    "## Agent output",
    "",
    ""
  ].filter((l) => l !== null).join("\n");
}
async function appendResolution(projectRoot, feedbackId, logPath, result) {
  const storage = new Storage(projectRoot);
  const updated = await storage.read(feedbackId);
  const finishedAt = (/* @__PURE__ */ new Date()).toISOString();
  const lines = [];
  lines.push("");
  lines.push("## Resolution");
  lines.push("");
  lines.push(`**Finished:** ${finishedAt}  `);
  if (result) {
    lines.push(renderResultFooter(result));
  } else {
    lines.push("> Stream ended without a `result` message.");
  }
  if (!updated) {
    lines.push("");
    lines.push("> Feedback record disappeared between spawn and exit.");
  } else {
    lines.push(`**Status:** \`${updated.status}\``);
    if (updated.resolvedAt) {
      lines.push(`**Resolved at:** ${updated.resolvedAt}`);
    }
    if (updated.commitSha) {
      lines.push(`**Commit:** \`${updated.commitSha}\``);
    }
    if (updated.agentSessionId) {
      lines.push(`**Session:** \`${updated.agentSessionId}\``);
    }
    if (updated.note) {
      lines.push("");
      lines.push("### Note from agent");
      lines.push("");
      lines.push(updated.note);
    }
    if (updated.status === "pending") {
      lines.push("");
      lines.push(
        "> \u26A0\uFE0F  Agent exited without calling `resolve_feedback`. The record is still pending."
      );
    }
  }
  lines.push("");
  await appendLog(logPath, lines.join("\n"));
}
function buildPrompt(rec, mode, cwd) {
  const where = rec.file ? `${rec.file}:${rec.line ?? "?"}${rec.col != null ? `:${rec.col}` : ""}` : rec.selector;
  const worktreeContext = mode === "worktree" ? [
    "",
    "You are working in a FRESH git worktree at:",
    `  ${cwd}`,
    `on branch pinpoint/${rec.id} (forked from current HEAD).`,
    "",
    "Make edits freely. DO NOT commit \u2014 the developer will review your",
    "changes by diffing this branch against main."
  ].join("\n") : "";
  return [
    "A developer submitted Pinpoint feedback. Address it autonomously.",
    "",
    `Feedback id: ${rec.id}`,
    `Target: ${where}`,
    `Comment: "${rec.comment.replace(/\s+/g, " ").slice(0, 200)}"`,
    worktreeContext,
    "",
    "Workflow:",
    "  1. Call the pinpoint MCP tool `get_feedback` with the id above \u2014",
    "     it returns the full comment plus a screenshot of what the user",
    "     selected.",
    "  2. Optionally call `get_source_context` to see code around the target.",
    "  3. Edit the file(s) to address the request. Be conservative: only",
    "     change what the comment asks for.",
    '  4. Call `resolve_feedback` with status="fixed" and a one-sentence',
    '     note describing what you changed. Use status="wontfix" with a',
    "     reason if you cannot apply the change."
  ].filter((l) => l !== "").join("\n");
}

// src/editor.ts
var import_node_child_process2 = require("child_process");
var import_node_fs3 = require("fs");
var import_node_path3 = require("path");
function detectEditor(env) {
  return env.PINPOINT_EDITOR || env.EDITOR || env.VISUAL || "code";
}
function buildCommand(editor, file, line, col) {
  const name = editor.split(/[\\/]/).pop()?.toLowerCase() ?? editor.toLowerCase();
  const locator = line != null && col != null ? `${file}:${line}:${col}` : line != null ? `${file}:${line}` : file;
  if (["code", "code-insiders", "cursor", "windsurf", "codium", "vscodium"].includes(name)) {
    return { cmd: editor, args: ["-g", locator] };
  }
  if (name === "zed") {
    return { cmd: editor, args: [locator] };
  }
  if (name === "subl" || name === "sublime_text") {
    return { cmd: editor, args: [locator] };
  }
  if (["idea", "webstorm", "pycharm", "rubymine", "phpstorm", "goland", "rider", "clion"].includes(
    name
  )) {
    const args = [file];
    if (line != null) args.push("--line", String(line));
    if (col != null) args.push("--column", String(col));
    return { cmd: editor, args };
  }
  if (name === "atom" || name === "mate") {
    return { cmd: editor, args: [locator] };
  }
  return { cmd: editor, args: [file] };
}
async function openInEditor(projectRoot, file, line, col) {
  if (file.includes("..")) throw new Error("path traversal not allowed");
  const abs = (0, import_node_path3.isAbsolute)(file) ? file : (0, import_node_path3.resolve)(projectRoot, file);
  const rootAbs = (0, import_node_path3.resolve)(projectRoot);
  if (!abs.startsWith(rootAbs + import_node_path3.sep) && abs !== rootAbs) {
    throw new Error("path outside project root");
  }
  if (!(0, import_node_fs3.existsSync)(abs)) throw new Error(`file not found: ${file}`);
  const editor = detectEditor(process.env);
  const { cmd, args } = buildCommand(editor, abs, line, col);
  await new Promise((resolveP, reject) => {
    let settled = false;
    const child = (0, import_node_child_process2.spawn)(cmd, args, { detached: true, stdio: "ignore" });
    child.on("error", (err) => {
      if (settled) return;
      settled = true;
      reject(err);
    });
    setTimeout(() => {
      if (settled) return;
      settled = true;
      child.unref();
      resolveP();
    }, 200);
  });
  return { ok: true, editor, command: `${cmd} ${args.join(" ")}` };
}

// src/route.ts
var dynamic = "force-dynamic";
var runtime = "nodejs";
var MAX_BODY_BYTES = 8 * 1024 * 1024;
function getStorage() {
  const root = process.env.PINPOINT_PROJECT_ROOT ?? process.cwd();
  return new Storage(root);
}
async function readSlug(ctx) {
  const p = await Promise.resolve(ctx.params);
  return p.slug ?? [];
}
async function GET(_req, ctx) {
  const slug = await readSlug(ctx);
  if (slug.length === 1 && slug[0] === "widget.js") {
    return new Response(WIDGET_SOURCE, {
      status: 200,
      headers: {
        "Content-Type": "application/javascript; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  }
  const storage = getStorage();
  if (slug.length === 1 && slug[0] === "feedback") {
    const items = await storage.list();
    const shallow = items.map((r) => ({
      id: r.id,
      comment: r.comment,
      file: r.file,
      line: r.line,
      col: r.col,
      selector: r.selector,
      url: r.url,
      status: r.status,
      createdAt: r.createdAt,
      resolvedAt: r.resolvedAt
    }));
    return json(200, shallow);
  }
  if (slug.length === 2 && slug[0] === "feedback") {
    const id = slug[1] ?? "";
    if (!ID_RE.test(id)) return json(400, { error: "invalid id" });
    const rec = await storage.read(id);
    if (!rec) return json(404, { error: "not found" });
    const screenshot = await storage.readScreenshotBase64(rec);
    return json(200, { ...rec, screenshot });
  }
  return json(404, { error: "not found" });
}
async function POST(req, ctx) {
  const slug = await readSlug(ctx);
  if (slug.length === 1 && slug[0] === "open") {
    const url = new URL(req.url);
    const file = url.searchParams.get("file");
    const lineRaw = url.searchParams.get("line");
    const colRaw = url.searchParams.get("col");
    if (!file) return json(400, { error: "file required" });
    try {
      const root = process.env.PINPOINT_PROJECT_ROOT ?? process.cwd();
      const result = await openInEditor(
        root,
        file,
        lineRaw ? Number(lineRaw) : void 0,
        colRaw ? Number(colRaw) : void 0
      );
      return json(200, result);
    } catch (e) {
      return json(500, { error: e instanceof Error ? e.message : String(e) });
    }
  }
  if (slug.length !== 1 || slug[0] !== "feedback") {
    return json(404, { error: "not found" });
  }
  const raw = await readJsonBody(req);
  const parsed = FeedbackInputSchema.safeParse(raw);
  if (!parsed.success) return json(400, { error: parsed.error.message });
  const decoded = import_node_buffer2.Buffer.from(parsed.data.screenshot, "base64");
  if (decoded.length > 5 * 1024 * 1024) {
    return json(400, { error: "screenshot exceeds 5MB" });
  }
  const id = (0, import_nanoid.nanoid)(10);
  const storage = getStorage();
  const rec = await storage.create(id, parsed.data);
  const mode = resolveAgentMode(process.env);
  const agentSpawned = mode !== false;
  if (agentSpawned) {
    spawnAgent({ projectRoot: storage.root, feedback: rec, mode }).catch(() => {
    });
  }
  return json(200, { id: rec.id, agentSpawned });
}
async function PATCH(req, ctx) {
  const slug = await readSlug(ctx);
  if (slug.length !== 2 || slug[0] !== "feedback") {
    return json(404, { error: "not found" });
  }
  const id = slug[1] ?? "";
  if (!ID_RE.test(id)) return json(400, { error: "invalid id" });
  const raw = await readJsonBody(req);
  const parsed = PatchSchema.safeParse(raw);
  if (!parsed.success) return json(400, { error: parsed.error.message });
  const rec = await getStorage().patch(id, parsed.data);
  if (!rec) return json(404, { error: "not found" });
  return json(200, rec);
}
async function readJsonBody(req) {
  const ab = await req.arrayBuffer();
  if (ab.byteLength > MAX_BODY_BYTES) throw new Error("payload too large");
  if (ab.byteLength === 0) return null;
  const text = import_node_buffer2.Buffer.from(ab).toString("utf8");
  return JSON.parse(text);
}
function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GET,
  PATCH,
  POST,
  dynamic,
  runtime
});
//# sourceMappingURL=route.cjs.map