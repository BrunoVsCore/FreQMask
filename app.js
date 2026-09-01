const noiseProfiles = [
  {
    id: "white",
    label: "Ruido branco",
    color: "#f5f7fb",
    level: 18,
    group: "Ruídos",
    image: localImage("white.jpg"),
    build: whiteNoise
  },
  {
    id: "pink",
    label: "Ruido rosa",
    color: "#f287b7",
    level: 34,
    group: "Ruídos",
    image: localImage("pink.jpg"),
    build: pinkNoise
  },
  {
    id: "brown",
    label: "Ruido marrom",
    color: "#b88455",
    level: 26,
    group: "Ruídos",
    image: localImage("brown.jpg"),
    build: brownNoise
  },
  {
    id: "blue",
    label: "Ruido azul",
    color: "#638bff",
    level: 0,
    group: "Ruídos",
    image: localImage("blue.jpg"),
    build: blueNoise
  },
  {
    id: "black",
    label: "Ruido preto",
    color: "#999191ff",
    level: 12,
    group: "Ruídos",
    image: localImage("black.jpg"),
    build: blackNoise
  },
  {
    id: "gray",
    label: "Ruido cinza",
    color: "#eddede",
    level: 18,
    group: "Ruídos",
    image: localImage("gray.jpg"),
    build: grayNoise
  },
  {
    id: "violet",
    label: "Ruido violeta",
    color: "#b889ff",
    level: 0,
    group: "Ruídos",
    image: localImage("violet.jpg"),
    build: violetNoise
  },
  {
    id: "green",
    label: "Ruido verde",
    color: "#57d97b",
    level: 0,
    group: "Ruídos",
    image: localImage("green.jpg"),
    build: greenNoise
  },
  {
    id: "red",
    label: "Ruido vermelho",
    color: "#fc3a3a",
    level: 0,
    group: "Ruídos",
    image: localImage("red.jpg"),
    build: redNoise
  },
  {
    id: "orange",
    label: "Ruido laranja",
    color: "#f29a4a",
    level: 0,
    group: "Ruídos",
    image: localImage("orange.jpg"),
    build: orangeNoise
  },
  {
    id: "rain",
    label: "Chuva constante",
    color: "#79d0ff",
    level: 22,
    group: "Outros sons",
    image: localImage("rain.jpg"),
    audioUrl: localAudio("rain.mp3"),
    build: rainNoise
  },
  {
    id: "fan",
    label: "Ventilador",
    color: "#8ee6a8",
    level: 18,
    group: "Outros sons",
    image: localImage("fan.jpg"),
    audioUrl: localAudio("fan.mp3"),
    build: fanNoise
  },
  {
    id: "air",
    label: "Ar-condicionado",
    color: "#7ad8d0",
    level: 18,
    group: "Outros sons",
    image: localImage("air.jpg"),
    audioUrl: localAudio("air.mp3"),
    build: airConditionerNoise
  },
  {
    id: "travel",
    label: "Trem ou aviao",
    color: "#d0a16e",
    level: 14,
    group: "Outros sons",
    image: localImage("travel.jpg"),
    audioUrl: localAudio("travel.mp3"),
    build: distantTravelNoise
  },
  {
    id: "ocean",
    label: "Oceano suave",
    color: "#4fb8c6",
    level: 16,
    group: "Outros sons",
    image: localImage("ocean.jpg"),
    audioUrl: localAudio("ocean.mp3"),
    build: oceanNoise
  },
  {
    id: "fire",
    label: "Fogo lareira",
    color: "#f06f45",
    level: 0,
    group: "Outros sons",
    image: localImage("fire.jpg"),
    audioUrl: localAudio("fireplace.mp3"),
    build: fireNoise
  },
  {
    id: "wind",
    label: "Vento",
    color: "#b7d8e8",
    level: 0,
    group: "Outros sons",
    image: localImage("wind.jpg"),
    audioUrl: localAudio("wind.mp3"),
    build: windNoise
  },
  {
    id: "stream",
    label: "Riacho",
    color: "#5bd4b5",
    level: 0,
    group: "Outros sons",
    image: localImage("stream.jpg"),
    audioUrl: localAudio("stream.mp3"),
    build: streamNoise
  },
  {
    id: "city",
    label: "Urbano distante",
    color: "#c9b78f",
    level: 0,
    group: "Outros sons",
    image: localImage("city.jpg"),
    audioUrl: localAudio("city.mp3"),
    build: distantCityNoise
  }
];

function localAudio(fileName) {
  return `assets/sounds/${fileName}`;
}

function localImage(fileName) {
  return `assets/images/${fileName}`;
}

