// Create the controller
let controller;
// create the scene
let slideScene;

function animateSlides() {
  // Init Controller
  controller = new ScrollMagic.Controller();
  // Select elements
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");

  // Loop over each slide
  sliders.forEach((slide) => {
    // Select some other elements
    const revealImage = slide.querySelector(".reveal-image");
    const image = slide.querySelector("img");
    const revealtext = slide.querySelector(".reveal-text");
    // GSAP, create a timeline
    const slideTimeline1 = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });

    // Create Animations
    slideTimeline1.fromTo(revealImage, { x: "0%" }, { x: "100%" });
    slideTimeline1.fromTo(image, { scale: 1.5 }, { scale: 1 }, "-=1");
    slideTimeline1.fromTo(revealtext, { x: "0%" }, { x: "100%" }, "-=0.75");
    slideTimeline1.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.8");

    // Create Scene so we can animate when we scroll
    slideScene = new ScrollMagic.Scene({
      // we want to start on every slide
      triggerElement: slide,
      triggerHook: 0.35,
      // to be visible always the slide when we trigger the scroll
      reverse: false,
    })
      // to copy the previous timeline animation we use .setTween()
      .setTween(slideTimeline1)
      .addIndicators({
        colorStart: "white",
        colorTrigger: "white",
        name: "slide",
      })
      .addTo(controller);
  });
}
// Call the function
animateSlides();
