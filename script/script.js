// add class navbarDark on navbar scroll
const header = document.querySelector('.navbar');
const cardbody = document.getElementsByClassName('card-body');
const checkbox = document.getElementsByClassName('checkbox')[0];
const body = document.body;

header.classList.add('navbarDark');
// collapse navbar after click on small devices
const navLinks = document.querySelectorAll('.nav-item')
const menuToggle = document.getElementById('navbarSupportedContent')

navLinks.forEach((l) => {
    l.addEventListener('click', () => { new bootstrap.Collapse(menuToggle).toggle() })
})

checkbox.addEventListener("change", function() {
    if (this.checked) {
        body.style.cssText = `
        background-color: black;
        color: white;
        `
        for (var i = 0; i < cardbody.length; i++) {
            cardbody[i].style.cssText = `
            background-color: #212529;
            `
        }
    } else {
        body.style.cssText = `
        background-color: white;
        color: black;
        `
        for (var i = 0; i < cardbody.length; i++) {
            cardbody[i].style.cssText = `
            background-color: white;
            `
        }
    }
  });
