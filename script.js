'use strict';

const apiKey = 'rJT2LIKjSeINJ5c68QGIQ7z620EUldTNl3XqYqni';
const searchURL = 'https://api.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
  return queryItems.join('&');
};

function searchNationalParks(query, maxResults) {
  console.log('searchNationalParks ran', query, maxResults);
  const params = {
    api_key: apiKey,
    stateCode: query,
    limit: maxResults,
  };

  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(error => {
      $('.results-list').empty();
      $('#js-error').text(`Something went wrong: ${error.message}`);
    });
};

function displayResults(responseJson, maxResults){
  console.log(responseJson);
  $('.results-list').empty();
  for (let i = 0; i < responseJson.data.length & i<maxResults; i++) {
    $('.results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>Description: ${responseJson.data[i].description}</p>
      <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>
      </li>`
    )
  };
  $('.results').removeClass('hidden');
};

function handleUserSubmit() {
    console.log('handleUserSubmit ran');
  $('.search-form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#state-input').val();
    const maxResults = $('#max-results-input').val();
    searchNationalParks(searchTerm, maxResults || 10);
  });
};

$(function() {
  console.log('App loaded, awaiting user submit');
  handleUserSubmit();
});
