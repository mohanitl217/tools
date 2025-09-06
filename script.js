// Simple script for the school portal
document.addEventListener('DOMContentLoaded', function() {
    console.log('School Management Portal loaded');
    
    // Add click tracking for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const toolName = this.closest('.tool-card').querySelector('h3').textContent;
            console.log('Opening tool:', toolName);
        });
    });
    
    // Simple loading animation for cards
    const cards = document.querySelectorAll('.tool-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s, transform 0.5s';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
