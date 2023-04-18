function getQualifiedElements(selector) {
  const elements = document.querySelectorAll(selector);
  const validElements = [];
  for (const element of elements) {
    const { width, height } = element.getBoundingClientRect();
    if (isElementInViewport(element) && (width > 200) && (height > 200)) {
      validElements.push(element);
    }
  }
  return validElements;
}

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */ &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */;
}

export function getAllQualifiedElements() {
  const iframeElements = getQualifiedElements("iframe");
  const canvasElements = getQualifiedElements("canvas");
  const videoElements = getQualifiedElements("video");
  const embedElements = getQualifiedElements("embed");
  const objectElements = getQualifiedElements("object");

  return [iframeElements, canvasElements, videoElements, embedElements, objectElements];
}

export function log(...args) {
  console.log("[FM]", ...args);
}
