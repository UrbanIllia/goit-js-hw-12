import{a as I,i as l,S as p}from"./assets/vendor-CkdzJWux.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const y=r=>r.map(({webformatURL:e,largeImageURL:o,tags:a,likes:t,views:s,comments:n,downloads:q})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${o}">
          <img class="gallery-image" src="${e}" alt="${a}" />
        </a>
        <div class="thumb-block">
          <div class="block"><h2 class="title">Likes</h2><p class="amount">${t}</p></div>
          <div class="block"><h2 class="title">Views</h2><p class="amount">${s}</p></div>
          <div class="block"><h2 class="title">Comments</h2><p class="amount">${n}</p></div>
          <div class="block"><h2 class="title">Downloads</h2><p class="amount">${q}</p></div>
        </div>
      </li>`).join(""),k="49342840-003e2c292237fbf09de0074d9",x="https://pixabay.com/api/";async function b(r,e=1){var o,a;try{return(await I.get(x,{params:{key:k,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e}})).data}catch(t){throw new Error(((a=(o=t.response)==null?void 0:o.data)==null?void 0:a.message)||"Failed to fetch images")}}function w(){document.querySelectorAll(".gallery-item").forEach(e=>{e.style.width="";const o=Math.floor(Math.random()*176)+275;e.style.width=`${o}px`})}const L=document.querySelector(".form"),g=document.querySelector(".gallery"),f=document.querySelector(".loader"),i=document.querySelector(".btn2");let c=1,h="";const v=15;let m=!1;f.style.display="none";i.classList.add("is-hidden");function S(){f.style.display="block"}function d(){f.style.display="none"}function u(r){const e=r?'linear-gradient(rgba(46, 47, 66, 0.8), rgba(46, 47, 66, 0.8)), url("/goit-js-hw-12/img/1.webp")':'linear-gradient(rgba(46, 47, 66, 0.3), rgba(46, 47, 66, 0.3)), url("/goit-js-hw-12/img/1.webp")';document.body.style.backgroundImage=e}function M(){const r=document.querySelector(".gallery-item");if(r&&!m){const e=r.getBoundingClientRect().height;m=!0,window.scrollBy({top:2*e,behavior:"smooth"}),setTimeout(()=>{m=!1},500)}}async function P(r){if(r.preventDefault(),g.innerHTML="",S(),i.classList.add("is-hidden"),h=r.target.elements["search-text"].value.trim(),c=1,!h){l.error({title:"Error",message:"Input cannot be empty!",color:"#ff0000"}),d();return}try{const e=await b(h,c);if(d(),!e.hits.length){l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}),u(!1);return}g.innerHTML=y(e.hits),w(),u(!0),new p(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh(),e.totalHits>c*v&&i.classList.remove("is-hidden"),L.reset()}catch(e){d(),l.error({title:"Error",message:e.message}),u(!1)}}async function E(r){S(),c++;try{const e=await b(h,c);d(),(!e.hits.length||e.hits.length<v)&&(i.classList.add("is-hidden"),i.removeEventListener("click",E),l.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})),g.insertAdjacentHTML("beforeend",y(e.hits)),w(),u(!0),new p(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh()}catch(e){d(),l.error({title:"Error",message:e.message}),u(!1)}}window.addEventListener("wheel",r=>{r.deltaY>0&&M()});L.addEventListener("submit",P);i.addEventListener("click",E);
//# sourceMappingURL=index.js.map
