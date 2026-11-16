const audio = document.getElementById('river-audio');
const playButton = document.getElementById('play-button');
const photo = document.getElementById('river-photo');
const zoom = document.getElementById('zoom');
const time = document.getElementById('time');
const status = document.getElementById('status');
const soundLength = 75;

zoom.addEventListener('input', function () {
  photo.style.transform = 'scale(' + zoom.value / 100 + ')';
});

playButton.addEventListener('click', async function () {
  if (audio.paused) {
    if (audio.ended || audio.currentTime >= soundLength) audio.currentTime = 0;
    playButton.disabled = true;
    status.textContent = 'Loading river sound…';
    try {
      await audio.play();
    } catch {
      status.textContent = 'The sound could not play. Please try again.';
    } finally {
      playButton.disabled = false;
    }
  } else {
    audio.pause();
  }
});

audio.addEventListener('playing', function () {
  playButton.textContent = 'Pause sound';
  status.textContent = 'Listening to the river.';
});

audio.addEventListener('pause', function () {
  playButton.textContent = 'Play sound';
  if (!audio.error) {
    status.textContent = audio.ended || audio.currentTime >= soundLength ? 'Finished. Press play to listen again.' : 'Sound paused.';
  }
});

audio.volume = 0;
audio.addEventListener('timeupdate', function () {
  const seconds = Math.min(Math.floor(audio.currentTime), soundLength);
  time.textContent = Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0') + ' / 1:15';
  audio.volume = Math.max(0, Math.min(1, audio.currentTime / 3, (soundLength - audio.currentTime) / 3));
  if (audio.currentTime >= soundLength) audio.pause();
});

audio.addEventListener('error', function () {
  playButton.disabled = false;
  playButton.textContent = 'Play sound';
  status.textContent = 'The river sound could not load. Please refresh the page and try again.';
});
