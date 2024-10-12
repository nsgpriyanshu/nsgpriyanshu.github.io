// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Add 'loaded' class to the card after a short delay
  setTimeout(function () {
    document.querySelector(".card").classList.add("loaded");
  }, 750); // Adjusted delay for the card to 0.75 seconds (750 milliseconds)

  // Add 'loaded' class to midcard after a delay
  setTimeout(function () {
    document.querySelector(".midcard").classList.add("loaded");
  }, 2250); // Adjusted delay for midcard to 2.25 seconds (2250 milliseconds)

  // Add 'loaded' class to midcard2 after a delay
  setTimeout(function () {
    document.querySelector(".midcard2").classList.add("loaded");
  }, 3750); // Adjusted delay for midcard2 to 3.75 seconds (3750 milliseconds)

  // Add 'loaded' class to midcard4 after a delay
  setTimeout(function () {
    document.querySelector(".midcard4").classList.add("loaded");
  }, 5250); // Adjusted delay for midcard4 to 5.25 seconds (5250 milliseconds)

  // Add 'loaded' class to midcard3 after a delay
  setTimeout(function () {
    document.querySelector(".midcard5").classList.add("loaded");
  }, 6750); // Adjusted delay for midcard3 to 6.75 seconds (6750 milliseconds)

  // Add 'loaded' class to midcard3 after a delay
  setTimeout(function () {
    document.querySelector(".midcard3").classList.add("loaded");
  }, 8250); // Adjusted delay for midcard3 to 6.75 seconds (6750 milliseconds)
});
