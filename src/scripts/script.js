function setupMenuToggle() {
    const menuHamburguer = document.querySelector('.menu-hamburguer');
    const menu = document.querySelector('.menu');
    const logos = document.querySelector('.logos');
    const header = document.querySelector('header');

    menuHamburguer.addEventListener('click', () => {
        menu.classList.toggle('active');
        menuHamburguer.classList.toggle('active');
        logos.classList.toggle('hidden');
        header.classList.toggle('no-justify-space-between');
    });
}

document.addEventListener('DOMContentLoaded', setupMenuToggle);
