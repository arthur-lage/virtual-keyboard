const keyboardKeys = document.querySelectorAll(".keyboard-key");
const textContent = document.querySelector(".text-content");

textContent.value = "";

keyboardKeys.forEach((key) => {
  key.addEventListener("click", (e) => {
    if (e.target.dataset["function"]) {
      if (e.target.dataset["function"] === "backspace") {
        textContent.value = textContent.value.slice(0, -1);
      }
    }

    textContent.value += e.target.innerText;
  });
});
