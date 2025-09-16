document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('active');
    });
  }

  const searchToggle = document.querySelector('.search-toggle');
  const searchOverlay = document.getElementById('site-search');
  const closeSearch = searchOverlay?.querySelector('.close-search');
  const searchInput = searchOverlay?.querySelector('input');
  const searchResults = searchOverlay?.querySelector('.search-results');

  const searchData = [
    {
      title: 'Products',
      url: 'products.html',
      description: 'Standard bentonite cat litter SKUs with scents, granule profiles, packaging, and loading guides.',
      keywords: ['ready-to-sell', 'sku', 'specifications', 'container', 'pricing', 'comparison']
    },
    {
      title: 'OEM Solutions',
      url: 'oem-solutions.html',
      description: 'Private label and fully customized cat litter programs with dielines, R&D, and onboarding timeline.',
      keywords: ['private label', 'timeline', 'brand', 'dielines', 'custom']
    },
    {
      title: 'Bulk Supply',
      url: 'bulk-supply.html',
      description: 'Bulk bentonite supply for repackers and industry partners including index windows and FIBC packing.',
      keywords: ['big bag', 'ton bag', 'index', 'moisture', 'qc']
    },
    {
      title: 'Compliance',
      url: 'compliance.html',
      description: 'Quality, regulatory, SDS/TDS downloads, QC flowchart, and certification roadmap for procurement teams.',
      keywords: ['sds', 'tds', 'certification', 'reach', 'quality']
    },
    {
      title: 'Resources',
      url: 'resources.html',
      description: 'Guides, templates, checklists, and market intelligence to support logistics, OEM, and compliance planning.',
      keywords: ['guides', 'templates', 'white paper', 'download']
    },
    {
      title: 'About',
      url: 'about.html',
      description: 'Mine-to-loading story, leadership team, production capacity, milestones, and sustainability commitments.',
      keywords: ['history', 'team', 'factory', 'sustainability']
    },
    {
      title: 'Contact',
      url: 'contact.html',
      description: 'Quote, inquiry, and OEM project forms plus direct phone, email, and instant messaging channels.',
      keywords: ['quote', 'samples', 'whatsapp', 'wechat', 'map']
    },
    {
      title: 'Wholesale',
      url: 'wholesale.html',
      description: 'Tiered container pricing, replenishment SLAs, and mixed-container strategies for wholesale buyers.',
      keywords: ['wholesale', 'container', 'sla', 'pricing']
    },
    {
      title: 'Home',
      url: 'index.html',
      description: 'Overview of cooperation models, product snapshots, process timeline, quality credentials, and resources.',
      keywords: ['hero', 'overview', 'testimonials', 'gallery']
    }
  ];

  function renderSearchResults(query = '') {
    if (!searchResults) return;
    searchResults.innerHTML = '';
    const trimmed = query.trim().toLowerCase();

    const matches = searchData.filter((entry) => {
      if (!trimmed) return true;
      return (
        entry.title.toLowerCase().includes(trimmed) ||
        entry.description.toLowerCase().includes(trimmed) ||
        entry.keywords.some((keyword) => keyword.toLowerCase().includes(trimmed))
      );
    });

    if (!matches.length) {
      const empty = document.createElement('p');
      empty.textContent = 'No results found. Try different keywords such as "OEM", "SDS", or "bulk supply".';
      searchResults.appendChild(empty);
      return;
    }

    matches.forEach((entry) => {
      const link = document.createElement('a');
      link.className = 'search-result';
      link.href = entry.url;
      link.innerHTML = `<strong>${entry.title}</strong><p>${entry.description}</p>`;
      searchResults.appendChild(link);
    });
  }

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderSearchResults('');
    setTimeout(() => searchInput?.focus(), 50);
  }

  function closeSearchOverlay() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  searchToggle?.addEventListener('click', openSearch);
  closeSearch?.addEventListener('click', closeSearchOverlay);
  searchOverlay?.addEventListener('click', (event) => {
    if (event.target === searchOverlay) {
      closeSearchOverlay();
    }
  });

  searchInput?.addEventListener('input', (event) => {
    const target = event.target;
    renderSearchResults(target.value);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && searchOverlay?.classList.contains('active')) {
      closeSearchOverlay();
    }
  });

  const floatingButton = document.querySelector('.widget-button');
  const widgetPanel = document.querySelector('.widget-panel');
  floatingButton?.addEventListener('click', () => {
    widgetPanel?.classList.toggle('active');
  });

  document.querySelectorAll('[data-prefill-sku]').forEach((button) => {
    button.addEventListener('click', () => {
      const sku = button.getAttribute('data-prefill-sku');
      const formField = document.querySelector('[name="selected_sku"]');
      if (sku && formField instanceof HTMLInputElement) {
        formField.value = sku;
      }
    });
  });

  const productGrid = document.querySelector('[data-product-grid]');
  if (productGrid) {
    const cards = Array.from(productGrid.querySelectorAll('.product-card'));
    const filterButtons = document.querySelectorAll('[data-filter-mode]');
    const scentSelect = document.getElementById('scent-filter');
    const granuleSelect = document.getElementById('granule-filter');
    const packagingSelect = document.getElementById('packaging-filter');
    const languageSelect = document.getElementById('language-filter');
    const productSearch = document.getElementById('product-search');
    const comparisonTable = document.querySelector('#comparison-table tbody');
    const compareChecks = productGrid.querySelectorAll('.compare-check');

    function applyFilters() {
      const activeMode = Array.from(filterButtons)
        .find((button) => button.classList.contains('active'))
        ?.getAttribute('data-filter-mode');
      const scent = scentSelect?.value || 'all';
      const granule = granuleSelect?.value || 'all';
      const packaging = packagingSelect?.value || 'all';
      const language = languageSelect?.value || 'all';
      const searchTerm = productSearch?.value.trim().toLowerCase() || '';

      cards.forEach((card) => {
        const matchesMode = activeMode === 'all' || card.getAttribute('data-mode') === activeMode;
        const matchesScent = scent === 'all' || card.getAttribute('data-scent') === scent;
        const matchesGranule = granule === 'all' || card.getAttribute('data-granule') === granule;
        const matchesPackaging = packaging === 'all' || card.getAttribute('data-packaging') === packaging;
        const matchesLanguage = language === 'all' || card.getAttribute('data-language') === language;
        const matchesSearch = !searchTerm || card.textContent.toLowerCase().includes(searchTerm);
        const shouldShow =
          matchesMode && matchesScent && matchesGranule && matchesPackaging && matchesLanguage && matchesSearch;
        card.style.display = shouldShow ? '' : 'none';
      });
    }

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
        applyFilters();
      });
    });

    [scentSelect, granuleSelect, packagingSelect, languageSelect].forEach((select) => {
      select?.addEventListener('change', applyFilters);
    });

    productSearch?.addEventListener('input', () => {
      applyFilters();
    });

    function updateComparison() {
      if (!comparisonTable) return;
      const selected = Array.from(compareChecks)
        .filter((check) => check.checked)
        .slice(0, 3);

      compareChecks.forEach((check, index) => {
        if (selected.includes(check)) return;
        if (selected.length >= 3) {
          check.disabled = !check.checked;
        } else {
          check.disabled = false;
        }
      });

      comparisonTable.innerHTML = '';
      if (!selected.length) {
        const emptyRow = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 6;
        cell.textContent = 'Select up to three SKUs to compare specs side by side.';
        emptyRow.appendChild(cell);
        comparisonTable.appendChild(emptyRow);
        return;
      }

      selected.forEach((check) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${check.getAttribute('data-name')}</td>
          <td>${check.getAttribute('data-sku')}</td>
          <td>${check.getAttribute('data-absorption')}</td>
          <td>${check.getAttribute('data-clump')}</td>
          <td>${check.getAttribute('data-dust')}</td>
          <td>${check.getAttribute('data-pack')}</td>
        `;
        comparisonTable.appendChild(row);
      });
    }

    compareChecks.forEach((check) => {
      check.addEventListener('change', () => {
        const selected = Array.from(compareChecks).filter((item) => item.checked);
        if (selected.length > 3) {
          check.checked = false;
        }
        updateComparison();
      });
    });

    updateComparison();
  }

  document.querySelectorAll('.faq-item button').forEach((button) => {
    button.addEventListener('click', () => {
      const parent = button.closest('.faq-item');
      parent?.classList.toggle('active');
    });
  });
});
