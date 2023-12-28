$(document).ready(function () {
  dataTableProperties();
  });

function getAllCountries() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  clearDataTable();
  fetch("https://restcountries.com/v3.1/all", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      var countries = JSON.parse(result);

      var tbody = document.getElementById("table-body");
      countries.forEach((country) => {
        var tr = document.createElement("tr");
        tr.innerHTML =
          `<td>${country.name.official}</td>` +
          `<td>${country.name.common}</td>` +
          `<td>${country.translations.spa.common}</td>` +
          `<td>${country.translations.spa.official}</td>` +
          `<td>${
            Array.isArray(country.capital) && country.capital.length > 0
              ? country.capital[0]
              : "-"
          }</td>` +
          `<td>${country.region}</td>` +
          `<td>${'<button openBtn class = "action-btn" onclick="openModal()">Info</button>'}</td>`;
        tbody.appendChild(tr);
      });
    });
}

function getCountriesByName() {
  var name = document.getElementById("search-input").value;
  if (name === "" || name === undefined) {
    getAllCountries();
    return;
  }
  document.getElementById("search-input").value = "";
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  clearDataTable();
  var tbody = document.getElementById("table-body");
  fetch("https://restcountries.com/v3.1/name/" + name, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      var countries = JSON.parse(result);
      countries.forEach((country) => {
        var tr = document.createElement("tr");
        tr.innerHTML =
          `<td>${country.name.official}</td>` +
          `<td>${country.name.common}</td>` +
          `<td>${country.translations.spa.common}</td>` +
          `<td>${country.translations.spa.official}</td>` +
          `<td>${
            Array.isArray(country.capital) && country.capital.length > 0
              ? country.capital[0]
              : "-"
          }</td>` +
          `<td>${country.region}</td>` +
          `<td>${'<button class = "action-btn">Info</button>'}</td>`;
        tbody.appendChild(tr);
      });
    })
    .catch((error) => console.log("error", error));
}

function getModalInfo(name) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://restcountries.com/v3.1/name/" + name, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}


function clearDataTable() {
  var dataTable = $("#main-table").DataTable();
  dataTable.clear().draw();
}

function dataTableProperties() {
  $("#main-table").DataTable({
    select: true,
    bSort: true,
    paging: true,
    pageLength: 10,
    lengthMenu: [10, 20, 30],

    columns: [
      { orderable: false },
      { orderable: false },
      { orderable: false },
      { orderable: false },
      { orderable: false },
      { orderable: false },
      { orderable: false },
    ],
    language: {
      search: "Búsqueda:  ",
      paginate: {
        show: "Mostrando",
        first: "Primer",
        previous: "Anterior",
        next: "Siguiente",
        last: "Ultimo",
      },
      info: "Mostrando página _PAGE_  de _PAGES_",
      infoEmpty: " ",
      emptyTable: " ",
    },
  });
}

function openModal(){
  const modal = document.querySelector("[modal]");
  modal.showModal();
}

function closeModal(){
  const modal = document.querySelector("[modal]");
  modal.close();
}