const elements = document.querySelectorAll("a, img, link, form");
const urls = new Set();

elements.forEach((element) => {
  const attributes = ["href", "src"];

  attributes.forEach((attr) => {
    const url = element.getAttribute(attr);

    if (url && !url.startsWith("#")) {
      urls.add(url);
    }
  });
});

async function checkUrlStatus(url) {
  try {
    const response = await fetch(url, { method: "HEAD", mode: "no-cors" });
    return Number(response.status) || (response.ok ? 200 : "Do not know");
  } catch (error) {
    return "error response";
  }
}

function setVisivleLinks() {
  document.querySelectorAll("a, button, form, img, link").forEach((el) => {
    if (
      window.getComputedStyle(el).display === "none" ||
      window.getComputedStyle(el).visibility === "hidden"
    ) {
      el.style.display = "block";
      el.style.visibility = "visible";
      el.style.opacity = "1";
      el.style.outline = "2px solid red";
    }
  });
}

(async () => {
  console.log("Links: ", Array.from(urls));
  console.log("Status...");

  const results = [];
  for (const url of urls) {
    const status = await checkUrlStatus(url);
    results.push({ url, status });
    console.log(`${url} → ${status}`);
  }

  setVisivleLinks()
})();
