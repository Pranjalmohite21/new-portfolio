// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Resume download functionality
function downloadResume() {
    // Create a sample resume content (you can replace this with your actual resume)
    const resumeContent = `
PRANJAL MOHITE
Full Stack Developer & Software Engineer

CONTACT INFORMATION
Email: pranjal.mohite@example.com
Phone: +1 (555) 123-4567
Location: San Francisco, CA
LinkedIn: linkedin.com/in/pranjal-mohite
GitHub: github.com/pranjal-mohite

PROFESSIONAL SUMMARY
Experienced Full Stack Developer with 3+ years of expertise in building scalable web applications. 
Proficient in modern frontend and backend technologies with a passion for creating innovative 
solutions and exceptional user experiences.

TECHNICAL SKILLS
Frontend: HTML5, CSS3, JavaScript, React, Vue.js, TypeScript
Backend: Node.js, Python, Java, Express.js, Django
Database: MongoDB, PostgreSQL, MySQL, Redis
Tools & Others: Git, Docker, AWS, Linux, REST APIs, GraphQL

WORK EXPERIENCE

Senior Full Stack Developer | TechCorp Inc. | 2022 - Present
• Led development of enterprise-level web applications using React and Node.js
• Implemented microservices architecture improving system performance by 40%
• Mentored junior developers and conducted code reviews
• Collaborated with cross-functional teams to deliver high-quality products

Full Stack Developer | StartupXYZ | 2021 - 2022
• Built and maintained multiple client-facing applications
• Developed RESTful APIs and integrated third-party services
• Optimized database queries reducing load times by 60%
• Participated in agile development processes

PROJECTS

E-Commerce Platform
• Full-stack e-commerce solution with payment integration
• Technologies: React, Node.js, MongoDB, Stripe API
• Features: User authentication, product management, order processing

Task Management App
• Collaborative task management with real-time updates
• Technologies: Vue.js, Express, PostgreSQL, Socket.io
• Features: Real-time collaboration, file sharing, progress tracking

Weather Dashboard
• Weather application with location-based forecasts
• Technologies: JavaScript, Weather API, CSS3, HTML5
• Features: Interactive maps, 7-day forecast, location search

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2017 - 2021
GPA: 3.8/4.0

CERTIFICATIONS
• AWS Certified Developer Associate
• MongoDB Certified Developer
• React Developer Certification

LANGUAGES
• English (Native)
• Hindi (Fluent)
• Spanish (Intermediate)

INTERESTS
• Open Source Contribution
• Machine Learning
• Cloud Computing
• Web Performance Optimization
    `;

    // Create a blob with the resume content
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    
    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Pranjal_Mohite_Resume.txt';
    
    // Trigger the download
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    // Show success message
    showNotification('Resume downloaded successfully!', 'success');
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : '#4F46E5'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Form submission handling
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Create email content
        const emailSubject = `Portfolio Contact: ${subject}`;
        const emailBody = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;
        
        // Create mailto link
        const mailtoLink = `mailto:pranjalmohitevk@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        
        // Open default email client
        window.open(mailtoLink);
        
        // Show success message
        showNotification('Email client opened! Please send the message.', 'success');
        this.reset();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .stat');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Preloader
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Skill progress animation
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'scale(1.05)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 200);
        }, index * 100);
    });
}

// Trigger skill animation when skills section is visible
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
} 