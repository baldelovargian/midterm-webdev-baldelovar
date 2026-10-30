// 1. Dark Mode Toggle with localStorage Persistence (B1, Stretch)
const themeToggles = [document.getElementById('theme-toggle'), document.getElementById('theme-toggle-desktop')];
const htmlElement = document.documentElement;

// Read saved state or default to dark
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    htmlElement.classList.remove('dark');
} else {
    htmlElement.classList.add('dark');
}

themeToggles.forEach(btn => {
    if (btn) {
        btn.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            const isDark = htmlElement.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
});


gsap.registerPlugin(ScrollTrigger);


const introTimeline = gsap.timeline({
    defaults: {
        duration: 0.8,
        ease: "power3.out" 
    }
});

introTimeline
    .from("#hero", {
        opacity: 0,
        y: 30,
        duration: 0.6
    })
    .from(".intro-elem", {
        opacity: 0,
        y: 20,
        stagger: 0.15, 
        ease: "back.out(1.2)" 
    }, "-=0.3"); 


const replayBtn = document.getElementById('replay-btn');
if (replayBtn) {
    replayBtn.addEventListener('click', () => {
        introTimeline.restart();
    });
}


const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
   
    gsap.fromTo("#scroll-progress", 
        { scaleX: 0 },
        {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        }
    );

    const revealSections = gsap.utils.toArray(".reveal");
    revealSections.forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });
});