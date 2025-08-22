# Overview

Get Dev is an AI-powered development agency website built with Flask. The project showcases a modern, retro-themed portfolio site featuring comprehensive technology services including web development, mobile applications, AI solutions, cybersecurity, and training programs. The site includes service showcases, a contact form with email functionality, and an interactive user interface with a dark retro cartoon aesthetic.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Template Engine**: Jinja2 templating with Flask for server-side rendering
- **UI Framework**: Bootstrap 5 for responsive grid system and components
- **Styling**: Custom CSS with CSS variables for theming, Google Fonts (Orbitron and Share Tech Mono) for retro typography
- **JavaScript**: Vanilla JavaScript for interactive animations, scroll effects, and form handling
- **Theme**: Dark retro cartoon aesthetic with neon accents (cyan, pink, yellow, green)
- **Icons**: Font Awesome 6.4.0 for consistent iconography

## Backend Architecture
- **Framework**: Flask (Python) with modular route organization
- **Application Structure**: 
  - `app.py` - Main Flask application configuration and email setup
  - `routes.py` - Route handlers separated from main app for better organization
  - `main.py` - Application entry point
- **Email Service**: Flask-Mail integration with SMTP configuration for contact form submissions
- **Configuration**: Environment variable-based configuration for email settings and secrets
- **Error Handling**: Basic logging configuration for debugging and error tracking

## Page Structure
- **Homepage** (`index.html`) - Hero section with company overview and statistics
- **Services** (`services.html`) - Comprehensive service showcase with technology stacks
- **Contact** (`contact.html`) - Contact form with flash message feedback system
- **Additional Pages**: AI solutions, portfolio, and training programs templates

## Design Patterns
- **Template Inheritance**: Base template (`base.html`) with consistent navigation and layout
- **Component Reusability**: Modular CSS classes and consistent styling patterns
- **Progressive Enhancement**: JavaScript animations that enhance but don't break core functionality
- **Mobile-First**: Responsive design with Bootstrap grid system

# External Dependencies

## Core Framework Dependencies
- **Flask**: Web framework for Python
- **Flask-Mail**: Email integration for contact form functionality

## Frontend CDN Dependencies
- **Bootstrap 5.3.0**: CSS framework for responsive design
- **Font Awesome 6.4.0**: Icon library
- **Google Fonts**: Orbitron and Share Tech Mono fonts for retro theming

## Email Service Integration
- **SMTP Configuration**: Gmail SMTP (configurable) for email delivery
- **Environment Variables Required**:
  - `MAIL_SERVER` - SMTP server address
  - `MAIL_PORT` - SMTP port
  - `MAIL_USERNAME` - Email account username
  - `MAIL_PASSWORD` - Email account password
  - `MAIL_DEFAULT_SENDER` - Default sender email address
  - `SESSION_SECRET` - Flask session secret key

## Hosting Requirements
- **Python 3.x** runtime environment
- **SMTP Access** for email functionality
- **Static File Serving** for CSS, JavaScript, and image assets