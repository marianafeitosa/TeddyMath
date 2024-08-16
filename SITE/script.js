document.addEventListener('DOMContentLoaded', function () {
    // Obtém todos os links da barra de navegação
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Evita o comportamento padrão do link

            // Obtém o ID da seção do link clicado
            const sectionId = this.getAttribute('href').substring(1);
            const section = document.getElementById(sectionId);

            // Rolagem suave para a seção
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// Exibir o botão quando rolar para baixo
window.addEventListener('scroll', () => {
    const backToTopButton = document.getElementById('back-to-top');
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'flex';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Voltar ao topo ao clicar no botão
document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});