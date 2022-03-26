const keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: "",
    capsLock: false,
  },

  init() {
    this.properties.value = "";
    document.querySelectorAll(".use-keyboard-input").forEach((element) => {
      element.value = ""
    })

    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys =
      this.elements.keysContainer.querySelectorAll(".keyboard__key");

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    document.querySelectorAll(".use-keyboard-input").forEach((input) => {
      input.addEventListener("focus", () => {
        this.open(input.value, (currentValue) => {
          input.value = currentValue;
        });
      });
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();

    const keyLayout = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "backspace",

      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",

      "caps",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "enter",

      "done",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      ",",
      ".",
      "?",

      "space",
    ];

    const createIconHTML = (icon) => {
      return `<i class="material-icons">${icon}</i>`;
    };

    keyLayout.forEach((key) => {
      const keyElement = document.createElement("button");

      const insertLineBreak =
        ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.innerHTML = createIconHTML("backspace");
          keyElement.classList.add("keyboard__key--wide");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );

            this._triggerEvent("oninput");
          });
          break;

        case "caps":
          keyElement.innerHTML = createIconHTML("keyboard_capslock");
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--activatable"
          );

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle(
              "keyboard__key--active",
              this.properties.capsLock
            );
          });

          break;

        case "enter":
          keyElement.innerHTML = createIconHTML("keyboard_return");
          keyElement.classList.add("keyboard__key--wide");

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";

            this._triggerEvent("oninput");
          });
          break;

        case "space":
          keyElement.innerHTML = createIconHTML("space_bar");
          keyElement.classList.add("keyboard__key--extrawide");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";

            this._triggerEvent("oninput");
          });

          break;

        case "done":
          keyElement.innerHTML = createIconHTML("check_circle");
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--dark"
          );

          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });
          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();

            this._triggerEvent("oninput");
          });
          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    if (this.properties.capsLock) {
      this.elements.keys.forEach((key) => {
        if (!key.classList.contains("keyboard__key--wide")) {
          key.textContent = key.textContent.toUpperCase();
        }
      });
    } else {
      this.elements.keys.forEach((key) => {
        if (!key.classList.contains("keyboard__key--wide")) {
          key.textContent = key.textContent.toLowerCase();
        }
      });
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  },
};

window.addEventListener("DOMContentLoaded", () => {
  keyboard.init();
});
