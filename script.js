const tabs_container = document.querySelector(".tabs-container");
let tabs = document.querySelectorAll(".tab");
let tabs_text = document.querySelectorAll(".tab-text");
const main_container = document.querySelector(".main");
let arr = [];

function updateArray() {
  arr = Array.from(tabs_text).map((tab) =>
    tab.textContent.trim().toLowerCase()
  );
}

function activeTab(e) {
  if (!e.target.closest(".tab")) return;

  tabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  tabs_text.forEach((tabText) => {
    tabText.classList.remove("unique");
  });

  e.target.closest(".tab").classList.add("active");
}

function startEditTabName(e) {
  if (!e.target.classList.contains("tab-text")) return;

  e.target.setAttribute("contenteditable", "true");
  e.target.focus();
}

function endEditTabName(e) {
  if (e.target.classList.contains("tab-text")) return;

  e.target.removeAttribute("contenteditable");
  tabs_text.forEach((tabText) => {
    tabText.classList.remove("unique");
  });
}

function validateTabNames(e) {
  if (!e.target.closest(".tab")) return;

  const userInput = e.target.innerText.trim().toLowerCase();

  updateArray();

  if (userInput === "") {
    e.target.classList.add("duplicate");
  } else if (arr.filter((name) => name === userInput).length > 1) {
    e.target.classList.add("duplicate");
    e.target.classList.remove("unique");
  } else {
    e.target.classList.add("unique");
    e.target.classList.remove("duplicate");
  }

  console.log("validate tab names", arr);
}

function deleteTab(e) {
  if (!e.target.classList.contains("trash-icon")) return;
  addOverlayConfirm(e);
}

function addOverlayConfirm(e) {
  const tab = e.target.closest(".tab");
  if (tab) {
    const overlay = tab.querySelector(".overlay");
    if (overlay) {
      overlay.style.display = "flex";
    }
  }
}

function confirmDelete(e) {
  if (!e.target.classList.contains("tick")) return;

  const tabToRemove = e.target.closest(".tab");
  if (!tabToRemove) return;

  tabToRemove.remove();

  tabs = document.querySelectorAll(".tab");
  tabs_text = document.querySelectorAll(".tab-text");

  updateArray();

  console.log("Array after deletion: ", arr);
}

function denyDelete(e) {
  if (!e.target.classList.contains("cross")) return;
  e.target.closest(".overlay").style.display = "none";
}

tabs_container.addEventListener("click", activeTab);
tabs_container.addEventListener("click", startEditTabName);
main_container.addEventListener("click", endEditTabName);
tabs_container.addEventListener("input", validateTabNames);
tabs_container.addEventListener("click", deleteTab);
tabs_container.addEventListener("click", confirmDelete);
tabs_container.addEventListener("click", denyDelete);
