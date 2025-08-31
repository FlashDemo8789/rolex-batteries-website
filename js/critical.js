/* Critical JavaScript - Performance optimized, inline execution */

// Modern Performance Observer for Core Web Vitals
(function() {
  'use strict';
  
  // Performance metrics collection
  const perfData = {
    lcp: 0,
    fid: 0,
    cls: 0,
    inp: 0
  };
  
  // Largest Contentful Paint
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    perfData.lcp = lastEntry.startTime;
    console.log('LCP:', perfData.lcp);
  });
  
  try {
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    // Fallback for older browsers
    console.warn('LCP observer not supported');
  }
  
  // Cumulative Layout Shift
  let clsValue = 0;
  let clsEntries = [];
  let sessionValue = 0;
  let sessionEntries = [];
  
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        const firstSessionEntry = sessionEntries[0];
        const lastSessionEntry = sessionEntries[sessionEntries.length - 1];
        
        if (sessionValue &&
            entry.startTime - lastSessionEntry.startTime < 1000 &&
            entry.startTime - firstSessionEntry.startTime < 5000) {
          sessionValue += entry.value;
          sessionEntries.push(entry);
        } else {
          sessionValue = entry.value;
          sessionEntries = [entry];
        }
        
        if (sessionValue > clsValue) {
          clsValue = sessionValue;
          clsEntries = [...sessionEntries];
          perfData.cls = clsValue;
          console.log('CLS:', perfData.cls);
        }
      }
    }
  });
  
  try {
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    console.warn('CLS observer not supported');
  }
  
  // Critical DOM Ready functionality
  function domReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }
  
  // Intersection Observer for animations
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Unobserve after animation to improve performance
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe elements that should animate
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
      observer.observe(el);
    });
    
    // Add animate-in styles
    const style = document.createElement('style');
    style.textContent = `
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Header scroll behavior
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateHeader() {
      const scrollY = window.scrollY;
      
      if (scrollY > 100) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
      
      // Hide/show header based on scroll direction
      if (scrollY > lastScrollY && scrollY > 200) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      
      lastScrollY = scrollY;
      ticking = false;
    }
    
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Add CSS for header transitions
    const style = document.createElement('style');
    style.textContent = `
      .header {
        transition: transform 0.3s ease-in-out, background-color 0.3s ease;
      }
      .header--scrolled {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
        box-shadow: 0 1px 20px rgba(0, 0, 0, 0.1);
      }
    `;
    document.head.appendChild(style);
  }
  
  // Counter animation for stats
  function initCounters() {
    const counters = document.querySelectorAll('.stat__number[data-target]');
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }
  
  function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-out animation
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (target - startValue) * easeOutProgress;
      
      // Format number based on target
      let displayValue;
      if (target >= 1000000) {
        displayValue = (currentValue / 1000000).toFixed(1) + 'M+';
      } else if (target >= 1000) {
        displayValue = (currentValue / 1000).toFixed(1) + 'K+';
      } else if (target % 1 !== 0) {
        displayValue = currentValue.toFixed(1);
      } else {
        displayValue = Math.round(currentValue).toLocaleString();
      }
      
      element.textContent = displayValue;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Final value formatting
        if (target >= 1000000) {
          element.textContent = (target / 1000000).toFixed(0) + 'M+';
        } else if (target >= 1000) {
          element.textContent = (target / 1000).toFixed(0) + 'K+';
        } else {
          element.textContent = target % 1 === 0 ? target.toString() : target.toFixed(1);
        }
      }
    }
    
    requestAnimationFrame(updateCounter);
  }
  
  // Mobile menu toggle
  function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.navigation');
    
    if (!toggle || !nav) return;
    
    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      
      toggle.setAttribute('aria-expanded', !isExpanded);
      toggle.classList.toggle('mobile-toggle--active');
      nav.classList.toggle('navigation--mobile-open');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('navigation--mobile-open')) {
        toggle.click();
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        if (nav.classList.contains('navigation--mobile-open')) {
          toggle.click();
        }
      }
    });
  }
  
  // Battery level animation
  function initBatteryAnimation() {
    const batteryLevel = document.querySelector('.battery-3d__level');
    if (!batteryLevel) return;
    
    // Set initial level based on data attribute
    const level = batteryLevel.getAttribute('data-level') || 85;
    
    // Animate to target level
    setTimeout(() => {
      batteryLevel.style.height = level + '%';
    }, 500);
    
    // Add periodic pulse animation
    setInterval(() => {
      batteryLevel.style.transform = 'scaleY(1.02)';
      setTimeout(() => {
        batteryLevel.style.transform = 'scaleY(1)';
      }, 200);
    }, 3000);
  }
  
  // Theme Toggle Functionality
  function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    
    if (!themeToggle) return;
    
    // Check for saved theme or default to light
    const savedTheme = localStorage.getItem('rolex-theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    themeToggle.setAttribute('data-theme', savedTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      // Update theme
      html.setAttribute('data-theme', newTheme);
      themeToggle.setAttribute('data-theme', newTheme);
      localStorage.setItem('rolex-theme', newTheme);
      
      // Add transition effect
      themeToggle.style.transform = 'translateY(-50%) scale(1.2) rotate(180deg)';
      setTimeout(() => {
        themeToggle.style.transform = 'translateY(-50%) scale(1)';
      }, 200);
      
      // Log theme change
      console.log(`🌓 Theme switched to ${newTheme} mode`);
    });
    
    // Keyboard support
    themeToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeToggle.click();
      }
    });
    
    // Auto theme detection based on system preference
    if (window.matchMedia && !localStorage.getItem('rolex-theme')) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      function handleThemeChange(e) {
        const systemTheme = e.matches ? 'dark' : 'light';
        html.setAttribute('data-theme', systemTheme);
        themeToggle.setAttribute('data-theme', systemTheme);
      }
      
      mediaQuery.addEventListener('change', handleThemeChange);
      handleThemeChange(mediaQuery);
    }
  }

  // Initialize all critical functionality
  domReady(() => {
    initScrollAnimations();
    initHeaderScroll();
    initCounters();
    initMobileMenu();
    initBatteryAnimation();
    initThemeToggle();
    
    // Log initialization
    console.log('🔋 Rolex Batteries - Critical JS initialized');
    
    // Performance timing
    if (window.performance && window.performance.timing) {
      window.addEventListener('load', () => {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`⚡ Page loaded in ${loadTime}ms`);
      });
    }
  });
  
  // Export perfData for monitoring
  window.RolexPerf = perfData;
  
})();