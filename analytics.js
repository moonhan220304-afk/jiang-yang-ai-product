(() => {
  const endpoint = "https://peppy-nasturtium-4ba01b.netlify.app/api/portfolio-track";
  const sessionKey = "jy-portfolio-session";
  let sessionId = sessionStorage.getItem(sessionKey);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(sessionKey, sessionId);
  }
  let lastEvent = "";
  let lastSentAt = 0;

  function currentPage() {
    return location.hash.slice(1).split("/")[0] || "home";
  }

  function sendVisit() {
    const page = currentPage();
    const now = Date.now();
    if (page === lastEvent && now - lastSentAt < 2000) return;
    lastEvent = page;
    lastSentAt = now;
    fetch(endpoint, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page,
        location: location.href,
        referrer: document.referrer,
        sessionId,
        language: navigator.language,
        screen: `${screen.width}x${screen.height}`,
      }),
    }).catch(() => {});
  }

  window.addEventListener("hashchange", sendVisit);
  if ("requestIdleCallback" in window) requestIdleCallback(sendVisit, { timeout: 1500 });
  else setTimeout(sendVisit, 400);
})();
