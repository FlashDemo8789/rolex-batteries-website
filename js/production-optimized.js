/**
 * ================================================================================
 * ROLEX BATTERIES - PRODUCTION OPTIMIZED JAVASCRIPT
 * ================================================================================
 * Comprehensive, optimized JavaScript for production deployment
 * Features: Enhanced interactions, animations, performance monitoring, accessibility
 * Version: 2.0.0 - Production Ready
 * Compatible with: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
 * ================================================================================
 */

'use strict';

/**
 * Main Application Class
 */
class RolexBatteriesApp {
    constructor() {
        this.version = '2.0.0';
        this.debugMode = false;
        this.components = new Map();
        this.observers = new Map();
        this.timers = new Map();
        this.eventListeners = new Map();
        this.performanceMetrics = {};
        
        // Feature detection
        this.features = {
            intersectionObserver: 'IntersectionObserver' in window,
            webGL: this.checkWebGLSupport(),
            modernCSS: CSS.supports('backdrop-filter', 'blur(10px)'),
            touch: 'ontouchstart' in window,
            webWorkers: typeof Worker !== 'undefined',
            localStorage: this.checkLocalStorageSupport(),
            animation: 'requestAnimationFrame' in window
        };
        
        this.init();
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            performance.mark('app-init-start');
            
            await this.waitForDOM();
            await this.initializeCore();
            await this.initializeComponents();
            await this.initializeEnhancements();
            
            performance.mark('app-init-end');
            performance.measure('app-initialization', 'app-init-start', 'app-init-end');
            
            this.log('🚀 Rolex Batteries App initialized successfully');
            this.reportPerformanceMetrics();
        } catch (error) {
            console.error('Failed to initialize Rolex Batteries App:', error);
        }
    }

    /**
     * Wait for DOM to be ready
     */
    waitForDOM() {
        return new Promise(resolve => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve, { once: true });
            } else {
                resolve();
            }
        });
    }

    /**
     * Initialize core functionality
     */
    async initializeCore() {
        this.setupErrorHandling();
        this.setupPerformanceMonitoring();
        this.initializeThemeSystem();
        this.initializeAccessibility();
        this.initializeServiceWorker();
    }

    /**
     * Initialize main components
     */
    async initializeComponents() {
        const componentsToInit = [
            'navigation',
            'hero',
            'batterySelector',
            'animations',
            'intersectionObserver',
            'formValidation',
            'lazyLoading',
            'mobileOptimizations'
        ];

        for (const component of componentsToInit) {
            try {
                await this.initializeComponent(component);
            } catch (error) {
                console.warn(`Failed to initialize ${component}:`, error);
            }
        }
    }

    /**
     * Initialize enhanced features
     */
    async initializeEnhancements() {
        if (this.features.webGL) {
            await this.initializeComponent('particleSystem');
        }
        
        if (this.features.intersectionObserver) {
            await this.initializeComponent('scrollAnimations');
        }
        
        await this.initializeComponent('counterAnimations');
        await this.initializeComponent('chartAnimations');
    }

    /**
     * Initialize individual component
     */
    async initializeComponent(componentName) {
        const startTime = performance.now();
        
        try {
            switch (componentName) {
                case 'navigation':
                    this.components.set('navigation', new NavigationComponent());
                    break;
                case 'hero':
                    this.components.set('hero', new HeroComponent());
                    break;
                case 'batterySelector':
                    this.components.set('batterySelector', new BatterySelectorComponent());
                    break;
                case 'animations':
                    this.components.set('animations', new AnimationManager());
                    break;
                case 'intersectionObserver':
                    this.components.set('intersectionObserver', new IntersectionObserverManager());
                    break;
                case 'formValidation':
                    this.components.set('formValidation', new FormValidationManager());
                    break;
                case 'lazyLoading':
                    this.components.set('lazyLoading', new LazyLoadingManager());
                    break;
                case 'mobileOptimizations':
                    this.components.set('mobileOptimizations', new MobileOptimizationManager());
                    break;
                case 'particleSystem':
                    this.components.set('particleSystem', new ParticleSystemManager());
                    break;
                case 'scrollAnimations':
                    this.components.set('scrollAnimations', new ScrollAnimationManager());
                    break;
                case 'counterAnimations':
                    this.components.set('counterAnimations', new CounterAnimationManager());
                    break;
                case 'chartAnimations':
                    this.components.set('chartAnimations', new ChartAnimationManager());
                    break;
                default:
                    throw new Error(`Unknown component: ${componentName}`);
            }
            
            const endTime = performance.now();
            this.log(`✓ ${componentName} initialized in ${(endTime - startTime).toFixed(2)}ms`);
        } catch (error) {
            console.error(`Failed to initialize ${componentName}:`, error);
        }
    }

    /**
     * Setup error handling
     */
    setupErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            this.reportError(event.error);
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            this.reportError(event.reason);
        });
    }

    /**
     * Setup performance monitoring
     */
    setupPerformanceMonitoring() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    this.performanceMetrics[entry.name] = entry.duration;
                }
            });
            
            observer.observe({ entryTypes: ['measure', 'navigation'] });
        }
    }

    /**
     * Initialize theme system
     */
    initializeThemeSystem() {
        const themeToggle = document.querySelector('.theme-toggle');
        const savedTheme = localStorage.getItem('rolex-theme') || 'light';
        
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('rolex-theme', newTheme);
                
                // Animate theme transition
                document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
                setTimeout(() => {
                    document.body.style.transition = '';
                }, 300);
            });
        }
    }

    /**
     * Initialize accessibility features
     */
    initializeAccessibility() {
        // Skip link functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(skipLink.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // Keyboard navigation
        this.setupKeyboardNavigation();
        
        // Focus management
        this.setupFocusManagement();
        
        // ARIA live regions
        this.setupARIALiveRegions();
    }

    /**
     * Setup keyboard navigation
     */
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Escape key handling
            if (e.key === 'Escape') {
                this.closeAllDropdowns();
                this.closeAllModals();
            }
            
            // Tab navigation enhancement
            if (e.key === 'Tab') {
                this.handleTabNavigation(e);
            }
        });
    }

    /**
     * Setup focus management
     */
    setupFocusManagement() {
        // Focus visible utility
        document.addEventListener('mousedown', () => {
            document.documentElement.classList.add('mouse-user');
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.documentElement.classList.remove('mouse-user');
            }
        });
    }

    /**
     * Setup ARIA live regions
     */
    setupARIALiveRegions() {
        const selectorResults = document.querySelector('.selector-results');
        if (selectorResults && !selectorResults.hasAttribute('aria-live')) {
            selectorResults.setAttribute('aria-live', 'polite');
        }
    }

    /**
     * Initialize service worker
     */
    async initializeServiceWorker() {
        if ('serviceWorker' in navigator && location.protocol === 'https:') {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                this.log('Service Worker registered successfully:', registration);
            } catch (error) {
                console.warn('Service Worker registration failed:', error);
            }
        }
    }

    /**
     * Utility functions
     */
    checkWebGLSupport() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && 
                     canvas.getContext('webgl') || 
                     canvas.getContext('experimental-webgl'));
        } catch (e) {
            return false;
        }
    }

    checkLocalStorageSupport() {
        try {
            const testKey = '__test__';
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            return true;
        } catch (e) {
            return false;
        }
    }

    closeAllDropdowns() {
        document.querySelectorAll('.navigation__dropdown').forEach(dropdown => {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
        });
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }

    handleTabNavigation(e) {
        // Enhanced tab navigation logic
        const focusableElements = document.querySelectorAll(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
        }
    }

    reportError(error) {
        // In production, this would send error reports to monitoring service
        if (this.debugMode) {
            console.error('Error reported:', error);
        }
    }

    reportPerformanceMetrics() {
        if (this.debugMode) {
            console.table(this.performanceMetrics);
        }
    }

    log(...args) {
        if (this.debugMode || localStorage.getItem('rolex-debug') === 'true') {
            console.log(...args);
        }
    }

    /**
     * Cleanup function
     */
    destroy() {
        // Clear all timers
        this.timers.forEach((timer, key) => {
            clearTimeout(timer);
            clearInterval(timer);
        });

        // Remove all event listeners
        this.eventListeners.forEach((listener, element) => {
            element.removeEventListener(listener.type, listener.handler);
        });

        // Disconnect all observers
        this.observers.forEach(observer => {
            if (observer.disconnect) observer.disconnect();
        });

        // Destroy all components
        this.components.forEach(component => {
            if (component.destroy) component.destroy();
        });

        this.log('🔄 Rolex Batteries App destroyed');
    }
}

