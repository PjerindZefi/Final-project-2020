jQuery(document).ready(function ($) {
    console.log("Page loaded");
    // function for game list
    function createConsolesListItem(consoles) {
      var $li = $("<li>");
      $li.addClass("list-group-item hover-invert cursor-pointer list-bg-color list-item-font");
      $li.html(consoles.id + ") " + consoles.name);
      $li.data("consolesId", consoles.id);
      return $li;
    }

    //message to user to click on a title for more info
    $("#click-for-info").addClass("display-4 text-center");
    $("#click-for-info").html("Select a game");

    //all the content will stay clear
    $("#card").addClass("d-none");

    //making API request
    var request = axios.get("http://csc225.mockable.io/consoles");

    //functions will run after success for access to API
    request.then(function (response) {
      //using foreach
      response.data.forEach(function (consoles) {
        $("#consoles-list").append(createConsolesListItem(consoles));
        //hide loading message
        $("#loading-consoles-list").addClass("d-none");
      });

      //user select the game
      $(".list-group-item").on("click", function () {

        //clear the card game
        $("#consoles-info").addClass("d-none");

        //info card
        $("#card").removeClass("d-none");

        //clears loading notification
        $("#loading-notification").removeClass("d-none");

        //display none
        $("#loading-img").removeClass("d-none");

        //hides message for user to select a game
        $("#click-for-info").addClass("d-none");

        //previously games are no longer active
        $(".list-group-item").removeClass("active");

        //targets game id
        var consolesId = $(this).data("consolesId");

        //game is active
        $(this).addClass("active");

        //link for loading image
        var $img = $("<img>")
        .attr("src", "https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif")
          .attr("alt", "https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif");

        //inserts loading image
        $("#loading-img").html($img);
        $("#loading-img").addClass("text-center");

        //request axios
        axios
          .get("http://csc225.mockable.io/consoles/" + consolesId)
          .then(function (response) {
           
            //hides info untill everything is loaded
            $("#loading-notification").addClass("d-none");

            //hides image untill game cover will be loaded
            $("#loading-img").addClass("d-none");

            //game-info
            $("#consoles-info").removeClass("d-none");

            //game cover
            var $img = $("<img>")
              .attr("src", response.data.image)
              .attr("alt", response.data.image);
            $("#consoles-cover").html($img);

             //number
             $("#consoles-id").html("Nr: " + response.data.id);

            //name
            $("#consoles-name").html("Name: " + response.data.name);

            //price
           $("#consoles-price").html("Price: " + response.data.price);

           //country
           $("#consoles-country").html("Country: " + response.data.country);

            //year
            $("#consoles-releaseYear").html("Year: " + response.data.releaseYear);
          });
      });
    });
  });
