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