/**
 * Navigation Component
 */
class NavigationComponent {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileToggle();
        this.setupDropdowns();
        this.setupScrollBehavior();
    }

    setupMobileToggle() {
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navigation = document.querySelector('.navigation');
        
        if (mobileToggle && navigation) {
            mobileToggle.addEventListener('click', () => {
                const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
                mobileToggle.setAttribute('aria-expanded', !isExpanded);
                navigation.classList.toggle('navigation--open');
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = isExpanded ? '' : 'hidden';
            });
        }
    }

    setupDropdowns() {
        const navigationItems = document.querySelectorAll('.navigation__item');
        
        navigationItems.forEach(item => {
            const link = item.querySelector('.navigation__link');
            const dropdown = item.querySelector('.navigation__dropdown');
            
            if (link && dropdown) {
                let hoverTimeout;
                
                item.addEventListener('mouseenter', () => {
                    clearTimeout(hoverTimeout);
                    dropdown.style.opacity = '1';
                    dropdown.style.visibility = 'visible';
                    dropdown.style.transform = 'translateY(0)';
                });
                
                item.addEventListener('mouseleave', () => {
                    hoverTimeout = setTimeout(() => {
                        dropdown.style.opacity = '0';
                        dropdown.style.visibility = 'hidden';
                        dropdown.style.transform = 'translateY(-10px)';
                    }, 100);
                });

                // Keyboard support
                link.addEventListener('focus', () => {
                    dropdown.style.opacity = '1';
                    dropdown.style.visibility = 'visible';
                });

                link.addEventListener('blur', (e) => {
                    if (!dropdown.contains(e.relatedTarget)) {
                        dropdown.style.opacity = '0';
                        dropdown.style.visibility = 'hidden';
                    }
                });
            }
        });
    }

    setupScrollBehavior() {
        const header = document.querySelector('.header');
        let lastScrollY = window.scrollY;
        
        if (header) {
            const handleScroll = this.throttle(() => {
                const currentScrollY = window.scrollY;
                
                if (currentScrollY > 100) {
                    header.classList.add('header--scrolled');
                } else {
                    header.classList.remove('header--scrolled');
                }
                
                // Auto-hide on scroll down, show on scroll up
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
                
                lastScrollY = currentScrollY;
            }, 16);
            
            window.addEventListener('scroll', handleScroll, { passive: true });
        }
    }

    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
}

