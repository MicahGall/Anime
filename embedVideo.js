function embedVideo() {
    const url = document.getElementById('videoURL').value;
    const container = document.getElementById('videoContainer');
    container.innerHTML = ''; // Clear previous content

    const videoData = getVideoData(url);
    if (videoData) {
        const iframe = document.createElement('iframe');
        iframe.src = videoData.src;
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        container.appendChild(iframe);
    } else {
        container.innerHTML = 'Unsupported video URL.';
    }
}

function getVideoData(url) {
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|(?:youtu\.be\/))([a-zA-Z0-9_-]{11})/;
    const vimeoRegex = /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/;
    const dailymotionRegex = /(?:https?:\/\/)?(?:www\.)?dailymotion\.com\/video\/([^_]+)_/;

    let match;
    if ((match = url.match(youtubeRegex))) {
        return { src: `https://www.youtube.com/embed/${match[1]}` };
    } else if ((match = url.match(vimeoRegex))) {
        return { src: `https://player.vimeo.com/video/${match[1]}` };
    } else if ((match = url.match(dailymotionRegex))) {
        return { src: `https://www.dailymotion.com/embed/video/${match[1]}` };
    }
    return null;
}
