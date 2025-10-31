// events.js
// Contains an array of event definitions for the Saudi academic calendar
// for the Hijri years 1447–1451 (2025–2029 Gregorian).

/*
  Each event object has the following properties:
  - id: A unique identifier for the event. Use a simple string.
  - year: Hijri year (number) used for grouping events.
  - name: The Arabic name of the event (e.g. "اليوم الوطني").
  - type: A short category string used to determine colour (e.g. "national",
    "fall_break", etc.). The mapping of types to colours is defined in
    `style.css`.
  - hijriStart: Start date in Hijri calendar as a string (e.g. "18/2/1447").
  - hijriEnd: End date in Hijri calendar as a string. For one‑day events the
    end may equal the start. Use null if the event occurs on a single day.
  - gregorianStart: Start date in Gregorian calendar in ISO format
    (yyyy-mm-dd).  Include the offset +03:00 for the Riyadh time zone so
    durations computed in JavaScript are correct regardless of the user’s
    local time.
  - gregorianEnd: End date in Gregorian calendar in ISO format.  Use the
    same format and offset as gregorianStart.  For one‑day events, set to
    the same value as gregorianStart.
  - description: Optional longer description of the event.  See `index.html`
    for where this description appears.
*/

const calendarEvents = [
  // Year 1447/1448 (2025/2026)
  {
    id: '1447_admin_return',
    year: 1447,
    name: 'عودة الإداريين',
    type: 'administration',
    hijriStart: '18/2/1447',
    hijriEnd: null,
    gregorianStart: '2025-08-12T00:00:00+03:00',
    gregorianEnd: '2025-08-12T00:00:00+03:00',
    description: 'عودة الإداريين إلى المدارس استعداداً للعام الدراسي الجديد.'
  },
  {
    id: '1447_teachers_return',
    year: 1447,
    name: 'عودة المعلمين',
    type: 'teachers',
    hijriStart: '23/2/1447',
    hijriEnd: null,
    gregorianStart: '2025-08-17T00:00:00+03:00',
    gregorianEnd: '2025-08-17T00:00:00+03:00',
    description: 'عودة المعلمين الممارسين للتدريس لبدء التحضير للعام الدراسي.'
  },
  {
    id: '1447_school_start',
    year: 1447,
    name: 'بداية العام الدراسي',
    type: 'school_start',
    hijriStart: '1/3/1447',
    hijriEnd: null,
    gregorianStart: '2025-08-24T00:00:00+03:00',
    gregorianEnd: '2025-08-24T00:00:00+03:00',
    description: 'اليوم الأول من الدراسة للعام الدراسي 1447/1448.'
  },
  {
    id: '1447_national_day',
    year: 1447,
    name: 'اليوم الوطني',
    type: 'national_day',
    hijriStart: '1/4/1447',
    hijriEnd: null,
    gregorianStart: '2025-09-23T00:00:00+03:00',
    gregorianEnd: '2025-09-23T00:00:00+03:00',
    description: 'إجازة اليوم الوطني السعودي.'
  },
  {
    id: '1447_extra1',
    year: 1447,
    name: 'إجازة إضافية',
    type: 'extra',
    hijriStart: '20/4/1447',
    hijriEnd: null,
    gregorianStart: '2025-10-12T00:00:00+03:00',
    gregorianEnd: '2025-10-12T00:00:00+03:00',
    description: 'إجازة إضافية خلال الفصل الأول.'
  },
  {
    id: '1447_fall_break',
    year: 1447,
    name: 'إجازة الخريف',
    type: 'fall_break',
    hijriStart: '30/5/1447',
    hijriEnd: '8/6/1447',
    gregorianStart: '2025-11-21T00:00:00+03:00',
    gregorianEnd: '2025-11-29T00:00:00+03:00',
    description: 'إجازة فصل الخريف للطلاب والمعلمين.'
  },
  {
    id: '1447_extra2',
    year: 1447,
    name: 'إجازة إضافية',
    type: 'extra',
    hijriStart: '20/6/1447',
    hijriEnd: '23/6/1447',
    gregorianStart: '2025-12-11T00:00:00+03:00',
    gregorianEnd: '2025-12-14T00:00:00+03:00',
    description: 'إجازة إضافية ضمن الفصل الدراسي.'
  },
  {
    id: '1447_mid_year',
    year: 1447,
    name: 'إجازة منتصف العام',
    type: 'mid_year',
    hijriStart: '20/7/1447',
    hijriEnd: '28/7/1447',
    gregorianStart: '2026-01-09T00:00:00+03:00',
    gregorianEnd: '2026-01-17T00:00:00+03:00',
    description: 'إجازة منتصف العام الدراسي بين الفصلين.'
  },
  {
    id: '1447_foundation_day',
    year: 1447,
    name: 'يوم التأسيس',
    type: 'foundation_day',
    hijriStart: '5/9/1447',
    hijriEnd: null,
    gregorianStart: '2026-02-22T00:00:00+03:00',
    gregorianEnd: '2026-02-22T00:00:00+03:00',
    description: 'إجازة يوم التأسيس.'
  },
  {
    id: '1447_eid_fitr',
    year: 1447,
    name: 'عيد الفطر',
    type: 'eid_fitr',
    hijriStart: '17/9/1447',
    hijriEnd: '9/10/1447',
    gregorianStart: '2026-03-06T00:00:00+03:00',
    gregorianEnd: '2026-03-28T00:00:00+03:00',
    description: 'إجازة عيد الفطر المبارك.'
  },
  {
    id: '1447_eid_adha',
    year: 1447,
    name: 'عيد الأضحى',
    type: 'eid_adha',
    hijriStart: '5/12/1447',
    hijriEnd: '15/12/1447',
    gregorianStart: '2026-05-22T00:00:00+03:00',
    gregorianEnd: '2026-06-01T00:00:00+03:00',
    description: 'إجازة عيد الأضحى المبارك.'
  },
  {
    id: '1447_year_end',
    year: 1447,
    name: 'إجازة نهاية العام',
    type: 'year_end',
    hijriStart: '10/1/1448',
    hijriEnd: null,
    gregorianStart: '2026-06-25T00:00:00+03:00',
    gregorianEnd: '2026-06-25T00:00:00+03:00',
    description: 'نهاية دوام العام الدراسي 1447/1448.'
  },
  {
    id: '1448_school_start',
    year: 1448,
    name: 'بداية العام الدراسي',
    type: 'school_start',
    hijriStart: '10/3/1448',
    hijriEnd: null,
    gregorianStart: '2026-08-23T00:00:00+03:00',
    gregorianEnd: '2026-08-23T00:00:00+03:00',
    description: 'بداية العام الدراسي 1448/1449.'
  },
  {
    id: '1448_admin_return',
    year: 1448,
    name: 'عودة الإداريين',
    type: 'administration',
    hijriStart: '28/2/1448',
    hijriEnd: null,
    gregorianStart: '2026-08-11T00:00:00+03:00',
    gregorianEnd: '2026-08-11T00:00:00+03:00',
    description: 'عودة الإداريين إلى المدارس للعام الدراسي 1448/1449.'
  },
  {
    id: '1448_teachers_return',
    year: 1448,
    name: 'عودة المعلمين',
    type: 'teachers',
    hijriStart: '3/3/1448',
    hijriEnd: null,
    gregorianStart: '2026-08-16T00:00:00+03:00',
    gregorianEnd: '2026-08-16T00:00:00+03:00',
    description: 'عودة المعلمين الممارسين للتدريس.'
  },
  {
    id: '1448_national_day',
    year: 1448,
    name: 'اليوم الوطني',
    type: 'national_day',
    hijriStart: '12/4/1448',
    hijriEnd: '15/4/1448',
    gregorianStart: '2026-09-23T00:00:00+03:00',
    gregorianEnd: '2026-09-26T00:00:00+03:00',
    description: 'إجازة اليوم الوطني السعودي.'
  },
  {
    id: '1448_fall_break',
    year: 1448,
    name: 'إجازة الخريف',
    type: 'fall_break',
    hijriStart: '10/6/1448',
    hijriEnd: '18/6/1448',
    gregorianStart: '2026-11-20T00:00:00+03:00',
    gregorianEnd: '2026-11-28T00:00:00+03:00',
    description: 'إجازة الخريف للعام 1448.'
  },
  {
    id: '1448_mid_year',
    year: 1448,
    name: 'إجازة منتصف العام',
    type: 'mid_year',
    hijriStart: '30/7/1448',
    hijriEnd: '8/8/1448',
    gregorianStart: '2027-01-08T00:00:00+03:00',
    gregorianEnd: '2027-01-16T00:00:00+03:00',
    description: 'إجازة منتصف العام للعام 1448.'
  },
  {
    id: '1448_foundation_day',
    year: 1448,
    name: 'يوم التأسيس',
    type: 'foundation_day',
    hijriStart: '12/9/1448',
    hijriEnd: '15/9/1448',
    gregorianStart: '2027-02-19T00:00:00+03:00',
    gregorianEnd: '2027-02-22T00:00:00+03:00',
    description: 'إجازة يوم التأسيس.'
  },
  {
    id: '1448_eid_fitr',
    year: 1448,
    name: 'عيد الفطر',
    type: 'eid_fitr',
    hijriStart: '19/9/1448',
    hijriEnd: '3/10/1448',
    gregorianStart: '2027-02-26T00:00:00+03:00',
    gregorianEnd: '2027-03-13T00:00:00+03:00',
    description: 'إجازة عيد الفطر المبارك.'
  },
  {
    id: '1448_eid_adha',
    year: 1448,
    name: 'عيد الأضحى',
    type: 'eid_adha',
    hijriStart: '3/12/1448',
    hijriEnd: '16/12/1448',
    gregorianStart: '2027-05-07T00:00:00+03:00',
    gregorianEnd: '2027-05-22T00:00:00+03:00',
    description: 'إجازة عيد الأضحى.'
  },
  {
    id: '1448_year_end',
    year: 1448,
    name: 'إجازة نهاية العام',
    type: 'year_end',
    hijriStart: '19/1/1449',
    hijriEnd: null,
    gregorianStart: '2027-06-24T00:00:00+03:00',
    gregorianEnd: '2027-06-24T00:00:00+03:00',
    description: 'نهاية العام الدراسي 1448/1449.'
  },
  {
    id: '1449_admin_return',
    year: 1449,
    name: 'عودة الإداريين',
    type: 'administration',
    hijriStart: '8/3/1449',
    hijriEnd: null,
    gregorianStart: '2027-08-10T00:00:00+03:00',
    gregorianEnd: '2027-08-10T00:00:00+03:00',
    description: 'عودة الإداريين إلى المدارس للعام 1449/1450.'
  },
  {
    id: '1449_teachers_return',
    year: 1449,
    name: 'عودة المعلمين',
    type: 'teachers',
    hijriStart: '13/3/1449',
    hijriEnd: null,
    gregorianStart: '2027-08-15T00:00:00+03:00',
    gregorianEnd: '2027-08-15T00:00:00+03:00',
    description: 'عودة المعلمين الممارسين للتدريس.'
  },
  {
    id: '1449_school_start',
    year: 1449,
    name: 'بداية العام الدراسي',
    type: 'school_start',
    hijriStart: '20/3/1449',
    hijriEnd: null,
    gregorianStart: '2027-08-22T00:00:00+03:00',
    gregorianEnd: '2027-08-22T00:00:00+03:00',
    description: 'بداية العام الدراسي 1449/1450.'
  },
  {
    id: '1449_national_day',
    year: 1449,
    name: 'اليوم الوطني',
    type: 'national_day',
    hijriStart: '22/4/1449',
    hijriEnd: null,
    gregorianStart: '2027-09-23T00:00:00+03:00',
    gregorianEnd: '2027-09-23T00:00:00+03:00',
    description: 'إجازة اليوم الوطني.'
  },
  {
    id: '1449_fall_break',
    year: 1449,
    name: 'إجازة الخريف',
    type: 'fall_break',
    hijriStart: '20/6/1449',
    hijriEnd: '28/6/1449',
    gregorianStart: '2027-11-19T00:00:00+03:00',
    gregorianEnd: '2027-11-27T00:00:00+03:00',
    description: 'إجازة الخريف للعام 1449.'
  },
  {
    id: '1449_mid_year',
    year: 1449,
    name: 'إجازة منتصف العام',
    type: 'mid_year',
    hijriStart: '10/8/1449',
    hijriEnd: '18/8/1449',
    gregorianStart: '2028-01-07T00:00:00+03:00',
    gregorianEnd: '2028-01-15T00:00:00+03:00',
    description: 'إجازة منتصف العام للعام 1449.'
  },
  {
    id: '1449_eid_fitr',
    year: 1449,
    name: 'عيد الفطر',
    type: 'eid_fitr',
    hijriStart: '22/9/1449',
    hijriEnd: '10/10/1449',
    gregorianStart: '2028-02-18T00:00:00+03:00',
    gregorianEnd: '2028-03-04T00:00:00+03:00',
    description: 'إجازة عيد الفطر.'
  },
  {
    id: '1449_eid_adha',
    year: 1449,
    name: 'عيد الأضحى',
    type: 'eid_adha',
    hijriStart: '3/12/1449',
    hijriEnd: '18/12/1449',
    gregorianStart: '2028-04-28T00:00:00+03:00',
    gregorianEnd: '2028-05-13T00:00:00+03:00',
    description: 'إجازة عيد الأضحى.'
  },
  {
    id: '1449_year_end',
    year: 1449,
    name: 'إجازة نهاية العام',
    type: 'year_end',
    hijriStart: '29/1/1450',
    hijriEnd: null,
    gregorianStart: '2028-06-22T00:00:00+03:00',
    gregorianEnd: '2028-06-22T00:00:00+03:00',
    description: 'نهاية العام الدراسي 1449/1450.'
  },
  {
    id: '1450_admin_return',
    year: 1450,
    name: 'عودة الإداريين',
    type: 'administration',
    hijriStart: '17/3/1450',
    hijriEnd: null,
    gregorianStart: '2028-08-08T00:00:00+03:00',
    gregorianEnd: '2028-08-08T00:00:00+03:00',
    description: 'عودة الإداريين للعام 1450/1451.'
  },
  {
    id: '1450_teachers_return',
    year: 1450,
    name: 'عودة المعلمين',
    type: 'teachers',
    hijriStart: '22/3/1450',
    hijriEnd: null,
    gregorianStart: '2028-08-13T00:00:00+03:00',
    gregorianEnd: '2028-08-13T00:00:00+03:00',
    description: 'عودة المعلمين.'
  },
  {
    id: '1450_school_start',
    year: 1450,
    name: 'بداية العام الدراسي',
    type: 'school_start',
    hijriStart: '29/3/1450',
    hijriEnd: null,
    gregorianStart: '2028-08-20T00:00:00+03:00',
    gregorianEnd: '2028-08-20T00:00:00+03:00',
    description: 'بداية العام الدراسي 1450/1451.'
  },
  {
    id: '1450_national_day',
    year: 1450,
    name: 'اليوم الوطني',
    type: 'national_day',
    hijriStart: '5/5/1450',
    hijriEnd: null,
    gregorianStart: '2028-09-24T00:00:00+03:00',
    gregorianEnd: '2028-09-24T00:00:00+03:00',
    description: 'إجازة اليوم الوطني.'
  },
  {
    id: '1450_fall_break',
    year: 1450,
    name: 'إجازة الخريف',
    type: 'fall_break',
    hijriStart: '30/6/1450',
    hijriEnd: '8/7/1450',
    gregorianStart: '2028-11-17T00:00:00+03:00',
    gregorianEnd: '2028-11-25T00:00:00+03:00',
    description: 'إجازة الخريف للعام 1450.'
  },
  {
    id: '1450_mid_year',
    year: 1450,
    name: 'إجازة منتصف العام',
    type: 'mid_year',
    hijriStart: '20/8/1450',
    hijriEnd: '28/8/1450',
    gregorianStart: '2029-01-05T00:00:00+03:00',
    gregorianEnd: '2029-01-13T00:00:00+03:00',
    description: 'إجازة منتصف العام 1450.'
  },
  {
    id: '1450_eid_fitr',
    year: 1450,
    name: 'عيد الفطر',
    type: 'eid_fitr',
    hijriStart: '18/9/1450',
    hijriEnd: '11/10/1450',
    gregorianStart: '2029-02-02T00:00:00+03:00',
    gregorianEnd: '2029-02-24T00:00:00+03:00',
    description: 'إجازة عيد الفطر.'
  },
  {
    id: '1450_spring_break',
    year: 1450,
    name: 'إجازة الربيع',
    type: 'spring_break',
    hijriStart: '9/11/1450',
    hijriEnd: '15/11/1450',
    gregorianStart: '2029-03-16T00:00:00+03:00',
    gregorianEnd: '2029-03-24T00:00:00+03:00',
    description: 'إجازة الربيع لهذا العام.'
  },
  {
    id: '1450_eid_adha',
    year: 1450,
    name: 'عيد الأضحى',
    type: 'eid_adha',
    hijriStart: '5/12/1450',
    hijriEnd: '15/12/1450',
    gregorianStart: '2029-04-19T00:00:00+03:00',
    gregorianEnd: '2029-04-29T00:00:00+03:00',
    description: 'إجازة عيد الأضحى.'
  },
  {
    id: '1450_year_end',
    year: 1450,
    name: 'إجازة نهاية العام',
    type: 'year_end',
    hijriStart: '16/2/1451',
    hijriEnd: null,
    gregorianStart: '2029-06-28T00:00:00+03:00',
    gregorianEnd: '2029-06-28T00:00:00+03:00',
    description: 'نهاية العام الدراسي 1450/1451.'
  }
];

// Export for usage in other scripts
if (typeof window !== 'undefined') {
  window.calendarEvents = calendarEvents;
}