$(document).ready(function() {
    $('#enters').on('click', function(){
        var searchTerm = $('#enterName').val();
        console.log('searchTerm=' + searchTerm);
        $.ajax({
            url: 'https://itunes.apple.com/search?term=' + searchTerm,
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            success: function(result) {
                console.log(result);
                genAlbums(result) },
            error: function() { alert('Failed!'); }
        });
    });

});

function genAlbums(discography){
    $('#displayArea').empty();
    $('#displayArea').css({opacity: '0'});
    var iterations = parseInt($('#numberOfResults').val());
    if(iterations >= parseInt(discography.results.length)) {
        iterations = parseInt(discography.results.length);
    }
    var tableOfAlbums = "<table id='tableOfAlbums' style='border: 1px black'> <tr>";
    if(discography.results.length > 0){
        for(var i = 0; i < iterations; i++){
            var x = discography.results[i].trackName;
            var y = discography.results[i].collectionName;
            if(parseInt($('#isTrackCensored').val()) === 1){
                x = discography.results[i].trackCensoredName;
                y = discography.results[i].collectionCensoredName;
            }
            tableOfAlbums += '<td class="album"> <img  src=' + discography.results[i].artworkUrl100 + '> <br>' +
                x + '<br> <i>' + discography.results[i].artistName +
                '</i> <i class="detailView fa fa-info" id="' +  i + '" onclick="getDetails(' + i + ');"></i> <div class="details"> Album: ' +
                y + '<br>Track number: ' + discography.results[i].trackNumber +
                ' of ' + discography.results[i].trackCount + '<br> Track is ' + discography.results[i].trackExplicitness +
                '<br> Genre: ' + discography.results[i].primaryGenreName + '<br> Track price: $' + discography.results[i].trackPrice + '</div></td>';
            if(((i + 1) % 5) === 0){
                tableOfAlbums += "</tr> <tr>"
            }
        }
        tableOfAlbums += "</tr></table>";
        $('#displayArea').append(tableOfAlbums);
    }else {
        $('#displayArea').append('<p>No results</p>')
    }
    $('#displayArea').animate({opacity: '1'});
}