const presets = {
  music: { white: 20, pink: 26, brown: 24, black: 18, gray: 12, green: 14, rain: 28, fan: 16, air: 18, travel: 14, ocean: 10, wind: 12 },
  voices: { white: 18, pink: 32, gray: 22, green: 18, orange: 10, rain: 30, fan: 12, air: 14, stream: 18, city: 10 },
  bass: { brown: 42, red: 36, black: 34, fan: 24, air: 26, travel: 32, ocean: 16, wind: 12 },
  sleep: { pink: 24, brown: 20, red: 14, black: 12, green: 10, rain: 18, air: 16, ocean: 26, wind: 10 },
  focus: { white: 12, pink: 28, gray: 22, green: 18, rain: 16, fan: 20, air: 18, stream: 12 },
  light: { pink: 12, gray: 10, green: 8, rain: 12, ocean: 10, fire: 8, stream: 8 }
};

const channelsEl = document.querySelector("#channels");
const powerButton = document.querySelector("#powerButton");
const masterVolume = document.querySelector("#masterVolume");
const masterValue = document.querySelector("#masterValue");
const timerSelect = document.querySelector("#timerSelect");
const timerStatus = document.querySelector("#timerStatus");
const resetButton = document.querySelector("#resetButton");
const presetButtons = document.querySelectorAll("[data-preset]");
const mp3Input = document.querySelector("#mp3Input");
const canvas = document.querySelector("#visualizer");
const ctx = canvas.getContext("2d");
const backgroundCanvas = document.querySelector("#backgroundSpectrum");
const backgroundCtx = backgroundCanvas.getContext("2d");
const mediaCrossfadeSeconds = 4;

let audioContext;
let analyser;
let masterGain;
let channels = [];
let animationId;
let timerId;
let timerEndsAt = 0;
let isRunning = false;
let mp3Url = "";
let mp3Channel = null;
let backgroundPhase = 0;

resizeBackgroundCanvas();
window.addEventListener("resize", resizeBackgroundCanvas);

let currentGroup = "";

noiseProfiles.forEach((profile) => {
  if (profile.group !== currentGroup) {
    currentGroup = profile.group;
    const groupTitle = document.createElement("h2");
    groupTitle.className = "section-title";
    groupTitle.textContent = currentGroup;
    channelsEl.appendChild(groupTitle);
  }

  const channel = document.createElement("article");
  channel.className = `channel sound-${profile.id}`;
  channel.style.setProperty("--channel-color", profile.color);
  channel.style.setProperty("--sound-tint", profile.color);
  channel.style.setProperty("--sound-image", `url("${profile.image}")`);
  channel.innerHTML = `
    <h2>${profile.label}</h2>
    <div class="fader">
      <div class="meter" aria-hidden="true"><div class="meter-fill" style="height: ${profile.level}%"></div></div>
      <input type="range" min="0" max="100" value="${profile.level}" data-sound-id="${profile.id}" aria-label="Volume ${profile.label}">
    </div>
    <output>${profile.level}%</output>
  `;
  channelsEl.appendChild(channel);

  const slider = channel.querySelector("input");
  const output = channel.querySelector("output");
  const meter = channel.querySelector(".meter-fill");

  slider.addEventListener("input", () => {
    const value = Number(slider.value);
    output.textContent = `${value}%`;
    meter.style.height = `${value}%`;
    const audioChannel = channels.find((item) => item.id === profile.id);
    if (audioChannel) {
      if (audioChannel.isMedia) {
        fadeMediaVolume(audioChannel, value / 100, 0.08);
      } else {
        setGainSmooth(audioChannel.gain, value / 100, 0.04);
      }
    }
  });
});

powerButton.addEventListener("click", async () => {
  if (!audioContext) {
    createAudioGraph();
  }

  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  if (isRunning) {
    stopAudio();
  } else {
    startAudio();
  }
});

masterVolume.addEventListener("input", () => {
  const value = Number(masterVolume.value);
  masterValue.textContent = `${value}%`;
  if (masterGain && isRunning) {
    setMasterVolume(value / 100, 0.04);
    updateMediaVolumes(0.08);
  }
});

timerSelect.addEventListener("change", () => {
  if (isRunning) {
    startTimer();
  } else {
    updateTimerStatus(0);
  }
});

presetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyPreset(button.dataset.preset);
  });
});

resetButton.addEventListener("click", () => {
  setAllChannelLevels({});
});

mp3Input.addEventListener("change", () => {
  const file = mp3Input.files[0];
  if (file) {
    addMp3Channel(file);
  }
});

function startAudio() {
  isRunning = true;
  powerButton.setAttribute("aria-pressed", "true");
  powerButton.lastChild.textContent = " Pausar";
  playMp3Channels();
  fadeInChannels();
  setMasterVolume(Number(masterVolume.value) / 100, 2.8);
  startTimer();
  drawVisualizer();
}

