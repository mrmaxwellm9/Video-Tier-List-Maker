let curAddedItem = 0;


function validateVideo(evt) {
    if (evt == null) {
        evt = window.event;
    }
    evt.preventDefault();
    evt.stopPropagation();

    let num = String(curAddedItem);
    let name = `addedItem${num}`;

    var addedDiv = document.createElement("li");
    addedDiv.setAttribute("id", `${name}`);
    document.getElementById("addedItems").appendChild(addedDiv);

    var youtubeID = youtubeParser(document.getElementById("videoUrl").value);

    var popupAnchor = document.createElement("a");
    popupAnchor.setAttribute("class", "boxclose");
    popupAnchor.setAttribute("id", "boxclose");
    popupAnchor.setAttribute("onClick", `lightbox_close("${youtubeID}");`);

    var videoThumbnail = document.createElement("img");
    videoThumbnail.setAttribute("id", "videoImage");
    videoThumbnail.setAttribute("src", `https://img.youtube.com/vi/${youtubeID}/0.jpg`);

    var lightDiv = document.createElement("div");
    lightDiv.setAttribute("id",`light${youtubeID}`);

    var videoPlayer = document.createElement("iframe");
    videoPlayer.setAttribute("width", "600");
    videoPlayer.setAttribute("height", "360");
    videoPlayer.setAttribute("src", `https://www.youtube.com/embed/${youtubeID}`);
    videoPlayer.setAttribute("frameborder", "0");
    videoPlayer.setAttribute("allowfullscreen", "");
    videoPlayer.setAttribute("id", `${youtubeID}`);

    var fadeDiv = document.createElement("div");
    fadeDiv.setAttribute("id", `fade${youtubeID}`);
    fadeDiv.setAttribute("onClick", `lightbox_close("${youtubeID}");`);

    var lightboxAnchor = document.createElement("a");
    lightboxAnchor.setAttribute("href", "#")
    lightboxAnchor.setAttribute("onClick", `lightbox_open("${youtubeID}");`)
    lightboxAnchor.setAttribute("id", "lightboxAnchor");

    document.getElementById(`${name}`).appendChild(lightDiv);
    document.getElementById(`${name}`).appendChild(fadeDiv);
    lightboxAnchor.appendChild(videoThumbnail);
    document.getElementById(`${name}`).appendChild(lightboxAnchor);
    lightDiv.appendChild(popupAnchor);
    lightDiv.appendChild(videoPlayer);

    document.getElementById("videoUrl").value = '';
    curAddedItem++;
}

//https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
function youtubeParser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}


$(function () {
    $('.close').click(function () {
        $('iframe').attr('src', $('iframe').attr('src'));
    });
});

$('#trashBin').droppable({
    drop: function (event, ui) {
        ui.draggable.remove();
    }
});


//ChatGPT
$('#save-wrapper').on('click', '#saveButton', function () {
    var htmlToSave = $('#save-wrapper').html();
    var blob = new Blob([htmlToSave], { type: 'text/html' });
    var url = URL.createObjectURL(blob);
    var downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'saved.html';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(downloadLink);
});


function applySortable() {
    $("#sTierItems, #aTierItems, #bTierItems, #cTierItems, #dTierItems, #fTierItems, #addedItems").sortable({
        connectWith: "#sTierItems, #aTierItems, #bTierItems, #cTierItems, #dTierItems, #fTierItems, #addedItems",
        items: "li:not(.table-header):not(.add-header)"
    }).disableSelection();
}

// Load button change event handler
$('#save-wrapper').on('change', '#loadButton', function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        var loadedHtml = e.target.result;
        $('#save-wrapper').html(loadedHtml);
        applySortable(); // Reapply sortable after loading the content
    };

    reader.readAsText(file);
});

// Apply sortable initially
applySortable();