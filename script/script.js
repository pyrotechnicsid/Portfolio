// add class navbarDark on navbar scroll
const header = document.querySelector('.navbar');
const toggledark = document.querySelector('.toggledark');
const cardbody = document.getElementsByClassName('card-body');
const body = document.body;

console.log(toggledark);
header.classList.add('navbarDark');
// collapse navbar after click on small devices
const navLinks = document.querySelectorAll('.nav-item')
const menuToggle = document.getElementById('navbarSupportedContent')

navLinks.forEach((l) => {
    l.addEventListener('click', () => { new bootstrap.Collapse(menuToggle).toggle() })
})


function darkmode () {
    if (body.style.backgroundColor == 'black') {
        console.log("test")
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
    else {
        body.style.cssText = `
        background-color: black;
        color: white;
        `
        for (var i = 0; i < cardbody.length; i++) {
            cardbody[i].style.cssText = `
            background-color: #212529;
            `
        }
    }
    
}

toggledark.addEventListener("click", darkmode);
