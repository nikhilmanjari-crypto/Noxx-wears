# NOXERA static store

This is a no-build static website for GitHub Pages. It uses only `index.html`, `styles.css`, and `script.js` at runtime. The site is client-side only; cart state uses `localStorage` and checkout opens WhatsApp.

## Current product/photo status

- The first five items use the exact links and the NOXERA selling prices you supplied. Their listing names could be resolved from the short-link redirects, but the exact photos for those short-link variants could not be retrieved reliably here. They intentionally show a `PHOTO PENDING` tile instead of an unrelated photo.
- Additional product names, individual Flipkart listing links, and reference purchase prices were collected from Flipkart listing pages. Prices can change. Each additional retail price is calculated in `script.js` as `purchasePrice + 300`.
- Some listing pages were rate-limited while opening or their first returned image did not match the item name/variant. These are marked in `script.js` with `verificationPending: true` and/or `photoPending: true`. Confirm these items before publishing them as live stock.
- Not every size or colour has been verified as currently available. The size buttons let customers submit a requested size; the site does not claim that size is in stock. Availability and delivery charges must be confirmed on WhatsApp.
- In this snapshot, 20 products have an image URL and 21 use the clearly labelled `PHOTO PENDING` fallback. Six additional listings are marked `verificationPending: true` and show `Listing check pending`; review those listings before treating them as orderable stock.

## Replace a product photo

1. Open `script.js` in GitHub.
2. Find a product by its `id` or `name`.
3. Replace its `image: ''` with the direct image URL for that exact product listing, for example `image: 'https://example.com/exact-product-photo.jpg'`.
4. Do not copy the photo URL from a different product. If you cannot verify the match, keep `image: ''` so the card clearly says `PHOTO PENDING`.

Image URLs are hot-linked from Flipkart's image host for the product images that were retrievable. A source image may stop working or change over time. For long-term reliability, use photos you own/have permission to use and keep them inside this repository, then set `image: 'images/your-photo.jpg'`.

## Change selling prices

- The first five supplied products have `fixedPrice`. Keep those at ₹499, ₹499, ₹799, ₹499 and ₹499 unless you explicitly decide to change them.
- For additional products, change `purchasePrice` to the latest verified Flipkart purchase price; the displayed NOXERA retail price updates automatically to `purchasePrice + MARKUP`.
- `MARKUP` is set to `300`. It is a target markup, not guaranteed net profit.
- Supplier/reference purchase prices are not shown in the product UI. Important: because GitHub Pages is static, anyone can inspect `script.js` and see those reference costs; hiding them from source code would require a backend or a different data design.

## WhatsApp order flow

The number is set to `918795868347`. WhatsApp checkout pre-fills item name, requested size, quantity, NOXERA selling price, line total, source link, image URL where available, subtotal, and a request to confirm availability, delivery charges, and final payment details. Click-to-chat cannot attach a binary photo automatically; it only places the image URL in the text. No COD, payment gateway, payment collection, or payment-success claim is included.

## Deploy from an Android phone

**Files to upload:** `index.html`, `styles.css`, and `script.js`. `README.md` is for your reference and does not need to be on the live site.

1. Download `noxera-store.zip` and extract it in your phone's Files app. Or download the three files individually.
2. Sign in to GitHub and create a new repository named `noxera-store` (or another name you prefer).
3. Open the repository. Tap **Add file → Upload files** and choose `index.html`, `styles.css`, and `script.js` from the extracted folder. If the mobile app doesn't offer file upload, open GitHub in your phone browser and use the repository website. Keep the three files at the repository root; don't put them inside a nested `noxera-store` folder.
4. Tap **Commit changes**.
5. In the repository, open **Settings → Pages**.
6. Under **Build and deployment**, choose **Deploy from a branch**. Select branch `main` and folder `/ (root)`, then tap **Save**.
7. Open the Pages URL when GitHub shows it. It normally looks like `https://YOUR-USERNAME.github.io/noxera-store/`.
8. On your phone, check the images, search, category filters, sorting, product details, size selection, add/remove/quantity, refresh persistence, and WhatsApp checkout. Use a test order; do not actually pay. Make sure the WhatsApp message has the right product, size and amount.
9. To update the site later, upload/replace the same files and commit the changes. GitHub Pages redeploys automatically.

## QA scope and current limitations

- The supplied files were checked for JavaScript syntax with `node --check script.js`, product IDs, fixed prices, retail markup calculations, category sizes, source URLs, and matching local file references.
- A live browser-interaction run could not be completed in this delivery environment because its managed browser blocks local file and local web URLs. Please perform the browser checklist in step 7 after publishing; do not treat that as a payment or real-order test.
- Flipkart can change listing prices, photo URLs, variants, and stock after review. Items marked `verificationPending: true` need a fresh listing check before publishing them as immediately orderable. Photo-pending cards are intentional and will not display an unrelated item photo.
