# Nyota Digital Lookbook: Generation Specification

## 1. The Design Logic
- **Format:** A4 Landscape PDF (Dynamic Generation via Puppeteer/jspdf).
- **Aesthetic:** Minimalist, high-contrast, wide margins.
- **Dynamic Insertion:** The PDF must swap pages based on the `userIntent` captured in the Discovery Form.

## 2. Page Architecture
- **Page 1: The Personal Briefing.** (Headline: "A Foundation for [User Name]").
- **Page 2: The Intent Edit.** (Contextual copy based on 'Restorative', 'Cultural', or 'Adventurous' pulses).
- **Page 3: The Sanctuary Pair.** (Displays the two curated lodges from the user's primary selected Story).
- **Page 4: The Nairobi Protocol (Global Grab).** - *If 'Shopping' or 'Gear' intent is true:* Show the Personal Shopping & Tech Import menu.
    - *If false:* Show the Private Charter and Logistics Ease summary.
- **Page 5: The Architect's Invitation.** (Call to Action: Schedule a 15-minute Private Briefing via Calendly/WhatsApp).

## 3. Delivery Protocol
- **T+120s:** Send email via Resend with the PDF link.
- **T+4h:** Trigger a personalized WhatsApp greeting via Twilio API.