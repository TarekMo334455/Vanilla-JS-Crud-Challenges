class InteractivePage {
    constructor() {
        this.textBox = document.getElementById('textBox');
        this.clockDiv = document.getElementById('clock');
        this.toggleButton = document.getElementById('toggleClock');
        this.notification = document.getElementById('notification');
        this.clockInterval = null;
        this.isClockRunning = false;

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.textBox.addEventListener('keydown', this.handleKeyPress.bind(this));
        this.textBox.addEventListener('mousedown', this.handleMouseClick.bind(this));
        this.toggleButton.addEventListener('click', this.toggleClock.bind(this));
        document.addEventListener('keydown', this.handleClockHotkey.bind(this));
    }

    showNotification(message, duration = 2000) {
        this.notification.textContent = message;
        this.notification.classList.add('show');
        setTimeout(() => {
            this.notification.classList.remove('show');
        }, duration);
    }

    handleKeyPress(event) {
        this.showNotification(`Key pressed: ${event.key} (Code: ${event.keyCode})`);
    }

    handleMouseClick(event) {
        const buttonNames = ['Left Button', 'Middle Button', 'Right Button'];
        const buttonName = buttonNames[event.button] || 'Unknown Button';
        this.showNotification(`Mouse button clicked: ${buttonName}`);
    }

    updateClock() {
        const now = new Date();
        this.clockDiv.textContent = now.toLocaleTimeString();
    }

    toggleClock() {
        if (this.isClockRunning) {
            this.stopClock();
        } else {
            this.startClock();
        }
    }

    startClock() {
        this.isClockRunning = true;
        this.toggleButton.textContent = 'Stop Clock';
        this.showNotification('Clock Started');
        this.updateClock();
        this.clockInterval = setInterval(() => this.updateClock(), 1000);
    }

    stopClock() {
        this.isClockRunning = false;
        this.toggleButton.textContent = 'Start Clock';
        clearInterval(this.clockInterval);
        this.clockDiv.textContent = '';
        this.showNotification('Clock Stopped');
    }

    handleClockHotkey(event) {
        if (event.altKey && event.key.toLowerCase() === 'w') {
            this.toggleClock();
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new InteractivePage();
});