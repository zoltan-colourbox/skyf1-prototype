export const getUserMedia = () => {
    return navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
};

export const capturePicture = () => {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.autoplay = true;

        const canvas = document.createElement('canvas');

        const constraints = {
            video: true,
        };

        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            video.srcObject = stream;
            video.onloadedmetadata = () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0);
                resolve(canvas.toDataURL('image/jpeg'));
                stream.getTracks().forEach((track) => {
                    track.stop();
                });
            };
        }).catch((error) => {
            reject(error);
        });
    });
};
