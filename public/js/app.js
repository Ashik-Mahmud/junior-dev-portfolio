/*
TODO:
- Initialization Mixitup
-
-
-
-

*/


/* STEP: Select All important Elements using function */
const elementById = name => document.getElementById(name);
const htmlElement = document.querySelector("html");

/*STEP: Set portfolios data from JavaScript file */
const loadPortfolios = async () =>{
    const response = await fetch('./../../data/portfolios.json');
    const data = await response.json();
    displayPortfolios(data)
}
const displayPortfolios = (portfolios) =>{
    // get unique technologies & display 
    let toolsArr = [];
    portfolios.forEach((portfolio) =>portfolio.tools.forEach((tool) =>(toolsArr.indexOf(tool) === -1) && toolsArr.push(tool)));

    const toolsContent = toolsArr.map(tool => `<li type="button" data-filter=".${tool}">${tool}</li>`).join('');
    elementById("filter-button-wrapper").innerHTML += toolsContent;

    // get a portfolios card & display 
    portfolios.forEach((portfolio)=>{
       const dependencies = portfolio.dependencies.map(dependency => `${dependency}`).join(' ');
       const tools = portfolio.usingTools.map(tool => `<span>${tool}</span>`).join('');
        elementById("portfolio-content").innerHTML += `
                            <div class="card mix ${dependencies} all">
                                <img
                                src="${portfolio.image}"
                                alt="${portfolio.title}"
                                />
                                <div class="info">
                                <h3>${portfolio.title}</h3>
                                <div class="technologies">${tools}</div>
                                <div class="btns-group">
                                    <a target="_blank" href="${portfolio.liveUrl ? portfolio.liveUrl : `https://dev-ashikmahmud.netlify.app/#portfolios`}"><i class="bx bx-link-alt"></i> Live Preview</a>
                                </div>
                                </div>
                            </div>`;

    })
    // initialization mixitup 
    const mixer = mixitup(".portfolio-content"); 
    sr.reveal('.card', { distance: '20px', scale: 0.9, origin: 'bottom', delay: 850 });

}

loadPortfolios();

/* STEP: active when menus link clicked */
const menuLinks = elementById("menus").querySelectorAll("li");
menuLinks.forEach(link =>{
    link.addEventListener("click", ()=>{
        menuLinks.forEach(link => link.classList.remove('active'));
        link.classList.add('active');
        link.querySelector('a').click();
    })
})

/* STEP: header fixed when user scrolling of this website */
window.addEventListener("scroll", (event)=>{
    let scrollHeight = event.path[1].scrollY;
    (scrollHeight > 150)? elementById("header").classList.add("active-header") : elementById("header").classList.remove("active-header");
})


/* STEP: set toggle theme changer  */
elementById("toggle-theme-btn").addEventListener("click", (event)=>{
    htmlElement.classList.toggle("_dark");
    let themeSlug = getTheme();
    themeSlug = "_dark";
    if(htmlElement.classList.contains("_dark")){
        localStorage.setItem("theme", themeSlug);
    }else{
        localStorage.removeItem("theme");
    }
    setDarkMode()
})
const getTheme = () =>{
    const themeClass = localStorage.getItem("theme");
    let themeSlug = themeClass ? themeClass : '';
    return themeSlug;
}
const setDarkMode = () => {
        if(getTheme()) {
            htmlElement.classList.add("_dark") 
            elementById("toggle-theme-btn").querySelector("i").classList.remove("bx-moon");
            elementById("toggle-theme-btn").querySelector("i").classList.add("bx-sun");
         }else{
            htmlElement.classList.remove("_dark");
            elementById("toggle-theme-btn").querySelector("i").classList.add("bx-moon");
            elementById("toggle-theme-btn").querySelector("i").classList.remove("bx-sun");
         } 
};
setDarkMode();


/* STEP: Scroll Reveal animation */
window.sr = ScrollReveal();

// animation for hero area 
sr.reveal('.navbar__logo');
sr.reveal('#toggle-theme-btn', { delay: 300 });
sr.reveal('.subtitle', { delay: 500 });
sr.reveal('.name', { delay: 600 });
sr.reveal('.designation', { delay: 700 });
sr.reveal('.btn-group', { delay: 850 });
sr.reveal('.social-btn-group', { distance: '20px', origin: 'top', delay: 750 });
sr.reveal('.hero-scroll-down', { distance: '20px', origin: 'top', delay: 750 });
sr.reveal('.hero-image', { distance: '20px', scale: 0.5, origin: 'top', delay: 850 });

// Animation for almost area 
sr.reveal('.about-image', { distance: '20px', origin: 'left', delay: 850 });
sr.reveal('.about-text-content', { distance: '20px', origin: 'right', delay: 850 });
sr.reveal('.card', { distance: '20px', scale: 0.8, origin: 'bottom', delay: 850 });
sr.reveal('.single-offer', { distance: '20px', scale: 0.9, origin: 'bottom', delay: 850 });
sr.reveal('.filter-buttons', { distance: '10px', origin: 'bottom', delay: 650 });

// animation menus 
sr.reveal('#menus', { distance: '50px', origin: 'bottom', delay: 1000 });


/* STEP: gumshoe enabled */
var spy = new Gumshoe("#menus a");


/* STEP: Config Particle JS*/

window.addEventListener('DOMContentLoaded', (event) => {
particlesJS("particles-js", {
    particles: {
      number: { value: 160, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: {
        type: "circle",
        stroke: { width: 0, color: "#000000" },
        polygon: { nb_sides: 5 },
        image: { src: "img/github.svg", width: 100, height: 100 },
      },
      opacity: {
        value: 1,
        random: true,
        anim: { enable: true, speed: 1, opacity_min: 0, sync: false },
      },
      size: {
        value: 2,
        random: true,
        anim: { enable: false, speed: 4, size_min: 0.3, sync: false },
      },
      line_linked: {
        enable: false,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 600 },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "bubble" },
        onclick: { enable: true, mode: "repulse" },
        resize: true,
      },
      modes: {
        grab: { distance: 400, line_linked: { opacity: 1 } },
        bubble: {
          distance: 250,
          size: 0,
          duration: 2,
          opacity: 0,
          speed: 3,
        },
        repulse: { distance: 400, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 },
      },
    },
    retina_detect: true,
  });
  var count_particles, stats, update;
  stats = new Stats();
  stats.setMode(0);
  stats.domElement.style.position = "absolute";
  stats.domElement.style.left = "0px";
  stats.domElement.style.top = "0px";
  document.body.appendChild(stats.domElement);
  count_particles = document.querySelector(".js-count-particles");
  update = function () {
    stats.begin();
    stats.end();
    if (
      window.pJSDom[0].pJS.particles &&
      window.pJSDom[0].pJS.particles.array
    ) {
      count_particles.innerText =
        window.pJSDom[0].pJS.particles.array.length;
    }
    requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
});