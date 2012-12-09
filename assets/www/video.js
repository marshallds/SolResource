function VideoPlayer() {
};

/**
 * Starts the video player intent
 *
 * @param url           The url to play
 */
VideoPlayer.prototype.play = function(url) {
    cordova.exec(null, null, "VideoPlayer", "playVideo", [url]);
};

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.videoPlayer) {
    window.plugins.videoPlayer = new VideoPlayer();
}