document.addEventListener('DOMContentLoaded', function() {
    const yupButton = document.querySelector('.btn-yup');
    const hmmButton = document.querySelector('.btn-hmm');
    const body = document.body;
    
    // Function to get random position within viewport
    function getRandomPosition() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const buttonWidth = yupButton.offsetWidth;
        const buttonHeight = yupButton.offsetHeight;
        
        // Calculate safe margins (20px from edges)
        const maxX = viewportWidth - buttonWidth - 40;
        const maxY = viewportHeight - buttonHeight - 40;
        
        // Generate random position with safe margins
        const newX = Math.max(20, Math.random() * maxX);
        const newY = Math.max(20, Math.random() * maxY);
        
        return { x: newX, y: newY };
    }
    
    // Function to move Yup button
    function moveYupButton() {
        const position = getRandomPosition();
        yupButton.style.position = 'fixed';
        yupButton.style.left = `${position.x}px`;
        yupButton.style.top = `${position.y}px`;
    }

    // Function to set initial positions
    function setInitialPositions() {
        const viewportWidth = window.innerWidth;
        const buttonWidth = yupButton.offsetWidth;
        const gap = 20; // Gap between buttons
        
        // Get the paragraph element
        const paragraph = document.querySelector('.first-p1');
        const paragraphRect = paragraph.getBoundingClientRect();
        
        // Position buttons below the paragraph with some spacing
        const centerX = (viewportWidth - (buttonWidth * 2 + gap)) / 2;
        const buttonY = paragraphRect.bottom + 30; // 30px below the paragraph
        
        // Position Hmm button (stationary)
        hmmButton.style.position = 'fixed';
        hmmButton.style.left = `${centerX}px`;
        hmmButton.style.top = `${buttonY}px`;
        
        // Position Yup button next to Hmm button
        yupButton.style.position = 'fixed';
        yupButton.style.left = `${centerX + buttonWidth + gap}px`;
        yupButton.style.top = `${buttonY}px`;
    }
    
    // Move Yup button on hover
    yupButton.addEventListener('mouseover', function(e) {
        moveYupButton();
    });
    
    // Move Yup button when mouse gets close (proximity detection)
    document.addEventListener('mousemove', function(e) {
        const buttonRect = yupButton.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Calculate distance between mouse and button center
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;
        const distance = Math.sqrt(
            Math.pow(mouseX - buttonCenterX, 2) + 
            Math.pow(mouseY - buttonCenterY, 2)
        );
        
        // If mouse is within 100px of Yup button, move it
        if (distance < 100) {
            moveYupButton();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (!yupButton.matches(':hover')) {
            setInitialPositions();
        }
    });
    
    // Set initial positions
    setInitialPositions();
});
