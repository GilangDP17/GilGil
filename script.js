// Teks profesi yang mengetik otomatis (ubah sesuai kamu)
const roles=["Cyber Security Enthusiast","Network Engineering Student","Web Developer"];
const el=document.getElementById("typing");let r=0,c=0,del=false;
(function type(){
  const w=roles[r];el.textContent=w.slice(0,c);
  if(!del&&c===w.length){del=true;return setTimeout(type,1500)}
  if(del&&c===0){del=false;r=(r+1)%roles.length}
  c+=del?-1:1;setTimeout(type,del?45:90);
})();

// Muncul saat di-scroll, isi lingkaran skill, hitung angka
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;
  const t=e.target;t.classList.add("show");
  t.querySelectorAll(".dial").forEach(d=>d.style.setProperty("--p",d.dataset.p));
  t.querySelectorAll("[data-n]").forEach(n=>{
    const to=+n.dataset.n;let i=0;
    const id=setInterval(()=>{i++;n.textContent=i+"+";if(i>=to)clearInterval(id)},90);
  });
  io.unobserve(t);
}),{threshold:.15});
document.querySelectorAll(".reveal").forEach(s=>io.observe(s));

// Foto miring mengikuti mouse + bar progress scroll
const ph=document.getElementById("photo");
document.addEventListener("mousemove",e=>{
  const x=(e.clientX/innerWidth-.5)*12,y=(e.clientY/innerHeight-.5)*-12;
  ph.style.transform=`perspective(700px) rotateY(${x}deg) rotateX(${y}deg)`;
});
addEventListener("scroll",()=>{
  const h=document.documentElement;
  document.getElementById("progress").style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+"%";
});
document.getElementById("year").textContent=new Date().getFullYear();