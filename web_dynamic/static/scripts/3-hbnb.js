$('document').ready(function () {
    let amenities = {};
    $('INPUT[type="checkbox"]').change(function () {
      if ($(this).is(':checked')) {
        amenities[$(this).attr('data-id')] = $(this).attr('data-name');
      } else {
        delete amenities[$(this).attr('data-id')];
      }
      $('.amenities H4').text(Object.values(amenities).join(', '));
    });
    // API status check
    const url = 'http://' + window.location.hostname + ':5001/api/v1/status/';
  $.get(url, function (response) {
    if (response.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  });
  // Fetching places
  const placesUrl = apiUrl.replace('status/', 'places_search/');
  $.ajax({
      url: placesUrl,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: function (places) {
          places.forEach(place => {
              const article = `<article>
                  <div class="title_box">
                      <h2>${place.name}</h2>
                      <div class="price_by_night">$${place.price_by_night}</div>
                  </div>
                  <div class="information">
                      <div class="max_guest">${place.max_guest} Guests</div>
                      <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                      <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                  </div>
                  <div class="description">${place.description}</div>
              </article>`;
              $('section.places').append(article);
          });
      }
  });
