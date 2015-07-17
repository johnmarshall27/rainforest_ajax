// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).on('ready', function() {
  $('#search-form').on('submit', function(e) {
    e.preventDefault();
    var searchValue = $('#search').val();

    // The most basic request!
    $.ajax({
      url: '/products?search=' + searchValue,
      dataType: 'html',
      method: 'GET',
      success: function(data) {
        $('#products').html(data);
      }
    });

    // use this for GET request shorthands
    // $.get({
    //   url: '/products?search=' + searchValue,
    //   dataType: 'html',
    //   success: function(data) {
    //     $('#products').html(data);
    //   }
    // });

    // even shorter
    // $.get('/products?search=' + searchValue, 'html', function() {
    //   $('#products').html(data);
    // });

    // use dataType 'script', meaning we don't need a success callback
    // since the server will give us JS back automatically
    // $.ajax({
    //   url: '/products?search=' + searchValue,
    //   method: 'GET',
    //   dataType: 'script'
    // });

    // refactor previous request with shorthand!
    // $.getScript('/products?search=' + searchValue);
  });


  // 1. When user scrolls near the bottom of the page
  // 2. Send an AJAX request to fetch next set
  // 3. Use the response to update the page
  // 4. Don't load more if we're at the end

  var nextPageUrl;

  $(window).on('scroll', function(e) {
    var $window = $(window);
    var bottomOfWindow = $window.scrollTop() + $window.height();
    var distanceFromBottom = $(document).height() - bottomOfWindow;
    var proposedNextPageUrl = $('.page > a[rel=next]').attr('href');

    // console.log(distanceFromBottom);

    if ( distanceFromBottom <= 100 && (nextPageUrl !== proposedNextPageUrl) ) {
      nextPageUrl = proposedNextPageUrl;

      console.log("near the bottom!");

      $.ajax({
        url: nextPageUrl,
        type: 'GET',
        dataType: 'script'
        // success: function(result) {
        //   $('#products').append(result);
        // }
      })
    }
  });














});
