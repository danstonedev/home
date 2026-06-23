/* DevPT — devpt.app interactions */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Footer year */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Nav border-on-scroll */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Scroll reveal */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 6, 5) * 55 + "ms";
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* Count-up stats */
  var counted = false;
  function runCounts() {
    if (counted) return;
    counted = true;
    document.querySelectorAll(".n[data-count]").forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10);
      if (reduceMotion) { el.textContent = target; return; }
      var start = null, dur = 1100;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  var strip = document.querySelector(".strip");
  if (strip && "IntersectionObserver" in window) {
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { runCounts(); sio.disconnect(); } });
    }, { threshold: 0.4 });
    sio.observe(strip);
  } else {
    runCounts();
  }

  /* Demo videos — play only while in view; static poster under reduced motion */
  var vids = Array.prototype.slice.call(document.querySelectorAll('video.lazyvid'));
  if (vids.length) {
    if (reduceMotion) {
      // leave posters in place; never autoplay
    } else if ('IntersectionObserver' in window) {
      var vio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var v = e.target;
          if (e.isIntersecting) {
            var p = v.play();
            if (p && p.catch) p.catch(function () {});
          } else if (!v.paused) {
            v.pause();
          }
        });
      }, { threshold: 0.35 });
      vids.forEach(function (v) { vio.observe(v); });
    } else {
      vids.forEach(function (v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); });
    }
  }

  /* App filtering */
  var chips = Array.prototype.slice.call(document.querySelectorAll(".chip"));
  var cards = Array.prototype.slice.call(document.querySelectorAll("#appGrid .card"));
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.classList.remove("is-active"); });
      chip.classList.add("is-active");
      var f = chip.getAttribute("data-filter");
      cards.forEach(function (card) {
        var cats = card.getAttribute("data-cat") || "";
        var show = f === "all" || cats.indexOf(f) !== -1;
        card.classList.toggle("hide", !show);
      });
    });
  });
})();
