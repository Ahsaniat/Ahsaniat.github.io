// Load and render data from JSON
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        renderPage(data);
    } catch (error) {
        console.error('Failed to load data:', error);
    }
}

function renderPage(data) {
    // Header - will be animated later
    const nameElement = document.getElementById('name');
    nameElement.textContent = data.name;
    
    const taglineElement = document.getElementById('tagline');
    taglineElement.textContent = data.tagline;
    
    // Bio - will be animated later
    const bioElement = document.getElementById('bio');
    bioElement.textContent = data.bio;
    
    // Interests
    const interestsContainer = document.getElementById('interests');
    data.interests.forEach(interest => {
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.textContent = interest;
        interestsContainer.appendChild(tag);
    });
    
    // Languages
    const langContainer = document.getElementById('languages');
    data.languages.forEach(lang => {
        const langItem = document.createElement('div');
        langItem.className = 'lang-item';
        langItem.innerHTML = `
            <img src="${lang.logo}" alt="${lang.name}" class="tech-logo" onerror="this.style.display='none'">
            <div>${lang.name}</div>
        `;
        langContainer.appendChild(langItem);
    });
    
    // Stack
    const stackContainer = document.getElementById('stack');
    Object.entries(data.stack).forEach(([category, items]) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'stack-category';
        
        const title = document.createElement('h4');
        title.textContent = category;
        categoryDiv.appendChild(title);
        
        const itemsDiv = document.createElement('div');
        itemsDiv.className = 'stack-items';
        
        items.forEach(item => {
            const itemSpan = document.createElement('span');
            itemSpan.className = 'stack-item';
            itemSpan.innerHTML = `
                <img src="${item.logo}" alt="${item.name}" class="tech-logo" onerror="this.style.display='none'">
                <span>${item.name}</span>
            `;
            itemsDiv.appendChild(itemSpan);
        });
        
        categoryDiv.appendChild(itemsDiv);
        stackContainer.appendChild(categoryDiv);
    });
    
    // Specialization
    const specContainer = document.getElementById('specialization');
    data.specialization.forEach(spec => {
        const specItem = document.createElement('div');
        specItem.className = 'spec-item';
        specItem.textContent = spec;
        specContainer.appendChild(specItem);
    });
    
    // Research
    const researchContainer = document.getElementById('research');
    data.research.forEach(research => {
        const researchItem = document.createElement(research.link ? 'a' : 'div');
        researchItem.className = `research-item${!research.link ? ' no-link' : ''}`;
        if (research.link) {
            researchItem.href = research.link;
            researchItem.target = '_blank';
        }
        researchItem.textContent = research.name;
        researchContainer.appendChild(researchItem);
    });
    
    // Projects
    const projectsContainer = document.getElementById('projects');
    data.projects.forEach(project => {
        const projectItem = document.createElement(project.link ? 'a' : 'div');
        projectItem.className = `project-item${!project.link ? ' no-link' : ''}`;
        if (project.link) {
            projectItem.href = project.link;
            projectItem.target = '_blank';
        }
        projectItem.textContent = project.name;
        projectsContainer.appendChild(projectItem);
    });
    
    // Contact Footer
    const contactFooter = document.getElementById('contact-footer');
    const contactItems = [];
    
    if (data.contact.email) {
        contactItems.push(`
            <a href="mailto:${data.contact.email}" class="contact-item">
                <svg viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                ${data.contact.email}
            </a>
        `);
    }
    
    if (data.contact.github) {
        contactItems.push(`
            <a href="https://github.com/${data.contact.github}" target="_blank" class="contact-item">
                <svg viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
            </a>
        `);
    }
    
    if (data.contact.twitter) {
        contactItems.push(`
            <a href="https://twitter.com/${data.contact.twitter}" target="_blank" class="contact-item">
                <svg viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
                Twitter
            </a>
        `);
    }
    
    if (data.contact.linkedin) {
        contactItems.push(`
            <a href="https://linkedin.com/in/${data.contact.linkedin}" target="_blank" class="contact-item">
                <svg viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                </svg>
                LinkedIn
            </a>
        `);
    }
    
    contactFooter.innerHTML = contactItems.join('<div class="contact-separator"></div>');
}

// Intersection Observer for scroll animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s forwards';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.bento').forEach(bento => {
        observer.observe(bento);
    });
}

// Add subtle parallax effect
function setupParallax() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('.bento');
                
                parallaxElements.forEach((el, index) => {
                    const speed = (index % 3 + 1) * 0.05;
                    el.style.transform = `translateY(${scrolled * speed}px)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Typewriter effect with 360-degree flip animation
function typewriterEffect(element, text, speed = 50, withFlip = false) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            const char = text.charAt(i);
            const span = document.createElement('span');
            
            if (withFlip && char !== ' ') {
                span.className = 'char-flip';
                span.style.animationDelay = `${i * 0.02}s`;
            }
            
            span.textContent = char;
            element.appendChild(span);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadData().then(() => {
        setupScrollAnimations();
        
        // Start name, tagline, and bio animations simultaneously
        const name = document.getElementById('name');
        const nameText = name.textContent;
        typewriterEffect(name, nameText, 40, true);
        
        const tagline = document.getElementById('tagline');
        const taglineText = tagline.textContent;
        typewriterEffect(tagline, taglineText, 35, true);
        
        const bio = document.getElementById('bio');
        const bioText = bio.textContent;
        typewriterEffect(bio, bioText, 20, true);
    });
});

// Add random delay for data flow animation
document.querySelectorAll('.bento').forEach((bento, index) => {
    bento.style.setProperty('--delay', Math.random() * 5);
});
