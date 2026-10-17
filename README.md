# Gyan Rachana travel enquiry website

## Overview

Travel-service website with a PHP email enquiry handler. Flight, holiday, visa and group-tour pages collect leads for manual processing.

## System architecture and modules

- `flights.html`, `visa.html`, `packages.html` and `group-corporate-tours.html`: service pages.
- `enquiry.html` and `contact.html`: enquiry entry points.
- `send-mail.php`: POST-only handler with honeypot, input checks and email formatting.
- `js/script.js` and `css/`: shared browser UI.

## Tech stack

PHP, HTML5, CSS3 and JavaScript. No framework dependency manifest or SQL database is included.

## Local setup

Use a local PHP CLI installation. PHP mail delivery requires separate mail transport configuration; the development server does not provide SMTP.

```sh
git clone https://github.com/shreyasingh3005/gyanchandra.git
cd gyanchandra
php -S 127.0.0.1:8000
```

Open <http://127.0.0.1:8000/>. External fonts, icons, embeds and remote images still need Internet access where referenced by the HTML.

## Implementation notes

Configure mail recipients and sender headers in `send-mail.php` for the intended environment. Both mail-success and mail-failure branches return a success status. No airline API, visa-processing service, database or ticket-issuance workflow is included.

## Manual checks

Check desktop and mobile navigation, page links, image loading and browser console errors. Use synthetic form values. Inspect the intended request or message before submitting; do not send test enquiries to the configured business contacts.
