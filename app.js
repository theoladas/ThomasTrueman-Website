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
      // We want to start the animation on every slide
      triggerElement: slide,
      triggerHook: 0.35,
      // to be the slide visible after we trigger the scroll
      reverse: false,
    })
      // to copy the previous timeline animation we use .setTween()
      .setTween(slideTimeline1)
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "slide",
      // })
      .addTo(controller);

    // New Animation (2nd Slide). I want to do a different animation with the 2nd slide. We can grab the 2nd slide from the forEach loop (index).
    const pageTimeline1 = gsap.timeline();
    // Get the next slide so I can push it down and make it appear a bit later that the fade out effect.
    // I can check if it's the last slide so that means that I don't have anything else to select. We use an if statement with Ternary Operator. If it's the last slide print "end" else select the next slide.
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    // Move down the nextSlide (so the previous slide stays visible for a longer time)
    pageTimeline1.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageTimeline1.fromTo(
      slide,
      { opacity: 1, scale: 1 },
      { opacity: 0, scale: 0.5 }
    );
    // Move up the nextSlide
    pageTimeline1.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.2");

    // Create new scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0,
      // the duration will last the whole height of the slide
      duration: "100%",
    })

      // By setting a Pin means that the slide will stuck on the screen and it will stay stuck until the animation scroll ends.
      // The Pin related to the duration we set above. 100% means that will take the full height of the element we selected.
      // To fix the gap of the fade out black space , we add the pushFollowes: false, which will push the next element to show when the fade out finish.
      // The next content is coming on top of the previous one.
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTimeline1)
      .addTo(controller);
  });
}

// SELECTORS
// select the mouse
const mouse = document.querySelector(".cursor");
// select the mouse text
const mouseTxt = mouse.querySelector("span");
// select the burger
const burger = document.querySelector(".burger");
// select the arrow to move to the top of the page
const arrowTop = document.querySelector(".fa-solid");

// FUNCTIONS
// Move to the top of the page
function topFunction() {
  // document.body.scrollTop = 0; // For Safari
  // document.documentElement.scrollTop = 0; // For Chrome
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Cursor function
function cursor(e) {
  // Modify the styles of the top and left
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}
// When hover elements, to make an animation
function activeCursor(e) {
  // Create a variable to give us what element we mouseover
  const itemClicked = e.target;
  // Based on the class element (logo & burger) add nav-active
  if (itemClicked.id === "logo" || itemClicked.classList.contains("burger")) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }
  // Based on the class element (explore) add explore-active class
  if (itemClicked.classList.contains("explore")) {
    mouse.classList.add("explore-active");
    // create the COLOR TITLE animation (to move UP the colored div (.title-color))
    gsap.to(".title-color", 0.5, { y: "0%" });
    // mouseTxt.innerText = "Tap";
  } else {
    mouse.classList.remove("explore-active");
    // create the COLOR TITLE animation (to move DOWN the colored div (.title-color))
    gsap.to(".title-color", 0.5, { y: "100%" });
    mouseTxt.innerText = "";
  }
}
// NavToggle function
function navToggle(e) {
  // create the statement to be able to toggle the burger:

  // if the e.target does not contains the active class
  if (!e.target.classList.contains("active")) {
    // add the active class on it
    e.target.classList.add("active");
    // and then start animate everything:
    // Create animation for burger lines (y push it up by 5). We make background:black to see the burger lines in the white (contact page) bg.
    gsap.to(".line1", 0.5, { rotate: "45deg", y: 5, background: "black" });
    gsap.to(".line2", 0.5, { rotate: "-45deg", y: -5, background: "black" });
    // make visible the logo on cotnact page (by changing bg-color)
    gsap.to("#logo", 1, { color: "black" });
    // Expand that nav clipPath effect (show the contact page)
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
    // remove the scroll bar when we are in Contact page by creating a hide class
    document.body.classList.add("hide");
  } else {
    // if e.target HAS the active class , we will remove it and we will animate everything back
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0deg", y: 5, background: "white" });
    gsap.to(".line2", 0.5, { rotate: "0deg", y: 5, background: "white" });
    gsap.to("#logo", 1, { color: "white" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
    document.body.classList.remove("hide");
  }
}

// EVENT LISTENERS
// We want to trigger the window object when we move the mouse(to get the position y and x)
window.addEventListener("mousemove", cursor);
// We want when hover elements to create an animation
window.addEventListener("mouseover", activeCursor);
// Burger Event listener
burger.addEventListener("click", navToggle);
// Move to the Top of the page
arrowTop.addEventListener("click", topFunction);

// Call the functions
animateSlides();
