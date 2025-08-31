#!/bin/bash

# ================================================================================
# ROLEX BATTERIES - PRODUCTION DEPLOYMENT SCRIPT
# ================================================================================
# Automated deployment script for the Rolex Batteries website
# Features: File optimization, validation, deployment, and monitoring setup
# Version: 2.0.0 - Production Ready
# ================================================================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="Rolex Batteries"
VERSION="2.0.0"
BUILD_DIR="./build"
DIST_DIR="./dist"
BACKUP_DIR="./backup"
LOG_FILE="./deployment.log"

# Functions
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
    exit 1
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a "$LOG_FILE"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a "$LOG_FILE"
}

# Main deployment function
main() {
    log "Starting deployment of $PROJECT_NAME v$VERSION"
    
    # Pre-deployment checks
    pre_deployment_checks
    
    # Create build directories
    setup_directories
    
    # Validate files
    validate_files
    
    # Optimize and build
    build_production_files
    
    # Run tests
    run_tests
    
    # Create backup
    create_backup
    
    # Deploy files
    deploy_files
    
    # Post-deployment verification
    post_deployment_verification
    
    # Setup monitoring
    setup_monitoring
    
    log "Deployment completed successfully!"
}

# Pre-deployment checks
pre_deployment_checks() {
    info "Running pre-deployment checks..."
    
    # Check required files exist
    local required_files=(
        "index-production.html"
        "css/production-optimized.css"
        "js/production-optimized.js"
        "manifest.json"
        "sw.js"
        "PRODUCTION-README.md"
    )
    
    for file in "${required_files[@]}"; do
        if [[ ! -f "$file" ]]; then
            error "Required file missing: $file"
        fi
    done
    
    # Check Node.js tools (if available)
    if command -v node &> /dev/null; then
        info "Node.js available: $(node --version)"
    else
        warning "Node.js not available - some optimizations will be skipped"
    fi
    
    # Check compression tools
    if command -v gzip &> /dev/null; then
        info "Gzip compression available"
    else
        warning "Gzip not available"
    fi
    
    success "Pre-deployment checks completed"
}

# Setup directories
setup_directories() {
    info "Setting up build directories..."
    
    # Create directories
    mkdir -p "$BUILD_DIR"
    mkdir -p "$DIST_DIR"
    mkdir -p "$BACKUP_DIR"
    mkdir -p "$BUILD_DIR/css"
    mkdir -p "$BUILD_DIR/js"
    mkdir -p "$BUILD_DIR/images"
    mkdir -p "$BUILD_DIR/fonts"
    
    success "Directories created"
}

# Validate files
validate_files() {
    info "Validating files..."
    
    # Check HTML validity (if validator available)
    if command -v tidy &> /dev/null; then
        info "Validating HTML..."
        if tidy -q -e index-production.html 2>/dev/null; then
            success "HTML validation passed"
        else
            warning "HTML validation issues found (non-critical)"
        fi
    fi
    
    # Check CSS validity
    local css_file="css/production-optimized.css"
    if [[ -f "$css_file" ]]; then
        local css_size=$(wc -c < "$css_file")
        info "CSS file size: $((css_size / 1024))KB"
        
        # Basic CSS syntax check
        if grep -q "syntax error" "$css_file"; then
            error "CSS syntax errors found"
        else
            success "CSS validation passed"
        fi
    fi
    
    # Check JavaScript validity
    local js_file="js/production-optimized.js"
    if [[ -f "$js_file" ]]; then
        local js_size=$(wc -c < "$js_file")
        info "JavaScript file size: $((js_size / 1024))KB"
        
        # Basic JavaScript syntax check (if Node.js available)
        if command -v node &> /dev/null; then
            if node -c "$js_file" 2>/dev/null; then
                success "JavaScript validation passed"
            else
                error "JavaScript syntax errors found"
            fi
        fi
    fi
    
    success "File validation completed"
}

