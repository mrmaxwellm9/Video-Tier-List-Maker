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
    addedDiv.setAttribute("class", "ui-sortable-handle");
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

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function allowDrop(ev) {
    ev.preventDefault();
}

//https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
function youtubeParser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}

$(function () {
    $("#sTierItems, #aTierItems, #bTierItems, #cTierItems, #dTierItems, #fTierItems, #addedItems").sortable({
        connectWith: "#sTierItems, #aTierItems, #bTierItems, #cTierItems, #dTierItems, #fTierItems, #addedItems",
        items: "li:not(.table-header)"
    });
});

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