var sitename = document.getElementById("sitename");
var sitelink = document.getElementById("sitelink");
var Submitbtn = document.getElementById("btn");
var namerules = document.getElementById("nameRules");
var linkrules = document.getElementById("linkRules");
var tableContent = document.getElementById("tableContent");
var DeleteAllbtn = document.getElementById("Dall");

Submitbtn.onclick = () => {
  Submit();
};

DeleteAllbtn.onclick = () => {
  DeleteAll();
};

var siteArr;

if (localStorage.getItem("list")) {
  siteArr = JSON.parse(localStorage.getItem("list"));
  display();
} else {
  siteArr = [];
}

function Submit() {
  Valid();
  if (sitenameRegex() && siteUrlRegex()) {
    var site = {
      name: sitename.value,
      link: sitelink.value,
    };
    siteArr.push(site);
    localStorage.setItem("list", JSON.stringify(siteArr));
    display();
    Clear();
  } else {
    notValid();
  }
}

function display() {
  if (localStorage.length) {
    var box = "";
    for (let i = 0; i < siteArr.length; i++) {
      box += `
      <tr>
      <td>${i + 1}</td>
      <td>${siteArr[i].name}</td>
      <td>
      <button class="btn btn-visit">
      <a
      href="http://${siteArr[i].link}"
      target="_blank"
      class="text-white text-decoration-none"
      >
      <i class="fa-solid fa-eye pe-md-1" style="color: white"></i>
      Visit
      </a>
      </button>
      </td>
      <td>
      <button class="btn btn-delete">
      <a
      onclick="Delete(${i})"
      class="text-white text-decoration-none"
      >
      <i
      class="fa-solid fa-trash pe-md-1"
      style="color: #ffffff"
      ></i>
      Delete
      </a>
      </button>
      </td>
      </tr>
      `;
    }
    tableContent.innerHTML = box;
  } 

  else {
    tableContent.innerHTML = "";
  }
}

function Delete(index) {
  siteArr.splice(index, 1);
  
  localStorage.setItem("list", JSON.stringify(siteArr));
  display();
}

function Clear() {
  sitename.value = "";
  sitelink.value = "";
}

function Valid() {
  if (sitenameRegex()) {
    namerules.innerHTML = "";
  }
  if (siteUrlRegex()) {
    linkrules.innerHTML = "";
  }
}

function sitenameRegex() {
  var Regex = /^\w{3,}$/;
  return Regex.test(sitename.value);
}

function siteUrlRegex() {
  var Regex =
  /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?$/;
  return Regex.test(sitelink.value);
}

function notValid() {
  if (!sitenameRegex()) {
    if (sitename.value === "") {
      namerules.innerHTML = "Site name is requred.";
    } else
    namerules.innerHTML =
    "'Not match, Site name must contain at least 3 characters.'";
  }
  if (!siteUrlRegex()) {
    if (sitelink.value === "") {
      linkrules.innerHTML = "Website URL is requred.";
    } else
    linkrules.innerHTML =
    "Not match, Site URL must be a valid one. <br> Note: Do not start with http:// or https:// .";
  }
}

function DeleteAll() {
  localStorage.clear();
  display();
}
