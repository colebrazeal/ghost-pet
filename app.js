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

    // Generic Carousel Initialization Function
    function initializeCarousel(carouselId, itemsSelector, prevBtnId, nextBtnId, paginationId, wrapperSelector) {
        const carousel = document.getElementById(carouselId);
        const carouselItems = document.querySelectorAll(itemsSelector);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        const paginationContainer = document.getElementById(paginationId);
        const carouselWrapper = document.querySelector(wrapperSelector);

        if (!carousel || carouselItems.length === 0 || !prevBtn || !nextBtn || !paginationContainer || !carouselWrapper) {
            console.warn(`Carousel elements not found for ${carouselId}. Carousel functionality will be disabled.`);
            if(prevBtn) prevBtn.style.display = 'none';
            if(nextBtn) nextBtn.style.display = 'none';
            if(paginationContainer) paginationContainer.style.display = 'none';
            return;
        }

        let currentIndex = 0;
        let isDragging = false;
        let startX = 0;
        let currentTranslateX = 0;
        let startTranslateX = 0;
        let itemWidth = 0;

        function getMetrics() {
            if (carouselItems.length > 0) {
                itemWidth = carouselWrapper.offsetWidth; 
                carouselItems.forEach(item => {
                    item.style.width = `${itemWidth}px`;
                });
            } else {
                itemWidth = 0;
            }
        }

        function updatePosition(smooth = true) {
            if (smooth) {
                carousel.style.transition = 'transform 0.3s ease-out';
            } else {
                carousel.style.transition = 'none';
            }
            carousel.style.transform = `translateX(${currentTranslateX}px)`;
            updatePagi();
            updateNavBtns();
        }

        function goTo(index) {
            currentIndex = Math.max(0, Math.min(carouselItems.length - 1, index));
            currentTranslateX = -currentIndex * itemWidth;
            updatePosition();
        }

        // function updatePagi() {
        //     if (!paginationContainer) return;
        //     paginationContainer.innerHTML = '';
        //     carouselItems.forEach((_, index) => {
        //         const dot = document.createElement('span');
        //         dot.classList.add('dot');
        //         if (index === currentIndex) {
        //             dot.classList.add('active');
        //         }
        //         dot.addEventListener('click', () => goTo(index));
        //         paginationContainer.appendChild(dot);
        //     });
        // }

        function updateNavBtns() {
            if (!prevBtn || !nextBtn) return;
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= carouselItems.length - 1;
        }

        function dragStartHandler(e) {
            if (carouselItems.length <= 1) return;
            isDragging = true;
            startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            startTranslateX = currentTranslateX;
            carousel.classList.add('dragging');
            carousel.style.transition = 'none';
        }

        function draggingHandler(e) {
            if (!isDragging) return;
            const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const diffX = currentX - startX;
            currentTranslateX = startTranslateX + diffX;
            carousel.style.transform = `translateX(${currentTranslateX}px)`;
        }

        function dragEndHandler() {
            if (!isDragging) return;
            isDragging = false;
            carousel.classList.remove('dragging');
            carousel.style.transition = 'transform 0.3s ease-out';
            const dragThreshold = itemWidth / 4; 
            const draggedDistance = startTranslateX - currentTranslateX;

            if (draggedDistance > dragThreshold && currentIndex < carouselItems.length - 1) {
                goTo(currentIndex + 1);
            } else if (draggedDistance < -dragThreshold && currentIndex > 0) {
                goTo(currentIndex - 1);
            } else {
                goTo(currentIndex);
            }
        }
        
        // if (prevBtn && nextBtn) {
        //     prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
        //     nextBtn.addEventListener('click', () => goTo(currentIndex + 1));
        // }

        carousel.addEventListener('mousedown', dragStartHandler);
        document.addEventListener('mousemove', draggingHandler); 
        document.addEventListener('mouseup', dragEndHandler);
        carousel.addEventListener('mouseleave', () => { if (isDragging) dragEndHandler(); });
        
        carousel.addEventListener('touchstart', dragStartHandler, { passive: true });
        document.addEventListener('touchmove', draggingHandler, { passive: true }); 
        document.addEventListener('touchend', dragEndHandler);

        function setup() {
            getMetrics();
            goTo(0); 
        }

        setup();
        window.addEventListener('resize', setup); 
    }

    // Initialize Features Carousel
    initializeCarousel(
        'feature-carousel-items',      
        '#feature-carousel-items .carousel-item-card', 
        'featuresPrevBtn',             
        'featuresNextBtn',             
        'features-carousel-pagination',
        '#features .carousel-container-wrapper' 
    );

    // Initialize Revenue Carousel
    initializeCarousel(
        'revenue-carousel-items',      
        '#revenue-carousel-items .carousel-item-card',  
        'revenuePrevBtn',              
        'revenueNextBtn',              
        'revenue-carousel-pagination', 
        '#revenue .carousel-container-wrapper' 
    );
});