/**
 * Rolex Batteries - Main Interactive JavaScript
 * Modern ES2024+ features with performance optimization
 */

class RolexBatteries {
  constructor() {
    this.init();
  }
  
  async init() {
    // Wait for DOM to be ready
    await this.domReady();
    
    // Initialize all components
    this.initNavigationDropdown();
    this.initBatterySelector();
    this.initFeatureTooltips();
    this.initParallaxEffects();
    this.initAdvancedAnimations();
    this.initFormValidation();
    this.initPerformanceMonitoring();
    this.initAccessibilityFeatures();
    this.initAutomotiveBatteryInteractions();
    
    console.log('🚀 Rolex Batteries - All systems initialized');
  }
  
  // Automotive Battery Interactive Features
  initAutomotiveBatteryInteractions() {
    this.initBatteryPackInteraction();
    this.initGaugeInteractions();
    this.initFeatureHighlights();
    this.initChargingAnimation();
    this.initBatterySpecsAnimations();
    this.initEVChargingDemo();
    this.init3DBatteryCrossSection();
    this.initManufacturingProcess();
  }
  
  // Interactive Battery Pack in Car Diagram
  initBatteryPackInteraction() {
    const batteryPacks = document.querySelectorAll('.battery-pack');
    
    batteryPacks.forEach(pack => {
      // Click to show detailed specs
      pack.addEventListener('click', (e) => {
        e.stopPropagation();
        this.showBatteryDetails(pack);
        
        // Add click ripple effect
        this.createClickRipple(pack, e);
        
        // Trigger energy flow animation
        this.triggerEnergyFlow(pack);
      });
      
      // Hover effects with enhanced animations
      pack.addEventListener('mouseenter', () => {
        this.highlightBatteryCells(pack);
        this.showBatteryTooltip(pack);
      });
      
      pack.addEventListener('mouseleave', () => {
        this.resetBatteryCells(pack);
        this.hideBatteryTooltip();
      });
      
      // Add breathing animation when idle
      this.addBreathingAnimation(pack);
    });
    
    // Interactive battery cells with enhanced feedback
    const batteryCells = document.querySelectorAll('.battery-cells .cell');
    batteryCells.forEach((cell, index) => {
      cell.addEventListener('click', (e) => {
        e.stopPropagation();
        this.showCellInfo(cell, index);
        this.pulsateCell(cell);
      });
      
      // Add realistic charge level indicators
      this.setCellChargeLevel(cell, Math.random() * 100);
    });
    
    // Add continuous performance monitoring simulation
    this.startBatteryMonitoring();
  }
  
