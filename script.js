function sc(id){
  const el=document.getElementById(id);
  if(el)el.scrollIntoView({behavior:'smooth'})
}
async function loadSection(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

const images = [
  "assets/Character_1.png",
  "assets/Character_2.png",
  "assets/Character_3.png",
  "assets/Character_4.png"
];

function setHeroImage() {
  const imgEl = document.getElementById("heroImage");

  const hasVisited = localStorage.getItem("hasVisited");

  if (!hasVisited) {
    // FIRST EVER VISIT → always pick first image
    imgEl.src = images[0];

    localStorage.setItem("hasVisited", "true");
  } else {
    // AFTER THAT → random every reload
    const randomIndex = Math.floor(Math.random() * images.length);
    imgEl.src = images[randomIndex];
  }
}

async function loadLatestBlog() {
  const res = await fetch("blog/generated/index.json");
  const data = await res.json();
  const latestWeekId = data.latestWeek;
  const latestWeek = data.weeks.find(w => w.id === latestWeekId);
  const latestPost = latestWeek.posts[0];
  const container = document.getElementById("latest-blog");
  container.innerHTML = `
    <a href="blog/index.html" style="text-decoration:none;color:inherit">
      <div class="project-card">
        <span class="project-num">LATEST</span>
        <span class="project-cat">${latestWeek.week}</span>
        <div class="project-name">${latestPost.title}</div>
        <p class="project-desc">
          ${latestPost.summary}
        </p>

        <div style="display:flex;gap:6px;flex-wrap:wrap">
          ${latestPost.tags.map(t => `<span class="tech-tag">${t}</span>`).join("")}
        </div>
      </div>
    </a>
  `;
}


window.addEventListener("DOMContentLoaded", async () => {
  await loadSection("hero", "sections/hero.html");
  await loadSection("about", "sections/about.html");
  await loadSection("blog", "sections/blog.html");
  await loadSection("experience", "sections/experience.html");
  await loadSection("skills", "sections/skills.html");
  await loadSection("projects", "sections/projects.html");
  await loadSection("certs", "sections/certs.html");
  await loadSection("contact", "sections/contact.html");
  setHeroImage();
  loadLatestBlog();
});