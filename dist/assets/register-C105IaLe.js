import{h as s}from"./notFound-D8trMym1.js";import{r as f}from"./auth-DgQ1xGuD.js";import"./doFetch-B21xXzj5.js";async function w(r){r.preventDefault();const e=r.target,n=e.querySelector("fieldset"),a=e.querySelector("button"),i=a.textContent,t=new FormData(e),c=t.get("name"),l=t.get("email"),m=t.get("password"),u=t.get("avatarUrl"),g=t.get("avatarAlt"),d={url:u,alt:g};n.disabled=!0,a.textContent="Registering...";try{const o=await f({name:c,email:l,password:m,avatar:d});return s("Registration was successful! You can now log in.","success"),e.reset(),setTimeout(()=>window.location.pathname="/auth/login/",2e3),o}catch(o){s(`Registration failed: ${o.message}`,"error")}finally{n.disabled=!1,a.textContent=i}}const p=document.forms.register;p.addEventListener("submit",w);