/**
 * Hero Component
 */
class HeroComponent {
    constructor() {
        this.init();
    }

    init() {
        this.setupBattery3D();
        this.setupFeatureDots();
        this.setupParallaxEffect();
    }

    setupBattery3D() {
        const battery3D = document.querySelector('.battery-3d');
        
        if (battery3D) {
            // Add mouse tracking for 3D effect
            document.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;
                
                const xPercent = (clientX / innerWidth - 0.5) * 2;
                const yPercent = (clientY / innerHeight - 0.5) * 2;
                
                const rotateX = yPercent * 10;
                const rotateY = xPercent * 10;
                
                battery3D.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        }
    }

    setupFeatureDots() {
        const featureDots = document.querySelectorAll('.feature-dot');
        
        featureDots.forEach(dot => {
            dot.addEventListener('click', () => {
                // Create ripple effect
                const ripple = document.createElement('div');
                ripple.className = 'ripple-effect';
                dot.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    setupParallaxEffect() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length > 0) {
            const handleScroll = this.throttle(() => {
                const scrollY = window.scrollY;
                
                parallaxElements.forEach(element => {
                    const speed = parseFloat(element.dataset.parallax) || 0.5;
                    const yPos = -(scrollY * speed);
                    element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                });
            }, 16);
            
            window.addEventListener('scroll', handleScroll, { passive: true });
        }
    }

    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
}

/**
 * Battery Selector Component
 */
class BatterySelectorComponent {
    constructor() {
        this.currentStep = 1;
        this.maxSteps = 3;
        this.formData = {};
        this.init();
    }

    init() {
        this.setupFormSteps();
        this.setupFormValidation();
        this.setupProgressIndicator();
        this.setupResultsDisplay();
    }

    setupFormSteps() {
        const form = document.querySelector('.selector-form');
        const prevBtn = document.querySelector('[data-action="prev"]');
        const nextBtn = document.querySelector('[data-action="next"]');
        const submitBtn = document.querySelector('[data-action="submit"]');
        
        if (!form) return;
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousStep());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextStep());
        }
        
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitForm());
        }
    }

    nextStep() {
        if (this.validateCurrentStep() && this.currentStep < this.maxSteps) {
            this.hideStep(this.currentStep);
            this.currentStep++;
            this.showStep(this.currentStep);
            this.updateProgress();
            this.updateButtons();
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.hideStep(this.currentStep);
            this.currentStep--;
            this.showStep(this.currentStep);
            this.updateProgress();
            this.updateButtons();
        }
    }

    showStep(stepNumber) {
        const step = document.querySelector(`[data-step="${stepNumber}"]`);
        if (step) {
            step.classList.add('form-step--active');
            // Smooth transition
            setTimeout(() => {
                step.style.opacity = '1';
                step.style.transform = 'translateX(0)';
            }, 50);
        }
    }

    hideStep(stepNumber) {
        const step = document.querySelector(`[data-step="${stepNumber}"]`);
        if (step) {
            step.style.opacity = '0';
            step.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                step.classList.remove('form-step--active');
            }, 300);
        }
    }

    validateCurrentStep() {
        const currentStepElement = document.querySelector(`[data-step="${this.currentStep}"]`);
        if (!currentStepElement) return false;
        
        const requiredInputs = currentStepElement.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        requiredInputs.forEach(input => {
            if (!input.value) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
                this.formData[input.name] = input.value;
            }
        });
        
        return isValid;
    }

    updateProgress() {
        const progressFill = document.querySelector('.progress-fill');
        const stepIndicators = document.querySelectorAll('.step-indicator');
        
        if (progressFill) {
            const progress = (this.currentStep / this.maxSteps) * 100;
            progressFill.style.width = `${progress}%`;
        }
        
        stepIndicators.forEach((indicator, index) => {
            if (index + 1 <= this.currentStep) {
                indicator.classList.add('step-indicator--active');
            } else {
                indicator.classList.remove('step-indicator--active');
            }
        });
    }

    updateButtons() {
        const prevBtn = document.querySelector('[data-action="prev"]');
        const nextBtn = document.querySelector('[data-action="next"]');
        const submitBtn = document.querySelector('[data-action="submit"]');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentStep === 1;
        }
        
        if (nextBtn && submitBtn) {
            if (this.currentStep === this.maxSteps) {
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'inline-flex';
            } else {
                nextBtn.style.display = 'inline-flex';
                submitBtn.style.display = 'none';
            }
        }
    }

    setupFormValidation() {
        const form = document.querySelector('.selector-form');
        if (!form) return;
        
        // Real-time validation
        form.addEventListener('input', (e) => {
            if (e.target.hasAttribute('required')) {
                if (e.target.value) {
                    e.target.classList.remove('error');
                } else {
                    e.target.classList.add('error');
                }
            }
        });
    }

    setupProgressIndicator() {
        // Already handled in updateProgress method
        this.updateProgress();
        this.updateButtons();
    }

    setupResultsDisplay() {
        // Placeholder for results display functionality
        const resultsContainer = document.querySelector('.selector-results');
        if (resultsContainer) {
            resultsContainer.setAttribute('aria-live', 'polite');
        }
    }

    async submitForm() {
        if (!this.validateCurrentStep()) return;
        
        const submitBtn = document.querySelector('[data-action="submit"]');
        if (submitBtn) {
            submitBtn.classList.add('button--loading');
            submitBtn.textContent = 'Finding Your Battery...';
        }
        
        try {
            // Simulate API call
            await this.delay(2000);
            
            const results = this.generateBatteryRecommendations();
            this.displayResults(results);
        } catch (error) {
            console.error('Failed to get battery recommendations:', error);
            this.displayError('Failed to get recommendations. Please try again.');
        } finally {
            if (submitBtn) {
                submitBtn.classList.remove('button--loading');
                submitBtn.textContent = 'Find My Battery';
            }
        }
    }

    generateBatteryRecommendations() {
        // Mock battery recommendations based on form data
        return [
            {
                name: 'RB-EV-75',
                type: 'Automotive EV Battery',
                voltage: '400V',
                capacity: '75kWh',
                compatibility: '95%',
                features: ['Fast Charging', 'Thermal Management', 'Long Range']
            },
            {
                name: 'RB-HYB-45',
                type: 'Hybrid Vehicle Battery',
                voltage: '300V',
                capacity: '45kWh',
                compatibility: '88%',
                features: ['Hybrid Optimization', 'Compact Design', 'Reliable']
            }
        ];
    }

    displayResults(results) {
        const resultsContainer = document.querySelector('.selector-results');
        if (!resultsContainer) return;
        
        const html = `
            <div class="battery-recommendations" role="region" aria-label="Battery recommendations">
                <h3>Recommended Battery Solutions</h3>
                ${results.map(battery => `
                    <div class="recommendation-card">
                        <div class="recommendation-header">
                            <h4>${battery.name}</h4>
                            <span class="compatibility">${battery.compatibility} Match</span>
                        </div>
                        <p class="battery-type">${battery.type}</p>
                        <div class="specifications">
                            <span>Voltage: ${battery.voltage}</span>
                            <span>Capacity: ${battery.capacity}</span>
                        </div>
                        <div class="features">
                            ${battery.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                        </div>
                        <button class="button button--primary" onclick="requestQuote('${battery.name}')">
                            Request Quote
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
        
        resultsContainer.innerHTML = html;
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }

    displayError(message) {
        const resultsContainer = document.querySelector('.selector-results');
        if (!resultsContainer) return;
        
        resultsContainer.innerHTML = `
            <div class="error-message" role="alert">
                <p>${message}</p>
                <button class="button button--secondary" onclick="location.reload()">
                    Try Again
                </button>
            </div>
        `;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

/**
 * Animation Manager
 */
class AnimationManager {
    constructor() {
        this.animations = new Map();
        this.rafId = null;
        this.init();
    }

    init() {
        this.setupGSAPIntegration();
        this.setupCSSAnimations();
        this.setupInteractiveAnimations();
    }

    setupGSAPIntegration() {
        // GSAP would be loaded separately for production
        // This is a fallback for CSS animations
        if (typeof gsap === 'undefined') {
            this.useCSSDallback = true;
        }
    }

    setupCSSAnimations() {
        // Enhanced CSS animation triggers
        const animatedElements = document.querySelectorAll('[data-animate]');
        
        animatedElements.forEach(element => {
            const animationType = element.dataset.animate;
            const delay = element.dataset.delay || 0;
            
            setTimeout(() => {
                element.classList.add(`animate-${animationType}`);
            }, parseInt(delay));
        });
    }

    setupInteractiveAnimations() {
        // Hover and click animations
        const interactiveElements = document.querySelectorAll('.solution-card, .button, .option-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add('animate-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                element.classList.remove('animate-hover');
            });
            
            element.addEventListener('click', (e) => {
                this.createRippleEffect(e, element);
            });
        });
    }

    createRippleEffect(event, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.classList.add('ripple-effect');
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    animate(element, properties, duration = 300, easing = 'ease') {
        return new Promise(resolve => {
            if (this.useCSSDallback) {
                // CSS animation fallback
                element.style.transition = `all ${duration}ms ${easing}`;
                
                Object.keys(properties).forEach(property => {
                    element.style[property] = properties[property];
                });
                
                setTimeout(resolve, duration);
            } else {
                // GSAP animation (if loaded)
                if (typeof gsap !== 'undefined') {
                    gsap.to(element, {
                        ...properties,
                        duration: duration / 1000,
                        ease: easing,
                        onComplete: resolve
                    });
                } else {
                    resolve();
                }
            }
        });
    }
}

