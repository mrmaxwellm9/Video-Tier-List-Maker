/*
    Adapted from https://codepen.io/davidleduc/pen/EPrgqY
*/

window.document.onkeydown = function (e) {
    if (!e) {
        e = event;
    }
    if (e.keyCode == 27) {
        lightbox_close();
    }
}

function lightbox_open(videoID) {
    window.scrollTo(0, 0);
    document.getElementById(`light${videoID}`).style.display = 'block';
    document.getElementById(`fade${videoID}`).style.display = 'block';
}

function lightbox_close(videoID) {
    var lightBoxVideo = document.getElementById(videoID);
    document.getElementById(`light${videoID}`).style.display = 'none';
    document.getElementById(`fade${videoID}`).style.display = 'none';
}