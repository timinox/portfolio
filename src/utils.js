function mapRange(value, a, b, c, d) {
  value = (value - a) / (b - a);
  return c + value * (d - c);
}
function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}
function isOdd(num) {
  return num % 2;
}
function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

function retrieve_theme() {
  var theme = localStorage.getItem("website_theme");
  if (theme != null) {
    document.body.classList.remove("default", "dark_mode");
    document.body.classList.add(theme);
  }
}

function myDist(xA, yA, xB, yB) {
  var xDiff = xA - xB;
  var yDiff = yA - yB;

  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

export { mapRange, retrieve_theme, myDist, lerp, isOdd, clamp };
