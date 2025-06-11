  // Ensure the script runs after the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = mobileMenuButton.querySelector('svg:first-child');
    const menuIconClose = mobileMenuButton.querySelector('svg:last-child');

    if (mobileMenuButton && mobileMenu && menuIconOpen && menuIconClose) {
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            menuIconOpen.classList.toggle('hidden', !isHidden);
            menuIconClose.classList.toggle('hidden', isHidden);
            mobileMenuButton.setAttribute('aria-expanded', String(!isHidden));
        });

        document.querySelectorAll('#mobile-menu a.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIconOpen.classList.remove('hidden');
                menuIconClose.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // Active navigation link highlighting on scroll
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a.nav-link");

    if (sections.length > 0 && navLinks.length > 0) {
         const observerOptions = {
            root: null, 
            rootMargin: '-70px 0px -50% 0px', 
            threshold: 0 
        };

        const observer = new IntersectionObserver((entries) => {
            let firstIntersectingId = null;
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    firstIntersectingId = entry.target.getAttribute('id');
                    break; 
                }
            }
            if (!firstIntersectingId) {
                let highestVisibleSectionId = null;
                let highestVisibleSectionTop = Infinity;
                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 70 && rect.top < highestVisibleSectionTop) { // 70 is nav height
                        highestVisibleSectionTop = rect.top;
                        highestVisibleSectionId = section.getAttribute('id');
                    }
                });
                firstIntersectingId = highestVisibleSectionId;
            }

            navLinks.forEach(link => {
                link.classList.remove("active");
                const href = link.getAttribute("href");
                if (href && href.substring(1) === firstIntersectingId) {
                    link.classList.add("active");
                }
            });
            if (window.pageYOffset < (sections[0]?.offsetTop || 0) - 70 && !firstIntersectingId) { // Check if sections[0] exists
                 navLinks.forEach(link => link.classList.remove('active'));
            }
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
});