function stopAudio() {
  isRunning = false;
  powerButton.setAttribute("aria-pressed", "false");
  powerButton.lastChild.textContent = " Iniciar";
  fadeOutChannels();
  setMasterVolume(0, 1.2);
  pauseMp3ChannelsAfterFade();
  clearTimer();
  updateTimerStatus(0);
  setTimeout(drawIdleBackground, 1250);
}

function createAudioGraph() {
  audioContext = new AudioContext();
  masterGain = audioContext.createGain();
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;
  masterGain.gain.value = 0;
  masterGain.connect(analyser);
  analyser.connect(audioContext.destination);

  channels = noiseProfiles.map((profile) => {
    const gain = audioContext.createGain();
    const slider = document.querySelector(`input[aria-label="Volume ${profile.label}"]`);
    gain.gain.value = 0;

    if (profile.audioUrl) {
      const audio = new Audio(profile.audioUrl);
      audio.preload = "auto";
      audio.volume = 0;
      const nextAudio = new Audio(profile.audioUrl);
      nextAudio.preload = "auto";
      nextAudio.volume = 0;
      const mediaChannel = {
        id: profile.id,
        slider,
        audio,
        nextAudio,
        fallback: profile.build,
        isMedia: true,
        volume: 0,
        activeMix: 1,
        nextMix: 0,
        volumeFadeId: null,
        crossfadeId: null,
        crossfadeStarted: false
      };
      attachMediaEvents(mediaChannel, audio);
      attachMediaEvents(mediaChannel, nextAudio);
      return mediaChannel;
    }

    const buffer = createNoiseBuffer(profile.build);
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.connect(gain);
    gain.connect(masterGain);
    source.start();
    return {
      id: profile.id,
      source,
      gain,
      slider
    };
  });

  if (mp3Channel && !mp3Channel.gain) {
    connectMp3Channel(mp3Channel);
  }

}

function fadeInChannels() {
  channels.forEach((channel) => {
    const target = channel.slider ? Number(channel.slider.value) / 100 : 0;
    if (channel.isMedia) {
      channel.volume = 0;
      channel.audio.volume = 0;
      fadeMediaVolume(channel, target, 2.2);
      return;
    }
    channel.gain.gain.cancelScheduledValues(audioContext.currentTime);
    channel.gain.gain.setValueAtTime(0, audioContext.currentTime);
    channel.gain.gain.linearRampToValueAtTime(target, audioContext.currentTime + 2.2);
  });
}

function fadeOutChannels() {
  channels.forEach((channel) => {
    if (channel.isMedia) {
      fadeMediaVolume(channel, 0, 1.2);
      return;
    }
    channel.gain.gain.cancelScheduledValues(audioContext.currentTime);
    channel.gain.gain.setValueAtTime(channel.gain.gain.value, audioContext.currentTime);
    channel.gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1.2);
  });
}

function applyPreset(name) {
  setAllChannelLevels(presets[name] || {});
}

function setAllChannelLevels(levels) {
  document.querySelectorAll(".channel").forEach((channel) => {
    const slider = channel.querySelector("input");
    const output = channel.querySelector("output");
    const meter = channel.querySelector(".meter-fill");
    const value = levels[slider.dataset.soundId] || 0;

    slider.value = value;
    output.textContent = `${value}%`;
    meter.style.height = `${value}%`;
  });

  channels.forEach((channel) => {
    const value = (levels[channel.id] || 0) / 100;
    if (channel.isMedia) {
      fadeMediaVolume(channel, value, 0.12);
    } else {
      setGainSmooth(channel.gain, value, 0.08);
    }
  });
}

function useGeneratedFallback(channel) {
  if (!channel.fallback || channel.generatedFallback) {
    return;
  }

  channel.generatedFallback = true;
  channel.audio.pause();
  if (channel.nextAudio) {
    channel.nextAudio.pause();
  }
  if (channel.volumeFadeId) {
    cancelAnimationFrame(channel.volumeFadeId);
  }
  if (channel.crossfadeId) {
    cancelAnimationFrame(channel.crossfadeId);
  }
  if (channel.source) {
    channel.source.disconnect();
  }

  channel.isMedia = false;
  channel.gain = audioContext.createGain();
  channel.gain.gain.value = channel.volume || 0;
  const buffer = createNoiseBuffer(channel.fallback);
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  source.connect(channel.gain);
  channel.gain.connect(masterGain);
  source.start();
  channel.source = source;
  channel.audio = null;
}

