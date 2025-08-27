from flask import render_template, request, flash, redirect, url_for
from flask_mail import Message
from app import app, mail
import logging

@app.route('/')
def index():
    """Homepage with SDLC visualization and company overview"""
    return render_template('index.html')

@app.route('/services')
def services():
    """Services page showcasing all offerings"""
    return render_template('services.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    """Contact page with form handling"""
    if request.method == 'POST':
        try:
            name = request.form.get('name')
            email = request.form.get('email')
            subject = request.form.get('subject')
            message_content = request.form.get('message')
            service_interest = request.form.get('service_interest')

            # Create email message
            msg = Message(
                subject=f"Get Dev Contact Form: {subject}",
                recipients=[app.config.get('MAIL_DEFAULT_SENDER', 'info@getdev.com')],
                body=f"""
New contact form submission from Get Dev website:

Name: {name}
Email: {email}
Service Interest: {service_interest}
Subject: {subject}

Message:
{message_content}
                """
            )

            # Send email
            mail.send(msg)
            flash('Thank you for your message! We\'ll get back to you soon.', 'success')
            return redirect(url_for('contact'))

        except Exception as e:
            logging.error(f"Error sending email: {str(e)}")
            flash('Sorry, there was an error sending your message. Please try again later.', 'error')

    return render_template('contact.html')

@app.route('/trainings')
def trainings():
    """Training programs page"""
    return render_template('trainings.html')

@app.route('/portfolio')
def portfolio():
    """Portfolio showcase page"""
    return render_template('portfolio.html')

@app.route('/ai')
def ai():
    """AI services and technical explanation page"""
    return render_template('ai.html')

@app.route('/blog')
def blog():
    return render_template('blog.html')

@app.errorhandler(404)
def not_found(error):
    """Custom 404 error page"""
    return render_template('base.html', error_message="Page not found!"), 404

@app.errorhandler(500)
def server_error(error):
    """Custom 500 error page"""
    return render_template('base.html', error_message="Internal server error!"), 500