  showBatteryDetails(pack) {
    // Create or update battery details popup
    let popup = document.querySelector('.battery-details-popup');
    
    if (!popup) {
      popup = document.createElement('div');
      popup.className = 'battery-details-popup';
      document.body.appendChild(popup);
    }
    
    popup.innerHTML = `
      <div class="popup-content">
        <button class="popup-close">&times;</button>
        <h3>Battery Pack Specifications</h3>
        <div class="spec-grid">
          <div class="spec-item">
            <span class="spec-label">Configuration:</span>
            <span class="spec-value">120S2P NCM Cells</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Nominal Voltage:</span>
            <span class="spec-value">400V</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Energy:</span>
            <span class="spec-value">75 kWh</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Max Charge Rate:</span>
            <span class="spec-value">150kW (DC Fast)</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Thermal Management:</span>
            <span class="spec-value">Active Liquid Cooling</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Safety Features:</span>
            <span class="spec-value">Multi-layer Protection</span>
          </div>
        </div>
        <div class="battery-status">
          <div class="status-indicator">
            <div class="status-dot status-dot--healthy"></div>
            <span>All Systems Operational</span>
          </div>
        </div>
      </div>
    `;
    
    popup.classList.add('popup--visible');
    
    // Close popup functionality
    const closeBtn = popup.querySelector('.popup-close');
    closeBtn.addEventListener('click', () => {
      popup.classList.remove('popup--visible');
      setTimeout(() => popup.remove(), 300);
    });
    
    // Close on outside click
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        closeBtn.click();
      }
    });
    
    // Add popup styles
    this.addPopupStyles();
  }
  
  // Enhanced Battery Interaction Methods
  triggerEnergyFlow(pack) {
    const energyLines = pack.closest('.automotive-showcase').querySelectorAll('.energy-flow-line');
    
    energyLines.forEach((line, index) => {
      setTimeout(() => {
        line.style.strokeDasharray = '8 4';
        line.style.strokeDashoffset = '0';
        line.style.animation = 'energyFlow 1.5s ease-in-out forwards';
        
        setTimeout(() => {
          line.style.animation = 'none';
          line.style.strokeDashoffset = '12';
        }, 1500);
      }, index * 100);
    });
  }
  
  addBreathingAnimation(pack) {
    pack.style.animation = 'batteryBreathing 3s ease-in-out infinite';
  }
  
  showBatteryTooltip(pack) {
    let tooltip = document.querySelector('.battery-hover-tooltip');
    
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.className = 'battery-hover-tooltip';
      document.body.appendChild(tooltip);
    }
    
    tooltip.innerHTML = `
      <div class="tooltip-content">
        <div class="tooltip-title">Battery Pack Status</div>
        <div class="tooltip-stats">
          <div class="stat">
            <span class="stat-value">87%</span>
            <span class="stat-label">Charge Level</span>
          </div>
          <div class="stat">
            <span class="stat-value">24°C</span>
            <span class="stat-label">Temperature</span>
          </div>
          <div class="stat">
            <span class="stat-value">2.1kW</span>
            <span class="stat-label">Power Draw</span>
          </div>
        </div>
      </div>
    `;
    
    const rect = pack.getBoundingClientRect();
    tooltip.style.left = `${rect.right + 10}px`;
    tooltip.style.top = `${rect.top}px`;
    tooltip.classList.add('tooltip--visible');
    
    this.addTooltipStyles();
  }
  
  hideBatteryTooltip() {
    const tooltip = document.querySelector('.battery-hover-tooltip');
    if (tooltip) {
      tooltip.classList.remove('tooltip--visible');
    }
  }
  
  pulsateCell(cell) {
    cell.style.animation = 'cellPulse 0.6s ease-out';
    setTimeout(() => {
      cell.style.animation = 'none';
    }, 600);
  }
  
  setCellChargeLevel(cell, level) {
    const chargeIndicator = document.createElement('div');
    chargeIndicator.className = 'cell-charge-indicator';
    chargeIndicator.style.height = `${level}%`;
    
    if (!cell.querySelector('.cell-charge-indicator')) {
      cell.appendChild(chargeIndicator);
    }
    
    // Color coding based on charge level
    if (level > 80) {
      chargeIndicator.style.background = 'linear-gradient(to top, #22c55e, #16a34a)';
    } else if (level > 50) {
      chargeIndicator.style.background = 'linear-gradient(to top, #f59e0b, #eab308)';
    } else {
      chargeIndicator.style.background = 'linear-gradient(to top, #ef4444, #dc2626)';
    }
  }
  
  startBatteryMonitoring() {
    setInterval(() => {
      this.updatePerformanceGauges();
      this.simulateTemperatureChanges();
      this.updateChargeLevels();
    }, 2000);
  }
  
  updatePerformanceGauges() {
    const gauges = document.querySelectorAll('.performance-gauge .gauge-fill');
    
    gauges.forEach(gauge => {
      const currentValue = parseFloat(gauge.style.width) || 0;
      const targetValue = Math.max(20, Math.min(95, currentValue + (Math.random() - 0.5) * 10));
      
      gauge.style.transition = 'width 1s ease-out';
      gauge.style.width = `${targetValue}%`;
      
      // Update gauge color based on performance
      if (targetValue > 80) {
        gauge.style.background = 'linear-gradient(90deg, #22c55e, #16a34a)';
      } else if (targetValue > 60) {
        gauge.style.background = 'linear-gradient(90deg, #f59e0b, #eab308)';
      } else {
        gauge.style.background = 'linear-gradient(90deg, #ef4444, #dc2626)';
      }
    });
  }
  
  simulateTemperatureChanges() {
    const tempDisplays = document.querySelectorAll('[data-temperature]');
    
    tempDisplays.forEach(display => {
      const currentTemp = parseInt(display.textContent) || 25;
      const newTemp = Math.max(18, Math.min(45, currentTemp + (Math.random() - 0.5) * 3));
      
      display.textContent = `${Math.round(newTemp)}°C`;
      
      // Add warning for high temperatures
      if (newTemp > 40) {
        display.style.color = '#ef4444';
        display.style.fontWeight = 'bold';
      } else {
        display.style.color = '#64748b';
        display.style.fontWeight = 'normal';
      }
    });
  }
  
  updateChargeLevels() {
    const cells = document.querySelectorAll('.battery-cells .cell');
    
    cells.forEach(cell => {
      const indicator = cell.querySelector('.cell-charge-indicator');
      if (indicator) {
        const currentLevel = parseFloat(indicator.style.height) || 50;
        const newLevel = Math.max(10, Math.min(100, currentLevel + (Math.random() - 0.5) * 5));
        
        indicator.style.transition = 'height 1.5s ease-out';
        indicator.style.height = `${newLevel}%`;
        
        // Update color based on new level
        this.setCellChargeLevel(cell, newLevel);
      }
    });
  }
  
  addPopupStyles() {
    if (document.querySelector('#battery-popup-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'battery-popup-styles';
    style.textContent = `
      .battery-details-popup {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }
      
      .battery-details-popup.popup--visible {
        opacity: 1;
        visibility: visible;
      }
      
      .popup-content {
        background: white;
        border-radius: 16px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        position: relative;
        transform: translateY(20px);
        transition: transform 0.3s ease;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
      }
      
      .popup--visible .popup-content {
        transform: translateY(0);
      }
      
      .popup-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #64748b;
        transition: color 0.2s;
      }
      
      .popup-close:hover {
        color: #ef4444;
      }
      
      .popup-content h3 {
        color: #0F1419;
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
        font-weight: 700;
      }
      
      .spec-grid {
        display: grid;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }
      
      .spec-item {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem;
        background: #f8fafc;
        border-radius: 8px;
        border-left: 4px solid #00D4FF;
      }
      
      .spec-label {
        color: #64748b;
        font-weight: 500;
      }
      
      .spec-value {
        color: #0F1419;
        font-weight: 600;
      }
      
      .battery-status {
        padding: 1rem;
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05));
        border-radius: 8px;
        border: 1px solid rgba(16, 185, 129, 0.2);
      }
      
      .status-indicator {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #10B981;
        font-weight: 600;
      }
      
      .status-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        animation: statusPulse 2s ease-in-out infinite;
      }
      
      .status-dot--healthy {
        background: #10B981;
      }
      
      @keyframes statusPulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }
    `;
    document.head.appendChild(style);
  }
  
  // EV Charging Demo Interactive Features
  initEVChargingDemo() {
    const chargingDemo = document.querySelector('.ev-charging-demo');
    if (!chargingDemo) return;
    
    const startBtn = chargingDemo.querySelector('[data-action="start"]');
    const stopBtn = chargingDemo.querySelector('[data-action="stop"]');
    const scheduleBtn = chargingDemo.querySelector('[data-action="schedule"]');
    
    const chargePercentage = chargingDemo.querySelector('.charge-percentage');
    const rateValue = chargingDemo.querySelector('[data-rate]');
    const timeValue = chargingDemo.querySelector('[data-time]');
    const chargingState = chargingDemo.querySelector('.charging-state');
    const statusDot = chargingDemo.querySelector('.status-dot--charging');
    
    let isCharging = false;
    let chargingInterval;
    let currentCharge = 75;
    
    // Button event listeners
    startBtn?.addEventListener('click', () => {
      this.startEVCharging(chargingDemo, chargePercentage, rateValue, timeValue, chargingState, statusDot);
      isCharging = true;
    });
    
    stopBtn?.addEventListener('click', () => {
      this.stopEVCharging(chargingDemo, chargingState, statusDot);
      isCharging = false;
    });
    
    scheduleBtn?.addEventListener('click', () => {
      this.showChargingScheduler();
    });
    
    // Initialize charging animation
    this.simulateChargingData(chargingDemo);
  }
  
  startEVCharging(demo, percentageEl, rateEl, timeEl, stateEl, statusEl) {
    stateEl.textContent = 'Fast Charging';
    statusEl.style.background = '#16a34a';
    
    // Add active charging effects
    const batteryPack = demo.querySelector('.ev-battery-pack');
    const energyLine = demo.querySelector('.energy-line');
    
    if (batteryPack) {
      batteryPack.style.animation = 'batteryCharging 1s ease-in-out infinite';
    }
    
    if (energyLine) {
      energyLine.style.opacity = '1';
      energyLine.style.strokeWidth = '4';
    }
    
    // Animate charging progress
    let currentCharge = parseInt(percentageEl.textContent) || 75;
    const chargingInterval = setInterval(() => {
      if (currentCharge < 100) {
        currentCharge += Math.random() * 2;
        percentageEl.textContent = `${Math.round(currentCharge)}%`;
        
        // Update charging rate with realistic fluctuation
        const baseRate = 150;
        const fluctuation = (Math.random() - 0.5) * 20;
        rateEl.textContent = Math.round(baseRate + fluctuation);
        
        // Update time remaining
        const timeRemaining = Math.max(1, Math.round((100 - currentCharge) / 3));
        timeEl.textContent = timeRemaining;
        
        // Update progress circle
        this.updateChargeProgress(demo, currentCharge);
      } else {
        clearInterval(chargingInterval);
        this.completeEVCharging(demo, stateEl, statusEl);
      }
    }, 1000);
    
    // Store interval for cleanup
    demo.chargingInterval = chargingInterval;
    
    // Add visual feedback
    this.createChargingParticles(demo);
  }
  
  stopEVCharging(demo, stateEl, statusEl) {
    stateEl.textContent = 'Charging Stopped';
    statusEl.style.background = '#f59e0b';
    
    // Clear charging interval
    if (demo.chargingInterval) {
      clearInterval(demo.chargingInterval);
      demo.chargingInterval = null;
    }
    
    // Remove charging effects
    const batteryPack = demo.querySelector('.ev-battery-pack');
    const energyLine = demo.querySelector('.energy-line');
    
    if (batteryPack) {
      batteryPack.style.animation = 'none';
    }
    
    if (energyLine) {
      energyLine.style.opacity = '0.3';
      energyLine.style.strokeWidth = '2';
    }
  }
  
  completeEVCharging(demo, stateEl, statusEl) {
    stateEl.textContent = 'Charging Complete';
    statusEl.style.background = '#10b981';
    
    // Celebration effect
    this.createChargingCompleteEffect(demo);
    
    // Stop charging animations
    const batteryPack = demo.querySelector('.ev-battery-pack');
    if (batteryPack) {
      batteryPack.style.animation = 'chargingComplete 2s ease-out';
    }
  }
  
  updateChargeProgress(demo, percentage) {
    const progressEl = demo.querySelector('.charge-progress');
    if (progressEl) {
      const degrees = (percentage / 100) * 360;
      progressEl.style.background = `conic-gradient(#16a34a 0deg ${degrees}deg, #e5e7eb ${degrees}deg 360deg)`;
    }
  }
  
  simulateChargingData(demo) {
    // Simulate realistic charging curve
    setInterval(() => {
      const rateEl = demo.querySelector('[data-rate]');
      const timeEl = demo.querySelector('[data-time]');
      
      if (rateEl && timeEl) {
        // Add subtle variations to make it look realistic
        const currentRate = parseInt(rateEl.textContent) || 150;
        const newRate = Math.max(100, Math.min(200, currentRate + (Math.random() - 0.5) * 5));
        rateEl.textContent = Math.round(newRate);
        
        const currentTime = parseInt(timeEl.textContent) || 12;
        const newTime = Math.max(5, Math.min(25, currentTime + (Math.random() - 0.5) * 2));
        timeEl.textContent = Math.round(newTime);
      }
    }, 3000);
  }
  
  createChargingParticles(demo) {
    const particles = document.createElement('div');
    particles.className = 'charging-particles';
    particles.innerHTML = Array.from({length: 8}, (_, i) => 
      `<div class="particle" style="--delay: ${i * 0.2}s"></div>`
    ).join('');
    
    demo.appendChild(particles);
    
    // Add particle styles
    if (!document.querySelector('#charging-particle-styles')) {
      const style = document.createElement('style');
      style.id = 'charging-particle-styles';
      style.textContent = `
        .charging-particles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
        }
        
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #00d4ff;
          border-radius: 50%;
          animation: particleFloat 3s ease-in-out infinite;
          animation-delay: var(--delay);
        }
        
        @keyframes particleFloat {
          0% {
            transform: translateY(100%) translateX(0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: scale(1);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100%) translateX(50px) scale(0);
            opacity: 0;
          }
        }
        
        @keyframes batteryCharging {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        @keyframes chargingComplete {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Remove particles after animation
    setTimeout(() => {
      particles.remove();
    }, 5000);
  }
  
  createChargingCompleteEffect(demo) {
    // Create success checkmark animation
    const successIcon = document.createElement('div');
    successIcon.className = 'charging-success';
    successIcon.innerHTML = `
      <div class="success-circle">
        <svg viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="#16a34a"/>
        </svg>
      </div>
    `;
    
    demo.appendChild(successIcon);
    
    // Add success animation styles
    if (!document.querySelector('#charging-success-styles')) {
      const style = document.createElement('style');
      style.id = 'charging-success-styles';
      style.textContent = `
        .charging-success {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          animation: successPop 2s ease-out forwards;
        }
        
        .success-circle {
          width: 60px;
          height: 60px;
          background: white;
          border: 3px solid #16a34a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: successBounce 2s ease-out;
        }
        
        .success-circle svg {
          width: 30px;
          height: 30px;
        }
        
        @keyframes successPop {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
          20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
          }
          40% {
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        
        @keyframes successBounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Remove success icon after animation
    setTimeout(() => {
      successIcon.remove();
    }, 2000);
  }
  
  showChargingScheduler() {
    // Create scheduling popup
    const scheduler = document.createElement('div');
    scheduler.className = 'charging-scheduler-popup';
    scheduler.innerHTML = `
      <div class="scheduler-content">
        <h3>Schedule Charging</h3>
        <div class="schedule-options">
          <div class="schedule-option">
            <label>
              <input type="radio" name="schedule" value="off-peak">
              <span>Off-Peak Hours (11 PM - 6 AM)</span>
            </label>
          </div>
          <div class="schedule-option">
            <label>
              <input type="radio" name="schedule" value="solar">
              <span>Solar Power Available</span>
            </label>
          </div>
          <div class="schedule-option">
            <label>
              <input type="radio" name="schedule" value="departure">
              <span>Ready by Departure Time</span>
            </label>
          </div>
        </div>
        <div class="scheduler-actions">
          <button class="scheduler-btn scheduler-btn--save">Save Schedule</button>
          <button class="scheduler-btn scheduler-btn--cancel">Cancel</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(scheduler);
    
    // Add scheduler styles
    this.addSchedulerStyles();
    
    // Add event listeners
    scheduler.querySelector('.scheduler-btn--cancel').addEventListener('click', () => {
      scheduler.remove();
    });
    
    scheduler.querySelector('.scheduler-btn--save').addEventListener('click', () => {
      const selected = scheduler.querySelector('input[name="schedule"]:checked');
      if (selected) {
        alert(`Charging scheduled for: ${selected.nextElementSibling.textContent}`);
      }
      scheduler.remove();
    });
    
    // Show scheduler
    setTimeout(() => {
      scheduler.classList.add('scheduler--visible');
    }, 100);
  }
  
  addSchedulerStyles() {
    if (document.querySelector('#charging-scheduler-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'charging-scheduler-styles';
    style.textContent = `
      .charging-scheduler-popup {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .charging-scheduler-popup.scheduler--visible {
        opacity: 1;
      }
      
      .scheduler-content {
        background: white;
        padding: 2rem;
        border-radius: 16px;
        max-width: 400px;
        width: 90%;
        transform: translateY(20px);
        transition: transform 0.3s ease;
      }
      
      .scheduler--visible .scheduler-content {
        transform: translateY(0);
      }
      
      .scheduler-content h3 {
        margin: 0 0 1.5rem 0;
        color: #0F1419;
        text-align: center;
      }
      
      .schedule-options {
        margin-bottom: 2rem;
      }
      
      .schedule-option {
        margin-bottom: 1rem;
      }
      
      .schedule-option label {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        cursor: pointer;
        padding: 0.75rem;
        border-radius: 8px;
        transition: background-color 0.2s;
      }
      
      .schedule-option label:hover {
        background: #f8fafc;
      }
      
      .scheduler-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
      }
      
      .scheduler-btn {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .scheduler-btn--save {
        background: #2563eb;
        color: white;
      }
      
      .scheduler-btn--cancel {
        background: #e5e7eb;
        color: #374151;
      }
      
      .scheduler-btn:hover {
        transform: translateY(-1px);
      }
    `;
    document.head.appendChild(style);
  }
  
  // Advanced 3D Battery Cross-Section Interactive Features
  init3DBatteryCrossSection() {
    const crossSectionDemo = document.querySelector('.battery-cross-section-demo');
    if (!crossSectionDemo) return;
    
    const viewButtons = crossSectionDemo.querySelectorAll('.view-btn');
    const batteryModel = crossSectionDemo.querySelector('.battery-3d-model');
    const specsPanels = crossSectionDemo.querySelectorAll('.spec-section');
    
    // View mode switching
    viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        viewButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.switchBatteryView(btn.dataset.view, batteryModel);
      });
    });
    
    // Interactive thermal mapping
    this.initThermalMapping(crossSectionDemo);
    
    // Animated chemical composition bars
    this.animateCompositionBars(crossSectionDemo);
    
    // Performance radar chart interactions
    this.initPerformanceRadar(crossSectionDemo);
    
    // Battery layer interactions
    this.initLayerInteractions(crossSectionDemo);
    
    // Start continuous animations
    this.startContinuousAnimations(crossSectionDemo);
  }
  
  switchBatteryView(view, batteryModel) {
    const svg = batteryModel.querySelector('.battery-3d-svg');
    const internals = svg.querySelector('.battery-internals');
    const ionFlow = svg.querySelector('.ion-flow');
    
    // Reset all views
    svg.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))';
    internals.style.opacity = '0.9';
    ionFlow.style.opacity = '1';
    
    switch(view) {
      case 'external':
        internals.style.opacity = '0.1';
        ionFlow.style.opacity = '0';
        svg.style.filter = 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))';
        this.createViewTransitionEffect(batteryModel, 'External View');
        break;
        
      case 'internal':
        internals.style.opacity = '0.9';
        ionFlow.style.opacity = '1';
        this.createViewTransitionEffect(batteryModel, 'Internal Structure');
        break;
        
      case 'molecular':
        internals.style.opacity = '1';
        ionFlow.style.opacity = '1';
        this.addMolecularOverlay(batteryModel);
        this.createViewTransitionEffect(batteryModel, 'Molecular Level');
        break;
    }
  }
  
  createViewTransitionEffect(container, title) {
    const overlay = document.createElement('div');
    overlay.className = 'view-transition-overlay';
    overlay.innerHTML = `
      <div class="transition-content">
        <div class="transition-title">${title}</div>
        <div class="transition-loader">
          <div class="loader-bar"></div>
          <div class="loader-bar"></div>
          <div class="loader-bar"></div>
        </div>
      </div>
    `;
    
    container.appendChild(overlay);
    
    // Add transition styles
    if (!document.querySelector('#view-transition-styles')) {
      const style = document.createElement('style');
      style.id = 'view-transition-styles';
      style.textContent = `
        .view-transition-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          animation: transitionFade 1.5s ease-out forwards;
        }
        
        .transition-content {
          text-align: center;
        }
        
        .transition-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        
        .transition-loader {
          display: flex;
          gap: 4px;
          justify-content: center;
        }
        
        .loader-bar {
          width: 4px;
          height: 20px;
          background: var(--color-primary);
          animation: loaderPulse 1s ease-in-out infinite;
        }
        
        .loader-bar:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .loader-bar:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes transitionFade {
          0% {
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        
        @keyframes loaderPulse {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0.5);
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Remove overlay after animation
    setTimeout(() => {
      overlay.remove();
    }, 1500);
  }
  
  addMolecularOverlay(container) {
    // Add molecular structure visualization
    const molecularOverlay = document.createElement('div');
    molecularOverlay.className = 'molecular-overlay';
    molecularOverlay.innerHTML = `
      <svg class="molecular-svg" viewBox="0 0 400 300">
        <!-- Lithium ions -->
        <g class="lithium-ions">
          <circle cx="80" cy="120" r="4" fill="#000" class="molecule">
            <animate attributeName="cy" values="120;115;120" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="150" cy="140" r="4" fill="#000" class="molecule">
            <animate attributeName="cy" values="140;135;140" dur="1.8s" repeatCount="indefinite"/>
          </circle>
          <circle cx="220" cy="130" r="4" fill="#000" class="molecule">
            <animate attributeName="cy" values="130;125;130" dur="2.2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="290" cy="145" r="4" fill="#000" class="molecule">
            <animate attributeName="cy" values="145;140;145" dur="1.9s" repeatCount="indefinite"/>
          </circle>
        </g>
        
        <!-- Electron paths -->
        <g class="electron-paths">
          <circle r="2" fill="#666" class="electron">
            <animateMotion dur="3s" repeatCount="indefinite">
              <path d="M80 120 Q200 100 320 120 Q200 140 80 120"/>
            </animateMotion>
          </circle>
          <circle r="2" fill="#666" class="electron">
            <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.5s">
              <path d="M320 145 Q200 165 80 145 Q200 125 320 145"/>
            </animateMotion>
          </circle>
        </g>
        
        <!-- Molecular bonds -->
        <g class="molecular-bonds">
          <line x1="80" y1="120" x2="150" y2="140" stroke="#000" stroke-width="1" opacity="0.5" stroke-dasharray="2,2">
            <animate attributeName="stroke-opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite"/>
          </line>
          <line x1="150" y1="140" x2="220" y2="130" stroke="#000" stroke-width="1" opacity="0.5" stroke-dasharray="2,2">
            <animate attributeName="stroke-opacity" values="0.3;0.7;0.3" dur="1.8s" repeatCount="indefinite"/>
          </line>
          <line x1="220" y1="130" x2="290" y2="145" stroke="#000" stroke-width="1" opacity="0.5" stroke-dasharray="2,2">
            <animate attributeName="stroke-opacity" values="0.3;0.7;0.3" dur="2.2s" repeatCount="indefinite"/>
          </line>
        </g>
      </svg>
    `;
    
    container.appendChild(molecularOverlay);
    
    // Add molecular overlay styles
    if (!document.querySelector('#molecular-overlay-styles')) {
      const style = document.createElement('style');
      style.id = 'molecular-overlay-styles';
      style.textContent = `
        .molecular-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 5;
        }
        
        .molecular-svg {
          width: 100%;
          height: 100%;
          opacity: 0.7;
        }
        
        .molecule {
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
        }
        
        .electron {
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
        }
      `;
      document.head.appendChild(style);
    }
    
    // Remove after 5 seconds
    setTimeout(() => {
      molecularOverlay.remove();
    }, 5000);
  }
  
  initThermalMapping(demo) {
    const thermalCells = demo.querySelectorAll('.thermal-cell');
    
    thermalCells.forEach(cell => {
      cell.addEventListener('mouseenter', () => {
        const temp = cell.dataset.temp;
        this.showThermalTooltip(cell, `${temp}°C`);
      });
      
      cell.addEventListener('mouseleave', () => {
        this.hideThermalTooltip();
      });
    });
    
    // Simulate thermal changes
    setInterval(() => {
      thermalCells.forEach(cell => {
        const currentTemp = parseInt(cell.dataset.temp);
        const newTemp = Math.max(20, Math.min(40, currentTemp + (Math.random() - 0.5) * 2));
        cell.dataset.temp = Math.round(newTemp);
        
        // Update cell color based on temperature
        const intensity = (newTemp - 20) / 20; // 0 to 1
        const grayValue = Math.round(200 - (intensity * 120)); // 200 to 80
        cell.style.background = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
      });
    }, 2000);
  }
  
  showThermalTooltip(cell, text) {
    let tooltip = document.querySelector('.thermal-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.className = 'thermal-tooltip';
      document.body.appendChild(tooltip);
    }
    
    tooltip.textContent = text;
    
    const rect = cell.getBoundingClientRect();
    tooltip.style.left = `${rect.right + 8}px`;
    tooltip.style.top = `${rect.top}px`;
    tooltip.style.opacity = '1';
    
    // Add tooltip styles
    if (!document.querySelector('#thermal-tooltip-styles')) {
      const style = document.createElement('style');
      style.id = 'thermal-tooltip-styles';
      style.textContent = `
        .thermal-tooltip {
          position: fixed;
          background: var(--color-primary);
          color: var(--color-white);
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          z-index: 1000;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  hideThermalTooltip() {
    const tooltip = document.querySelector('.thermal-tooltip');
    if (tooltip) {
      tooltip.style.opacity = '0';
    }
  }
  
  animateCompositionBars(demo) {
    const compositionBars = demo.querySelectorAll('.element-fill');
    
    // Staggered animation for composition bars
    compositionBars.forEach((bar, index) => {
      setTimeout(() => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
          bar.style.transition = 'width 2s ease-out';
          bar.style.width = targetWidth;
        }, 100);
      }, index * 300);
    });
    
    // Add hover interactions
    const compositionItems = demo.querySelectorAll('.composition-item');
    compositionItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        const fill = item.querySelector('.element-fill');
        fill.style.transform = 'scaleY(1.2)';
        fill.style.filter = 'brightness(1.2)';
      });
      
      item.addEventListener('mouseleave', () => {
        const fill = item.querySelector('.element-fill');
        fill.style.transform = 'scaleY(1)';
        fill.style.filter = 'brightness(1)';
      });
    });
  }
  
  initPerformanceRadar(demo) {
    const radarChart = demo.querySelector('.radar-chart');
    if (!radarChart) return;
    
    const performanceArea = radarChart.querySelector('.performance-area');
    
    // Animate radar chart on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          performanceArea.style.animation = 'radarScan 3s ease-in-out infinite';
        }
      });
    });
    
    observer.observe(radarChart);
    
    // Add radar animation styles
    if (!document.querySelector('#radar-animation-styles')) {
      const style = document.createElement('style');
      style.id = 'radar-animation-styles';
      style.textContent = `
        @keyframes radarScan {
          0% {
            fill-opacity: 0.1;
            stroke-opacity: 0.3;
          }
          50% {
            fill-opacity: 0.3;
            stroke-opacity: 1;
          }
          100% {
            fill-opacity: 0.1;
            stroke-opacity: 0.3;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  initLayerInteractions(demo) {
    const batteryLayers = demo.querySelectorAll('.cathode-layer, .anode-layer, .electrolyte-layer');
    
    batteryLayers.forEach(layer => {
      layer.addEventListener('mouseenter', () => {
        layer.style.strokeWidth = '2';
        layer.style.stroke = '#000000';
        layer.style.filter = 'brightness(1.2)';
      });
      
      layer.addEventListener('mouseleave', () => {
        layer.style.strokeWidth = '0';
        layer.style.stroke = 'none';
        layer.style.filter = 'brightness(1)';
      });
      
      layer.addEventListener('click', () => {
        this.showLayerDetails(layer);
      });
    });
  }
  
  showLayerDetails(layer) {
    let layerType = '';
    let details = '';
    
    if (layer.classList.contains('cathode-layer')) {
      layerType = 'Cathode (Positive Electrode)';
      details = `
        • Material: Lithium Nickel Manganese Cobalt Oxide (NMC)
        • Function: Accepts electrons during discharge
        • Voltage: 3.7V nominal
        • Energy density: 150-220 Wh/kg
      `;
    } else if (layer.classList.contains('anode-layer')) {
      layerType = 'Anode (Negative Electrode)';
      details = `
        • Material: Graphite with Silicon additives
        • Function: Releases electrons during discharge
        • Capacity: 350-400 mAh/g
        • Cycle stability: >1000 cycles
      `;
    } else if (layer.classList.contains('electrolyte-layer')) {
      layerType = 'Electrolyte Medium';
      details = `
        • Type: Liquid organic carbonate
        • Function: Ion transport medium
        • Conductivity: 10-15 mS/cm
        • Operating temp: -20°C to 60°C
      `;
    }
    
    // Create layer details popup
    const popup = document.createElement('div');
    popup.className = 'layer-details-popup';
    popup.innerHTML = `
      <div class="layer-popup-content">
        <h4>${layerType}</h4>
        <div class="layer-details">
          ${details.split('\n').filter(line => line.trim()).map(line => 
            `<div class="detail-item">${line.trim()}</div>`
          ).join('')}
        </div>
        <button class="close-popup">×</button>
      </div>
    `;
    
    document.body.appendChild(popup);
    
    // Add layer popup styles
    if (!document.querySelector('#layer-popup-styles')) {
      const style = document.createElement('style');
      style.id = 'layer-popup-styles';
      style.textContent = `
        .layer-details-popup {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: layerPopupFade 0.3s ease-out;
        }
        
        .layer-popup-content {
          background: var(--color-white);
          padding: 2rem;
          border-radius: var(--radius-lg);
          border: 3px solid var(--color-primary);
          max-width: 400px;
          width: 90%;
          position: relative;
        }
        
        .layer-popup-content h4 {
          color: var(--color-primary);
          margin: 0 0 1rem 0;
          font-weight: 700;
          text-transform: uppercase;
        }
        
        .detail-item {
          margin: 0.5rem 0;
          color: var(--color-text-primary);
          font-weight: 500;
        }
        
        .close-popup {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          font-weight: bold;
          cursor: pointer;
          color: var(--color-primary);
        }
        
        @keyframes layerPopupFade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Close popup functionality
    popup.querySelector('.close-popup').addEventListener('click', () => {
      popup.remove();
    });
    
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.remove();
      }
    });
  }
  
  startContinuousAnimations(demo) {
    // Voltage fluctuation
    const voltageValue = demo.querySelector('.voltage-value');
    if (voltageValue) {
      setInterval(() => {
        const baseVoltage = 3.7;
        const fluctuation = (Math.random() - 0.5) * 0.2;
        voltageValue.textContent = `${(baseVoltage + fluctuation).toFixed(2)}V`;
      }, 1500);
    }
    
    // Performance radar pulsing
    const performanceArea = demo.querySelector('.performance-area');
    if (performanceArea) {
      setInterval(() => {
        const points = [
          [100, 30 + Math.random() * 10],
          [145 + Math.random() * 10, 65],
          [140 + Math.random() * 5, 125],
          [100, 155 - Math.random() * 10],
          [65 - Math.random() * 10, 125],
          [55 - Math.random() * 5, 65]
        ];
        
        performanceArea.setAttribute('points', points.map(p => p.join(',')).join(' '));
      }, 3000);
    }
  }
  
  // Manufacturing Process Interactive Features
  initManufacturingProcess() {
    const manufacturingDemo = document.querySelector('.manufacturing-process-demo');
    if (!manufacturingDemo) return;
    
    const processButtons = manufacturingDemo.querySelectorAll('.process-btn');
    const manufacturingSteps = manufacturingDemo.querySelectorAll('.manufacturing-step');
    const analyticsCards = manufacturingDemo.querySelectorAll('.analytics-card');
    
    let currentSpeed = 2; // Default 2x speed
    
    // Process control buttons
    processButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        const speed = btn.dataset.speed;
        
        if (action === 'reset') {
          this.resetManufacturingProcess(manufacturingDemo);
        } else if (speed) {
          processButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentSpeed = parseFloat(speed.replace('x', ''));
          this.adjustAnimationSpeed(manufacturingDemo, currentSpeed);
        }
      });
    });
    
    // Interactive manufacturing steps
    manufacturingSteps.forEach((step, index) => {
      step.addEventListener('click', () => {
        this.showStepDetails(step, index + 1);
      });
      
      step.addEventListener('mouseenter', () => {
        this.highlightStep(step);
      });
      
      step.addEventListener('mouseleave', () => {
        this.unhighlightStep(step);
      });
    });
    
    // Analytics card interactions
    analyticsCards.forEach(card => {
      card.addEventListener('click', () => {
        this.showDetailedAnalytics(card);
      });
    });
    
    // Start real-time manufacturing simulation
    this.startManufacturingSimulation(manufacturingDemo);
    
    // Initialize step metrics monitoring
    this.initStepMetricsMonitoring(manufacturingDemo);
  }
  
  adjustAnimationSpeed(demo, speed) {
    const animatedElements = demo.querySelectorAll('animate, animateTransform, animateMotion');
    
    animatedElements.forEach(element => {
      const currentDur = element.getAttribute('dur');
      if (currentDur) {
        const numericDur = parseFloat(currentDur.replace('s', ''));
        const newDur = numericDur / speed;
        element.setAttribute('dur', `${newDur}s`);
      }
    });
  }
  
  resetManufacturingProcess(demo) {
    // Reset all animations
    const svgElements = demo.querySelectorAll('.step-svg');
    svgElements.forEach(svg => {
      const animElements = svg.querySelectorAll('animate, animateTransform, animateMotion');
      animElements.forEach(anim => {
        anim.beginElement();
      });
    });
    
    // Reset analytics values
    this.resetAnalyticsValues(demo);
    
    // Show reset notification
    this.showNotification('Manufacturing process reset', 'success');
  }
  
  highlightStep(step) {
    step.style.transform = 'translateY(-8px) scale(1.05)';
    step.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
    step.style.borderColor = '#000';
    step.style.borderWidth = '3px';
  }
  
  unhighlightStep(step) {
    step.style.transform = '';
    step.style.boxShadow = '';
    step.style.borderColor = '';
    step.style.borderWidth = '';
  }
  
  showStepDetails(step, stepNumber) {
    const stepTitle = step.querySelector('.step-title').textContent;
    const stepStatus = step.querySelector('.step-status').textContent;
    const metrics = Array.from(step.querySelectorAll('.metric')).map(metric => ({
      label: metric.querySelector('.metric-label').textContent,
      value: metric.querySelector('.metric-value').textContent
    }));
    
    // Create detailed step popup
    const popup = document.createElement('div');
    popup.className = 'step-details-popup';
    popup.innerHTML = `
      <div class="step-popup-content">
        <div class="step-popup-header">
          <div class="step-popup-number">${stepNumber.toString().padStart(2, '0')}</div>
          <div class="step-popup-info">
            <h3>${stepTitle}</h3>
            <div class="step-popup-status">${stepStatus}</div>
          </div>
          <button class="step-popup-close">×</button>
        </div>
        
        <div class="step-popup-body">
          <div class="step-details-section">
            <h4>Process Parameters</h4>
            <div class="step-parameters">
              ${metrics.map(metric => `
                <div class="parameter-item">
                  <span class="parameter-label">${metric.label}</span>
                  <span class="parameter-value">${metric.value}</span>
                </div>
              `).join('')}
            </div>
          </div>
          
          <div class="step-details-section">
            <h4>Quality Control</h4>
            <div class="quality-indicators">
              <div class="quality-item">
                <div class="quality-dot quality-dot--pass"></div>
                <span>Process Parameters: Within Tolerance</span>
              </div>
              <div class="quality-item">
                <div class="quality-dot quality-dot--pass"></div>
                <span>Equipment Status: Operational</span>
              </div>
              <div class="quality-item">
                <div class="quality-dot quality-dot--pass"></div>
                <span>Output Quality: Acceptable</span>
              </div>
            </div>
          </div>
          
          <div class="step-details-section">
            <h4>Real-Time Monitoring</h4>
            <div class="monitoring-chart">
              <svg viewBox="0 0 300 100" class="monitoring-svg">
                <line x1="20" y1="80" x2="280" y2="80" stroke="#000" stroke-width="1"/>
                <line x1="20" y1="80" x2="20" y2="20" stroke="#000" stroke-width="1"/>
                <polyline points="20,60 50,55 80,50 110,45 140,40 170,42 200,38 230,35 260,32 280,30" 
                         stroke="#000" stroke-width="2" fill="none" class="monitoring-line">
                  <animate attributeName="stroke-dasharray" values="0,500;500,0" dur="3s" repeatCount="indefinite"/>
                </polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(popup);
    
    // Add step popup styles
    this.addStepPopupStyles();
    
    // Show popup with animation
    setTimeout(() => {
      popup.classList.add('step-popup--visible');
    }, 100);
    
    // Close functionality
    const closeBtn = popup.querySelector('.step-popup-close');
    closeBtn.addEventListener('click', () => {
      popup.classList.remove('step-popup--visible');
      setTimeout(() => popup.remove(), 300);
    });
    
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        closeBtn.click();
      }
    });
  }
  
  showDetailedAnalytics(card) {
    const cardTitle = card.querySelector('.card-title').textContent;
    const cardValue = card.querySelector('.card-value').textContent;
    const cardLabel = card.querySelector('.card-label').textContent;
    
    // Create analytics popup
    const popup = document.createElement('div');
    popup.className = 'analytics-details-popup';
    popup.innerHTML = `
      <div class="analytics-popup-content">
        <div class="analytics-popup-header">
          <h3>${cardTitle}</h3>
          <button class="analytics-popup-close">×</button>
        </div>
        
        <div class="analytics-popup-body">
          <div class="current-value">
            <div class="current-number">${cardValue}</div>
            <div class="current-label">${cardLabel}</div>
          </div>
          
          <div class="analytics-charts">
            <div class="chart-section">
              <h4>24 Hour Trend</h4>
              <svg viewBox="0 0 400 150" class="trend-svg">
                <defs>
                  <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#000000; stop-opacity:0.3"/>
                    <stop offset="100%" style="stop-color:#000000; stop-opacity:0.1"/>
                  </linearGradient>
                </defs>
                <line x1="40" y1="130" x2="360" y2="130" stroke="#ccc" stroke-width="1"/>
                <line x1="40" y1="130" x2="40" y2="20" stroke="#ccc" stroke-width="1"/>
                
                <polyline points="40,100 80,95 120,85 160,80 200,75 240,70 280,65 320,60 360,55" 
                         stroke="#000" stroke-width="3" fill="none" class="trend-line"/>
                
                <polygon points="40,130 80,95 120,85 160,80 200,75 240,70 280,65 320,60 360,55 360,130" 
                        fill="url(#trendGradient)" class="trend-area"/>
                
                <!-- Data Points -->
                <circle cx="80" cy="95" r="4" fill="#000"/>
                <circle cx="160" cy="80" r="4" fill="#000"/>
                <circle cx="240" cy="70" r="4" fill="#000"/>
                <circle cx="320" cy="60" r="4" fill="#000"/>
              </svg>
            </div>
            
            <div class="chart-section">
              <h4>Performance Distribution</h4>
              <svg viewBox="0 0 200 100" class="distribution-svg">
                <rect x="20" y="60" width="15" height="30" fill="#000"/>
                <rect x="40" y="50" width="15" height="40" fill="#000"/>
                <rect x="60" y="40" width="15" height="50" fill="#000"/>
                <rect x="80" y="30" width="15" height="60" fill="#000"/>
                <rect x="100" y="45" width="15" height="45" fill="#000"/>
                <rect x="120" y="55" width="15" height="35" fill="#000"/>
                <rect x="140" y="65" width="15" height="25" fill="#000"/>
                <rect x="160" y="70" width="15" height="20" fill="#000"/>
              </svg>
            </div>
          </div>
          
          <div class="analytics-summary">
            <div class="summary-item">
              <span class="summary-label">Peak Value:</span>
              <span class="summary-value">98.7%</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Average:</span>
              <span class="summary-value">94.2%</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Trend:</span>
              <span class="summary-value">↗ +2.1%</span>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(popup);
    
    // Add analytics popup styles
    this.addAnalyticsPopupStyles();
    
    // Show popup
    setTimeout(() => {
      popup.classList.add('analytics-popup--visible');
    }, 100);
    
    // Close functionality
    const closeBtn = popup.querySelector('.analytics-popup-close');
    closeBtn.addEventListener('click', () => {
      popup.classList.remove('analytics-popup--visible');
      setTimeout(() => popup.remove(), 300);
    });
    
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        closeBtn.click();
      }
    });
  }
  
  startManufacturingSimulation(demo) {
    // Update production metrics every 3 seconds
    setInterval(() => {
      this.updateProductionMetrics(demo);
    }, 3000);
    
    // Update step statuses every 5 seconds
    setInterval(() => {
      this.updateStepStatuses(demo);
    }, 5000);
    
    // Update analytics charts every 2 seconds
    setInterval(() => {
      this.updateAnalyticsCharts(demo);
    }, 2000);
  }
  
  updateProductionMetrics(demo) {
    const productionRate = demo.querySelector('[data-production-rate]');
    const qualityScore = demo.querySelector('[data-quality-score]');
    const efficiency = demo.querySelector('[data-efficiency]');
    const defectRate = demo.querySelector('[data-defect-rate]');
    
    if (productionRate) {
      const currentRate = parseInt(productionRate.textContent.replace(/,/g, ''));
      const newRate = Math.max(1500, Math.min(2000, currentRate + (Math.random() - 0.5) * 100));
      productionRate.textContent = Math.round(newRate).toLocaleString();
    }
    
    if (qualityScore) {
      const currentQuality = parseFloat(qualityScore.textContent.replace('%', ''));
      const newQuality = Math.max(99.5, Math.min(100, currentQuality + (Math.random() - 0.5) * 0.1));
      qualityScore.textContent = `${newQuality.toFixed(2)}%`;
    }
    
    if (efficiency) {
      const currentEff = parseFloat(efficiency.textContent.replace('%', ''));
      const newEff = Math.max(94, Math.min(98, currentEff + (Math.random() - 0.5) * 0.5));
      efficiency.textContent = `${newEff.toFixed(1)}%`;
    }
    
    if (defectRate) {
      const currentDefect = parseFloat(defectRate.textContent.replace('%', ''));
      const newDefect = Math.max(0.01, Math.min(0.1, currentDefect + (Math.random() - 0.5) * 0.02));
      defectRate.textContent = `${newDefect.toFixed(2)}%`;
    }
  }
  
  updateStepStatuses(demo) {
    const statusElements = demo.querySelectorAll('.step-status');
    const statuses = ['Ready', 'Processing', 'Active', 'Testing', 'Complete', 'Optimizing'];
    
    statusElements.forEach(status => {
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      status.textContent = randomStatus;
      
      // Update status color based on type
      status.className = 'step-status';
      if (randomStatus === 'Active' || randomStatus === 'Processing') {
        status.style.background = '#000';
      } else if (randomStatus === 'Complete') {
        status.style.background = '#333';
      } else {
        status.style.background = '#666';
      }
    });
  }
  
  updateAnalyticsCharts(demo) {
    const chartLines = demo.querySelectorAll('.chart-line, .trend-line');
    
    chartLines.forEach(line => {
      const currentDashArray = line.style.strokeDasharray || '0,200';
      const values = currentDashArray.split(',').map(v => parseFloat(v));
      const newValues = [Math.random() * 100, 200 - Math.random() * 100];
      line.style.strokeDasharray = `${newValues[0]},${newValues[1]}`;
    });
  }
  
  initStepMetricsMonitoring(demo) {
    const metricElements = demo.querySelectorAll('[data-metric]');
    
    setInterval(() => {
      metricElements.forEach(metric => {
        const metricType = metric.dataset.metric;
        const currentValue = metric.textContent;
        
        switch(metricType) {
          case 'purity':
            const purity = Math.max(99.5, Math.min(99.9, 99.8 + (Math.random() - 0.5) * 0.2));
            metric.textContent = `${purity.toFixed(1)}%`;
            break;
          case 'moisture':
            const moisture = Math.max(0.01, Math.min(0.05, 0.02 + (Math.random() - 0.5) * 0.01));
            metric.textContent = `${moisture.toFixed(2)}%`;
            break;
          case 'thickness':
            const thickness = Math.max(80, Math.min(90, 85 + (Math.random() - 0.5) * 3));
            metric.textContent = `${Math.round(thickness)}μm`;
            break;
          case 'uniformity':
            const uniformity = Math.max(1, Math.min(3, 2 + (Math.random() - 0.5) * 0.5));
            metric.textContent = `±${uniformity.toFixed(1)}%`;
            break;
          case 'speed':
            const speed = Math.max(110, Math.min(130, 120 + (Math.random() - 0.5) * 10));
            metric.textContent = Math.round(speed);
            break;
          case 'accuracy':
            const accuracy = Math.max(99.95, Math.min(100, 99.99 + (Math.random() - 0.5) * 0.02));
            metric.textContent = `${accuracy.toFixed(2)}%`;
            break;
          case 'pass-rate':
            const passRate = Math.max(99.9, Math.min(100, 99.97 + (Math.random() - 0.5) * 0.05));
            metric.textContent = `${passRate.toFixed(2)}%`;
            break;
          case 'test-time':
            const testTime = Math.max(2.0, Math.min(3.0, 2.3 + (Math.random() - 0.5) * 0.3));
            metric.textContent = `${testTime.toFixed(1)}s`;
            break;
        }
      });
    }, 4000);
  }
  
  resetAnalyticsValues(demo) {
    // Reset to default values
    const defaults = {
      '[data-production-rate]': '1,847',
      '[data-quality-score]': '99.97%',
      '[data-efficiency]': '96.2%',
      '[data-defect-rate]': '0.03%'
    };
    
    Object.entries(defaults).forEach(([selector, value]) => {
      const element = demo.querySelector(selector);
      if (element) {
        element.textContent = value;
      }
    });
  }
  
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `manufacturing-notification manufacturing-notification--${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Add notification styles
    if (!document.querySelector('#manufacturing-notification-styles')) {
      const style = document.createElement('style');
      style.id = 'manufacturing-notification-styles';
      style.textContent = `
        .manufacturing-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 1rem 1.5rem;
          background: var(--color-primary);
          color: var(--color-white);
          border-radius: var(--radius-md);
          font-weight: 600;
          z-index: 1000;
          animation: notificationSlide 0.3s ease-out;
        }
        
        .manufacturing-notification--success {
          background: #16a34a;
        }
        
        .manufacturing-notification--warning {
          background: #f59e0b;
        }
        
        .manufacturing-notification--error {
          background: #ef4444;
        }
        
        @keyframes notificationSlide {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'notificationSlide 0.3s ease-out reverse';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
  
  addStepPopupStyles() {
    if (document.querySelector('#step-popup-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'step-popup-styles';
    style.textContent = `
      .step-details-popup {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .step-details-popup.step-popup--visible {
        opacity: 1;
      }
      
      .step-popup-content {
        background: var(--color-white);
        border-radius: var(--radius-lg);
        border: 3px solid var(--color-primary);
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: translateY(20px);
        transition: transform 0.3s ease;
      }
      
      .step-popup--visible .step-popup-content {
        transform: translateY(0);
      }
      
      .step-popup-header {
        display: grid;
        grid-template-columns: 60px 1fr auto;
        align-items: center;
        gap: var(--space-4);
        padding: var(--space-6);
        background: var(--color-gray-50);
        border-bottom: 2px solid var(--color-primary);
      }
      
      .step-popup-number {
        width: 60px;
        height: 60px;
        background: var(--color-primary);
        color: var(--color-white);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 1.5rem;
      }
      
      .step-popup-info h3 {
        color: var(--color-primary);
        margin: 0 0 var(--space-1) 0;
        font-weight: 700;
        text-transform: uppercase;
      }
      
      .step-popup-status {
        color: var(--color-text-secondary);
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.875rem;
      }
      
      .step-popup-close {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: var(--color-primary);
        font-weight: bold;
      }
      
      .step-popup-body {
        padding: var(--space-6);
      }
      
      .step-details-section {
        margin-bottom: var(--space-6);
      }
      
      .step-details-section h4 {
        color: var(--color-primary);
        font-weight: 700;
        margin: 0 0 var(--space-4) 0;
        text-transform: uppercase;
        border-bottom: 2px solid var(--color-primary);
        padding-bottom: var(--space-2);
      }
      
      .step-parameters {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--space-3);
      }
      
      .parameter-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-2);
        background: var(--color-gray-50);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-gray-300);
      }
      
      .parameter-label {
        color: var(--color-text-secondary);
        font-weight: 500;
      }
      
      .parameter-value {
        color: var(--color-primary);
        font-weight: 700;
      }
      
      .quality-indicators {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
      }
      
      .quality-item {
        display: flex;
        align-items: center;
        gap: var(--space-2);
      }
      
      .quality-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }
      
      .quality-dot--pass {
        background: #16a34a;
      }
      
      .monitoring-chart {
        background: var(--color-gray-50);
        border-radius: var(--radius-md);
        padding: var(--space-4);
      }
      
      .monitoring-svg {
        width: 100%;
        height: auto;
      }
    `;
    document.head.appendChild(style);
  }
  
  addAnalyticsPopupStyles() {
    if (document.querySelector('#analytics-popup-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'analytics-popup-styles';
    style.textContent = `
      .analytics-details-popup {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .analytics-details-popup.analytics-popup--visible {
        opacity: 1;
      }
      
      .analytics-popup-content {
        background: var(--color-white);
        border-radius: var(--radius-lg);
        border: 3px solid var(--color-primary);
        max-width: 700px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: translateY(20px);
        transition: transform 0.3s ease;
      }
      
      .analytics-popup--visible .analytics-popup-content {
        transform: translateY(0);
      }
      
      .analytics-popup-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-6);
        background: var(--color-gray-50);
        border-bottom: 2px solid var(--color-primary);
      }
      
      .analytics-popup-header h3 {
        color: var(--color-primary);
        margin: 0;
        font-weight: 700;
        text-transform: uppercase;
      }
      
      .analytics-popup-close {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: var(--color-primary);
        font-weight: bold;
      }
      
      .analytics-popup-body {
        padding: var(--space-6);
      }
      
      .current-value {
        text-align: center;
        margin-bottom: var(--space-6);
        padding: var(--space-6);
        background: var(--color-gray-50);
        border-radius: var(--radius-lg);
      }
      
      .current-number {
        font-size: 3rem;
        font-weight: 700;
        color: var(--color-primary);
        margin-bottom: var(--space-2);
      }
      
      .current-label {
        font-size: 1.1rem;
        color: var(--color-text-secondary);
        text-transform: uppercase;
        font-weight: 600;
      }
      
      .analytics-charts {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--space-6);
        margin-bottom: var(--space-6);
      }
      
      .chart-section h4 {
        color: var(--color-primary);
        font-weight: 700;
        margin: 0 0 var(--space-3) 0;
        text-transform: uppercase;
        font-size: 1rem;
      }
      
      .trend-svg,
      .distribution-svg {
        width: 100%;
        height: auto;
        background: var(--color-gray-50);
        border-radius: var(--radius-md);
        padding: var(--space-2);
      }
      
      .analytics-summary {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-4);
        padding: var(--space-4);
        background: var(--color-gray-50);
        border-radius: var(--radius-lg);
      }
      
      .summary-item {
        text-align: center;
      }
      
      .summary-label {
        display: block;
        color: var(--color-text-secondary);
        font-weight: 500;
        margin-bottom: var(--space-1);
        text-transform: uppercase;
        font-size: 0.875rem;
      }
      
      .summary-value {
        color: var(--color-primary);
        font-weight: 700;
        font-size: 1.2rem;
      }
    `;
    document.head.appendChild(style);
  }
  
  addTooltipStyles() {
    if (document.querySelector('#battery-tooltip-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'battery-tooltip-styles';
    style.textContent = `
      .battery-hover-tooltip {
        position: fixed;
        background: rgba(15, 20, 25, 0.95);
        color: white;
        padding: 1rem;
        border-radius: 12px;
        border: 1px solid rgba(0, 212, 255, 0.3);
        backdrop-filter: blur(10px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 999;
        opacity: 0;
        transform: translateX(10px);
        transition: all 0.3s ease;
        pointer-events: none;
        min-width: 200px;
      }
      
      .battery-hover-tooltip.tooltip--visible {
        opacity: 1;
        transform: translateX(0);
      }
      
      .tooltip-title {
        font-weight: 600;
        color: #00D4FF;
        margin-bottom: 0.75rem;
        font-size: 0.9rem;
      }
      
      .tooltip-stats {
        display: flex;
        gap: 1rem;
      }
      
      .stat {
        text-align: center;
        flex: 1;
      }
      
      .stat-value {
        display: block;
        font-weight: 700;
        font-size: 1.1rem;
        color: #00D4FF;
        margin-bottom: 0.25rem;
      }
      
      .stat-label {
        font-size: 0.75rem;
        color: #94a3b8;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      
      .cell-charge-indicator {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, #22c55e, #16a34a);
        border-radius: 0 0 4px 4px;
        transition: height 1.5s ease-out;
        opacity: 0.8;
      }
      
      @keyframes batteryBreathing {
        0%, 100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.8;
          transform: scale(1.02);
        }
      }
      
      @keyframes cellPulse {
        0% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.8);
        }
        50% {
          transform: scale(1.05);
          box-shadow: 0 0 0 6px rgba(0, 212, 255, 0.4);
        }
        100% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(0, 212, 255, 0);
        }
      }
      
      @keyframes energyFlow {
        0% {
          stroke-dashoffset: 12;
          opacity: 0.5;
        }
        50% {
          opacity: 1;
        }
        100% {
          stroke-dashoffset: -12;
          opacity: 0.5;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  showCellInfo(cell, index) {
    // Create floating cell info
    const info = document.createElement('div');
    info.className = 'cell-info-tooltip';
    info.innerHTML = `
      <h4>Cell ${index + 1}</h4>
      <div class="cell-stats">
        <div class="cell-stat">
          <span class="label">Voltage:</span>
          <span class="value">${(3.2 + Math.random() * 0.8).toFixed(2)}V</span>
        </div>
        <div class="cell-stat">
          <span class="label">Temp:</span>
          <span class="value">${(20 + Math.random() * 10).toFixed(1)}°C</span>
        </div>
        <div class="cell-stat">
          <span class="label">Health:</span>
          <span class="value">${(95 + Math.random() * 4).toFixed(1)}%</span>
        </div>
      </div>
    `;
    
    // Position relative to cell
    const rect = cell.getBoundingClientRect();
    info.style.cssText = `
      position: fixed;
      top: ${rect.bottom + 10}px;
      left: ${rect.left}px;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 1rem;
      border-radius: 8px;
      z-index: 1000;
      font-size: 0.875rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      animation: fadeInUp 0.3s ease;
    `;
    
    document.body.appendChild(info);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      info.style.animation = 'fadeOutDown 0.3s ease forwards';
      setTimeout(() => info.remove(), 300);
    }, 3000);
    
    // Add cell info styles
    this.addCellInfoStyles();
  }
  
  addCellInfoStyles() {
    if (document.querySelector('#cell-info-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'cell-info-styles';
    style.textContent = `
      .cell-info-tooltip h4 {
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
        color: #00D4FF;
      }
      
      .cell-stats {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      
      .cell-stat {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
      }
      
      .cell-stat .label {
        color: #94a3b8;
      }
      
      .cell-stat .value {
        font-weight: 600;
        color: white;
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fadeOutDown {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(10px);
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  highlightBatteryCells(pack) {
    const carSystem = pack.closest('.car-battery-system');
    const cells = carSystem.querySelectorAll('.battery-cells .cell');
    
    cells.forEach((cell, index) => {
      setTimeout(() => {
        cell.style.fill = '#10B981';
        cell.style.filter = 'drop-shadow(0 0 8px #10B981)';
      }, index * 50);
    });
  }
  
  resetBatteryCells(pack) {
    const carSystem = pack.closest('.car-battery-system');
    const cells = carSystem.querySelectorAll('.battery-cells .cell');
    
    cells.forEach(cell => {
      cell.style.fill = '#00D4FF';
      cell.style.filter = 'drop-shadow(0 0 5px currentColor)';
    });
  }
  
  createClickRipple(element, event) {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const ripple = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ripple.setAttribute('cx', x);
    ripple.setAttribute('cy', y);
    ripple.setAttribute('r', 0);
    ripple.setAttribute('fill', 'rgba(255, 255, 255, 0.5)');
    ripple.style.pointerEvents = 'none';
    
    element.parentElement.appendChild(ripple);
    
    // Animate ripple
    let radius = 0;
    const maxRadius = Math.max(rect.width, rect.height);
    const animation = setInterval(() => {
      radius += 5;
      ripple.setAttribute('r', radius);
      ripple.setAttribute('fill-opacity', 1 - radius / maxRadius);
      
      if (radius >= maxRadius) {
        clearInterval(animation);
        ripple.remove();
      }
    }, 16);
  }
  
  // Interactive Gauge System
  initGaugeInteractions() {
    const gauges = document.querySelectorAll('.spec-gauge');
    
    gauges.forEach(gauge => {
      gauge.addEventListener('click', () => {
        this.animateGauge(gauge);
      });
      
      gauge.addEventListener('mouseenter', () => {
        this.highlightGauge(gauge);
      });
      
      gauge.addEventListener('mouseleave', () => {
        this.resetGauge(gauge);
      });
    });
  }
  
  animateGauge(gauge) {
    const circle = gauge.querySelector('circle:last-child');
    const value = gauge.querySelector('.gauge-value');
    const spec = gauge.getAttribute('data-spec');
    
    // Random value animation
    const originalValue = value.textContent;
    const animationDuration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      // Generate random values based on spec type
      let randomValue;
      switch (spec) {
        case 'voltage':
          randomValue = Math.round(380 + Math.random() * 40) + 'V';
          break;
        case 'capacity':
          randomValue = Math.round(70 + Math.random() * 10) + 'kWh';
          break;
        case 'temperature':
          randomValue = Math.round(20 + Math.random() * 15) + '°C';
          break;
        default:
          randomValue = originalValue;
      }
      
      value.textContent = randomValue;
      
      // Animate stroke dash offset
      const originalOffset = circle.getAttribute('stroke-dashoffset');
      const newOffset = parseFloat(originalOffset) + Math.sin(progress * Math.PI * 4) * 20;
      circle.setAttribute('stroke-dashoffset', newOffset);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        value.textContent = originalValue;
        circle.setAttribute('stroke-dashoffset', originalOffset);
      }
    };
    
    requestAnimationFrame(animate);
  }
  
  highlightGauge(gauge) {
    gauge.style.transform = 'translateY(-5px) scale(1.05)';
    gauge.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.2)';
  }
  
  resetGauge(gauge) {
    gauge.style.transform = '';
    gauge.style.boxShadow = '';
  }
  
  // Feature Highlights Interactivity
  initFeatureHighlights() {
    const features = document.querySelectorAll('.feature-highlight');
    
    features.forEach(feature => {
      const featureType = feature.getAttribute('data-feature');
      
      feature.addEventListener('click', () => {
        this.demonstrateFeature(featureType, feature);
      });
    });
  }
  
  demonstrateFeature(type, element) {
    switch (type) {
      case 'fast-charge':
        this.demonstrateFastCharging(element);
        break;
      case 'range':
        this.demonstrateRange(element);
        break;
      case 'safety':
        this.demonstrateSafety(element);
        break;
    }
  }
  
  demonstrateFastCharging(element) {
    const chargeFill = element.querySelector('.charge-fill');
    const chargeText = element.querySelector('.charge-text');
    
    if (!chargeFill) return;
    
    // Reset and start animation
    chargeFill.style.animation = 'none';
    chargeFill.offsetHeight; // Force reflow
    chargeFill.style.animation = 'chargeFill 2s ease-out forwards';
    
    // Update text during charging
    chargeText.textContent = 'Charging...';
    setTimeout(() => {
      chargeText.textContent = '10-80% in 30min';
    }, 2000);
  }
  
  demonstrateRange(element) {
    const rangeValue = element.querySelector('.range-value');
    const rangePulse = element.querySelector('.range-pulse');
    
    // Animate range counting up
    let currentRange = 0;
    const targetRange = 500;
    const duration = 1500;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      currentRange = Math.round(targetRange * progress);
      rangeValue.textContent = currentRange + '+ miles';
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
    
    // Enhanced pulse animation
    if (rangePulse) {
      rangePulse.style.animation = 'rangePulse 0.5s ease-out infinite';
    }
  }
  
  demonstrateSafety(element) {
    const badges = element.querySelectorAll('.safety-badge');
    
    badges.forEach((badge, index) => {
      setTimeout(() => {
        badge.style.background = 'rgba(16, 185, 129, 0.3)';
        badge.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
          badge.style.background = 'rgba(16, 185, 129, 0.1)';
          badge.style.transform = 'scale(1)';
        }, 500);
      }, index * 200);
    });
  }
  
  // Enhanced Charging Animation
  initChargingAnimation() {
    const chargeElements = document.querySelectorAll('[data-feature="fast-charge"]');
    
    chargeElements.forEach(element => {
      setInterval(() => {
        const chargeFill = element.querySelector('.charge-fill');
        if (chargeFill && !chargeFill.matches(':hover')) {
          chargeFill.style.animation = 'none';
          chargeFill.offsetHeight; // Force reflow
          chargeFill.style.animation = 'chargeFill 3s ease-in-out infinite';
        }
      }, 8000);
    });
  }
  
  // Battery Specifications Animation
  initBatterySpecsAnimations() {
    // Animate specs on scroll into view
    const specDisplays = document.querySelectorAll('.battery-specs-display');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateBatterySpecs(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    specDisplays.forEach(display => {
      observer.observe(display);
    });
  }
  
  animateBatterySpecs(container) {
    const gauges = container.querySelectorAll('.spec-gauge');
    
    gauges.forEach((gauge, index) => {
      setTimeout(() => {
        gauge.style.opacity = '0';
        gauge.style.transform = 'translateY(30px)';
        gauge.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
        
        requestAnimationFrame(() => {
          gauge.style.opacity = '1';
          gauge.style.transform = 'translateY(0)';
        });
        
        // Animate gauge fill
        const circle = gauge.querySelector('circle:last-child');
        if (circle) {
          const originalOffset = circle.getAttribute('stroke-dashoffset');
          circle.setAttribute('stroke-dashoffset', '283');
          
          setTimeout(() => {
            circle.style.transition = 'stroke-dashoffset 1s ease-out';
            circle.setAttribute('stroke-dashoffset', originalOffset);
          }, 200);
        }
      }, index * 200);
    });
  }
  
  // Utility: Wait for DOM ready
  domReady() {
    return new Promise(resolve => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
  }
  
  // Navigation Dropdown System
  initNavigationDropdown() {
    const dropdownTriggers = document.querySelectorAll('.navigation__link');
    let activeDropdown = null;
    let hideTimeout = null;
    
    dropdownTriggers.forEach(trigger => {
      const dropdown = trigger.parentElement.querySelector('.navigation__dropdown');
      if (!dropdown) return;
      
      // Show dropdown on hover
      trigger.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
        
        // Hide other dropdowns
        if (activeDropdown && activeDropdown !== dropdown) {
          this.hideDropdown(activeDropdown);
        }
        
        this.showDropdown(dropdown);
        activeDropdown = dropdown;
      });
      
      // Keep dropdown open when hovering over it
      dropdown.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
      });
      
      // Hide dropdown when leaving both trigger and dropdown
      [trigger, dropdown].forEach(element => {
        element.addEventListener('mouseleave', (e) => {
          clearTimeout(hideTimeout);
          hideTimeout = setTimeout(() => {
            if (!trigger.matches(':hover') && !dropdown.matches(':hover')) {
              this.hideDropdown(dropdown);
              activeDropdown = null;
            }
          }, 100);
        });
      });
      
      // Keyboard navigation
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (dropdown.classList.contains('dropdown--visible')) {
            this.hideDropdown(dropdown);
          } else {
            this.showDropdown(dropdown);
          }
        }
        if (e.key === 'Escape') {
          this.hideDropdown(dropdown);
          trigger.focus();
        }
      });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navigation__item')) {
        if (activeDropdown) {
          this.hideDropdown(activeDropdown);
          activeDropdown = null;
        }
      }
    });
  }
  
  showDropdown(dropdown) {
    dropdown.classList.add('dropdown--visible');
    dropdown.setAttribute('aria-hidden', 'false');
    
    // Add smooth animation
    dropdown.style.opacity = '0';
    dropdown.style.transform = 'translateY(-10px)';
    dropdown.style.visibility = 'visible';
    
    // Animate in
    requestAnimationFrame(() => {
      dropdown.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
      dropdown.style.opacity = '1';
      dropdown.style.transform = 'translateY(0)';
    });
  }
  
  hideDropdown(dropdown) {
    dropdown.style.transition = 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)';
    dropdown.style.opacity = '0';
    dropdown.style.transform = 'translateY(-5px)';
    
    setTimeout(() => {
      dropdown.classList.remove('dropdown--visible');
      dropdown.setAttribute('aria-hidden', 'true');
      dropdown.style.visibility = 'hidden';
    }, 150);
  }
  
  // Advanced Battery Selector
  initBatterySelector() {
    const selectorForm = document.querySelector('.selector-form');
    if (!selectorForm) return;
    
    const steps = selectorForm.querySelectorAll('.form-step');
    const nextBtn = selectorForm.querySelector('[data-action="next"]');
    const prevBtn = selectorForm.querySelector('[data-action="prev"]');
    const resultsContainer = document.querySelector('.selector-results');
    
    let currentStep = 0;
    let formData = new Map();
    
    // Initialize first step
    this.updateStepVisibility(steps, currentStep);
    
    // Next button handler
    nextBtn?.addEventListener('click', async () => {
      if (await this.validateCurrentStep(steps[currentStep], formData)) {
        currentStep++;
        
        if (currentStep < steps.length) {
          this.updateStepVisibility(steps, currentStep);
          this.updateStepButtons(nextBtn, prevBtn, currentStep, steps.length);
        } else {
          // Show results
          await this.showBatteryResults(formData, resultsContainer);
        }
      }
    });
    
    // Previous button handler
    prevBtn?.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        this.updateStepVisibility(steps, currentStep);
        this.updateStepButtons(nextBtn, prevBtn, currentStep, steps.length);
      }
    });
    
    // Radio button change handlers
    selectorForm.addEventListener('change', (e) => {
      if (e.target.type === 'radio') {
        formData.set(e.target.name, e.target.value);
        
        // Enable next button
        nextBtn.disabled = false;
        
        // Add visual feedback
        this.highlightSelectedOption(e.target);
      }
    });
  }
  
  updateStepVisibility(steps, currentStep) {
    steps.forEach((step, index) => {
      step.style.display = index === currentStep ? 'block' : 'none';
      
      if (index === currentStep) {
        // Animate in
        step.style.opacity = '0';
        step.style.transform = 'translateX(20px)';
        
        requestAnimationFrame(() => {
          step.style.transition = 'all 0.3s ease-out';
          step.style.opacity = '1';
          step.style.transform = 'translateX(0)';
        });
      }
    });
  }
  
  updateStepButtons(nextBtn, prevBtn, currentStep, totalSteps) {
    prevBtn.disabled = currentStep === 0;
    nextBtn.textContent = currentStep === totalSteps - 1 ? 'Find Batteries' : 'Next Step';
  }
  
  async validateCurrentStep(step, formData) {
    const radioInputs = step.querySelectorAll('input[type="radio"]');
    const radioName = radioInputs[0]?.name;
    
    if (radioName && !formData.has(radioName)) {
      // Show validation error
      this.showValidationError(step, 'Please select an option to continue');
      return false;
    }
    
    return true;
  }
  
  showValidationError(step, message) {
    // Remove existing error
    const existingError = step.querySelector('.validation-error');
    existingError?.remove();
    
    // Create error element
    const errorEl = document.createElement('div');
    errorEl.className = 'validation-error';
    errorEl.textContent = message;
    errorEl.style.cssText = `
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 1rem;
      padding: 0.5rem;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 0.375rem;
    `;
    
    step.appendChild(errorEl);
    
    // Auto-remove after 3 seconds
    setTimeout(() => errorEl.remove(), 3000);
  }
  
  highlightSelectedOption(input) {
    const parentContainer = input.closest('.form-step__options');
    const allOptions = parentContainer.querySelectorAll('.option-card__content');
    
    allOptions.forEach(option => {
      option.style.transform = 'scale(1)';
    });
    
    // Highlight selected
    const selectedOption = input.nextElementSibling;
    selectedOption.style.transform = 'scale(1.02)';
    
    // Animate other options
    allOptions.forEach(option => {
      if (option !== selectedOption) {
        option.style.opacity = '0.7';
        setTimeout(() => {
          option.style.opacity = '1';
        }, 200);
      }
    });
  }
  
  async showBatteryResults(formData, container) {
    if (!container) return;
    
    // Show loading state
    container.innerHTML = `
      <div class="results-loading">
        <div class="loading-spinner"></div>
        <p>Finding your perfect battery solution...</p>
      </div>
    `;
    
    container.style.display = 'block';
    
    // Simulate API call
    await this.delay(1500);
    
    // Generate results based on form data
    const results = this.generateBatteryRecommendations(formData);
    
    container.innerHTML = `
      <div class="battery-results">
        <h3 class="results-title">Recommended Battery Solutions</h3>
        <div class="results-grid">
          ${results.map(battery => this.createBatteryResultCard(battery)).join('')}
        </div>
        <div class="results-actions">
          <button class="button button--primary" onclick="this.contactSales()">
            Get Detailed Quote
          </button>
          <button class="button button--secondary" onclick="this.downloadSpecs()">
            Download Specifications
          </button>
        </div>
      </div>
    `;
    
    // Animate results in
    const resultsCards = container.querySelectorAll('.result-card');
    resultsCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.4s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }
  
  generateBatteryRecommendations(formData) {
    const application = formData.get('application');
    
    // Mock battery data based on application
    const batteryDatabase = {
      automotive: [
        {
          name: 'RX-EV Pro 400V',
          capacity: '75 kWh',
          voltage: '400V',
          chargingTime: '30 min (10-80%)',
          warranty: '8 years',
          price: '$12,500',
          match: 95
        },
        {
          name: 'RX-Hybrid Compact',
          capacity: '2.5 kWh',
          voltage: '300V',
          chargingTime: '45 min',
          warranty: '6 years',
          price: '$3,200',
          match: 88
        }
      ],
      industrial: [
        {
          name: 'RX-UPS Enterprise 50kW',
          capacity: '200 kWh',
          voltage: '480V',
          runtime: '4 hours',
          warranty: '10 years',
          price: '$45,000',
          match: 96
        },
        {
          name: 'RX-Backup Pro 25kW',
          capacity: '100 kWh',
          voltage: '240V',
          runtime: '2 hours',
          warranty: '8 years',
          price: '$22,000',
          match: 91
        }
      ],
      'energy-storage': [
        {
          name: 'RX-Grid Scale 1MW',
          capacity: '4 MWh',
          voltage: '1500V',
          efficiency: '94%',
          warranty: '20 years',
          price: '$850,000',
          match: 97
        }
      ]
    };
    
    return batteryDatabase[application] || [];
  }
  
  createBatteryResultCard(battery) {
    return `
      <div class="result-card" data-match="${battery.match}">
        <div class="result-card__header">
          <h4 class="result-card__name">${battery.name}</h4>
          <div class="result-card__match">${battery.match}% Match</div>
        </div>
        <div class="result-card__specs">
          <div class="spec-item">
            <span class="spec-label">Capacity:</span>
            <span class="spec-value">${battery.capacity}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Voltage:</span>
            <span class="spec-value">${battery.voltage}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Warranty:</span>
            <span class="spec-value">${battery.warranty}</span>
          </div>
        </div>
        <div class="result-card__price">
          <span class="price-label">Starting at</span>
          <span class="price-value">${battery.price}</span>
        </div>
        <div class="result-card__actions">
          <button class="button button--sm button--primary">
            Request Quote
          </button>
          <button class="button button--sm button--ghost">
            Learn More
          </button>
        </div>
      </div>
    `;
  }
  
  // Feature Tooltips System
  initFeatureTooltips() {
    const featureDots = document.querySelectorAll('.feature-dot');
    
    featureDots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Close other tooltips
        featureDots.forEach(otherDot => {
          if (otherDot !== dot) {
            this.hideTooltip(otherDot);
          }
        });
        
        // Toggle current tooltip
        this.toggleTooltip(dot);
      });
    });
    
    // Close tooltips when clicking outside
    document.addEventListener('click', () => {
      featureDots.forEach(dot => this.hideTooltip(dot));
    });
  }
  
  toggleTooltip(dot) {
    const tooltip = dot.querySelector('.feature-tooltip');
    const isVisible = tooltip.classList.contains('tooltip--visible');
    
    if (isVisible) {
      this.hideTooltip(dot);
    } else {
      this.showTooltip(dot);
    }
  }
  
  showTooltip(dot) {
    const tooltip = dot.querySelector('.feature-tooltip');
    tooltip.classList.add('tooltip--visible');
    
    // Add ripple effect
    this.createRipple(dot);
  }
  
  hideTooltip(dot) {
    const tooltip = dot.querySelector('.feature-tooltip');
    tooltip.classList.remove('tooltip--visible');
  }
  
  createRipple(element) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(0, 212, 255, 0.4);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      transform: translate(-50%, -50%);
    `;
    
    element.appendChild(ripple);
    
    // Animate ripple
    requestAnimationFrame(() => {
      ripple.style.width = '100px';
      ripple.style.height = '100px';
    });
    
    // Remove ripple after animation
    setTimeout(() => ripple.remove(), 600);
  }
  
  // Parallax Effects
  initParallaxEffects() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return; // Respect user preference for reduced motion
    }
    
    const parallaxElements = [
      { selector: '.hero__visual', speed: 0.5 },
      { selector: '.battery-3d__glow', speed: 0.3 },
      { selector: '.feature-dot', speed: 0.7 }
    ];
    
    let ticking = false;
    
    function updateParallax() {
      const scrolled = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      parallaxElements.forEach(({ selector, speed }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          const elementTop = element.getBoundingClientRect().top + scrolled;
          const elementVisible = elementTop < scrolled + windowHeight && elementTop + element.offsetHeight > scrolled;
          
          if (elementVisible) {
            const yPos = -(scrolled - elementTop) * speed;
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
          }
        });
      });
      
      ticking = false;
    }
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }
  
  // Advanced Animations
  initAdvancedAnimations() {
    // Magnetic hover effect for buttons
    const magneticElements = document.querySelectorAll('.button, .solution-card');
    
    magneticElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0)';
      });
    });
    
    // Reveal animations on scroll
    this.initScrollReveal();
  }
  
  initScrollReveal() {
    const revealElements = document.querySelectorAll('.solution-card, .stat, .section-header');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          
          // Stagger animation for grid items
          if (entry.target.parentElement.classList.contains('solutions__grid')) {
            const siblings = Array.from(entry.target.parentElement.children);
            const index = siblings.indexOf(entry.target);
            entry.target.style.animationDelay = `${index * 0.1}s`;
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
      element.classList.add('reveal-element');
      revealObserver.observe(element);
    });
    
    // Add reveal styles
    const style = document.createElement('style');
    style.textContent = `
      .reveal-element {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
      }
      
      .reveal-element.revealed {
        opacity: 1;
        transform: translateY(0);
      }
      
      .solutions__grid .reveal-element.revealed {
        animation: slideInUp 0.6s ease-out forwards;
      }
      
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(30px) scale(0.9);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Form Validation
  initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearFieldError(input));
      });
      
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmission(form);
      });
    });
  }
  
  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }
    
    // Email validation
    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }
    
    // Phone validation
    if (type === 'tel' && value) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }
    
    if (!isValid) {
      this.showFieldError(field, errorMessage);
    } else {
      this.clearFieldError(field);
    }
    
    return isValid;
  }
  
  showFieldError(field, message) {
    this.clearFieldError(field);
    
    field.classList.add('field--error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    `;
    
    field.parentElement.appendChild(errorElement);
  }
  
  clearFieldError(field) {
    field.classList.remove('field--error');
    const errorElement = field.parentElement.querySelector('.field-error');
    errorElement?.remove();
  }
  
  async handleFormSubmission(form) {
    // Validate all fields
    const inputs = form.querySelectorAll('input, textarea, select');
    let isFormValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });
    
    if (!isFormValid) {
      return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    try {
      // Simulate form submission
      await this.delay(2000);
      
      // Show success message
      this.showNotification('success', 'Message sent successfully! We\'ll get back to you soon.');
      form.reset();
      
    } catch (error) {
      this.showNotification('error', 'Failed to send message. Please try again.');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }
  
  // Performance Monitoring
  initPerformanceMonitoring() {
    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn(`Long task detected: ${entry.duration}ms`);
          }
        }
      });
      
      try {
        longTaskObserver.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        console.warn('Long task observer not supported');
      }
    }
    
    // Monitor memory usage
    if ('memory' in performance) {
      setInterval(() => {
        const memory = performance.memory;
        const memoryUsage = {
          used: Math.round(memory.usedJSHeapSize / 1048576),
          total: Math.round(memory.totalJSHeapSize / 1048576),
          limit: Math.round(memory.jsHeapSizeLimit / 1048576)
        };
        
        if (memoryUsage.used > memoryUsage.limit * 0.9) {
          console.warn('High memory usage detected:', memoryUsage);
        }
      }, 30000); // Check every 30 seconds
    }
  }
  
  // Accessibility Features
  initAccessibilityFeatures() {
    // Focus management
    this.initFocusManagement();
    
    // Keyboard navigation
    this.initKeyboardNavigation();
    
    // Screen reader announcements
    this.initAriaLiveRegions();
  }
  
  initFocusManagement() {
    // Ensure focus is visible
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });
    
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
    
    // Focus trap for mobile menu
    const mobileMenu = document.querySelector('.navigation');
    const focusableElements = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab' && mobileMenu.classList.contains('navigation--mobile-open')) {
        const focusableItems = mobileMenu.querySelectorAll(focusableElements);
        const firstItem = focusableItems[0];
        const lastItem = focusableItems[focusableItems.length - 1];
        
        if (e.shiftKey && document.activeElement === firstItem) {
          e.preventDefault();
          lastItem.focus();
        } else if (!e.shiftKey && document.activeElement === lastItem) {
          e.preventDefault();
          firstItem.focus();
        }
      }
    });
  }
  
  initKeyboardNavigation() {
    // Arrow key navigation for option cards
    const optionGroups = document.querySelectorAll('.form-step__options');
    
    optionGroups.forEach(group => {
      const options = group.querySelectorAll('.option-card');
      
      options.forEach((option, index) => {
        const input = option.querySelector('input');
        
        input.addEventListener('keydown', (e) => {
          let newIndex = index;
          
          switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
              e.preventDefault();
              newIndex = (index + 1) % options.length;
              break;
            case 'ArrowLeft':
            case 'ArrowUp':
              e.preventDefault();
              newIndex = (index - 1 + options.length) % options.length;
              break;
            case 'Enter':
            case ' ':
              e.preventDefault();
              input.checked = true;
              input.dispatchEvent(new Event('change', { bubbles: true }));
              break;
          }
          
          if (newIndex !== index) {
            options[newIndex].querySelector('input').focus();
          }
        });
      });
    });
  }
  
  initAriaLiveRegions() {
    // Create live regions for dynamic announcements
    const politeRegion = document.createElement('div');
    politeRegion.setAttribute('aria-live', 'polite');
    politeRegion.setAttribute('aria-atomic', 'true');
    politeRegion.className = 'sr-only';
    politeRegion.id = 'aria-live-polite';
    
    const assertiveRegion = document.createElement('div');
    assertiveRegion.setAttribute('aria-live', 'assertive');
    assertiveRegion.setAttribute('aria-atomic', 'true');
    assertiveRegion.className = 'sr-only';
    assertiveRegion.id = 'aria-live-assertive';
    
    document.body.appendChild(politeRegion);
    document.body.appendChild(assertiveRegion);
    
    // Export announcement function
    window.announceToScreenReader = (message, priority = 'polite') => {
      const region = document.getElementById(`aria-live-${priority}`);
      if (region) {
        region.textContent = message;
        setTimeout(() => region.textContent = '', 1000);
      }
    };
  }
  
  // Utility Functions
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
      <div class="notification__content">
        <div class="notification__icon">
          ${type === 'success' ? '✓' : '⚠'}
        </div>
        <div class="notification__message">${message}</div>
        <button class="notification__close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      padding: 1rem;
      background: ${type === 'success' ? '#10B981' : '#EF4444'};
      color: white;
      border-radius: 0.5rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-in';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Announce to screen readers
    if (window.announceToScreenReader) {
      window.announceToScreenReader(message, type === 'error' ? 'assertive' : 'polite');
    }
  }
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .notification__content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .notification__close {
    background: none;
    border: none;
    color: white;
    font-size: 1.25rem;
    cursor: pointer;
    padding: 0;
    margin-left: auto;
  }
  
  .keyboard-navigation :focus {
    outline: 2px solid #00D4FF;
    outline-offset: 2px;
  }
  
  .field--error {
    border-color: #ef4444 !important;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
  }
  
  .tooltip--visible {
    opacity: 1 !important;
    visibility: visible !important;
    transform: translateX(-50%) translateY(-5px) !important;
  }
  
  @keyframes ripple-animation {
    from {
      transform: translate(-50%, -50%) scale(0);
      opacity: 1;
    }
    to {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0;
    }
  }
`;
document.head.appendChild(notificationStyles);

// Initialize the application
const app = new RolexBatteries();

// Export for global access
window.RolexApp = app;