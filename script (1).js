/*
  NOXERA — static storefront
  Product source prices and image URLs are kept here for easy editing.
  CUSTOMER-FACING PRICE RULE: supplied five products use fixedPrice; every new verified product uses purchasePrice + MARKUP.
  Blank image values intentionally show a PHOTO PENDING placeholder. Never substitute an unrelated product photo.
*/
(() => {
  'use strict';

  const WHATSAPP_NUMBER = '918795868347';
  const CONTACT_EMAIL = 'nikhil.manjari@gmail.com';
  const MARKUP = 300;
  const STORAGE_KEY = 'noxera-cart-v1';
  const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  const rawProducts = [
    // Five products and selling prices supplied by the brand owner. Their product photos are pending because the exact short-link listing images could not be reliably captured.
    {id:'nx-001', name:'Woops Studio Graphic Print Men Crew Neck Black T-Shirt', category:'T-shirts', fixedPrice:499, purchasePrice:null, source:'https://dl.flipkart.com/s/Hnk_KouuuN', image:'', description:'Graphic print crew-neck T-shirt. Owner-specified NOXERA selling price.', photoPending:true, supplied:true, sizes:['S','L','XL','XXL']},
    {id:'nx-002', name:'Woops Studio Printed Men Round Neck Black Red T-Shirt', category:'T-shirts', fixedPrice:499, purchasePrice:null, source:'https://dl.flipkart.com/s/rKIyKWNNNN', image:'', description:'Printed black and red round-neck T-shirt. Owner-specified NOXERA selling price.', photoPending:true, supplied:true, sizes:['S','L','XL','XXL']},
    {id:'nx-003', name:'Maniac Colorblock Men Polo Neck Pink T-Shirt', category:'T-shirts', fixedPrice:799, purchasePrice:null, source:'https://dl.flipkart.com/s/rK10rdNNNN', image:'', description:'Colorblock polo-neck T-shirt. Owner-specified NOXERA selling price.', photoPending:true, supplied:true, sizes:['S','L','XL','XXL']},
    {id:'nx-004', name:'Leotude Printed Men Round Neck Grey T-Shirt', category:'T-shirts', fixedPrice:499, purchasePrice:null, source:'https://dl.flipkart.com/s/rK6RQTNNNN', image:'', description:'Printed grey round-neck T-shirt. Owner-specified NOXERA selling price.', photoPending:true, supplied:true, sizes:['S','L','XL','XXL']},
    {id:'nx-005', name:'Leotude Printed Men Round Neck Brown T-Shirt', category:'T-shirts', fixedPrice:499, purchasePrice:null, source:'https://dl.flipkart.com/s/H29YqNuuuN', image:'', description:'Printed brown round-neck T-shirt. Owner-specified NOXERA selling price.', photoPending:true, supplied:true, sizes:['S','L','XL','XXL']},

    // Additional Flipkart listings. Purchase prices are reference prices seen during research; they can change. Every display price is calculated as purchasePrice + ₹300.
    {id:'tee-006', name:'Force Printed White & Dark Green T-Shirt', category:'T-shirts', purchasePrice:247, source:'https://www.flipkart.com/force-printed-men-round-neck-white-dark-green-t-shirt/p/itmf1bb70265773a', image:'https://rukminim2.flixcart.com/image/480/640/xif0q/t-shirt/y/r/h/xl-fmt560-tree-wt-force-original-imahmb4kbcbzha8t.jpeg?q=20', description:'Printed cotton-blend round-neck tee in white and dark green.', sizes:['S','L','XL','XXL']},
    {id:'tee-007', name:'RPIRT Printed Grey Round-Neck T-Shirt', category:'T-shirts', purchasePrice:247, source:'https://www.flipkart.com/rpirt-printed-men-round-neck-grey-t-shirt/p/itmc5b9529c311e7', image:'https://rukminim2.flixcart.com/image/480/640/xif0q/t-shirt/x/g/z/xl-rdgy-overrn-t1-rpirt-original-imahza2mtyu7pfb4.jpeg?q=20', description:'Relaxed grey printed round-neck tee.', sizes:['S','L','XL','XXL']},
    {id:'tee-008', name:'Greyscale Solid Beige T-Shirt', category:'T-shirts', purchasePrice:197, source:'https://www.flipkart.com/greyscale-solid-men-round-neck-beige-t-shirt/p/itm5ffce06714004', image:'https://rukminim2.flixcart.com/image/480/640/xif0q/t-shirt/e/q/h/s-gsovcrm-greyscale-original-imahqmfc8zuxwpgg.jpeg?q=20', description:'Minimal solid beige round-neck tee.', sizes:['S','L','XL','XXL']},
    {id:'tee-009', name:'tripster Graphic Print Light Green T-Shirt', category:'T-shirts', purchasePrice:210, source:'https://www.flipkart.com/tripster-graphic-print-men-round-neck-light-green-t-shirt/p/itm5be93ec579fd7', image:'', description:'Graphic-print round-neck tee. Photo is pending to avoid showing a potentially mismatched variant.', photoPending:true, sizes:['S','L','XL','XXL']},
    {id:'tee-010', name:'HipHopTrends Printed Black T-Shirt', category:'T-shirts', purchasePrice:180, source:'https://www.flipkart.com/hiphoptrends-printed-men-round-neck-black-t-shirt/p/itmb635a625a074c', image:'https://rukminim2.flixcart.com/image/480/640/xif0q/t-shirt/5/u/r/s-fkt-ost-no-girls-blk-s-hiphoptrends-original-imahpggxt64xf7bd.jpeg?q=20', description:'Black printed round-neck T-shirt.', sizes:['S','L','XL','XXL']},
    {id:'tee-011', name:'Leotude Printed Purple T-Shirt', category:'T-shirts', purchasePrice:265, source:'https://www.flipkart.com/leotude-printed-men-round-neck-purple-t-shirt/p/itm6f26d803338f1', image:'https://rukminim2.flixcart.com/image/480/640/xif0q/t-shirt/n/m/r/m-fs49-purple-chill-leotude-original-imahj7q9zhqbkxzv.jpeg?q=20', description:'Purple printed cotton-blend round-neck tee.', sizes:['S','L','XL','XXL']},
    {id:'tee-012', name:'Try This Colorblock Brown Zip-Neck T-Shirt', category:'T-shirts', purchasePrice:314, source:'https://www.flipkart.com/try-colorblock-men-zip-neck-brown-t-shirt/p/itm0e61783662b14', image:'https://rukminim2.flixcart.com/image/480/640/xif0q/t-shirt/1/e/z/l-l1m9o08ikc-try-this-resized-original-imahk7fb7uampguq.jpeg?q=20', description:'Brown colorblock cotton-blend zip-neck tee.', sizes:['S','L','XL','XXL']},
    {id:'tee-013', name:'HIPHOPFASHION Self-Design Black T-Shirt', category:'T-shirts', purchasePrice:208, source:'https://www.flipkart.com/hiphopfashion-self-design-men-round-neck-black-t-shirt/p/itm6105e2ce2dc83', image:'', description:'Black self-design round-neck tee. Photo pending: retrieved image did not match the listing reliably.', photoPending:true, sizes:['S','L','XL','XXL']},
    {id:'tee-014', name:'Woops studio! Printed Multicolor T-Shirt', category:'T-shirts', purchasePrice:330, source:'https://www.flipkart.com/woops-studio-printed-men-round-neck-multicolor-t-shirt/p/itm305f2b7fb6b19', image:'', description:'Printed round-neck T-shirt. Photo pending: retrieved image did not match the listing reliably.', photoPending:true, sizes:['S','L','XL','XXL']},
    {id:'tee-015', name:'Force Printed Reversible Grey Zip-Neck T-Shirt', category:'T-shirts', purchasePrice:298, source:'https://www.flipkart.com/force-printed-men-zip-neck-reversible-grey-t-shirt/p/itma424afedfad60', image:'https://rukminim2.flixcart.com/image/480/640/xif0q/t-shirt/1/1/z/s-fmt584-g-ziper-gry-force-resized-original-imahnyr7j3rmjhf7.jpeg?q=20', description:'Grey printed reversible zip-neck tee.', sizes:['S','L','XL','XXL']},
    {id:'tee-016', name:'Dazzle Fashion Graphic Print Red T-Shirt', category:'T-shirts', purchasePrice:216, source:'https://www.flipkart.com/dazzle-fashion-graphic-print-men-round-neck-red-t-shirt/p/itmec4b6ac86016d', image:'', description:'Graphic print round-neck tee. Source product page was rate-limited while checking the photo; confirm listing/image before publishing.', photoPending:true, verificationPending:true, sizes:['S','L','XL','XXL']},
    {id:'tee-017', name:'Force Printed Reversible Light Blue Zip-Neck T-Shirt', category:'T-shirts', purchasePrice:325, source:'https://www.flipkart.com/force-printed-men-zip-neck-reversible-light-blue-t-shirt/p/itm8cd851ac5329c', image:'', description:'Reversible light-blue zip-neck tee. Source page was rate-limited while checking the photo; confirm listing/image before publishing.', photoPending:true, verificationPending:true, sizes:['S','L','XL','XXL']},

    {id:'den-018', name:'RKDENIM Wide-Leg Black Jeans', category:'Jeans', purchasePrice:408, source:'https://www.flipkart.com/rkdenim-wide-leg-men-black-jeans/p/itm5da393b7104cf', image:'https://rukminim2.flixcart.com/image/480/640/xif0q/jean/k/9/7/34-rkdenim-st-h6-34-rk-denim-original-imahm9pr7w4gzxvr.jpeg?q=20', description:'Wide-leg mid-rise black denim.', sizes:['28','30','32','34']},
    {id:'den-019', name:'Yagan Baggy-Fit Black Jeans', category:'Jeans', purchasePrice:743, source:'https://www.flipkart.com/yagan-baggy-fit-men-black-jeans/p/itmef666b517909c', image:'', description:'Baggy-fit black denim. Photo pending because the retrieved image appeared to belong to a different listing.', photoPending:true, sizes:['28','30','32','34']},
    {id:'den-020', name:'BLAKSMOKY Relaxed-Fit Grey Jeans', category:'Jeans', purchasePrice:448, source:'https://www.flipkart.com/blaksmoky-relaxed-fit-men-grey-jeans/p/itm2da6b33f27eca', image:'', description:'Relaxed-fit grey denim. Photo pending because the retrieved image appeared to belong to a different listing.', photoPending:true, sizes:['28','30','32','34']},
    {id:'den-021', name:'LEVORCE Loose-Fit Light Blue Jeans', category:'Jeans', purchasePrice:478, source:'https://www.flipkart.com/levorce-loose-fit-men-light-blue-jeans/p/itmafc8546b0c9e4', image:'', description:'Loose-fit light-blue denim. Photo pending because the retrieved image could not be matched confidently.', photoPending:true, sizes:['28','30','32','34']},
    {id:'den-022', name:'DENIM DUCH Loose-Fit White Jeans', category:'Jeans', purchasePrice:378, source:'https://www.flipkart.com/denim-duch-loose-fit-men-white-jeans/p/itm7996294bc26cd', image:'https://rukminim2.flixcart.com/image/480/640/xif0q/jean/r/p/n/32-duch-loose-fit-white-denim-duch-original-imahzzdfgypyfyca.jpeg?q=20', description:'Loose-fit white denim.', sizes:['28','30','32','34']},
    {id:'den-023', name:'AJJ Baggy-Fit Black Jeans', category:'Jeans', purchasePrice:445, source:'https://www.flipkart.com/ajj-baggy-fit-men-black-jeans/p/itmc864cf2bfd801', image:'https://rukminim2.flixcart.com/image/480/640/xif0q/jean/x/e/v/34-ajjeans-m-ajj-original-imahzy6bbsukwrqc.jpeg?q=20', description:'Baggy-fit mid-rise black jeans.', sizes:['28','30','32','34']},
    {id:'den-024', name:'AzureAttire Straight-Fit Black Jeans', category:'Jeans', purchasePrice:383, source:'https://www.flipkart.com/azureattire-straight-fit-men-black-jeans/p/itm376b7e43a78e4', image:'https://rukminim2.flixcart.com/image/480/640/xif0q/jean/r/a/2/34-xp-102-azureattire-original-imahzfcpg6zmh9zk.jpeg?q=20', description:'Straight-fit mid-rise black jeans.', sizes:['28','30','32','34']},
    {id:'den-025', name:'JAARA Straight-Fit Light Blue Jeans', category:'Jeans', purchasePrice:395, source:'https://www.flipkart.com/jaara-straight-fit-men-light-blue-jeans/p/itm1a98619c6ebd3', image:'https://rukminim2.flixcart.com/image/480/640/xif0q/jean/e/l/k/30-jr-ice-blu-bagy-6a-jaara-resized-original-imahhk2svzzawdy4.jpeg?q=20', description:'Straight-fit light-blue denim.', sizes:['28','30','32','34']},
    {id:'den-026', name:'DASHING FIT Loose-Fit Beige Jeans', category:'Jeans', purchasePrice:448, source:'https://www.flipkart.com/dashing-fit-loose-men-beige-jeans/p/itm8112c1f0f41fb', image:'https://rukminim2.flixcart.com/image/480/640/xif0q/jean/p/4/s/26-men-loose-fit-cream-jeans-tugu-dashing-fit-original-imahmrgspzq4wrqn.jpeg?q=20', description:'Loose-fit beige denim.', sizes:['28','30','32','34']},
    {id:'den-027', name:'ZAYSH Loose-Fit Light Blue Jeans', category:'Jeans', purchasePrice:450, source:'https://www.flipkart.com/zaysh-loose-fit-men-light-blue-jeans/p/itma85e08fe41d1c', image:'', description:'Loose-fit light-blue denim. Photo pending because the retrieved image could not be matched confidently.', photoPending:true, sizes:['28','30','32','34']},

    {id:'hood-029', name:'WROGN Solid Hooded Sweatshirt', category:'Hoodies', purchasePrice:839, source:'https://www.flipkart.com/wrogn-full-sleeve-solid-men-sweatshirt/p/itm043262be4abe6', image:'', description:'Full-sleeve solid hooded sweatshirt. Source page was rate-limited; the photo is pending final verification.', photoPending:true, verificationPending:true, sizes:['S','L','XL','XXL']},
    {id:'hood-030', name:'URVCREATION Graphic Reversible Hooded Sweatshirt', category:'Hoodies', purchasePrice:369, source:'https://www.flipkart.com/urvcreation-full-sleeve-graphic-print-men-reversible-sweatshirt/p/itm3428ec8204177', image:'https://rukminim2.flixcart.com/image/480/640/xif0q/sweatshirt/4/z/1/s-beast-car-001-urvcreation-original-imahqffqudgcwzgc.jpeg?q=20', description:'Light-blue graphic-print reversible hoodie.', sizes:['S','L','XL','XXL']},
    {id:'hood-031', name:'BubbleTwyst Solid Hooded Sweatshirt', category:'Hoodies', purchasePrice:267, source:'https://www.flipkart.com/bubbletwyst-full-sleeve-solid-men-sweatshirt/p/itmae2ed97136d0c', image:'', description:'Solid full-sleeve hooded sweatshirt. The retrieved image could not be matched confidently; photo pending.', photoPending:true, sizes:['S','L','XL','XXL']},
    {id:'hood-032', name:'WOOSTRO Graphic-Print Hooded Sweatshirt', category:'Hoodies', purchasePrice:469, source:'https://www.flipkart.com/woostro-full-sleeve-graphic-print-men-sweatshirt/p/itm58e3f39305d3d', image:'https://rukminim2.flixcart.com/image/480/640/xif0q/sweatshirt/d/j/k/xl-rs29h-front-98-navy-sl-woostro-original-imagwfrfhywn8zsz.jpeg?q=20', description:'Navy graphic-print hooded sweatshirt.', sizes:['S','L','XL','XXL']},
    {id:'hood-033', name:'BEING WANTED Printed Hooded Sweatshirt', category:'Hoodies', purchasePrice:338, source:'https://www.flipkart.com/being-wanted-full-sleeve-printed-men-sweatshirt/p/itmf5f4bc3ff589f', image:'https://rukminim2.flixcart.com/image/480/640/xif0q/sweatshirt/w/0/h/xxl-bw-hd-wanted-sweater-teal-being-wanted-resized-original-imahbj89zfnxhzgs.jpeg?q=20', description:'Full-sleeve printed hooded sweatshirt.', sizes:['S','L','XL','XXL']},
    {id:'hood-034', name:'R.A. Garments Graphic Reversible Sweatshirt', category:'Hoodies', purchasePrice:555, source:'https://www.flipkart.com/r-a-garments-full-sleeve-graphic-print-men-reversible-sweatshirt/p/itmafdc1e401d454', image:'https://rukminim2.flixcart.com/image/480/640/xif0q/sweatshirt/w/h/m/s-redferr-ho-b-r-a-garments-original-imahh78h9cpzkys5.jpeg?q=20', description:'Graphic-print reversible sweatshirt.', sizes:['S','L','XL','XXL']},
    {id:'hood-035', name:'Riddan Graphic-Print Hooded Sweatshirt', category:'Hoodies', purchasePrice:361, source:'https://www.flipkart.com/riddan-full-sleeve-graphic-print-men-sweatshirt/p/itm30caa8df1fbe9', image:'', description:'Graphic-print sweatshirt. Photo pending because the retrieved image did not match the listing reliably.', photoPending:true, sizes:['S','L','XL','XXL']},
    {id:'hood-036', name:'Else & What Solid Hooded Sweatshirt', category:'Hoodies', purchasePrice:403, source:'https://www.flipkart.com/else-full-sleeve-solid-men-sweatshirt/p/itmcca24273fd195', image:'https://rukminim2.flixcart.com/image/480/640/xif0q/sweatshirt/r/n/z/-original-imahg5z5vejrubab.jpeg?q=20', description:'Solid hooded sweatshirt.', sizes:['S','L','XL','XXL']},
    {id:'hood-037', name:'YUGAKNITFASHION Solid Hooded Sweatshirt', category:'Hoodies', purchasePrice:339, source:'https://www.flipkart.com/yugaknitfashion-full-sleeve-solid-men-sweatshirt/p/itm5bb714e62e669', image:'https://rukminim2.flixcart.com/image/480/640/xif0q/sweatshirt/z/x/w/xl-yuga-mns-swt-plain-dp1-blk-yugaknitfashion-original-imahp8f8bhckvuy4.jpeg?q=20', description:'Black solid full-sleeve hooded sweatshirt.', sizes:['S','L','XL','XXL']},
    {id:'hood-038', name:'HIGHLANDER Solid Hooded Sweatshirt', category:'Hoodies', purchasePrice:461, source:'https://www.flipkart.com/highlander-full-sleeve-solid-men-sweatshirt/p/itm0b94c9217c72b', image:'', description:'Solid full-sleeve hooded sweatshirt. The retrieved image was not the correct product photo; photo pending.', photoPending:true, sizes:['S','L','XL','XXL']},
    {id:'hood-039', name:'Indian Terrain Solid Hooded Sweatshirt', category:'Hoodies', purchasePrice:599, source:'https://www.flipkart.com/indian-terrain-full-sleeve-solid-men-sweatshirt/p/itmc3cd3da17bb96', image:'', description:'Solid hooded sweatshirt. The source product page was rate-limited while checking the image; confirm listing/photo before publishing.', photoPending:true, verificationPending:true, sizes:['S','L','XL','XXL']},

    {id:'cargo-040', name:'POSHAX Cargo Pants', category:'Cargos', purchasePrice:384, source:'https://www.flipkart.com/poshax-men-cargos/p/itm775f554cb6743', image:'', description:'Cargo trousers. A listing variant showed unavailable for one selected colour, so confirm colour and waist availability before purchase.', photoPending:true, sizes:['28','30','32','34','36'], verificationPending:true},
    {id:'cargo-041', name:'tiptoup Cargo Pants', category:'Cargos', purchasePrice:208, source:'https://www.flipkart.com/tiptoup-men-cargos/p/itm5262457d6914d', image:'https://rukminim2.flixcart.com/image/480/640/xif0q/cargo/c/f/t/30-attrective-army-men-cargo-with-5pockets-tiptoup-resized-original-imahguggsggdyh7f.jpeg?q=20', description:'Olive camouflage cargo trousers.', sizes:['28','30','32','34','36']},
    {id:'cargo-042', name:'Plus91 Cargo Pants', category:'Cargos', purchasePrice:442, source:'https://www.flipkart.com/plus91-men-cargos/p/itmd20367dc6c69d', image:'', description:'Cargo trousers. Source page was rate-limited while checking details/photo; confirm this listing before publishing.', photoPending:true, verificationPending:true, sizes:['28','30','32','34','36']}
  ];

  const PRODUCTS = rawProducts.map((p) => ({
    ...p,
    price: Number.isFinite(p.fixedPrice) ? p.fixedPrice : p.purchasePrice + MARKUP,
    photoPending: p.photoPending === true || !p.image,
    // listing status is about research completeness only; customer sees availability confirmation wording, never supplier price
    verificationPending: p.verificationPending === true
  }));
  // Expose a read-only-ish debug copy to simplify manual browser-console QA and later editing.
  window.NOXERA_CATALOG = PRODUCTS;
  window.NOXERA_MARKUP = MARKUP;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const productGrid = $('#productGrid');
  const productSearch = $('#productSearch');
  const sortProducts = $('#sortProducts');
  const categoryFilters = $('#categoryFilters');
  const resultsCount = $('#resultsCount');
  const noResults = $('#noResults');
  const cartDrawer = $('#cartDrawer');
  const scrim = $('#scrim');
  const cartItems = $('#cartItems');
  const cartEmpty = $('#cartEmpty');
  const cartFooter = $('#cartFooter');
  const modalLayer = $('#productModal');
  const modalDialog = $('.product-modal', modalLayer);
  const toast = $('#toast');

  let activeCategory = 'All';
  let selectedProductId = null;
  let selectedSize = '';
  let lastFocusedElement = null;
  let toastTimer = null;
  let cart = loadCart();

  function loadCart() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (!Array.isArray(saved)) return [];
      return saved.filter((item) => item && typeof item.productId === 'string' && typeof item.size === 'string')
        .map((item) => ({ productId: item.productId, size: item.size, quantity: clampQuantity(item.quantity) }))
        .filter((item) => PRODUCTS.some((product) => product.id === item.productId));
    } catch (error) {
      console.warn('NOXERA cart could not be restored; starting with an empty bag.', error);
      return [];
    }
  }

  function clampQuantity(value) {
    const quantity = Number.parseInt(value, 10);
    return Number.isInteger(quantity) ? Math.min(99, Math.max(1, quantity)) : 1;
  }

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.warn('NOXERA cart could not be saved in this browser.', error);
      showToast('Your bag works for this session, but this browser could not save it after refresh.');
    }
  }

  function getProduct(id) { return PRODUCTS.find((product) => product.id === id); }
  function lineTotal(item) { const product = getProduct(item.productId); return product ? product.price * item.quantity : 0; }
  function cartSubtotal() { return cart.reduce((sum, item) => sum + lineTotal(item), 0); }
  function cartQuantity() { return cart.reduce((sum, item) => sum + item.quantity, 0); }
  function priceText(value) { return currency.format(value).replace('₹', '₹'); }

  function photoMarkup(product, className = '') {
    if (!product.image) return `<div class="product-fallback ${className}"><span class="product-fallback-mark">N.</span><small>PHOTO PENDING</small></div>`;
    return `<img src="${escapeAttr(product.image)}" alt="${escapeAttr(product.name)}" loading="lazy" referrerpolicy="no-referrer" data-product-image="${escapeAttr(product.id)}">`;
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }
  function escapeAttr(value) { return escapeHTML(value); }

  function renderProducts() {
    const query = productSearch.value.trim().toLowerCase();
    let visible = PRODUCTS.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesQuery = !query || product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
    switch (sortProducts.value) {
      case 'low': visible.sort((a,b) => a.price - b.price || a.name.localeCompare(b.name)); break;
      case 'high': visible.sort((a,b) => b.price - a.price || a.name.localeCompare(b.name)); break;
      case 'az': visible.sort((a,b) => a.name.localeCompare(b.name)); break;
      default: visible.sort((a,b) => PRODUCTS.indexOf(a) - PRODUCTS.indexOf(b));
    }
    resultsCount.textContent = `${visible.length} ${visible.length === 1 ? 'piece' : 'pieces'}`;
    noResults.hidden = visible.length !== 0;
    productGrid.hidden = visible.length === 0;
    productGrid.innerHTML = visible.map((product, index) => `
      <article class="product-card" style="animation-delay:${Math.min(index * 22, 180)}ms">
        <div class="product-media" role="button" tabindex="0" data-open-product="${escapeAttr(product.id)}" aria-label="View ${escapeAttr(product.name)} details">
          ${product.image ? photoMarkup(product) : `<div class="product-fallback"><span class="product-fallback-mark">N.</span><small>PHOTO PENDING</small></div>`}
          <span class="product-tag ${(product.photoPending || product.verificationPending) ? 'pending' : ''}">${product.verificationPending ? 'Listing check pending' : product.photoPending ? 'Photo pending' : product.category === 'Jeans' ? 'Relaxed denim' : product.category === 'Hoodies' ? 'Layering piece' : product.category === 'Cargos' ? 'Utility wear' : 'Streetwear'}</span>
          <button class="quick-view" type="button" data-open-product="${escapeAttr(product.id)}">VIEW PIECE + SIZE</button>
        </div>
        <div class="product-details">
          <div class="product-meta"><span>${escapeHTML(product.category)}</span><span>${product.supplied ? 'Original selection' : 'The edit'}</span></div>
          <h3 class="product-name" role="button" tabindex="0" data-open-product="${escapeAttr(product.id)}">${escapeHTML(product.name)}</h3>
          <div class="product-bottom"><div><div class="product-price">${priceText(product.price)}</div><div class="product-price-note">NOXERA selling price</div></div><button class="card-add" type="button" data-open-product="${escapeAttr(product.id)}" aria-label="Choose size for ${escapeAttr(product.name)}">＋</button></div>
        </div>
      </article>`).join('');
    updateCategoryCounts();
    attachBrokenImageFallbacks(productGrid);
  }

  function updateCategoryCounts() {
    $('#allCount').textContent = String(PRODUCTS.length);
    $$('.filter-chip', categoryFilters).forEach((button) => {
      const category = button.dataset.category;
      const count = category === 'All' ? PRODUCTS.length : PRODUCTS.filter((product) => product.category === category).length;
      let countNode = button.querySelector('span');
      if (!countNode) { countNode = document.createElement('span'); button.appendChild(countNode); }
      countNode.textContent = String(count);
    });
  }

  function attachBrokenImageFallbacks(root = document) {
    $$('img[data-product-image]', root).forEach((img) => {
      if (img.dataset.fallbackReady === 'true') return;
      img.dataset.fallbackReady = 'true';
      img.addEventListener('error', () => {
        const product = getProduct(img.dataset.productImage);
        const fallback = document.createElement('div');
        fallback.className = 'product-fallback';
        fallback.innerHTML = '<span class="product-fallback-mark">N.</span><small>PHOTO PENDING</small>';
        img.replaceWith(fallback);
        if (product) product.photoPending = true;
      }, { once: true });
    });
  }

  function setCategory(category) {
    activeCategory = category;
    $$('.filter-chip', categoryFilters).forEach((button) => {
      const active = button.dataset.category === category;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    renderProducts();
  }

  function openProductModal(productId) {
    const product = getProduct(productId);
    if (!product) return;
    selectedProductId = productId;
    selectedSize = '';
    lastFocusedElement = document.activeElement;
    $('#modalCategory').textContent = `${product.category.toUpperCase()} / NOXERA EDIT`;
    $('#modalTitle').textContent = product.name;
    $('#modalPrice').textContent = priceText(product.price);
    $('#modalDescription').textContent = product.description || 'A piece selected for the NOXERA edit.';
    $('#modalMedia').innerHTML = photoMarkup(product);
    $('#sourceLink').href = product.source;
    $('#sourceLink').textContent = product.source ? 'View source listing ↗' : 'Source listing pending';
    $('#sourceLink').hidden = !product.source;
    const sizeOptions = $('#sizeOptions');
    sizeOptions.innerHTML = product.sizes.map((size) => `<button type="button" class="size-option" data-size="${escapeAttr(size)}" aria-pressed="false">${escapeHTML(size)}</button>`).join('');
    $('#sizeHelp').textContent = product.verificationPending
      ? 'This source listing needs a final check. Your requested size and product availability must be confirmed on WhatsApp before payment.'
      : 'Select the size you want to request. This does not confirm stock; availability is checked on WhatsApp before payment.';
    modalLayer.hidden = false;
    document.body.classList.add('locked');
    setTimeout(() => $('.size-option', sizeOptions)?.focus(), 40);
    attachBrokenImageFallbacks(modalLayer);
  }

  function closeProductModal() {
    modalLayer.hidden = true;
    selectedProductId = null;
    selectedSize = '';
    if (!cartDrawer.classList.contains('open')) document.body.classList.remove('locked');
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus();
  }

  function selectSize(size) {
    selectedSize = size;
    $$('.size-option', $('#sizeOptions')).forEach((button) => {
      const active = button.dataset.size === size;
      button.classList.toggle('selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  function addToCart(productId, size, quantity = 1) {
    const product = getProduct(productId);
    if (!product || !size) { showToast('Choose a size before adding this piece.'); return false; }
    const existing = cart.find((item) => item.productId === productId && item.size === size);
    if (existing) existing.quantity = Math.min(99, existing.quantity + quantity);
    else cart.push({ productId, size, quantity: clampQuantity(quantity) });
    saveCart();
    renderCart();
    showToast(`${product.name} added to your bag.`);
    return true;
  }

  function changeQuantity(productId, size, delta) {
    const item = cart.find((entry) => entry.productId === productId && entry.size === size);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) cart = cart.filter((entry) => !(entry.productId === productId && entry.size === size));
    else item.quantity = Math.min(99, item.quantity);
    saveCart();
    renderCart();
  }

  function removeItem(productId, size) {
    cart = cart.filter((item) => !(item.productId === productId && item.size === size));
    saveCart();
    renderCart();
    showToast('Piece removed from your bag.');
  }

  function renderCart() {
    const count = cartQuantity();
    $('#bagCount').textContent = String(count);
    $('#drawerCount').textContent = `(${count})`;
    $('#cartSubtotal').textContent = priceText(cartSubtotal());
    cartEmpty.classList.toggle('visible', cart.length === 0);
    cartItems.hidden = cart.length === 0;
    cartFooter.classList.toggle('empty', cart.length === 0);
    $('#checkoutButton').disabled = cart.length === 0;
    cartItems.innerHTML = cart.map((item) => {
      const product = getProduct(item.productId);
      if (!product) return '';
      return `<div class="cart-row">
        <div class="cart-thumb">${photoMarkup(product)}</div>
        <div><h3 class="cart-item-title">${escapeHTML(product.name)}</h3><p class="cart-item-sub">Size: ${escapeHTML(item.size)} · ${priceText(product.price)} each</p><div class="cart-item-price">${priceText(lineTotal(item))}</div>
          <div class="quantity-control" aria-label="Change quantity for ${escapeAttr(product.name)}"><button type="button" data-quantity="-1" data-product-id="${escapeAttr(product.id)}" data-size="${escapeAttr(item.size)}" aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button type="button" data-quantity="1" data-product-id="${escapeAttr(product.id)}" data-size="${escapeAttr(item.size)}" aria-label="Increase quantity">＋</button></div></div>
        <button type="button" class="remove-item" data-remove-item="${escapeAttr(product.id)}" data-size="${escapeAttr(item.size)}" aria-label="Remove ${escapeAttr(product.name)}">Remove</button>
      </div>`;
    }).join('');
    attachBrokenImageFallbacks(cartItems);
  }

  function openCart() {
    lastFocusedElement = document.activeElement;
    cartDrawer.classList.add('open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    scrim.hidden = false;
    requestAnimationFrame(() => scrim.classList.add('show'));
    document.body.classList.add('locked');
    $('#closeCart').focus();
  }

  function closeCart() {
    cartDrawer.classList.remove('open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    scrim.classList.remove('show');
    setTimeout(() => { if (!cartDrawer.classList.contains('open')) scrim.hidden = true; }, 240);
    if (modalLayer.hidden) document.body.classList.remove('locked');
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus();
  }

  function makeWhatsAppMessage(items, subtotal) {
    const lines = ['Hi NOXERA! I would like to place an order.', ''];
    items.forEach((item, index) => {
      const product = getProduct(item.productId);
      if (!product) return;
      lines.push(`Item ${index + 1}: ${product.name}`);
      lines.push(`Size: ${item.size}`);
      lines.push(`Quantity: ${item.quantity}`);
      lines.push(`Price: ${priceText(product.price)}`);
      lines.push(`Line total: ${priceText(product.price * item.quantity)}`);
      lines.push(`Product link: ${product.source || 'Source listing pending'}`);
      if (product.image) lines.push(`Product image: ${product.image}`);
      else lines.push('Product image: photo pending on the NOXERA listing');
      if (product.verificationPending) lines.push('Note: Please recheck the source listing and exact variant before confirming.');
      lines.push('');
    });
    lines.push(`Subtotal: ${priceText(subtotal)}`);
    lines.push('');
    lines.push('Please confirm availability, delivery charges, and final payment details. I will share my delivery address after confirmation.');
    lines.push('I understand that the order is not confirmed and payment has not been made yet.');
    return lines.join('\n');
  }

  function openWhatsApp(items) {
    if (!items.length) { showToast('Your bag is empty. Add a piece first.'); return; }
    const subtotal = items.reduce((sum, item) => sum + lineTotal(item), 0);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(makeWhatsAppMessage(items, subtotal))}`;
    // Called only by a user's click. No payment is attempted and no order is marked confirmed.
    const opened = window.open(url, '_blank');
    if (opened) opened.opener = null;
    else window.location.href = url;
  }

  function buySelectedNow() {
    const product = getProduct(selectedProductId);
    if (!product) return;
    if (!selectedSize) { showToast('Choose a size before continuing.'); return; }
    openWhatsApp([{ productId: product.id, size: selectedSize, quantity: 1 }]);
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2700);
  }

  function syncHeroImage() {
    const image = $('#heroImage');
    image.addEventListener('error', () => {
      image.hidden = true;
      $('#heroImageFallback').hidden = false;
    }, { once: true });
  }

  // Collection event delegation keeps regenerated cards functional after search/filter/sort.
  productGrid.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-open-product]');
    if (trigger) openProductModal(trigger.dataset.openProduct);
  });
  productGrid.addEventListener('keydown', (event) => {
    const trigger = event.target.closest('[data-open-product][role="button"], [data-open-product].product-name');
    if (trigger && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault(); openProductModal(trigger.dataset.openProduct);
    }
  });
  categoryFilters.addEventListener('click', (event) => {
    const button = event.target.closest('[data-category]');
    if (button) setCategory(button.dataset.category);
  });
  productSearch.addEventListener('input', renderProducts);
  sortProducts.addEventListener('change', renderProducts);
  $('#resetFilters').addEventListener('click', () => { productSearch.value = ''; sortProducts.value = 'featured'; setCategory('All'); });
  $('#focusSearch').addEventListener('click', () => { productSearch.focus(); $('#collection').scrollIntoView({ behavior: 'smooth' }); });
  $('#openCart').addEventListener('click', openCart);
  $('#closeCart').addEventListener('click', closeCart);
  $('#continueShopping').addEventListener('click', () => { closeCart(); $('#collection').scrollIntoView({ behavior: 'smooth' }); });
  scrim.addEventListener('click', closeCart);
  $('#closeModal').addEventListener('click', closeProductModal);
  modalLayer.addEventListener('click', (event) => { if (event.target === modalLayer) closeProductModal(); });
  $('#sizeOptions').addEventListener('click', (event) => {
    const button = event.target.closest('[data-size]');
    if (button) selectSize(button.dataset.size);
  });
  $('#modalAddButton').addEventListener('click', () => {
    if (addToCart(selectedProductId, selectedSize)) closeProductModal();
  });
  $('#modalBuyButton').addEventListener('click', buySelectedNow);
  cartItems.addEventListener('click', (event) => {
    const quantityButton = event.target.closest('[data-quantity]');
    if (quantityButton) { changeQuantity(quantityButton.dataset.productId, quantityButton.dataset.size, Number(quantityButton.dataset.quantity)); return; }
    const removeButton = event.target.closest('[data-remove-item]');
    if (removeButton) removeItem(removeButton.dataset.removeItem, removeButton.dataset.size);
  });
  $('#checkoutButton').addEventListener('click', () => openWhatsApp([...cart]));
  $('#menuToggle').addEventListener('click', () => {
    const nav = $('.main-nav');
    const expanded = $('#menuToggle').getAttribute('aria-expanded') === 'true';
    $('#menuToggle').setAttribute('aria-expanded', String(!expanded));
    $('#menuToggle').setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('open', !expanded);
  });
  $$('.main-nav a').forEach((link) => link.addEventListener('click', () => {
    $('.main-nav').classList.remove('open');
    $('#menuToggle').setAttribute('aria-expanded', 'false');
    $('#menuToggle').setAttribute('aria-label', 'Open navigation');
  }));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (!modalLayer.hidden) closeProductModal();
      else if (cartDrawer.classList.contains('open')) closeCart();
      else if ($('.main-nav').classList.contains('open')) { $('.main-nav').classList.remove('open'); $('#menuToggle').setAttribute('aria-expanded', 'false'); }
    }
    if (event.key === '/' && !event.ctrlKey && !event.metaKey && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) {
      event.preventDefault(); productSearch.focus(); $('#collection').scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Startup
  $('#currentYear').textContent = String(new Date().getFullYear());
  syncHeroImage();
  renderProducts();
  renderCart();
})();
