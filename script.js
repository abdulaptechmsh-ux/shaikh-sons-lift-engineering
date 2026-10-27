'use strict';

/* Shaikh Sons product catalogue interactions. No third-party JS dependencies. */
(function () {
  const WHATSAPP_NUMBER = '923213878233';
  let activeCategory = 'all';
  let searchTerm = '';

  function applyCatalogueFilters() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card) => {
      const categories = (card.getAttribute('data-category') || '').toLowerCase().split(/\s+/);
      const searchableText = `${card.textContent || ''} ${card.getAttribute('data-category') || ''}`.toLowerCase();
      const categoryMatch = activeCategory === 'all' || categories.includes(activeCategory);
      const searchMatch = !searchTerm || searchableText.includes(searchTerm);
      card.hidden = !(categoryMatch && searchMatch);
    });
  }

  window.filterCategory = function filterCategory(category, buttonEl) {
    activeCategory = category || 'all';
    document.querySelectorAll('.category-pill').forEach((button) => {
      const isActive = button === buttonEl;
      button.classList.toggle('bg-primary', isActive);
      button.classList.toggle('text-on-primary', isActive);
      button.classList.toggle('shadow-sm', isActive);
      button.classList.toggle('bg-surface-container-lowest', !isActive);
      button.classList.toggle('text-on-surface', !isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
    applyCatalogueFilters();
  };

  window.selectEquipment = function selectEquipment(item) {
    const checkboxByItem = {
      lift: 'chk-lift',
      oil: 'chk-oil',
      pump: 'chk-pump',
      shampoo: 'chk-shampoo'
    };
    const checkboxId = checkboxByItem[item];
    if (checkboxId) {
      const checkbox = document.getElementById(checkboxId);
      if (checkbox) checkbox.checked = true;
    }
    if (item === 'compressor') {
      const select = document.getElementById('puma-select');
      if (select) select.value = 'Shaikh Sons 5.0 HP / 250L';
    }
  };

  window.selectAllCombo = function selectAllCombo() {
    ['chk-lift', 'chk-oil', 'chk-pump', 'chk-shampoo'].forEach((id) => {
      const checkbox = document.getElementById(id);
      if (checkbox) checkbox.checked = true;
    });
    const select = document.getElementById('puma-select');
    if (select) select.value = 'Shaikh Sons 5.0 HP / 250L';
  };

  window.handleQuoteSubmit = function handleQuoteSubmit(event) {
    event.preventDefault();
    const getValue = (id) => {
      const field = document.getElementById(id);
      return field ? field.value.trim() : '';
    };
    const requiredFields = ['station-name', 'station-city', 'contact-person', 'contact-phone'];
    const firstMissing = requiredFields.find((id) => !getValue(id));
    if (firstMissing) {
      const field = document.getElementById(firstMissing);
      if (field) field.focus();
      return;
    }

    const items = [];
    const itemOptions = [
      ['chk-lift', '6.5-ton semi-hydraulic lift with girder frame'],
      ['chk-oil', '150L imported hydraulic oil (origin/grade to be confirmed)'],
      ['chk-pump', 'BJ-70 car wash pump'],
      ['chk-shampoo', '50L stainless-steel shampoo machine']
    ];
    itemOptions.forEach(([id, label]) => {
      const checkbox = document.getElementById(id);
      if (checkbox && checkbox.checked) items.push(label);
    });
    const compressor = getValue('puma-select');
    if (compressor && compressor !== 'None') items.push(`Air compressor: ${compressor}`);

    const message = [
      '*SHAIKH SONS QUOTATION REQUEST*',
      `*Business name:* ${getValue('station-name')}`,
      `*City:* ${getValue('station-city')}`,
      `*Contact person:* ${getValue('contact-person')}`,
      `*Phone / WhatsApp:* ${getValue('contact-phone')}`,
      `*Equipment requested:* ${items.length ? items.join('; ') : 'Please advise on suitable equipment'}`,
      `*Notes:* ${getValue('station-notes') || 'None'}`
    ].join('\n');

    const successMessage = document.getElementById('quote-success-msg');
    if (successMessage) {
      successMessage.classList.remove('hidden');
      successMessage.setAttribute('role', 'status');
      successMessage.setAttribute('aria-live', 'polite');
    }
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    const openedWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!openedWindow) {
      // Keep the request usable if the browser blocks a new tab.
      window.location.href = whatsappUrl;
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('input[placeholder="Search model, tonnage, HP, or phase..."]');
    if (searchInput) {
      searchInput.setAttribute('aria-label', 'Search equipment by name, model, capacity, or phase');
      searchInput.addEventListener('input', () => {
        searchTerm = searchInput.value.trim().toLowerCase();
        applyCatalogueFilters();
      });
    }
    document.querySelectorAll('.category-pill').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.classList.contains('active')));
    });
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
      const rel = new Set((link.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
      rel.add('noopener');
      rel.add('noreferrer');
      link.setAttribute('rel', Array.from(rel).join(' '));
    });
  });
})();