function addMp3Channel(file) {
  removeMp3Channel();

  mp3Url = URL.createObjectURL(file);
  const displayName = file.name.replace(/\.[^/.]+$/, "").slice(0, 28) || "MP3";
  const safeName = escapeHtml(displayName);
  const safeTitle = escapeHtml(file.name);
  const profile = {
    id: "mp3",
    label: `MP3 ${safeName}`,
    color: "#f0be56",
    level: 35
  };

  const card = document.createElement("article");
  card.className = "channel mp3-channel sound-mp3";
  card.style.setProperty("--channel-color", profile.color);
  card.style.setProperty("--sound-tint", profile.color);
  card.innerHTML = `
    <h2 title="${safeTitle}">${profile.label}</h2>
    <div class="fader">
      <div class="meter" aria-hidden="true"><div class="meter-fill" style="height: ${profile.level}%"></div></div>
      <input type="range" min="0" max="100" value="${profile.level}" data-sound-id="${profile.id}" aria-label="Volume ${profile.label}">
    </div>
    <output>${profile.level}%</output>
  `;
  channelsEl.appendChild(card);

  const audio = new Audio(mp3Url);
  audio.loop = true;
  audio.preload = "auto";

  mp3Channel = {
    id: profile.id,
    card,
    audio,
    source: null,
    gain: null,
    slider: card.querySelector("input")
  };

  bindChannelSlider(card, profile.id);

  if (audioContext) {
    connectMp3Channel(mp3Channel);
    if (isRunning) {
      playAudioElement(mp3Channel.audio);
      setGainSmooth(mp3Channel.gain, Number(mp3Channel.slider.value) / 100, 0.08);
    }
  }
}

function removeMp3Channel() {
  if (!mp3Channel) {
    return;
  }

  mp3Channel.audio.pause();
  mp3Channel.audio.src = "";
  if (mp3Channel.source) {
    mp3Channel.source.disconnect();
  }
  if (mp3Channel.gain) {
    mp3Channel.gain.disconnect();
  }
  mp3Channel.card.remove();
  channels = channels.filter((channel) => channel.id !== mp3Channel.id);
  mp3Channel = null;

  if (mp3Url) {
    URL.revokeObjectURL(mp3Url);
    mp3Url = "";
  }
}

function connectMp3Channel(channel) {
  const source = audioContext.createMediaElementSource(channel.audio);
  const gain = audioContext.createGain();
  gain.gain.value = 0;
  source.connect(gain);
  gain.connect(masterGain);
  channel.source = source;
  channel.gain = gain;
  channels.push(channel);
}

function bindChannelSlider(card, id) {
  const slider = card.querySelector("input");
  const output = card.querySelector("output");
  const meter = card.querySelector(".meter-fill");

  slider.addEventListener("input", () => {
    const value = Number(slider.value);
    output.textContent = `${value}%`;
    meter.style.height = `${value}%`;
    const audioChannel = channels.find((item) => item.id === id);
    if (audioChannel && audioChannel.gain) {
      setGainSmooth(audioChannel.gain, value / 100, 0.04);
    }
  });
}

function playMp3Channels() {
  channels.forEach((channel) => {
    if (channel.isMedia) {
      startMediaLoop(channel);
    } else if (channel.audio) {
      playAudioElement(channel.audio);
    }
  });
}

function pauseMp3ChannelsAfterFade() {
  setTimeout(() => {
    channels.forEach((channel) => {
      if (channel.isMedia && !isRunning) {
        stopMediaLoop(channel);
      } else if (channel.audio && !isRunning) {
        channel.audio.pause();
      }
    });
  }, 1250);
}

function playAudioElement(audio) {
  const playPromise = audio.play();
  if (playPromise) {
    playPromise.catch(() => {});
  }
}

function attachMediaEvents(channel, audio) {
  audio.loop = false;
  audio.addEventListener("timeupdate", () => {
    handleMediaProgress(channel);
  });
  audio.addEventListener("ended", () => {
    if (isRunning && channel.isMedia && !channel.crossfadeStarted) {
      startMediaCrossfade(channel, 0.35);
    }
  });
  audio.addEventListener("error", () => {
    useGeneratedFallback(channel);
  });
}

function startMediaLoop(channel) {
  if (!channel.audio) {
    return;
  }

  channel.crossfadeStarted = false;
  channel.activeMix = 1;
  channel.nextMix = 0;
  setMediaElementsVolume(channel);

  if (channel.audio.ended || channel.audio.currentTime >= channel.audio.duration - 0.1) {
    channel.audio.currentTime = 0;
  }

  playAudioElement(channel.audio);
}

