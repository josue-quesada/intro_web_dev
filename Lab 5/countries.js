function getAllCountries() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://restcountries.com/v3.1/all", requestOptions)
        .then(response => response.text())
        .then(result => console.log(JSON.parse(result)))
        .catch(error => console.log('error', error));
};

function getCountriesByName(){
  var name = document.getElementById("search-input").value;
  if(name === "" || name === undefined){
    getAllCountries()
    return;
  }
  document.getElementById("search-input").value = "";
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://restcountries.com/v3.1/name/" + name, requestOptions)
    .then(response => response.text())
    .then(result => {
      var countries = JSON.parse(result);
      var tbody = document.getElementById("table-body");
      countries.forEach(country => {
        let row = tbody.insertRow();
        let name = row.insertCell(0);
        name.innerHTML = country.name.official;
        let commonName = row.insertCell(1);
        commonName.innerHTML = country.name.common;
        let spanishName = row.insertCell(2);
        spanishName.innerHTML = country.translations.spa.common;
        let officialName = row.insertCell(3);
        officialName.innerHTML = country.translations.spa.official;
        let capital = row.insertCell(4);
        capital.innerHTML = country.capital[0];
        let region = row.insertCell(5);
        region.innerHTML = country.region;
        let button = row.insertCell(6);
        button.innerHTML = '<button class = "action-btn">Acciones</button>';
      });

    })
    .catch(error => console.log('error', error));
}