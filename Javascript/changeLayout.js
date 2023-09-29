const changeLayout = (() => {
  const fontsLink = document.getElementById('fonts');
  const layoutsLink = document.getElementById('layout');
  const menu = document.querySelector("#open-close");
  const icon = document.querySelector(".fa-solid");
  const selectorMain = document.querySelector("#selectorMain");

  /* call json data */
  async function populate() {
    const request = new Request('/DWLivePreviews/Javascript/layouts.json');
    const response = await fetch(request);
    const layouts = await response.json();
    /* calls the functions */
    random(layouts[0]);
    selector(layouts[0]);
  };
  populate();


  const fonts = (layout) => {
    let fontsArr = layout["Fonts"];
    let list = [];
    for (let i = 0; i < fontsArr.length; i++) {
      list.push(`&family=${fontsArr[i]}`);
    };
    return `https://fonts.googleapis.com/css2?${list.join('')}&display=swap`;
  };

  const random = (layouts) => {
    let randNumb = Math.floor(Math.random() * Object.keys(layouts).length);
    let key = Object.keys(layouts)[randNumb];
    fontsLink.href = fonts(layouts[key]);
    layoutsLink.href = layouts[key]["URL"];
  }

  /* selector DOM */

  const selector = (layouts) => {
    let length = Object.keys(layouts).length;
    for (let i = 0; i < length; i++) {
      let key = Object.keys(layouts)[i];
      let imageBlock = document.createElement("div");
      imageBlock.setAttribute("class", "imageBlock");
      imageBlock.setAttribute("id", `${key}`)
      imageBlock.style.background = `center/cover url('${layouts[key]["Image"]}')`;
      imageBlock.textContent = `${layouts[key]["Title"]}`;
      imageBlock.addEventListener('click', () => {
        fontsLink.href = fonts(layouts[key]);
        layoutsLink.href = layouts[key]["URL"];
        selectorMain.style.top = "-120vh";
        icon.className = "fa-solid fa-bars";
      });
      selectorMain.appendChild(imageBlock);
    }
  }

  /* menu dom */

  menu.addEventListener("click", () => {
    if (icon.className.includes("fa-bars")) {
      selectorMain.style.top = "0";
      icon.className = "fa-solid fa-xmark";
    } else {
      selectorMain.style.top = "-120vh";
      icon.className = "fa-solid fa-bars";
    }
  })
})();