function stopMediaLoop(channel) {
  if (channel.volumeFadeId) {
    cancelAnimationFrame(channel.volumeFadeId);
    channel.volumeFadeId = null;
  }
  if (channel.crossfadeId) {
    cancelAnimationFrame(channel.crossfadeId);
    channel.crossfadeId = null;
  }

  channel.crossfadeStarted = false;
  channel.activeMix = 1;
  channel.nextMix = 0;

  if (channel.audio) {
    channel.audio.pause();
  }
  if (channel.nextAudio) {
    channel.nextAudio.pause();
    channel.nextAudio.currentTime = 0;
  }
}

function handleMediaProgress(channel) {
  if (!isRunning || !channel.isMedia || channel.crossfadeStarted || !channel.audio.duration) {
    return;
  }

  const duration = channel.audio.duration;
  if (!Number.isFinite(duration) || duration <= mediaCrossfadeSeconds + 0.5) {
    return;
  }

  const remaining = duration - channel.audio.currentTime;
  if (remaining <= mediaCrossfadeSeconds) {
    startMediaCrossfade(channel, mediaCrossfadeSeconds);
  }
}

function startMediaCrossfade(channel, seconds) {
  if (!channel.audio || !channel.nextAudio || channel.crossfadeStarted) {
    return;
  }

  channel.crossfadeStarted = true;
  channel.nextAudio.currentTime = 0;
  channel.nextAudio.volume = 0;
  playAudioElement(channel.nextAudio);

  const startTime = performance.now();
  const duration = Math.max(0.05, seconds) * 1000;

  const step = (now) => {
    if (!isRunning || !channel.isMedia) {
      channel.crossfadeId = null;
      return;
    }

    const progress = Math.min(1, (now - startTime) / duration);
    channel.activeMix = 1 - progress;
    channel.nextMix = progress;
    setMediaElementsVolume(channel);

    if (progress < 1) {
      channel.crossfadeId = requestAnimationFrame(step);
      return;
    }

    const oldAudio = channel.audio;
    oldAudio.pause();
    oldAudio.currentTime = 0;
    channel.audio = channel.nextAudio;
    channel.nextAudio = oldAudio;
    channel.activeMix = 1;
    channel.nextMix = 0;
    channel.crossfadeStarted = false;
    channel.crossfadeId = null;
    setMediaElementsVolume(channel);
  };

  channel.crossfadeId = requestAnimationFrame(step);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    return entities[char];
  });
}

function setMasterVolume(value, seconds) {
  masterGain.gain.cancelScheduledValues(audioContext.currentTime);
  masterGain.gain.setValueAtTime(masterGain.gain.value, audioContext.currentTime);
  masterGain.gain.linearRampToValueAtTime(value, audioContext.currentTime + seconds);
}

function updateMediaVolumes(seconds = 0.08) {
  channels.forEach((channel) => {
    if (channel.isMedia && channel.slider) {
      fadeMediaVolume(channel, Number(channel.slider.value) / 100, seconds);
    }
  });
}

function fadeMediaVolume(channel, targetLevel, seconds) {
  if (!channel.audio) {
    return;
  }

  if (channel.volumeFadeId) {
    cancelAnimationFrame(channel.volumeFadeId);
    channel.volumeFadeId = null;
  }

  const startVolume = channel.volume || 0;
  const startTime = performance.now();
  const duration = Math.max(0.01, seconds) * 1000;

  const step = (now) => {
    const progress = Math.min(1, (now - startTime) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    channel.volume = startVolume + (targetLevel - startVolume) * eased;
    setMediaElementsVolume(channel);

    if (progress < 1) {
      channel.volumeFadeId = requestAnimationFrame(step);
    } else {
      channel.volumeFadeId = null;
    }
  };

  channel.volumeFadeId = requestAnimationFrame(step);
}

function setMediaElementsVolume(channel) {
  const baseVolume = channel.volume * getMasterLevel();
  if (channel.audio) {
    channel.audio.volume = clampVolume(baseVolume * (channel.activeMix ?? 1));
  }
  if (channel.nextAudio) {
    channel.nextAudio.volume = clampVolume(baseVolume * (channel.nextMix ?? 0));
  }
}

function getMasterLevel() {
  return Number(masterVolume.value) / 100;
}

function clampVolume(value) {
  return Math.max(0, Math.min(1, value));
}

function setGainSmooth(gainNode, value, seconds) {
  gainNode.gain.cancelScheduledValues(audioContext.currentTime);
  gainNode.gain.setTargetAtTime(value, audioContext.currentTime, seconds);
}

function startTimer() {
  clearTimer();
  const minutes = Number(timerSelect.value);
  if (!minutes) {
    updateTimerStatus(0);
    return;
  }

  timerEndsAt = Date.now() + minutes * 60 * 1000;
  updateTimerCountdown();
  timerId = setInterval(updateTimerCountdown, 1000);
}

function clearTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  timerEndsAt = 0;
}