/**
 * Intersection Observer Manager
 */
class IntersectionObserverManager {
    constructor() {
        this.observers = new Map();
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.setupScrollAnimations();
            this.setupLazyLoading();
            this.setupCounterAnimations();
        }
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('aos-animate');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );

        document.querySelectorAll('[data-aos]').forEach(element => {
            observer.observe(element);
        });

        this.observers.set('scrollAnimations', observer);
    }

    setupLazyLoading() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            observer.unobserve(img);
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('img[data-src]').forEach(img => {
            img.classList.add('lazy');
            observer.observe(img);
        });

        this.observers.set('lazyLoading', observer);
    }

    setupCounterAnimations() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = parseInt(counter.dataset.target) || 0;
                        this.animateCounter(counter, target);
                        observer.unobserve(counter);
                    }
                });
            },
            { threshold: 0.5 }
        );

        document.querySelectorAll('[data-target]').forEach(counter => {
            observer.observe(counter);
        });

        this.observers.set('counterAnimations', observer);
    }

    animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const duration = 2000;
        const stepTime = duration / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (element.dataset.target?.includes('.')) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }
}

/**
 * Form Validation Manager
 */
class FormValidationManager {
    constructor() {
        this.validators = new Map();
        this.init();
    }

    init() {
        this.setupValidators();
        this.setupFormSubmission();
    }

