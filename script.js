// Track Join Now clicks (each button uses its own fixed link from HTML).
document.addEventListener("DOMContentLoaded", () => {
  const joinButtons = document.querySelectorAll("[data-cta-btn]");

  joinButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Placeholder hook for analytics (GA4 / Meta Pixel) if added later.
      if (typeof window.gtag === "function") {
        window.gtag("event", "join_now_click", { destination: btn.href });
      }
      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead");
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
