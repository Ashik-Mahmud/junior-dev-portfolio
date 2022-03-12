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