    setupValidators() {
        this.validators.set('email', {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        });

        this.validators.set('phone', {
            pattern: /^[\+]?[1-9][\d]{0,15}$/,
            message: 'Please enter a valid phone number'
        });

        this.validators.set('required', {
            test: value => value && value.trim().length > 0,
            message: 'This field is required'
        });
    }

    setupFormSubmission() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });

            // Real-time validation
            form.addEventListener('input', (e) => {
                this.validateField(e.target);
            });

            form.addEventListener('blur', (e) => {
                this.validateField(e.target);
            }, true);
        });
    }

    validateForm(form) {
        const fields = form.querySelectorAll('input, textarea, select');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value;
        const validators = this.getFieldValidators(field);
        let isValid = true;
        let errorMessage = '';

        for (const validator of validators) {
            if (validator.test) {
                if (!validator.test(value)) {
                    isValid = false;
                    errorMessage = validator.message;
                    break;
                }
            } else if (validator.pattern) {
                if (!validator.pattern.test(value)) {
                    isValid = false;
                    errorMessage = validator.message;
                    break;
                }
            }
        }

        this.showFieldValidation(field, isValid, errorMessage);
        return isValid;
    }

    getFieldValidators(field) {
        const validators = [];
        
        if (field.hasAttribute('required')) {
            validators.push(this.validators.get('required'));
        }

        const type = field.type || field.dataset.validate;
        if (type && this.validators.has(type)) {
            validators.push(this.validators.get(type));
        }

        return validators;
    }

    showFieldValidation(field, isValid, message) {
        field.classList.toggle('error', !isValid);
        field.classList.toggle('valid', isValid);

        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add new error message if needed
        if (!isValid && message) {
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            errorElement.setAttribute('role', 'alert');
            field.parentNode.appendChild(errorElement);
        }
    }
}

/**
 * Lazy Loading Manager
 */
class LazyLoadingManager {
    constructor() {
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        } else {
            this.loadAllImages();
        }
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );

        document.querySelectorAll('img[data-src]').forEach(img => {
            observer.observe(img);
        });
    }

    loadImage(img) {
        return new Promise((resolve, reject) => {
            const tempImg = new Image();
            
            tempImg.onload = () => {
                img.src = tempImg.src;
                img.classList.remove('lazy-loading');
                img.classList.add('lazy-loaded');
                resolve(img);
            };
            
            tempImg.onerror = () => {
                img.classList.add('lazy-error');
                reject(new Error('Failed to load image'));
            };
            
            img.classList.add('lazy-loading');
            tempImg.src = img.dataset.src;
        });
    }

    loadAllImages() {
        // Fallback for browsers without IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            this.loadImage(img);
        });
    }
}

/**
 * Mobile Optimization Manager
 */
