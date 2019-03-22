'use strict'

function formatQueryUrl(queryParam){
  const npsApi = 'https://developer.nps.gov/api/v1/parks?';
  const queryString = Object.keys(queryParam).map(key=>encodeURIComponent(key)+'='+encodeURIComponent(queryParam[key])).join('&');
  return npsApi + queryString


};

function getResults(stateCode,maxResults=10){
  const param = {
    api_key:'4sC0qMZ7q0QFCeSm8v2zJIlMHughxVfGNZU3Np77',
    stateCode:stateCode,
    limit:maxResults
  }
  const url = formatQueryUrl(param);
  console.log(url)
  fetch(url)
  .then(response => {
    if(response.ok){
      return response.json();
    }
    throw new Error(response.statusText)
  })
  .then(responseJson=>displayResults(responseJson))
  .catch(error=>$('.results-list').text(error.message))

};

// display results of API call
function displayResults(responseJson){
  $('.results-list').empty();
  if (responseJson.total === 0){
    $('.results-list').text('No results for state listed. Try another state.')
  }
  else {
      var i
      for (i=0;i<responseJson.data.length;i++){
        console.log(responseJson.data[i].fullName)
        console.log(responseJson.data[i].description)
        console.log(responseJson.data[i].url)
        $('.results-list').append(`<h3><a href =${responseJson.data[i].url}>${responseJson.data[i].fullName}</a></h3><p>${responseJson.data[i].description}</p>`)
      }
  }
  $('section').removeClass('hidden')
};

function watchSubmit(){
  $('form').on('submit',event=>{
    event.preventDefault();
    const stateCode = $('.state-code').val();
    const maxResults = $('.max-results').val();
    getResults(stateCode,maxResults)
  });
  
};

$(watchSubmit);
