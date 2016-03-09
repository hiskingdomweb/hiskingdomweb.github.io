$("#checkAll").change(function(){
  if($(this).is(':checked')){
    $(".hobby:checkbox").prop("checked", true);
  }
  else{
    $(".hobby:checkbox").prop("checked", false);
  }
})

$('#musicLover').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
            '<li>Playing an Instrument</li>'+
            '<li>Singing and Choir</li>'+
            '<li>Concerts</li>'+
            '<li>Music History Studies</li>'+
            '<li>Produce Music</li>'+
            '<li>Band Promotion</li>'+
            '<li>Teaching Music</li>'+
            '<li>Music Collection</li>'+
            '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});

$('#stressRelief').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
            '<li>Yoga</li>'+
            '<li>Meditation</li>'+
            '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});

$('#kidsFamilies').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
                '<li>Model Trains/Planes/Cars</li>'+
                '<li>Scenic Travel by Train</li>'+
                '<li>Remote Controlled Toys</li>'+
                '<li>Building with Legos</li>'+
                '<li>Magic Tricks</li>'+
                '<li>Kite Flying</li>'+
                '<li>Zoos</li>'+
                '<li>Cruising the Seas</li>'+
                '<li>Puppetry</li>'+
                '<li>Juggling</li>'+
                '<li>Collecting</li>'+        
                '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});

$('#kidsFamilies').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
                '<li>Model Trains/Planes/Cars</li>'+
                '<li>Scenic Travel by Train</li>'+
                '<li>Remote Controlled Toys</li>'+
                '<li>Building with Legos</li>'+
                '<li>Magic Tricks</li>'+
                '<li>Kite Flying</li>'+
                '<li>Zoos</li>'+
                '<li>Cruising the Seas</li>'+
                '<li>Puppetry</li>'+
                '<li>Juggling</li>'+
                '<li>Collecting</li>'+        
                '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});
$('#outdoors').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
                '<li>Fishing</li>'+
                '<li>Noodling</li>'+
                '<li>Boating</li>'+
                '<li>Hiking</li>'+
                '<li>Camping</li>'+
                '<li>RVing</li>'+
                '<li>Horseback Riding</li>'+
                '<li>Geo-caching</li>'+
                '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});

$('#sportsFitness').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
                '<li>Biking</li>'+
                '<li>Baseball/Softball</li>'+
                '<li>Volleyball</li>'+
                '<li>Walking</li>'+
                '<li>Marathons</li>'+
                '<li>Tennis</li>'+
                '<li>Golf</li>'+
                '<li>Skiing/Snowboarding</li>'+
                '<li>Dancing</li>'+
                '<li>Swimming</li>'+
                '<li>Football</li>'+
                '<li>Soccer</li>'+
                '<li>Basketball</li>'+
                '<li>Triathlons</li>'+
                '<li>Surfing/Wind Surfing</li>'+
                '<li>Weightlifting</li>'+
                '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});

$('#sharpenTheMind').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
                '<li>Puzzles and Brain Teasers</li>'+
                '<li>Card Games</li>'+
                '<li>Learn to draw or paint</li>'+
                '<li>Chess</li>'+
                '<li>Learn how to play an instrument</li>'+
                '<li>Master a New Language</li>'+
                '<li>Trivia Contests</li>'+
                '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});

$('#craftersArtists').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
               '<li>Home Projects</li>'+
               '<li>Jewelry making</li>'+
               '<li>Baking</li>'+
               '<li>Painting</li>'+
               '<li>Pottery</li>'+
               '<li>Drawing</li>'+
               '<li>Candle Making</li>'+
               '<li>Reading</li>'+
               '<li>Soap Making</li>'+
               '<li>Cross stitch</li>'+
               '<li>Journaling</li>'+
               '<li>Digital Art</li>'+
               '<li>Cooking</li>'+
               '<li>Cooking Contests</li>'+
               '<li>Gingerbread Houses</li>'+
               '<li>Doll Making</li>'+
               '<li>Doll House</li>'+
               '<li>Scrap-booking</li>'+
               '<li>Knitting</li>'+
               '<li>Sewing</li>'+
               '<li>Crocheting</li>'+
               '<li>Quilting</li>'+
               '<li>Gardening</li>'+
               '<li>Movie watching</li>'+
               '<li>Fen Shui</li>'+
               '<li>Interior Design</li>'+
               '<li>Writing</li>'+
               '<li>Needlepoint</li>'+
               '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});

$('#historyBuffs').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
               '<li>Study The Titanic</li>'+
               '<li>Americana Memorabilia</li>'+
               '<li>Become a Civil War Buff</li>'+
               '<li>Battle Reenactments</li>'+
               '<li>Visit Museums</li>'+
               '<li>Renaissance Fairs</li>'+
               '<li>Create a Family Tree</li>'+
               '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});

$('#scienceNature').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
               '<li>Astronomy</li>'+
               '<li>Build Model Rockets</li>'+
               '<li>Microscopy</li>'+
               '<li>Bird Watching</li>'+
               '<li>Aquariums</li>'+
               '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});

$('#adventureSeekers').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
               '<li>Scuba diving/Snorkeling</li>'+
               '<li>Mountain Climbing</li>'+
               '<li>Spelunking</li>'+
               '<li>Roller coasters</li>'+
               '<li>Bungee Jumping</li>'+
               '<li>Hot Air Ballooning</li>'+
               '<li>Travelling</li>'+
               '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
})
$('#social').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
               '<li>Wine Tasting</li>'+
               '<li>Flea Markets</li>'+
               '<li>Board Games and Trivia</li>'+
               '<li>Bingo</li>'+
               '<li>Bowling</li>'+
               '<li>Team and Club Sports</li>'+
               '<li>Book Club</li>'+
               '<li>Acting/Improve/Theatre</li>'+
               '<li>Frisbee Golf</li>'+
               '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});

$('#entrepreneur').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
               '<li>Writing, Blogging, etc</li>'+
               '<li>Crafting</li>'+
               '<li>Cake Decorating</li>'+
               '<li>Garage Sales and Auctions</li>'+
               '<li>Photography</li>'+
               '<li>Carpentry</li>'+
               '<li>Graphic Design</li>'+
               '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});

$('#motorsports').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
               '<li>All Terrain Vehicle Riding</li>'+
               '<li>Motorcycle Street Riding</li>'+
               '<li>Motorsport Racing</li>'+
               '<li>Vehicle Shows</li>'+
               '<li>Vehicle Restoration/Customization</li>'+
               '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});

$('#collectors').click(function(){
  $("#hobbyDescription").html('Examples:<ul>'+
               '<li>Beer Can Collecting</li>'+
               '<li>Book Collecting</li>'+
               '<li>Coin Collecting</li>'+
               '<li>Pin Collecting</li>'+
               '<li>Toy Collecting</li>'+
               '<li>Car Collecting</li>'+
               '<li>Art Collecting</li>'+
               '<li>Spoon Collecting</li>'+
               '<li>Sports Cards/Memorabilia Collecting</li>'+
               '<li>Autograph Collecting</li>'+
               '<li>Antique Collecting</li>'+
               '<li>Rock and Gem Collecting</li>'+
               '</ul>');
    $('#hobbyModal').modal()
    $('#hobbyModal').modal('show');
});