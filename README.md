# Aurelle Perfumes — starter storefront

A responsive perfume storefront built with plain HTML, CSS and JavaScript. Designed to be easy to deploy to Netlify or a static-site host.

## Preview locally
Open `index.html` in a browser, or use the VS Code Live Server extension.

## Before publishing
1. Replace **Aurelle Perfumes** with your actual business name.
2. Replace sample product names, prices, descriptions and images in `index.html`.
3. In `script.js`, replace `91XXXXXXXXXX` with your WhatsApp number including country code and digits only, for example `919876543210`.
4. Replace `hello@example.com` with your business email.
5. Connect the newsletter form to an email service if you want to collect subscribers.
6. Add your actual shipping, return, privacy and terms policies.
7. Check that you have permission to use all product images and that all product claims are accurate.

## Deploy to Netlify
1. Create a GitHub repository and upload all files in this folder.
2. Sign in at https://app.netlify.com/.
3. Choose **Add new project** → **Import an existing project**.
4. Connect GitHub and select the repository.
5. Leave the build command empty and set the publish directory to the project root (or `.`).
6. Deploy.

## Current functionality
- Responsive layout for desktop and mobile
- Collection filters
- Add-to-bag, quantity controls, remove item and subtotal
- WhatsApp order message after you configure your number
- Newsletter demo interaction (not connected to a mailing list yet)

## Important limitations
This is a frontend starter/demo, not a complete production e-commerce backend. Cart contents are held in memory and reset when the page is refreshed. There is no online payment processing, inventory database, customer account system, or order management dashboard. Add a secure backend/payment provider before taking online payments.