function updateTimerCountdown() {
  const remaining = Math.max(0, timerEndsAt - Date.now());
  updateTimerStatus(remaining);

  if (remaining <= 0) {
    stopAudio();
  }
}

function updateTimerStatus(remainingMs) {
  if (!timerStatus) {
    return;
  }

  if (!remainingMs) {
    timerStatus.textContent = Number(timerSelect.value) ? "Timer pronto" : "Timer desligado";
    return;
  }

  const totalSeconds = Math.ceil(remainingMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  timerStatus.textContent = `Desliga em ${minutes}:${String(seconds).padStart(2, "0")}`;
}

function resizeBackgroundCanvas() {
  const scale = window.devicePixelRatio || 1;
  backgroundCanvas.width = Math.floor(window.innerWidth * scale);
  backgroundCanvas.height = Math.floor(window.innerHeight * scale);
  backgroundCtx.setTransform(scale, 0, 0, scale, 0, 0);
  drawIdleBackground();
}

function drawIdleBackground() {
  if (isRunning) {
    return;
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  backgroundCtx.clearRect(0, 0, width, height);
  const gradient = backgroundCtx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "rgba(88, 199, 232, 0.12)");
  gradient.addColorStop(0.55, "rgba(101, 212, 110, 0.05)");
  gradient.addColorStop(1, "rgba(240, 190, 86, 0.08)");
  backgroundCtx.fillStyle = gradient;
  backgroundCtx.fillRect(0, 0, width, height);
}

function drawBackgroundSpectrum(data) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const bands = 72;
  const step = width / bands;

  backgroundPhase += 0.018;
  backgroundCtx.clearRect(0, 0, width, height);

  const wash = backgroundCtx.createRadialGradient(
    width * 0.5,
    height * 0.48,
    0,
    width * 0.5,
    height * 0.48,
    Math.max(width, height) * 0.72
  );
  wash.addColorStop(0, "rgba(88, 199, 232, 0.13)");
  wash.addColorStop(0.48, "rgba(101, 212, 110, 0.055)");
  wash.addColorStop(1, "rgba(7, 8, 11, 0.22)");
  backgroundCtx.fillStyle = wash;
  backgroundCtx.fillRect(0, 0, width, height);

  for (let i = 0; i < bands; i += 1) {
    const sample = data[Math.floor((i / bands) * (data.length - 1))] / 255;
    const drift = Math.sin(backgroundPhase + i * 0.37) * 0.5 + 0.5;
    const barHeight = Math.max(18, sample * height * 0.58 + drift * 34);
    const x = i * step + step * 0.18;
    const y = (height - barHeight) / 2;
    const barWidth = Math.max(4, step * 0.42);
    const hue = 160 + i * 1.8;

    const gradient = backgroundCtx.createLinearGradient(0, y, 0, y + barHeight);
    gradient.addColorStop(0, `hsla(${hue}, 88%, 68%, 0.08)`);
    gradient.addColorStop(0.5, `hsla(${hue + 24}, 92%, 62%, 0.38)`);
    gradient.addColorStop(1, `hsla(${hue + 52}, 86%, 58%, 0.08)`);

    backgroundCtx.fillStyle = gradient;
    backgroundCtx.shadowColor = `hsla(${hue + 18}, 92%, 62%, 0.32)`;
    backgroundCtx.shadowBlur = 20;
    roundRect(backgroundCtx, x, y, barWidth, barHeight, 999);
    backgroundCtx.fill();
  }

  backgroundCtx.shadowBlur = 0;
}

function createNoiseBuffer(builder) {
  const seconds = 4;
  const sampleRate = audioContext.sampleRate;
  const frameCount = sampleRate * seconds;
  const buffer = audioContext.createBuffer(1, frameCount, sampleRate);
  const data = buffer.getChannelData(0);
  builder(data, sampleRate);
  return buffer;
}

function whiteNoise(data) {
  for (let i = 0; i < data.length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }
}

function pinkNoise(data) {
  let b0 = 0;
  let b1 = 0;
  let b2 = 0;
  let b3 = 0;
  let b4 = 0;
  let b5 = 0;
  let b6 = 0;

  for (let i = 0; i < data.length; i += 1) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.969 * b2 + white * 0.153852;
    b3 = 0.8665 * b3 + white * 0.3104856;
    b4 = 0.55 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.016898;
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
    b6 = white * 0.115926;
  }
}

function brownNoise(data) {
  let last = 0;
  for (let i = 0; i < data.length; i += 1) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
  }
}

function blueNoise(data) {
  let previous = 0;
  for (let i = 0; i < data.length; i += 1) {
    const white = Math.random() * 2 - 1;
    data[i] = (white - previous) * 0.72;
    previous = white;
  }
}

