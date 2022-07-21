function getByakByak() {
    var styleSheet = document.createElement("style");
    styleSheet.innerText = `
    * {
        animation: rotate 5s linear infinite;
      }
      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `;
    document.head.appendChild(styleSheet);
}
