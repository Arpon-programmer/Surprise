document.addEventListener('DOMContentLoaded', function() {
    // Function to add typing effect to any element
    function addTypingEffect(element, text, delay = 0) {
        if (!element || !text) return;
        
        const originalText = text;
        element.classList.add('typing');
        element.innerHTML = '<span class="typing-cursor"></span>';
        
        setTimeout(() => {
            let charIndex = 0;
            const typingSpeed = 30; // milliseconds per character
            
            function typeNextChar() {
                if (charIndex < originalText.length) {
                    element.textContent = originalText.substring(0, charIndex + 1);
                    charIndex++;
                    setTimeout(typeNextChar, typingSpeed);
                } else {
                    element.classList.remove('typing');
                    element.classList.add('typed');
                }
            }
            
            typeNextChar();
        }, delay);
    }

    // Function to initialize typing effects for index.html
    function initializeIndexTyping() {
        const h1 = document.querySelector('.first-h1');
        const p1 = document.querySelector('.first-p1');
        const buttons = document.querySelectorAll('.btn');
        const yupButton = document.querySelector('.btn-yup');

        if (h1) {
            addTypingEffect(h1, h1.textContent);
        }

        if (p1) {
            addTypingEffect(p1, p1.textContent, 1000);
        }

        // Add typing effect to Hmm button
        const hmmButton = document.querySelector('.btn-hmm');
        if (hmmButton) {
            addTypingEffect(hmmButton, hmmButton.textContent, 2000);
        }

        // Add typing effect to Yup button and position changing
        if (yupButton) {
            addTypingEffect(yupButton, yupButton.textContent, 2500);
            
            // Start position changing after typing is complete
            setTimeout(() => {
                const container = document.querySelector('.button-container');
                const containerRect = container.getBoundingClientRect();
                const buttonRect = yupButton.getBoundingClientRect();
                
                function moveButtonRandomly() {
                    const maxX = containerRect.width - buttonRect.width;
                    const maxY = containerRect.height - buttonRect.height;
                    
                    const randomX = Math.random() * maxX;
                    const randomY = Math.random() * maxY;
                    
                    yupButton.style.position = 'absolute';
                    yupButton.style.left = randomX + 'px';
                    yupButton.style.top = randomY + 'px';
                }
                
                // Move button on hover
                yupButton.addEventListener('mouseover', () => {
                    moveButtonRandomly();
                });
                
                // Move button on click
                yupButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    moveButtonRandomly();
                });
            }, 3000); // Wait for typing to complete
        }
    }

    // Function to initialize typing effects for surprise.html
    function initializeSurpriseTyping() {
        const adviceContent = document.querySelector('.advice-content');
        if (!adviceContent) return;

        let currentIndex = 0;
        
        // All quotes in one array
        const allQuotes = [
            "I pray to God that your dreams will be fulfilled. All the best wishes for you.",
            "Always keep focus on your goals. Stay happy, chill and enjoy every moment of life.",
            "Remember, you are stronger than you think. Every challenge is an opportunity to grow.",
            "Your kindness and intelligence make the world a better place. Never stop shining.",
            "Believe in yourself, for you are capable of achieving anything you set your mind to.",
            "Life is beautiful when you choose to see the magic in everyday moments.",
            "Your smile has the power to brighten someone's day. Keep spreading joy wherever you go.",
            "Every step forward, no matter how small, is progress. Celebrate your journey.",
            "Your potential is limitless. Don't let anyone or anything dim your light.",
            "The best version of yourself is yet to come. Keep growing, keep glowing.",
            "Your dreams are valid, your feelings matter, and your voice deserves to be heard.",
            "In a world full of ordinary, you are extraordinary. Embrace your uniqueness.",
            "Your strength lies not in never falling, but in rising every time you fall.",
            "The future belongs to those who believe in the beauty of their dreams.",
            "Your kindness is your superpower. Never underestimate its impact.",
            "You are the author of your story. Make it a masterpiece worth reading.",
            "Your courage to be different is what makes you special. Stay true to yourself.",
            "Every day is a new opportunity to create something beautiful.",
            "Your positive energy is contagious. Keep spreading it around.",
            "The world needs more people like you - kind, compassionate, and full of light."
        ];

        // Function to create a quote element with typing effect
        function createQuoteElement(quote) {
            const quoteElement = document.createElement('p');
            quoteElement.className = 'advice-item';
            addTypingEffect(quoteElement, quote, 500);
            return quoteElement;
        }

        // Function to show next quote
        function showNextQuote() {
            if (currentIndex < allQuotes.length) {
                const quoteElement = createQuoteElement(allQuotes[currentIndex]);
                adviceContent.appendChild(quoteElement);
                currentIndex++;
            }
        }

        // Add typing effect to title
        const title = document.querySelector('.advice-title');
        if (title) {
            addTypingEffect(title, title.textContent);
        }

        // Show first quote immediately
        showNextQuote();

        // Intersection Observer for scroll-based loading
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    showNextQuote();
                }
            });
        }, {
            threshold: 0.5 // Trigger when 50% of the last quote is visible
        });

        // Start observing the last quote
        function observeLastQuote() {
            const quotes = document.querySelectorAll('.advice-item');
            if (quotes.length > 0) {
                observer.observe(quotes[quotes.length - 1]);
            }
        }

        // Initial observation
        observeLastQuote();

        // Update observer when new quotes are added
        const config = { childList: true };
        const callback = function(mutationsList, observer) {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    observeLastQuote();
                }
            }
        };
        const mutationObserver = new MutationObserver(callback);
        mutationObserver.observe(adviceContent, config);
    }

    // Initialize typing effects based on current page
    if (document.querySelector('.first-h1')) {
        initializeIndexTyping();
    } else if (document.querySelector('.advice-content')) {
        initializeSurpriseTyping();
    }
});
