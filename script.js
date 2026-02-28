// Neural Network Background
const canvas = document.getElementById('neural-network');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Neuron {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 2 + 1;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    
    draw() {
        ctx.fillStyle = '#00fff9';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00fff9';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

const neurons = Array.from({ length: 80 }, () => new Neuron());

function animateNeuralNetwork() {
    ctx.fillStyle = 'rgba(5, 8, 22, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    neurons.forEach((neuron, i) => {
        neuron.update();
        neuron.draw();
        
        neurons.slice(i + 1).forEach(other => {
            const dx = neuron.x - other.x;
            const dy = neuron.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                ctx.strokeStyle = `rgba(0, 255, 249, ${0.2 * (1 - distance / 150)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(neuron.x, neuron.y);
                ctx.lineTo(other.x, other.y);
                ctx.stroke();
            }
        });
    });
    
    requestAnimationFrame(animateNeuralNetwork);
}

animateNeuralNetwork();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Custom Cursor
const cursorGlow = document.getElementById('cursor-glow');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.5;
    cursorY += (mouseY - cursorY) * 0.5;
    cursorGlow.style.left = cursorX + 'px';
    cursorGlow.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effect
document.querySelectorAll('a, button, .tech-chip').forEach(el => {
    el.addEventListener('mouseenter', () => cursorGlow.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorGlow.classList.remove('hover'));
});

// Timestamp
function updateTimestamp() {
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);
    document.getElementById('timestamp').textContent = timestamp;
}
updateTimestamp();
setInterval(updateTimestamp, 1000);

// Terminal Typing Effect
const terminalText = "Prateek Chhimwal // Software Development Engineer @ Ericsson";
const terminalOutput = document.getElementById('typing-output');
let charIndex = 0;

function typeTerminal() {
    if (charIndex < terminalText.length) {
        terminalOutput.textContent += terminalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeTerminal, 50);
    }
}

setTimeout(typeTerminal, 1000);

// Role Typewriter
const roles = [
    "Router Firmware Developer",
    "Network Platform Engineer",
    "Embedded Systems Specialist",
    "Full Stack Developer"
];
let roleIndex = 0;
let roleCharIndex = 0;
let isDeleting = false;
const roleText = document.getElementById('role-text');

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        roleText.textContent = currentRole.substring(0, roleCharIndex - 1);
        roleCharIndex--;
    } else {
        roleText.textContent = currentRole.substring(0, roleCharIndex + 1);
        roleCharIndex++;
    }
    
    if (!isDeleting && roleCharIndex === currentRole.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && roleCharIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }
    
    setTimeout(typeRole, isDeleting ? 50 : 100);
}

setTimeout(typeRole, 2000);

// Counter Animation
const counters = document.querySelectorAll('.counter');
let animated = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
}

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            if (!animated && entry.target.classList.contains('metrics-grid')) {
                animateCounters();
                animated = true;
            }
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.holo-card, .section-header, .metrics-grid').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s, transform 0.8s';
    observer.observe(el);
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeToggle.querySelector('.theme-icon').textContent = savedTheme === 'light' ? '◐' : '◑';

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeToggle.querySelector('.theme-icon').textContent = next === 'light' ? '◐' : '◑';
});

// Scroll to Top
const scrollTop = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    scrollTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth Scroll
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Active Nav Link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.section-parallax').forEach((section, index) => {
        const speed = 0.5;
        section.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
    });
});

// Glitch Effect on Hover
document.querySelectorAll('.logo-glitch').forEach(el => {
    el.addEventListener('mouseenter', () => {
        let iterations = 0;
        const interval = setInterval(() => {
            el.textContent = el.textContent
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return el.getAttribute('data-text')[index];
                    }
                    return String.fromCharCode(33 + Math.floor(Math.random() * 94));
                })
                .join('');
            
            if (iterations >= el.getAttribute('data-text').length) {
                clearInterval(interval);
            }
            iterations += 1/3;
        }, 30);
    });
});
