(function(){
  const themeKey = "mds_theme";
  const root = document.documentElement;
  const themeBtn = document.getElementById("themeBtn");
  const icon = document.getElementById("themeIcon");

  function setTheme(mode){
    if(mode === "light") root.setAttribute("data-theme","light");
    else root.removeAttribute("data-theme");
    localStorage.setItem(themeKey, mode);
    icon.textContent = (mode === "light") ? "☀" : "☾";
  }
  const saved = localStorage.getItem(themeKey);
  if(saved === "light") setTheme("light");
  else icon.textContent = "☾";
  themeBtn.addEventListener("click", ()=> setTheme(root.getAttribute("data-theme")==="light" ? "dark" : "light"));

  const drawer = document.getElementById("drawer");
  document.getElementById("menuBtn").addEventListener("click", ()=> drawer.setAttribute("aria-hidden","false"));
  drawer.addEventListener("click", (e)=>{
    if(e.target === drawer || e.target.hasAttribute("data-close")){
      drawer.setAttribute("aria-hidden","true");
    }
  });

  const els = Array.from(document.querySelectorAll(".reveal"));
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        en.target.classList.add("show");
        io.unobserve(en.target);
      }
    });
  },{threshold: 0.15});
  els.forEach(el=> io.observe(el));

  const form = document.getElementById("contactForm");
  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const fd = new FormData(form);
    const name = (fd.get("name")||"").toString().trim();
    const email = (fd.get("email")||"").toString().trim();
    const message = (fd.get("message")||"").toString().trim();
    const subject = encodeURIComponent(`Portfolio contact from ${name || "someone"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}\n`);
    window.location.href = `mailto:itsmd.shahabuddin@gmail.com?subject=${subject}&body=${body}`;
  });

  const y = document.getElementById("year");
  if(y) y.textContent = new Date().getFullYear();

  fetch("settings.json", {cache: "no-store"})
    .then(r=> r.ok ? r.json() : null)
    .then(cfg=>{
      if(!cfg) return;
      const gh = document.getElementById("githubLink");
      const li = document.getElementById("linkedinLink");
      if(cfg.github) gh.href = cfg.github;
      if(cfg.linkedin) li.href = cfg.linkedin;
    })
    .catch(()=>{});
})();