class MobileOptimizationManager {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.isTouch = 'ontouchstart' in window;
        this.init();
    }

    init() {
        this.setupTouchOptimizations();
        this.setupViewportOptimizations();
        this.setupPerformanceOptimizations();
        this.setupAccessibilityOptimizations();
    }

    setupTouchOptimizations() {
        if (this.isTouch) {
            document.body.classList.add('touch-device');
            
            // Improve touch targets
            const touchTargets = document.querySelectorAll('button, a, input[type="button"], input[type="submit"]');
            touchTargets.forEach(target => {
                if (this.getTouchTargetSize(target) < 44) {
                    target.style.minHeight = '44px';
                    target.style.minWidth = '44px';
                }
            });

            // Remove hover states on touch devices
            const styleSheet = document.createElement('style');
            styleSheet.textContent = `
                @media (hover: none) and (pointer: coarse) {
                    .solution-card:hover,
                    .button:hover,
                    .navigation__link:hover {
                        transform: none !important;
                        box-shadow: inherit !important;
                    }
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }

    setupViewportOptimizations() {
        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.adjustLayoutForOrientation();
            }, 100);
        });

        // Handle viewport changes
        window.addEventListener('resize', this.debounce(() => {
            this.isMobile = window.innerWidth <= 768;
            this.adjustLayoutForViewport();
        }, 250));
    }

    setupPerformanceOptimizations() {
        if (this.isMobile) {
            // Reduce animation complexity on mobile
            document.body.classList.add('mobile-device');
            
            // Disable expensive animations on mobile
            const expensiveAnimations = document.querySelectorAll('.particle-canvas, .battery-3d');
            expensiveAnimations.forEach(element => {
                element.style.display = 'none';
            });
        }
    }

    setupAccessibilityOptimizations() {
        // Improve focus indicators on mobile
        document.addEventListener('focusin', (e) => {
            if (this.isTouch) {
                e.target.classList.add('focus-visible');
            }
        });

        document.addEventListener('focusout', (e) => {
            e.target.classList.remove('focus-visible');
        });
    }

    getTouchTargetSize(element) {
        const rect = element.getBoundingClientRect();
        return Math.min(rect.width, rect.height);
    }

    adjustLayoutForOrientation() {
        const isLandscape = window.innerWidth > window.innerHeight;
        document.body.classList.toggle('landscape', isLandscape);
        document.body.classList.toggle('portrait', !isLandscape);
    }

    adjustLayoutForViewport() {
        // Dynamic layout adjustments based on viewport size
        const viewportWidth = window.innerWidth;
        
        if (viewportWidth <= 480) {
            document.body.classList.add('small-mobile');
        } else {
            document.body.classList.remove('small-mobile');
        }
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

/**
 * Particle System Manager
 */
class ParticleSystemManager {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        this.particles = [];
        this.animationId = null;
        
        if (this.canvas && this.canvas.getContext) {
            this.ctx = this.canvas.getContext('2d');
            this.init();
        }
    }

    init() {
        this.setupCanvas();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.handleResize());
    }

    setupCanvas() {
        const resizeCanvas = () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    }

    createParticles() {
        const particleCount = Math.min(50, window.innerWidth / 20);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: `hsl(${Math.random() * 60 + 180}, 50%, 60%)`
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
        
        // Draw connections
        this.drawConnections();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    drawConnections() {
        const maxDistance = 100;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.2;
                    
                    this.ctx.save();
                    this.ctx.globalAlpha = opacity;
                    this.ctx.strokeStyle = '#10B981';
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            }
        }
    }

    handleResize() {
        this.setupCanvas();
        this.particles = [];
        this.createParticles();
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

/**
 * Scroll Animation Manager
 */
class ScrollAnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollTriggers();
        this.setupParallaxElements();
        this.setupProgressIndicators();
    }

    setupScrollTriggers() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    } else {
                        entry.target.classList.remove('in-view');
                    }
                });
            },
            {
                threshold: [0.1, 0.5, 0.9],
                rootMargin: '50px'
            }
        );

        document.querySelectorAll('.solution-card, .trust-stat, .contact-feature').forEach(element => {
            observer.observe(element);
        });
    }

    setupParallaxElements() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const handleScroll = this.throttle(() => {
                const scrollY = window.scrollY;
                
                parallaxElements.forEach(element => {
                    const speed = parseFloat(element.dataset.parallax) || 0.5;
                    const rect = element.getBoundingClientRect();
                    const elementTop = rect.top + scrollY;
                    const elementHeight = rect.height;
                    const windowHeight = window.innerHeight;
                    
                    // Only apply parallax when element is in viewport
                    if (rect.bottom >= 0 && rect.top <= windowHeight) {
                        const yPos = (scrollY - elementTop) * speed;
                        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                    }
                });
            }, 16);
            
            window.addEventListener('scroll', handleScroll, { passive: true });
        }
    }

    setupProgressIndicators() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const progressFill = entry.target.querySelector('.progress-fill');
                        if (progressFill) {
                            const targetWidth = progressFill.dataset.width || '100%';
                            progressFill.style.width = targetWidth;
                        }
                    }
                });
            },
            { threshold: 0.5 }
        );

        progressBars.forEach(bar => observer.observe(bar));
    }

    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
}

/**
 * Counter Animation Manager
 */
class CounterAnimationManager {
    constructor() {
        this.animatedCounters = new Set();
        this.init();
    }

    init() {
        this.setupCounterObserver();
    }

    setupCounterObserver() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.animatedCounters.has(entry.target)) {
                        this.animateCounter(entry.target);
                        this.animatedCounters.add(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        document.querySelectorAll('[data-counter], .stat__number, .trust-stat .stat-number').forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseFloat(element.dataset.target || element.dataset.counter) || 
                      parseFloat(element.textContent) || 0;
        const duration = parseInt(element.dataset.duration) || 2000;
        const isDecimal = element.dataset.target?.includes('.') || target % 1 !== 0;
        const suffix = element.dataset.suffix || '';
        
        let current = 0;
        const increment = target / (duration / 16);
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Use easeOutExpo easing
            current = target * (progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress));
            
            if (isDecimal) {
                element.textContent = current.toFixed(1) + suffix;
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target + suffix;
            }
        };
        
        requestAnimationFrame(animate);
    }
}

/**
 * Chart Animation Manager
 */
class ChartAnimationManager {
    constructor() {
        this.charts = new Map();
        this.init();
    }

    init() {
        this.setupMiniCharts();
        this.setupProgressBars();
        this.setupGaugeCharts();
    }

    setupMiniCharts() {
        const miniCharts = document.querySelectorAll('.mini-chart');
        
        miniCharts.forEach(canvas => {
            const ctx = canvas.getContext('2d');
            const type = canvas.dataset.chart;
            
            switch (type) {
                case 'energy-flow':
                    this.drawEnergyFlowChart(ctx, canvas);
                    break;
                case 'efficiency':
                    this.drawEfficiencyChart(ctx, canvas);
                    break;
                default:
                    this.drawDefaultChart(ctx, canvas);
            }
        });
    }

    drawEnergyFlowChart(ctx, canvas) {
        const data = [20, 35, 25, 40, 30, 45, 35];
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        data.forEach((value, index) => {
            const x = (index / (data.length - 1)) * width;
            const y = height - (value / 50) * height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Add glow effect
        ctx.shadowColor = '#10B981';
        ctx.shadowBlur = 5;
        ctx.stroke();
    }

    drawEfficiencyChart(ctx, canvas) {
        const data = [85, 88, 92, 89, 95, 94, 96];
        const width = canvas.width;
        const height = canvas.height;
        
        // Draw area chart
        ctx.fillStyle = 'rgba(16, 185, 129, 0.3)';
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.moveTo(0, height);
        
        data.forEach((value, index) => {
            const x = (index / (data.length - 1)) * width;
            const y = height - ((value - 80) / 20) * height;
            ctx.lineTo(x, y);
        });
        
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
        
        // Draw line
        ctx.beginPath();
        data.forEach((value, index) => {
            const x = (index / (data.length - 1)) * width;
            const y = height - ((value - 80) / 20) * height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
    }

    drawDefaultChart(ctx, canvas) {
        // Simple pulse animation
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        const animate = (time) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const pulse = Math.sin(time * 0.005) * 0.5 + 0.5;
            const radius = 8 + pulse * 4;
            
            ctx.fillStyle = `rgba(16, 185, 129, ${0.8 - pulse * 0.3})`;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fill();
            
            requestAnimationFrame(animate);
        };
        
        animate(0);
    }

    setupProgressBars() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const progressBar = entry.target.querySelector('.progress-fill, .gauge-fill');
                        if (progressBar && !progressBar.classList.contains('animated')) {
                            this.animateProgressBar(progressBar);
                            progressBar.classList.add('animated');
                        }
                    }
                });
            },
            { threshold: 0.5 }
        );

        document.querySelectorAll('.progress-bar, .metric-gauge').forEach(bar => {
            observer.observe(bar);
        });
    }

    animateProgressBar(element) {
        const targetWidth = element.style.width || '0%';
        const targetValue = parseInt(targetWidth);
        
        element.style.width = '0%';
        element.style.transition = 'width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            element.style.width = targetWidth;
        }, 100);
    }

    setupGaugeCharts() {
        const gauges = document.querySelectorAll('.gauge-circle svg circle:last-child');
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateGauge(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        gauges.forEach(gauge => observer.observe(gauge));
    }

    animateGauge(circleElement) {
        const circumference = 2 * Math.PI * 45; // radius = 45
        const currentOffset = parseFloat(circleElement.style.strokeDashoffset) || circumference;
        const targetOffset = parseFloat(circleElement.getAttribute('stroke-dashoffset')) || 0;
        
        circleElement.style.strokeDashoffset = circumference;
        circleElement.style.transition = 'stroke-dashoffset 2s ease-out';
        
        setTimeout(() => {
            circleElement.style.strokeDashoffset = targetOffset;
        }, 100);
    }
}

/**
 * Global utility functions
 */
window.requestQuote = function(batteryName) {
    // Handle quote request
    console.log(`Quote requested for: ${batteryName}`);
    
    // In production, this would open a modal or redirect to a form
    const modal = document.createElement('div');
    modal.className = 'quote-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Request Quote: ${batteryName}</h3>
                <button class="modal-close" onclick="this.closest('.quote-modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <p>Thank you for your interest in the ${batteryName}. Our sales team will contact you within 24 hours.</p>
                <form class="quote-form">
                    <input type="text" placeholder="Your Name" required>
                    <input type="email" placeholder="Email Address" required>
                    <input type="tel" placeholder="Phone Number">
                    <textarea placeholder="Project Details" rows="4"></textarea>
                    <button type="submit" class="button button--primary">Submit Request</button>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const styles = `
        <style>
        .quote-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        .modal-content {
            background: white;
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #e5e5e5;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        }
        .modal-body {
            padding: 1.5rem;
        }
        .quote-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-top: 1rem;
        }
        .quote-form input,
        .quote-form textarea {
            padding: 0.75rem;
            border: 2px solid #e5e5e5;
            border-radius: 6px;
            font-size: 1rem;
        }
        .quote-form input:focus,
        .quote-form textarea:focus {
            border-color: #1a365d;
            outline: none;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        </style>
    `;
    
    if (!document.querySelector('#quote-modal-styles')) {
        const styleElement = document.createElement('div');
        styleElement.id = 'quote-modal-styles';
        styleElement.innerHTML = styles;
        document.head.appendChild(styleElement);
    }
};

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the main application
    window.rolexApp = new RolexBatteriesApp();
    
    // Global error handler
    window.addEventListener('error', (event) => {
        console.error('Global error:', event.error);
    });
    
    // Performance monitoring
    window.addEventListener('load', () => {
        // Report initial page load performance
        if ('performance' in window) {
            const navigation = performance.getEntriesByType('navigation')[0];
            if (navigation) {
                console.log('Page Load Performance:', {
                    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
                    fullyLoaded: navigation.loadEventEnd - navigation.navigationStart,
                    firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 'N/A',
                    firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 'N/A'
                });
            }
        }
    });
});

// CSS injection for animations and effects
const animationStyles = `
<style id="rolex-animation-styles">
@keyframes ripple {
    to {
        transform: scale(2);
        opacity: 0;
    }
}

.animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out forwards;
}

.animate-fadeInLeft {
    animation: fadeInLeft 0.6s ease-out forwards;
}

.animate-fadeInRight {
    animation: fadeInRight 0.6s ease-out forwards;
}

.animate-bounce {
    animation: bounceIn 0.6s ease-out forwards;
}

.animate-zoomIn {
    animation: zoomIn 0.6s ease-out forwards;
}

.animate-hover {
    transform: translateY(-2px) !important;
    transition: transform 0.3s ease;
}

.in-view {
    opacity: 1 !important;
    transform: translateY(0) !important;
}

.lazy-loading {
    filter: blur(5px);
    transition: filter 0.3s ease;
}

.lazy-loaded {
    filter: blur(0);
}

.lazy-error {
    background: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
}

.lazy-error::after {
    content: '⚠ Image failed to load';
}

.focus-visible {
    outline: 2px solid #2563eb !important;
    outline-offset: 2px !important;
}

.mouse-user .focus-visible {
    outline: none !important;
}

.touch-device .solution-card:hover,
.touch-device .button:hover {
    transform: none !important;
}

.mobile-device .particle-canvas {
    display: none !important;
}

.mobile-device .battery-3d {
    animation: none !important;
}

@media (prefers-reduced-motion: reduce) {
    .animate-fadeInUp,
    .animate-fadeInLeft,
    .animate-fadeInRight,
    .animate-bounce,
    .animate-zoomIn {
        animation: none !important;
    }
    
    .battery-3d,
    .feature-dot__pulse,
    .battery-3d__glow {
        animation: none !important;
    }
}

.error {
    border-color: #dc2626 !important;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
}

.valid {
    border-color: #059669 !important;
    box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1) !important;
}

.error-message {
    color: #dc2626;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.error-message::before {
    content: '⚠';
}

.recommendation-card {
    background: white;
    border: 1px solid #e5e5e5;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    transition: all 0.3s ease;
}

.recommendation-card:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

.recommendation-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.recommendation-header h4 {
    font-size: 1.25rem;
    font-weight: bold;
    color: #1a365d;
}

.compatibility {
    background: #10b981;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 600;
}

.battery-type {
    color: #64748b;
    margin-bottom: 1rem;
}

.specifications {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: #374151;
}

.features {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
}

.feature-tag {
    background: #e0f2fe;
    color: #0369a1;
    padding: 0.25rem 0.75rem;
    border-radius: 16px;
    font-size: 0.75rem;
    font-weight: 500;
}
</style>
`;

// Inject animation styles
document.head.insertAdjacentHTML('beforeend', animationStyles);