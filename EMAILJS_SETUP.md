# EmailJS Setup Guide

To enable real email sending from the contact form, you need to set up EmailJS. Follow these steps:

## 1. Sign up for EmailJS
Go to [https://www.emailjs.com/](https://www.emailjs.com/) and create a free account.

## 2. Create an Email Service
- Go to "Email Services" in your EmailJS dashboard
- Click "Add New Service"
- Choose your email provider (Gmail, Outlook, etc.)
- Follow the setup instructions for your provider
- Note down your **Service ID**

## 3. Create an Email Template
- Go to "Email Templates" in your EmailJS dashboard
- Click "Create New Template"
- Use this template content:

```html
Subject: New Contact Form Message from {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

- Note down your **Template ID**

## 4. Get Your Public Key
- Go to "Account" → "API Keys" in your EmailJS dashboard
- Copy your **Public Key**

## 5. Create Environment File
Create a `.env.local` file in your project root with:

```env
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
```

## 6. Test the Form
- Restart your development server
- Fill out and submit the contact form
- Check your email for the message

## Important Notes
- The `.env.local` file should never be committed to version control
- EmailJS free tier allows 200 emails per month
- For production, consider upgrading to a paid plan

## Troubleshooting
- Check the browser console for error messages
- Verify all environment variables are set correctly
- Ensure your email service is properly configured
- Check your EmailJS dashboard for any service issues
