// Telegram destination links (50-50 random split on every button click).
const CTA_LINKS = [
  "https://t.me/+GASgZuFAtwEzYTI0",
  "https://t.me/+qnsFrCm0ONEyMWJk",
];

function getRandomCtaLink() {
  return CTA_LINKS[Math.floor(Math.random() * CTA_LINKS.length)];
}

document.addEventListener("DOMContentLoaded", () => {
  const joinButtons = document.querySelectorAll("[data-cta-btn]");

  joinButtons.forEach((btn) => {
    // Set an initial random href as fallback.
    btn.href = getRandomCtaLink();

    btn.addEventListener("click", (e) => {
      const targetUrl = getRandomCtaLink();
      btn.href = targetUrl;

      // Placeholder hook for analytics (GA4 / Meta Pixel) if added later.
      if (typeof window.gtag === "function") {
        window.gtag("event", "join_now_click", { destination: targetUrl });
      }
      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead");
      }

      // Let modifier clicks (Ctrl/Cmd/Shift) open normally in a new tab.
      if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        window.location.href = targetUrl;
      }
    });
  });

  // Subtle scroll-in animation for feature cards.
  const cards = document.querySelectorAll(".feature-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(24px)";
    card.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
    observer.observe(card);
  });
});
