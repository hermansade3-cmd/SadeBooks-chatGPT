
const SB = {
  books: [],
  get user(){ try{return JSON.parse(localStorage.getItem("sb_user")||"null")}catch{return null}},
  set user(v){ localStorage.setItem("sb_user", JSON.stringify(v)); },
  purchases(){try{return JSON.parse(localStorage.getItem("sb_purchases")||"[]")}catch{return []}},
  wishlist(){try{return JSON.parse(localStorage.getItem("sb_wishlist")||"[]")}catch{return []}},
  savePurchases(v){localStorage.setItem("sb_purchases",JSON.stringify(v))},
  saveWishlist(v){localStorage.setItem("sb_wishlist",JSON.stringify(v))},
  money(n=1000){return new Intl.NumberFormat("sw-TZ",{style:"currency",currency:"TZS",maximumFractionDigits:0}).format(n).replace("TZS","TSh")},
  toast(msg){let t=document.querySelector(".toast");if(!t)return;t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2600)},
  theme(){document.documentElement.dataset.theme=localStorage.getItem("sb_theme")||"light"},
  toggleTheme(){let n=(localStorage.getItem("sb_theme")||"light")==="dark"?"light":"dark";localStorage.setItem("sb_theme",n);this.theme()},
  escape(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))},
  async load(){if(this.books.length)return this.books;this.books=await fetch("data/books.json").then(r=>r.json());return this.books},
  buy(id){location.href=`malipo.html?book=${encodeURIComponent(id)}`},
  toggleWish(id){let w=this.wishlist();w=w.includes(id)?w.filter(x=>x!==id):[...w,id];this.saveWishlist(w);this.toast(w.includes(id)?"Kitabu kimehifadhiwa ❤️":"Kitabu kimeondolewa kwenye Wishlist");return w},
  requireLogin(next){if(!this.user){location.href=`login.html?next=${encodeURIComponent(next||location.href)}`;return false}return true},
  purchased(id){return this.purchases().some(x=>x.bookId===id && x.status==="paid")},
  renderNav(){
    document.querySelectorAll("[data-user-name]").forEach(e=>e.textContent=this.user?.name||"Mgeni");
    document.querySelectorAll("[data-login]").forEach(e=>e.style.display=this.user?"none":"");
    document.querySelectorAll("[data-logout]").forEach(e=>e.style.display=this.user?"":"none");
  },
  logout(){localStorage.removeItem("sb_user");this.toast("Umetoka kwenye akaunti");setTimeout(()=>location.href="index.html",400)}
};
SB.theme();
document.addEventListener("click",e=>{
  if(e.target.closest("[data-theme-toggle]"))SB.toggleTheme();
  const l=e.target.closest("[data-logout]");if(l){e.preventDefault();SB.logout()}
});
window.addEventListener("DOMContentLoaded",()=>SB.renderNav());
