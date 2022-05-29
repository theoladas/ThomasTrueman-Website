// Create the controller
let controller;
// create the scenes
let slideScene;
let pageScene;

function animateSlides() {
  // Init Controller
  controller = new ScrollMagic.Controller();
  // Select elements
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");

  // Loop over each slide
  sliders.forEach((slide, index, slides) => {
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
      // to be the slide visible after we trigger the scroll
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

    // New Animation (2nd Slide). I want to do a different animation with the 2nd slide. We can grab the 2nd slide from the forEach loop (index).
    const pageTimeline1 = gsap.timeline();
    pageTimeline1.fromTo(
      slide,
      { opacity: 1, scale: 1 },
      { opacity: 0, scale: 0.5 }
    );
    // Create new scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0,
      // the duration will last the whole height of the slide
      duration: "100%",
    })
      .addIndicators({
        colorStart: "white",
        colorTrigger: "white",
        name: "page",
        indent: 200,
      })
      //always you need to remove any semicolomn from here!
      // by setting a Pin means that the slide will stuck on the screen and it will stay stuck until the animation scroll ends.
      // The Pin related to the duration we set above. 100% means that will take the full height of the element we selected.
      // To fix the gap of the fade out black space , we add the pushFollowes: false, which will push the next element to show when the fade out finish.
      // The next content is coming on top of the previous one.
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTimeline1)
      .addTo(controller);
  });
}
// Call the function
animateSlides();
