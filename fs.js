(async function () {
  const src = chrome.runtime.getURL("utils.js");
  const { getAllQualifiedElements, log } = await import(src);
  const [iframeElements, canvasElements, videoElements, embedElements, objectElements] =
    getAllQualifiedElements();

  const fullscreenShortcutElement = document.querySelector('[aria-keyshortcuts="f"]');
  if (fullscreenShortcutElement) {
    log('found an element with "f" shortcut');
    return fullscreenShortcutElement.click();
  }

  if (videoElements) {
    if (videoElements.length === 1) {
      log('found a single <video>');
      return videoElements[0].requestFullscreen();
    }

    const playingVideos = Array.from(videoElements).filter((v) => !v.paused);
    if (playingVideos.length === 1) {
      log('found a single playing <video>');
      return playingVideos[0].requestFullscreen();
    }
  }

  if (iframeElements.length === 1) {
    const frame = iframeElements[0];
    const sandboxAttributes =
      frame.getAttribute("sandbox")?.split(",").map((a) => a.trim()) ?? [];

    if (!sandboxAttributes.includes("allow-popups")) {
      sandboxAttributes.push("allow-popups");
    }

    frame.setAttribute("sandbox", sandboxAttributes.join(","));

    log('found an <iframe>');
    return frame.requestFullscreen();
  }

  if (canvasElements.length === 1) {
    log('found a single <canvas> element');
    return canvasElements[0].requestFullscreen();
  }

  if (embedElements.length === 1) {
    log('found a single <embed> element');
    return embedElements[0].requestFullscreen();
  }

  if (objectElements.length === 1) {
    log('found a single <object> element');
    return objectElements[0].requestFullscreen();
  }

})();