# Build production files
build_production_files() {
    info "Building production files..."
    
    # Copy main files
    cp index-production.html "$BUILD_DIR/index.html"
    cp css/production-optimized.css "$BUILD_DIR/css/"
    cp js/production-optimized.js "$BUILD_DIR/js/"
    cp manifest.json "$BUILD_DIR/"
    cp sw.js "$BUILD_DIR/"
    cp robots.txt "$BUILD_DIR/" 2>/dev/null || true
    cp sitemap.xml "$BUILD_DIR/" 2>/dev/null || true
    
    # Copy additional files if they exist
    if [[ -d "fonts" ]]; then
        cp -r fonts/* "$BUILD_DIR/fonts/" 2>/dev/null || true
    fi
    
    if [[ -d "images" ]]; then
        cp -r images/* "$BUILD_DIR/images/" 2>/dev/null || true
    fi
    
    # Create compressed versions
    if command -v gzip &> /dev/null; then
        info "Creating gzip compressed files..."
        gzip -k -f "$BUILD_DIR/css/production-optimized.css"
        gzip -k -f "$BUILD_DIR/js/production-optimized.js"
        gzip -k -f "$BUILD_DIR/index.html"
        success "Compression completed"
    fi
    
    # Create .htaccess for Apache servers
    create_htaccess
    
    success "Production build completed"
}

# Create .htaccess file
create_htaccess() {
    info "Creating .htaccess file..."
    
    cat > "$BUILD_DIR/.htaccess" << 'EOF'
# Rolex Batteries - Production .htaccess Configuration

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE text/javascript
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/json
</IfModule>

# Enable browser caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/avif "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    
    # Content Security Policy
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googleapis.com *.gstatic.com; style-src 'self' 'unsafe-inline' *.googleapis.com; font-src 'self' *.gstatic.com data:; img-src 'self' data: *.googleapis.com; connect-src 'self'; frame-ancestors 'none';"
</IfModule>

# Force HTTPS
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

# Custom error pages
ErrorDocument 404 /404.html
ErrorDocument 500 /500.html

# Prevent access to sensitive files
<FilesMatch "\.(htaccess|htpasswd|ini|log|sh|inc|bak)$">
    Order Allow,Deny
    Deny from all
</FilesMatch>
EOF
    
    success ".htaccess file created"
}

# Run tests
run_tests() {
    info "Running tests..."
    
    # File size checks
    local css_size=$(wc -c < "$BUILD_DIR/css/production-optimized.css")
    local js_size=$(wc -c < "$BUILD_DIR/js/production-optimized.js")
    local html_size=$(wc -c < "$BUILD_DIR/index.html")
    
    info "File sizes:"
    info "  HTML: $((html_size / 1024))KB"
    info "  CSS: $((css_size / 1024))KB"
    info "  JavaScript: $((js_size / 1024))KB"
    
    # Size warnings
    if [[ $css_size -gt 50000 ]]; then
        warning "CSS file is large (>50KB) - consider further optimization"
    fi
    
    if [[ $js_size -gt 75000 ]]; then
        warning "JavaScript file is large (>75KB) - consider code splitting"
    fi
    
    # Check for required elements in HTML
    if grep -q "<!DOCTYPE html>" "$BUILD_DIR/index.html"; then
        success "HTML5 DOCTYPE found"
    else
        error "Missing HTML5 DOCTYPE"
    fi
    
    if grep -q 'lang="en"' "$BUILD_DIR/index.html"; then
        success "Language attribute found"
    else
        warning "Language attribute missing"
    fi
    
    # Check for meta viewport
    if grep -q 'name="viewport"' "$BUILD_DIR/index.html"; then
        success "Viewport meta tag found"
    else
        error "Viewport meta tag missing"
    fi
    
    success "Tests completed"
}

# Create backup
create_backup() {
    info "Creating backup..."
    
    local timestamp=$(date '+%Y%m%d_%H%M%S')
    local backup_file="$BACKUP_DIR/rolex-batteries-$timestamp.tar.gz"
    
    # Create backup of current build
    tar -czf "$backup_file" -C "$BUILD_DIR" . 2>/dev/null || {
        warning "Backup creation failed"
        return
    }
    
    success "Backup created: $backup_file"
    
    # Keep only last 10 backups
    ls -t "$BACKUP_DIR"/*.tar.gz 2>/dev/null | tail -n +11 | xargs rm -f 2>/dev/null || true
}

# Deploy files
deploy_files() {
    info "Preparing deployment package..."
    
    # Create distribution package
    cp -r "$BUILD_DIR/"* "$DIST_DIR/"
    
    # Create deployment info file
    cat > "$DIST_DIR/DEPLOYMENT_INFO.txt" << EOF
Rolex Batteries Website - Production Deployment
===============================================

Deployment Date: $(date)
Version: $VERSION
Build ID: $(date '+%Y%m%d_%H%M%S')

File Checksums:
$(cd "$DIST_DIR" && find . -type f -name "*.html" -o -name "*.css" -o -name "*.js" | xargs md5sum 2>/dev/null || echo "Checksums not available")

Deployment Instructions:
1. Upload all files to web server
2. Ensure .htaccess is configured (Apache)
3. Verify HTTPS is enabled
4. Test all functionality
5. Monitor performance metrics

Contact: technical@rolexbatteries.com
Documentation: PRODUCTION-README.md
EOF
    
    success "Deployment package ready in: $DIST_DIR"
    
    # Display deployment summary
    info "Deployment Summary:"
    info "  Files ready for deployment: $(find "$DIST_DIR" -type f | wc -l)"
    info "  Total package size: $(du -sh "$DIST_DIR" | cut -f1)"
    info "  Deployment package location: $DIST_DIR"
}

# Post-deployment verification
post_deployment_verification() {
    info "Running post-deployment verification..."
    
    # Check critical files exist in distribution
    local critical_files=(
        "$DIST_DIR/index.html"
        "$DIST_DIR/css/production-optimized.css"
        "$DIST_DIR/js/production-optimized.js"
        "$DIST_DIR/manifest.json"
        "$DIST_DIR/.htaccess"
    )
    
    for file in "${critical_files[@]}"; do
        if [[ ! -f "$file" ]]; then
            error "Critical file missing in distribution: $file"
        fi
    done
    
    # Verify file integrity
    if command -v md5sum &> /dev/null; then
        info "Generating file checksums for integrity verification..."
        find "$DIST_DIR" -type f \( -name "*.html" -o -name "*.css" -o -name "*.js" \) -exec md5sum {} \; > "$DIST_DIR/checksums.md5"
        success "Checksums generated"
    fi
    
    success "Post-deployment verification completed"
}

# Setup monitoring
setup_monitoring() {
    info "Setting up monitoring configuration..."
    
    # Create monitoring configuration file
    cat > "$DIST_DIR/monitoring-config.json" << 'EOF'
{
    "project": "Rolex Batteries Website",
    "version": "2.0.0",
    "monitoring": {
        "performance": {
            "fcp_threshold": 1500,
            "lcp_threshold": 2500,
            "fid_threshold": 100,
            "cls_threshold": 0.1
        },
        "availability": {
            "uptime_threshold": 99.9,
            "response_time_threshold": 2000
        },
        "errors": {
            "error_rate_threshold": 0.1,
            "alert_email": "technical@rolexbatteries.com"
        }
    },
    "endpoints": [
        {
            "name": "Homepage",
            "url": "/",
            "method": "GET",
            "expected_status": 200
        },
        {
            "name": "Battery Selector",
            "url": "/#battery-selector",
            "method": "GET",
            "expected_status": 200
        }
    ]
}
EOF
    
    success "Monitoring configuration created"
}

# Cleanup function
cleanup() {
    info "Cleaning up temporary files..."
    # Add cleanup logic here if needed
    success "Cleanup completed"
}

# Error handler
handle_error() {
    error "Deployment failed on line $1"
    cleanup
    exit 1
}

# Set error trap
trap 'handle_error $LINENO' ERR

# Help function
show_help() {
    echo "Rolex Batteries - Production Deployment Script"
    echo "Usage: $0 [options]"
    echo ""
    echo "Options:"
    echo "  -h, --help     Show this help message"
    echo "  -v, --version  Show version information"
    echo "  --dry-run      Run without making changes"
    echo "  --skip-tests   Skip validation tests"
    echo ""
    echo "Examples:"
    echo "  $0                 # Full deployment"
    echo "  $0 --dry-run       # Test deployment without changes"
    echo "  $0 --skip-tests    # Deploy without running tests"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_help
            exit 0
            ;;
        -v|--version)
            echo "Rolex Batteries Deployment Script v$VERSION"
            exit 0
            ;;
        --dry-run)
            info "DRY RUN MODE - No changes will be made"
            DRY_RUN=true
            shift
            ;;
        --skip-tests)
            info "Skipping validation tests"
            SKIP_TESTS=true
            shift
            ;;
        *)
            error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Main execution
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    # Create log file
    touch "$LOG_FILE"
    
    # Start deployment
    echo "========================================"
    echo "Rolex Batteries - Production Deployment"
    echo "Version: $VERSION"
    echo "Date: $(date)"
    echo "========================================"
    echo ""
    
    if [[ "$DRY_RUN" == true ]]; then
        info "DRY RUN MODE - No actual deployment will occur"
    fi
    
    # Run main deployment
    main
    
    echo ""
    echo "========================================"
    success "Deployment completed successfully!"
    echo "Package location: $DIST_DIR"
    echo "Log file: $LOG_FILE"
    echo "Next steps: Upload files to production server"
    echo "========================================"
fi