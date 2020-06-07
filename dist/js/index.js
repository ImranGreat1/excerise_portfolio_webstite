const TypeWriter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.wait = wait;
  this.txt = "";
  this.wordIndex = 0;
  this.isDeleting = false;
  this.type();
};

TypeWriter.prototype.type = function () {
  // Get current word
  let current = this.wordIndex % this.words.length;

  //  Get current word
  let fullTxt = this.words[current];

  // Chech isDeleting
  if (this.isDeleting) {
    //   Remove character
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    //   Add character
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // Insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  // Type speed
  let typeSpeed = 300;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  if (this.isDeleting && this.txt === "") {
    // Make is deleting false after is done deleting
    this.isDeleting = false;
    // Wait a little bit after text is completely deleted
    typeSpeed = 500;
  } else if (!this.isDeleting && this.txt === fullTxt) {
    //   Wait for when the txt is typed completely
    typeSpeed = this.wait;
    // Make it start deleting when txt is completed
    this.isDeleting = true;
    // Move to the next word
    this.wordIndex++;
  }

  setTimeout(() => this.type(), typeSpeed);
};

document.addEventListener("DOMContentLoaded", init);

function init() {
  // DOM Data
  let txtElement = document.querySelector(".txt-type");
  let wait = parseInt(txtElement.getAttribute("data-wait"), 0);
  let words = JSON.parse(txtElement.getAttribute("data-words"));
  console.log(wait);
  console.log(words);

  new TypeWriter(txtElement, words, wait);
}
