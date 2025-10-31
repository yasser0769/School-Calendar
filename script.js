// script.js
// Client‑side code to build the interactive Saudi school calendar.

document.addEventListener('DOMContentLoaded', () => {
  // Grab DOM references
  const yearNav = document.getElementById('year-nav');
  const eventsList = document.getElementById('events-list');
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search');
  const nextEventNameEl = document.getElementById('next-event-name');
  const nextEventDatesEl = document.getElementById('next-event-dates');
  const nextEventCountdownEl = document.getElementById('next-event-countdown');
  const nextEventShareBtn = document.getElementById('next-event-share');
  const nextEventIcsBtn = document.getElementById('next-event-ics');
  const themeToggleBtn = document.getElementById('theme-toggle');
  // If the page is loaded with #widget hash, show only the next event widget for embedding
  if (location.hash === '#widget') {
    document.body.style.background = 'transparent';
    document.querySelector('header').style.display = 'none';
    document.querySelector('.search-container').style.display = 'none';
    document.getElementById('events-list').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
    // Remove padding from main
    document.querySelector('main').style.padding = '0';
    document.querySelector('main').style.margin = '0';
    // Optionally adjust width
  }

  // Determine unique Hijri years from the events dataset
  const years = Array.from(new Set(window.calendarEvents.map(ev => ev.year))).sort((a,b) => a - b);

  // State
  let selectedYear = parseInt(localStorage.getItem('selectedYear')) || years[0];
  let countdownIntervals = [];

  // Apply saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggleBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  }

  // Build year navigation buttons
  function renderYearNav() {
    yearNav.innerHTML = '';
    years.forEach(yr => {
      const btn = document.createElement('button');
      btn.textContent = yr;
      btn.classList.toggle('active', yr === selectedYear);
      btn.addEventListener('click', () => {
        if (selectedYear !== yr) {
          selectedYear = yr;
          localStorage.setItem('selectedYear', selectedYear);
          renderYearNav();
          renderEvents();
          updateNextEventWidget();
          updatePageMeta();
        }
      });
      yearNav.appendChild(btn);
    });
  }

  // Render event cards based on selected year and search query
  function renderEvents() {
    // Clear existing countdown timers
    countdownIntervals.forEach(clearInterval);
    countdownIntervals = [];

    // Filter events for the selected year
    const eventsForYear = window.calendarEvents.filter(ev => ev.year === selectedYear);

    // Filter by search input
    const query = searchInput.value.trim().toLowerCase();
    const filtered = eventsForYear.filter(ev => {
      if (!query) return true;
      // Check event name
      if (ev.name.toLowerCase().includes(query)) return true;
      // Hijri dates
      if (ev.hijriStart && ev.hijriStart.replace(/\s+/g, '').includes(query)) return true;
      if (ev.hijriEnd && ev.hijriEnd.replace(/\s+/g, '').includes(query)) return true;
      // Gregorian dates (remove slashes and hyphens for flexible search)
      const gStart = ev.gregorianStart.split('T')[0].replace(/-/g, '/');
      const gEnd = ev.gregorianEnd.split('T')[0].replace(/-/g, '/');
      if (gStart.includes(query) || gEnd.includes(query)) return true;
      return false;
    });

    // Sort by start date
    filtered.sort((a, b) => new Date(a.gregorianStart) - new Date(b.gregorianStart));

    // Clear list
    eventsList.innerHTML = '';

    // Render each event
    filtered.forEach(ev => {
      const card = document.createElement('div');
      card.className = 'event-card';

      const header = document.createElement('div');
      header.className = 'event-header';

      const title = document.createElement('h3');
      title.textContent = ev.name;
      header.appendChild(title);

      // Colour marker for event type
      const marker = document.createElement('span');
      marker.className = 'marker';
      const colourVar = getComputedStyle(document.documentElement).getPropertyValue(`--colour-${ev.type}`);
      marker.style.backgroundColor = colourVar || 'var(--primary)';
      header.appendChild(marker);

      card.appendChild(header);

      // Dates
      const dates = document.createElement('div');
      dates.className = 'dates';
      // Hijri display
      let hijriText = ev.hijriEnd && ev.hijriEnd !== ev.hijriStart
        ? `${ev.hijriStart} – ${ev.hijriEnd}`
        : `${ev.hijriStart}`;
      // Gregorian display (strip time)
      const gStart = ev.gregorianStart.split('T')[0];
      const gEnd = ev.gregorianEnd.split('T')[0];
      let gregorianText = gStart === gEnd ? gStart : `${gStart} – ${gEnd}`;
      dates.innerHTML = `<strong>التاريخ الهجري:</strong> ${hijriText}<br><strong>التاريخ الميلادي:</strong> ${gregorianText}`;
      card.appendChild(dates);

      // Duration
      const durationEl = document.createElement('div');
      durationEl.className = 'duration';
      const durationDays = getEventDurationDays(ev);
      // Use Arabic pluralisation: if more than one day use "أيام" otherwise "يوم"
      durationEl.textContent = `المدة: ${durationDays} ${durationDays > 1 ? 'أيام' : 'يوم'}`;
      card.appendChild(durationEl);

      // Countdown
      const countdownEl = document.createElement('div');
      countdownEl.className = 'countdowns';
      card.appendChild(countdownEl);

      // Actions: copy, share, ics
      const actions = document.createElement('div');
      actions.className = 'event-actions';

      const copyBtn = document.createElement('button');
      copyBtn.className = 'copy';
      copyBtn.textContent = 'نسخ';
      copyBtn.addEventListener('click', () => {
        const text = `${ev.name}\nالتاريخ الهجري: ${hijriText}\nالتاريخ الميلادي: ${gregorianText}`;
        copyToClipboard(text);
      });

      const shareBtn = document.createElement('button');
      shareBtn.className = 'share';
      shareBtn.textContent = 'مشاركة';
      shareBtn.addEventListener('click', () => {
        const link = `${location.origin}${location.pathname}#${ev.id}`;
        const message = `${ev.name} - ${hijriText} / ${gregorianText}\n${link}`;
        shareWhatsApp(message);
      });

      const icsBtn = document.createElement('button');
      icsBtn.className = 'ics';
      icsBtn.textContent = 'إضافة';
      icsBtn.addEventListener('click', () => {
        const blob = generateICS(ev);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const sanitized = ev.name.replace(/\s+/g, '_');
        a.download = `${sanitized}.ics`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      });

      actions.appendChild(copyBtn);
      actions.appendChild(shareBtn);
      actions.appendChild(icsBtn);
      card.appendChild(actions);

      // Append card
      eventsList.appendChild(card);

      // Set up countdown timer
      updateCountdownForEvent(ev, countdownEl);
      const intervalId = setInterval(() => updateCountdownForEvent(ev, countdownEl), 1000);
      countdownIntervals.push(intervalId);
    });

    // If no events after filtering, show a message
    if (filtered.length === 0) {
      eventsList.innerHTML = '<p>لا توجد أحداث مطابقة للبحث.</p>';
    }

    updateSchema(filtered);
  }

  /**
   * Compute the inclusive number of days between an event's start and end dates.
   * @param {Object} ev
   * @returns {number}
   */
  function getEventDurationDays(ev) {
    const start = new Date(ev.gregorianStart);
    const end = new Date(ev.gregorianEnd);
    // difference in milliseconds
    const diffMs = end - start;
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
    return days > 0 ? days : 1;
  }

  /**
   * Update countdown text for a specific event.
   * @param {Object} ev
   * @param {HTMLElement} el
   */
  function updateCountdownForEvent(ev, el) {
    const now = new Date();
    const start = new Date(ev.gregorianStart);
    const diff = start - now;
    if (diff <= 0) {
      el.textContent = 'بدأت';
    } else {
      const { days, hours, minutes, seconds } = msToTime(diff);
      // Determine Arabic plural form for "days"
      const dayLabel = days === 1 ? 'يوم' : 'أيام';
      el.textContent = `يبدأ بعد: ${days} ${dayLabel} ${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
    }
  }

  /**
   * Convert milliseconds to days/hours/minutes/seconds.
   * @param {number} ms
   */
  function msToTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds };
  }

  /**
   * Copy a text string to the clipboard and show a confirmation toast.
   * @param {string} text
   */
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('تم النسخ إلى الحافظة');
    }).catch(err => {
      showToast('حدث خطأ أثناء النسخ');
      console.error(err);
    });
  }

  /**
   * Open WhatsApp share link in a new window with provided message.
   * @param {string} message
   */
  function shareWhatsApp(message) {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  /**
   * Generate an iCalendar (.ics) file for the given event.
   * @param {Object} ev
   * @returns {Blob}
   */
  function generateICS(ev) {
    const uid = `${ev.id}@saudi-school-calendar`; // unique id
    // Format dates for iCalendar (YYYYMMDD)
    const startDate = ev.gregorianStart.split('T')[0].replace(/-/g, '');
    const endDate = ev.gregorianEnd.split('T')[0].replace(/-/g, '');
    // For all‑day events the end date should be the day after the last day according to the spec
    // but here we set DTSTART and DTEND equal for single‑day events; for multi‑day events add one day to DTEND
    const dtstart = startDate;
    const dtend = (() => {
      const start = new Date(ev.gregorianStart);
      const end = new Date(ev.gregorianEnd);
      if (end > start) {
        const dt = new Date(end.getTime() + 24 * 3600 * 1000);
        const y = dt.getUTCFullYear().toString().padStart(4, '0');
        const m = (dt.getUTCMonth() + 1).toString().padStart(2, '0');
        const d = dt.getUTCDate().toString().padStart(2, '0');
        return `${y}${m}${d}`;
      } else {
        // one day event
        const dt = new Date(start.getTime() + 24 * 3600 * 1000);
        const y = dt.getUTCFullYear().toString().padStart(4, '0');
        const m = (dt.getUTCMonth() + 1).toString().padStart(2, '0');
        const d = dt.getUTCDate().toString().padStart(2, '0');
        return `${y}${m}${d}`;
      }
    })();
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Saudi School Calendar//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${formatIcsTimestamp(new Date())}`,
      `SUMMARY:${ev.name}`,
      `DTSTART;VALUE=DATE:${dtstart}`,
      `DTEND;VALUE=DATE:${dtend}`,
      `DESCRIPTION:${ev.description || ev.name}`,
      'STATUS:CONFIRMED',
      'LOCATION:المملكة العربية السعودية',
      'END:VEVENT',
      'END:VCALENDAR'
    ];
    const content = lines.join('\r\n');
    return new Blob([content], { type: 'text/calendar;charset=utf-8' });
  }

  /**
   * Format a Date object into YYYYMMDDTHHMMSSZ for iCalendar DTSTAMP.
   * @param {Date} date
   */
  function formatIcsTimestamp(date) {
    const y = date.getUTCFullYear().toString().padStart(4, '0');
    const m = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const d = date.getUTCDate().toString().padStart(2, '0');
    const h = date.getUTCHours().toString().padStart(2, '0');
    const min = date.getUTCMinutes().toString().padStart(2, '0');
    const s = date.getUTCSeconds().toString().padStart(2, '0');
    return `${y}${m}${d}T${h}${min}${s}Z`;
  }

  /**
   * Display a temporary toast message for user feedback.
   * @param {string} msg
   */
  function showToast(msg) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = 'rgba(0,0,0,0.8)';
    toast.style.color = '#fff';
    toast.style.padding = '0.7rem 1.2rem';
    toast.style.borderRadius = '4px';
    toast.style.zIndex = '2000';
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s';
      toast.style.opacity = '0';
      setTimeout(() => document.body.removeChild(toast), 400);
    }, 1800);
  }

  /**
   * Update the next event widget with the nearest upcoming event.
   */
  function updateNextEventWidget() {
    const now = new Date();
    // Filter events in selected year whose start is in the future
    const futureEvents = window.calendarEvents.filter(ev => ev.year === selectedYear && new Date(ev.gregorianStart) > now);
    // If none, pick the first event of the year regardless of date
    const nextEv = futureEvents.sort((a, b) => new Date(a.gregorianStart) - new Date(b.gregorianStart))[0] || window.calendarEvents.filter(ev => ev.year === selectedYear)[0];
    if (!nextEv) {
      nextEventNameEl.textContent = 'لا يوجد حدث';
      nextEventDatesEl.textContent = '';
      nextEventCountdownEl.textContent = '';
      nextEventShareBtn.onclick = null;
      nextEventIcsBtn.onclick = null;
      return;
    }
    // Display information
    const hijriText = nextEv.hijriEnd && nextEv.hijriEnd !== nextEv.hijriStart ? `${nextEv.hijriStart} – ${nextEv.hijriEnd}` : `${nextEv.hijriStart}`;
    const gStart = nextEv.gregorianStart.split('T')[0];
    const gEnd = nextEv.gregorianEnd.split('T')[0];
    const gregText = gStart === gEnd ? gStart : `${gStart} – ${gEnd}`;
    nextEventNameEl.textContent = nextEv.name;
    nextEventDatesEl.textContent = `${hijriText} \u2022 ${gregText}`;
    // Set up countdown
    function updateWidgetCountdown() {
      const now2 = new Date();
      const diff = new Date(nextEv.gregorianStart) - now2;
      if (diff <= 0) {
        nextEventCountdownEl.textContent = 'بدأت';
      } else {
        const { days, hours, minutes, seconds } = msToTime(diff);
        const dayLabel2 = days === 1 ? 'يوم' : 'أيام';
        nextEventCountdownEl.textContent = `${days} ${dayLabel2} ${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
      }
    }
    updateWidgetCountdown();
    // Clear any previous interval
    if (updateNextEventWidget.interval) clearInterval(updateNextEventWidget.interval);
    updateNextEventWidget.interval = setInterval(updateWidgetCountdown, 1000);
    // Share
    nextEventShareBtn.onclick = () => {
      const link = `${location.origin}${location.pathname}#${nextEv.id}`;
      const message = `${nextEv.name} - ${hijriText} / ${gregText}\n${link}`;
      shareWhatsApp(message);
    };
    // Add to calendar
    nextEventIcsBtn.onclick = () => {
      const blob = generateICS(nextEv);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const sanitized = nextEv.name.replace(/\s+/g, '_');
      a.download = `${sanitized}.ics`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    };
  }

  /**
   * Update meta tags (title & description) based on selected year for SEO.
   */
  function updatePageMeta() {
    const yearTitle = `${selectedYear}/${selectedYear + 1}هـ`;
    document.title = `التقويم الدراسي السعودي ${yearTitle}`;
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', `تعرف على مواعيد الدراسة والإجازات للعام ${yearTitle} مع عد تنازلي وإضافة للتقويم.`);
    }
  }

  /**
   * Inject Schema.org JSON‑LD for the list of events.  Each event is of type
   * Event with properties name, startDate, endDate, description, location and
   * eventStatus.
   * @param {Array} events
   */
  function updateSchema(events) {
    // Remove existing structured data script if any
    const existing = document.getElementById('schema-events');
    if (existing) existing.remove();
    const jsonld = events.map(ev => {
      const gStart = ev.gregorianStart.split('T')[0];
      const gEnd = ev.gregorianEnd.split('T')[0];
      return {
        '@context': 'https://schema.org',
        '@type': 'Event',
        'name': ev.name,
        'startDate': gStart,
        'endDate': gEnd,
        'description': ev.description || ev.name,
        'location': {
          '@type': 'Place',
          'name': 'المملكة العربية السعودية'
        },
        'eventStatus': 'https://schema.org/EventScheduled'
      };
    });
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'schema-events';
    script.textContent = JSON.stringify(jsonld, null, 2);
    document.head.appendChild(script);
  }

  /**
   * Toggle between dark and light themes.
   */
  function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    themeToggleBtn.textContent = next === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', next);
  }

  // Event listeners
  searchInput.addEventListener('input', () => {
    renderEvents();
    updateNextEventWidget();
  });
  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    renderEvents();
    updateNextEventWidget();
  });
  themeToggleBtn.addEventListener('click', toggleTheme);

  // Initial rendering
  renderYearNav();
  renderEvents();
  updateNextEventWidget();
  updatePageMeta();
});