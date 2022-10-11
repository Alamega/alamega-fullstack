function anime() {
    const anime_stylesheet = document.createElement("style");
    anime_stylesheet.innerText = `
      body { 
        overflow-x: hidden;
        overflow-y: hidden;
      }
      .container * {
        animation: rotate 2s linear infinite;
      }
      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      @keyframes knock {
        from {
          transform: rotate(-25deg);
        }
        50% { 
          transform: rotate(25deg);
        }
        to {
          transform: rotate(-25deg);
        }
      }
      @keyframes move1 {
        from {
          margin-left: 200px;
        }
        50% { 
          margin-left: -200px;
        }
        to {
          margin-left: 200px;
        }
      }
      @keyframes move2 {
        from {
          margin-left: -200px;
        }
        50% { 
          margin-left: 200px;
        }
        to {
          margin-left: -200px;
        }
      }
    `;
    document.head.appendChild(anime_stylesheet);
    for (let i = 0; i < 12; i++) {
        const idol = document.createElement("img");
        idol.src = "/images/idol.png";
        idol.height = 128;
        idol.width = 128;
        idol.style.position = "absolute";
        idol.style.zIndex = "1000";
        idol.id = "idol";
        idol.style.top = Math.random() * window.innerHeight - 64 + "px";
        idol.style.left = Math.random() * window.innerWidth - 64 + "px";
        if (i%2===0) {
            idol.style.animation = "knock 0.4s linear infinite, move1 4s linear infinite";
        } else {
            idol.style.animation = "knock 0.4s linear infinite, move2 4s linear infinite";
        }
        idol.addEventListener("click", () => {
            idol.remove();
        })
        document.getElementsByClassName("container").item(0).appendChild(idol);
    }
    const intervalId = setInterval(() => {
        if (!document.getElementById("idol")) {
            document.getElementsByTagName("style")[1].remove();
            clearInterval(intervalId);
        }
    }, 1000)
}
