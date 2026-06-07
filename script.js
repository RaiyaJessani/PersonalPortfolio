function sc(id){
  const el=document.getElementById(id);
  if(el)el.scrollIntoView({behavior:'smooth'})
}
async function loadSection(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

window.addEventListener("DOMContentLoaded", async () => {
  await loadSection("hero", "sections/hero.html");
  await loadSection("about", "sections/about.html");
  await loadSection("experience", "sections/experience.html");
  await loadSection("skills", "sections/skills.html");
  await loadSection("projects", "sections/projects.html");
  await loadSection("certs", "sections/certs.html");
  await loadSection("contact", "sections/contact.html");
});