function blackNoise(data, sampleRate) {
  let phase = 0;
  let low = 0;
  for (let i = 0; i < data.length; i += 1) {
    const white = Math.random() * 2 - 1;
    low = low * 0.996 + white * 0.004;
    phase += (2 * Math.PI * 24) / sampleRate;
    const rumble = Math.sin(phase) * 0.22 + low * 2.8;
    data[i] = Math.max(-1, Math.min(1, rumble * 0.75));
  }
}

function grayNoise(data, sampleRate) {
  for (let i = 0; i < data.length; i += 1) {
    const white = Math.random() * 2 - 1;
    const t = i / sampleRate;
    const lowLift = 0.55 + 0.45 * Math.sin(2 * Math.PI * 0.35 * t);
    data[i] = white * 0.34 + white * lowLift * 0.16;
  }
}

function rainNoise(data, sampleRate) {
  let soft = 0;
  for (let i = 0; i < data.length; i += 1) {
    const white = Math.random() * 2 - 1;
    soft = soft * 0.72 + white * 0.28;
    const drops = Math.random() > 0.986 ? (Math.random() * 2 - 1) * 0.7 : 0;
    data[i] = soft * 0.32 + drops * 0.28;
  }
}

function fanNoise(data, sampleRate) {
  let low = 0;
  let phase = 0;
  for (let i = 0; i < data.length; i += 1) {
    const white = Math.random() * 2 - 1;
    low = low * 0.985 + white * 0.015;
    phase += (2 * Math.PI * 58) / sampleRate;
    const motor = Math.sin(phase) * 0.12 + Math.sin(phase * 2.04) * 0.06;
    data[i] = low * 1.6 + motor + white * 0.08;
  }
}

function airConditionerNoise(data, sampleRate) {
  let low = 0;
  let mid = 0;
  for (let i = 0; i < data.length; i += 1) {
    const white = Math.random() * 2 - 1;
    low = low * 0.992 + white * 0.008;
    mid = mid * 0.82 + white * 0.18;
    const slowWave = Math.sin((2 * Math.PI * 0.18 * i) / sampleRate) * 0.08;
    data[i] = low * 2.2 + mid * 0.2 + slowWave;
  }
}

function distantTravelNoise(data, sampleRate) {
  let low = 0;
  let phase = 0;
  for (let i = 0; i < data.length; i += 1) {
    const white = Math.random() * 2 - 1;
    low = low * 0.9965 + white * 0.0035;
    phase += (2 * Math.PI * 42) / sampleRate;
    const vibration = Math.sin(phase) * 0.18 + Math.sin(phase * 0.53) * 0.11;
    data[i] = low * 3.1 + vibration;
  }
}

function violetNoise(data) {
  let previous = 0;
  for (let i = 0; i < data.length; i += 1) {
    const white = Math.random() * 2 - 1;
    const blue = white - previous;
    data[i] = Math.max(-1, Math.min(1, blue * 1.25));
    previous = white;
  }
}

function greenNoise(data, sampleRate) {
  let low = 0;
  let mid = 0;
  let high = 0;

  for (let i = 0; i < data.length; i += 1) {
    const white = Math.random() * 2 - 1;
    low = low * 0.985 + white * 0.015;
    mid = mid * 0.74 + white * 0.26;
    high = white - mid;
    const naturalPulse = Math.sin((2 * Math.PI * 0.23 * i) / sampleRate) * 0.04;
    data[i] = Math.max(-1, Math.min(1, mid * 0.52 - low * 0.18 - high * 0.08 + naturalPulse));
  }
}

function redNoise(data) {
  let last = 0;
  for (let i = 0; i < data.length; i += 1) {
    const white = Math.random() * 2 - 1;
    last = last * 0.992 + white * 0.008;
    data[i] = Math.max(-1, Math.min(1, last * 5.2));
  }
}

function orangeNoise(data, sampleRate) {
  let band = 0;
  let low = 0;

  for (let i = 0; i < data.length; i += 1) {
    const white = Math.random() * 2 - 1;
    low = low * 0.988 + white * 0.012;
    band = band * 0.62 + white * 0.38;
    const notchA = Math.sin((2 * Math.PI * 440 * i) / sampleRate) * 0.05;
    const notchB = Math.sin((2 * Math.PI * 880 * i) / sampleRate) * 0.035;
    data[i] = Math.max(-1, Math.min(1, band * 0.4 + low * 0.32 - notchA - notchB));
  }
}

function oceanNoise(data, sampleRate) {
  let wash = 0;
  let swell = 0;
  for (let i = 0; i < data.length; i += 1) {
    const white = Math.random() * 2 - 1;
    wash = wash * 0.9 + white * 0.1;
    swell = Math.sin((2 * Math.PI * 0.11 * i) / sampleRate) * 0.5 + 0.5;
    data[i] = wash * (0.22 + swell * 0.42);
  }
}

