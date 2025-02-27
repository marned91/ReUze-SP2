const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/home.BVFMktAX.js","assets/authGuard.CmOIGxTk.js","assets/goToTag.BDAsXgnR.js","assets/searchListings.7oRbkNN2.js","assets/publicHome.UpR7_fuX.js","assets/publicCategories.hYmLY3Gr.js","assets/login.LsmgSIOa.js","assets/auth.825yqSSV.js","assets/doFetch.B21xXzj5.js","assets/register.g1yxN79r.js","assets/profile.BsnoJYBJ.js","assets/profile.0-40YalT.js","assets/listings.Ce-tZxrI.js","assets/skeletonLoader.U1K08Fq0.js","assets/profileUpdate.blCcX3Gq.js","assets/profilePurchases.DUB6h3eE.js","assets/listingCreate.CRLb792z.js","assets/listingView.BLZII9uB.js","assets/listingsSearchResult.l0gu0yxr.js","assets/listingsPerCategory.zU5D6Xg-.js"])))=>i.map(i=>d[i]);
(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&d(r)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function d(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();function E(){const n=document.getElementById("profile-mobile"),o=document.getElementById("profile"),i=document.getElementById("signup"),d=document.getElementById("signup-mobile"),e=document.getElementById("home"),t=document.getElementById("public-home"),r=document.getElementById("logout"),a=document.getElementById("login"),l=document.getElementById("public-categories");localStorage.getItem("token")?(i.classList.add("hidden"),d.classList.add("hidden"),a.classList.add("hidden"),t.classList.add("hidden"),l.classList.add("hidden"),e.classList.remove("hidden"),o.classList.remove("hidden"),n.classList.remove("hidden"),r.classList.remove("hidden")):(i.classList.remove("hidden"),d.classList.remove("hidden"),a.classList.remove("hidden"),t.classList.remove("hidden"),l.classList.remove("hidden"),e.classList.add("hidden"),o.classList.add("hidden"),n.classList.add("hidden"),r.classList.add("hidden"))}function p(){const n=document.getElementById("menu-toggle"),o=document.getElementById("mobile-menu");!n||!o||(n.addEventListener("click",()=>{o.classList.toggle("hidden")}),document.addEventListener("click",i=>{!o.contains(i.target)&&!n.contains(i.target)&&o.classList.add("hidden")}))}function L(n,o="info",i=null,d=1e3){const e={info:"bg-[#E0EFF5] border-[#CCE1EA] text-black shadow-xl",success:"bg-[#A5D5E7] border-[#B7DBE9] text-accent-dark shadow-xl",error:"bg-[#7A8080] border-[#989F9F] text-white shadow-xl"},t=document.createElement("div");t.className=`w-full max-w-md mx-auto p-4 border rounded-lg shadow-md ${e[o]}`,t.textContent=n,document.getElementById("alert-container").appendChild(t),setTimeout(()=>{t.remove(),i&&i()},d)}async function w(){localStorage.removeItem("token"),localStorage.removeItem("user"),L("You have been logged out","info"),setTimeout(()=>window.location.href="/auth/login/",2e3)}function b(){const n=document.querySelector("#logout");n.classList.add("cursor-pointer"),n&&n.addEventListener("click",o=>{o.preventDefault(),o.stopImmediatePropagation(),w()},{once:!0})}const v="modulepreload",P=function(n){return"/"+n},g={},s=function(o,i,d){let e=Promise.resolve();if(i&&i.length>0){document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),a=r?.nonce||r?.getAttribute("nonce");e=Promise.allSettled(i.map(l=>{if(l=P(l),l in g)return;g[l]=!0;const u=l.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${f}`))return;const c=document.createElement("link");if(c.rel=u?"stylesheet":v,u||(c.as="script"),c.crossOrigin="",c.href=l,a&&c.setAttribute("nonce",a),document.head.appendChild(c),u)return new Promise((h,_)=>{c.addEventListener("load",h),c.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${l}`)))})}))}function t(r){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=r,window.dispatchEvent(a),!a.defaultPrevented)throw r}return e.then(r=>{for(const a of r||[])a.status==="rejected"&&t(a.reason);return o().catch(t)})};async function y(n=window.location.pathname){console.log("Router is running, pathname:",window.location.pathname);const i=new URLSearchParams(window.location.search).get("tag");switch(n==="/index.html"?"/":n){case"/":await s(()=>import("./home.BVFMktAX.js"),__vite__mapDeps([0,1,2,3]));break;case"/public/":await s(()=>import("./publicHome.UpR7_fuX.js"),__vite__mapDeps([4,3]));break;case"/public/categories/index.html":case"/public/categories/":await s(()=>import("./publicCategories.hYmLY3Gr.js"),__vite__mapDeps([5,2,3]));break;case"/auth/login/index.html":case"/auth/login/":console.log("Loading login.mjs"),await s(()=>import("./login.LsmgSIOa.js"),__vite__mapDeps([6,7,8]));break;case"/auth/register/index.html":case"/auth/register/":await s(()=>import("./register.g1yxN79r.js"),__vite__mapDeps([9,7,8]));break;case"/profile/":await s(()=>import("./profile.BsnoJYBJ.js"),__vite__mapDeps([10,1,11,8,12,13]));break;case"/profile/update/":await s(()=>import("./profileUpdate.blCcX3Gq.js"),__vite__mapDeps([14,1,11,8,13]));break;case"/profile/purchases/":await s(()=>import("./profilePurchases.DUB6h3eE.js"),__vite__mapDeps([15,1,11,8,13]));break;case"/listings/create/":await s(()=>import("./listingCreate.CRLb792z.js"),__vite__mapDeps([16,1,12,8]));break;case"/listings/view/index.html":case"/listings/view/":await s(()=>import("./listingView.BLZII9uB.js"),__vite__mapDeps([17,12,8,11,13]));break;case"/listings/search/index.html":case"/listings/search/":await s(()=>import("./listingsSearchResult.l0gu0yxr.js"),__vite__mapDeps([18,12,8,3,13]));break;case"/listings/index.html":case"/listings/":i?["sport","fashion","interior","art","decor","vintage","other"].includes(i.toLowerCase())?await s(()=>import("./listingsPerCategory.zU5D6Xg-.js"),__vite__mapDeps([19,12,8,13])):await s(()=>Promise.resolve().then(()=>m),void 0):await s(()=>Promise.resolve().then(()=>m),void 0);break;default:await s(()=>Promise.resolve().then(()=>m),void 0)}}await y(window.location.pathname);console.log("main.mjs is loading - hello");E();p();b();const m=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));export{L as h};
//# sourceMappingURL=notFound.axyAvNfm.js.map
