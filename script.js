const tabs_container = document.querySelector(".tabs-container");
const tabs = document.querySelectorAll(".tab");
const trash_icon = document.querySelectorAll(".trash-icon");
const tick_icon = document.querySelectorAll(".tick");
const cross_icon = document.querySelectorAll(".cross");
let arr = [];
function activeTab(e) {
  if (!e.target.classList.contains("tab")) return;
  tabs.forEach((tab) => tab.classList.remove("active"));
  e.target.classList.add("active");
}

function startEditTabName(e) {
  if (!e.target.classList.contains("tab")) return;

  e.target.setAttribute("contenteditable", "true");
  e.target.focus();
}
function endEditTabName(e) {
  if (e.target.classList.contains("tab")) return;

  e.target.removeAttribute("contenteditable");
}

function validateTabNames(e) {
  if (!e.target.classList.contains("tab")) return;

  const userInput = e.target.innerText.trim().toLowerCase();

  if (userInput == "") {
    e.target.classList.add("duplicate");
  } else if (arr.includes(userInput)) {
    e.target.classList.add("duplicate");
    e.target.classList.remove("unique");
  } else {
    e.target.classList.add("unique");
    e.target.classList.remove("duplicate");
  }

  arr = Array.from(tabs)
    .filter((tab) => tab !== e.target)
    .map((tab) => tab.textContent.trim().toLowerCase());
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
  e.target.closest(".tab").remove();
}
function denyDelete(e) {
  if (!e.target.classList.contains("cross")) return;
  e.target.closest(".overlay").style.display = "none";
}

tabs_container.addEventListener("click", activeTab);
tabs_container.addEventListener("dblclick", startEditTabName);
tabs_container.addEventListener("click", endEditTabName);
tabs_container.addEventListener("input", validateTabNames);
tabs_container.addEventListener("click", deleteTab);
tabs_container.addEventListener("click", confirmDelete);
tabs_container.addEventListener("click", denyDelete);