function fireNoise(data, sampleRate) {
  let low = 0;
  let crackle = 0;
  let ember = 0;

  for (let i = 0; i < data.length; i += 1) {
    const white = Math.random() * 2 - 1;
    const slowFlicker = Math.sin((2 * Math.PI * 1.7 * i) / sampleRate) * 0.5 + 0.5;
    const airFlicker = Math.sin((2 * Math.PI * 4.3 * i) / sampleRate + 1.2) * 0.5 + 0.5;
    const flameMove = 0.45 + slowFlicker * 0.32 + airFlicker * 0.18;

    low = low * 0.992 + white * 0.008;
    ember = ember * 0.965 + white * 0.035;
    crackle = crackle * 0.72 + white * 0.28;

    const tinySpark = Math.random() > 0.992 ? (Math.random() * 2 - 1) * 0.38 : 0;
    const woodPop = Math.random() > 0.9992 ? (Math.random() * 2 - 1) * 0.95 : 0;
    const body = low * 1.3 + ember * 0.28;
    const sparks = crackle * 0.1 + tinySpark + woodPop;

    data[i] = Math.max(-1, Math.min(1, body * flameMove + sparks * 0.55));
  }
}

function windNoise(data, sampleRate) {
  let lowPass = 0;
  let bandPass = 0;
  let bandMemory = 0;
  let gust = 0.35;

  for (let i = 0; i < data.length; i += 1) {
    const white = Math.random() * 2 - 1;
    const slow = Math.sin((2 * Math.PI * 0.035 * i) / sampleRate) * 0.5 + 0.5;
    const faster = Math.sin((2 * Math.PI * 0.11 * i) / sampleRate + 1.7) * 0.5 + 0.5;
    gust = gust * 0.9996 + (slow * 0.62 + faster * 0.38) * 0.0004;

    lowPass = lowPass * 0.985 + white * 0.015;
    bandMemory = bandMemory * 0.92 + white * 0.08;
    bandPass = bandPass * 0.72 + (bandMemory - lowPass) * 0.28;

    const breath = lowPass * (1.2 + gust * 2.1);
    const hiss = bandPass * (0.18 + gust * 0.45);
    data[i] = Math.max(-1, Math.min(1, breath + hiss));
  }
}

function streamNoise(data) {
  let water = 0;
  for (let i = 0; i < data.length; i += 1) {
    const white = Math.random() * 2 - 1;
    water = water * 0.66 + white * 0.34;
    const sparkle = Math.random() > 0.975 ? Math.random() * 0.35 : 0;
    data[i] = water * 0.28 + sparkle;
  }
}

function distantCityNoise(data, sampleRate) {
  let low = 0;
  let mid = 0;
  let phase = 0;
  for (let i = 0; i < data.length; i += 1) {
    const white = Math.random() * 2 - 1;
    low = low * 0.995 + white * 0.005;
    mid = mid * 0.88 + white * 0.12;
    phase += (2 * Math.PI * 36) / sampleRate;
    const traffic = Math.sin(phase) * 0.08 + Math.sin(phase * 1.7) * 0.04;
    data[i] = low * 1.9 + mid * 0.12 + traffic;
  }
}

function drawVisualizer() {
  if (!isRunning) {
    cancelAnimationFrame(animationId);
    return;
  }

  const data = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(data);
  drawBackgroundSpectrum(data);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const barCount = 56;
  const gap = 5;
  const barWidth = (canvas.width - gap * (barCount - 1)) / barCount;

  for (let i = 0; i < barCount; i += 1) {
    const sample = data[Math.floor((i / barCount) * data.length)];
    const percent = sample / 255;
    const height = Math.max(8, percent * canvas.height * 0.92);
    const x = i * (barWidth + gap);
    const y = canvas.height - height;
    const hue = 172 + i * 2.5;

    const gradient = ctx.createLinearGradient(0, y, 0, canvas.height);
    gradient.addColorStop(0, `hsl(${hue}, 82%, 66%)`);
    gradient.addColorStop(0.58, "#65d46e");
    gradient.addColorStop(1, "#f0be56");

    ctx.fillStyle = gradient;
    roundRect(ctx, x, y, barWidth, height, 7);
    ctx.fill();
  }

  animationId = requestAnimationFrame(drawVisualizer);
}

function roundRect(context, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + width, y, x + width, y + height, r);
  context.arcTo(x + width, y + height, x, y + height, r);
  context.arcTo(x, y + height, x, y, r);
  context.arcTo(x, y, x + width, y, r);
  context.closePath();
}
