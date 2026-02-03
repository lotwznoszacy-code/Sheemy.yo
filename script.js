// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			// Close mobile menu if open
			const hamburger = document.querySelector('.hamburger');
			const mobileNav = document.querySelector('.mobile-nav');
			if (hamburger && hamburger.classList.contains('active')) {
				hamburger.classList.remove('active');
				mobileNav.classList.remove('active');
			}

			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	});
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

if (hamburger) {
	hamburger.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobileNav.classList.toggle('active');
	});
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
	if (
		hamburger &&
		!hamburger.contains(e.target) &&
		!mobileNav.contains(e.target)
	) {
		hamburger.classList.remove('active');
		mobileNav.classList.remove('active');
	}
});

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
	if (window.pageYOffset > 100) {
		header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
	} else {
		header.style.boxShadow = 'none';
	}
});

// Parallax effect for geometric shapes
window.addEventListener('scroll', () => {
	const scrolled = window.pageYOffset;
	const shapes = document.querySelectorAll('.geometric-shape');

	shapes.forEach((shape, index) => {
		const speed = (index + 1) * 0.1;
		shape.style.transform = `translateY(${scrolled * speed}px)`;
	});
});

// Intersection Observer for animations
const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.style.animationPlayState = 'running';
		}
	});
}, observerOptions);

document
	.querySelectorAll('.service-card, .feature-item, .stat-item')
	.forEach((el) => {
		observer.observe(el);
	});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
	contactForm.addEventListener('submit', function (e) {
		e.preventDefault();
		alert('Dziękujemy za wiadomość! Wkrótce się z Tobą skontaktujemy.');
		this.reset();
	});
}

// Chat bubble interaction
const chatBubble = document.querySelector('.chat-bubble');
if (chatBubble) {
	chatBubble.addEventListener('click', () => {
		alert('Funkcja czatu zostałaby tutaj otwarta!');
	});
}

// Counter animation for stats
function animateCounter(element, target) {
	let current = 0;
	const increment = target / 100;
	const timer = setInterval(() => {
		current += increment;
		if (current >= target) {
			element.textContent = target + '+';
			clearInterval(timer);
		} else {
			element.textContent = Math.floor(current) + '+';
		}
	}, 20);
}

// Stats counter observer
const statsObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			const number = entry.target.querySelector('.stat-number');
			if (number && !number.dataset.animated) {
				const targetText = number.textContent.replace('+', '');
				const targetNumber = parseInt(targetText.match(/\d+/)) || 0;
				animateCounter(number, targetNumber);
				number.dataset.animated = 'true';
			}
		}
	});
}, observerOptions);

document.querySelectorAll('.stat-item').forEach((el) => {
	statsObserver.observe(el);
});
