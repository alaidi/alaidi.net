/* Arabic interface, EN <-> AR.

   The site has no build step and its header, footer, breadcrumbs and syllabus
   headings are byte-identical in all 16 pages, so one text-keyed dictionary
   swaps them with no per-page markup to keep in sync. Requested as
   i18n.js?v=<sha1> and cached for a year, exactly like style.css -- bump the
   hash in all 16 pages when you edit this file.

   ponytail: whole-string exact matches only, so one English string gets one
   Arabic rendering everywhere it appears. Two renderings needed -> stop using
   the dictionary for that string and give it .en / .ar siblings instead, which
   is what the multi-sentence prose on about-me/ and privacy-policy/ already
   does (see the .en/.ar rules in style.css).

   Course titles and syllabus topics stay in English on purpose: that is the
   vocabulary the lecture slides and the exams use.

   Nothing else depends on this file. If it fails to load the page is simply
   English, and the AR button does nothing. */
(function () {
  var D = {
    /* chrome */
    "Skip to content": "تخطي إلى المحتوى",
    "Home": "الرئيسية",
    "About me": "نبذة عني",
    "Toggle dark mode": "تبديل الوضع الداكن",
    "Breadcrumb": "مسار التصفح",
    "Privacy Policy": "سياسة الخصوصية",
    "Abdul Hadi Web Site": "موقع عبد الهادي",
    "— Abdul Hadi Web Site": "— موقع عبد الهادي",
    "© 2026 alaidi. All Rights Reserved. ·": "© 2026 alaidi. جميع الحقوق محفوظة. ·",

    /* home page */
    "Courses": "المقررات الدراسية",
    "Layout": "طريقة العرض",
    "Cards": "بطاقات",
    "Table": "جدول",
    "Search lectures, topics and courses": "ابحث في المحاضرات والمواضيع والمقررات",

    /* terms -- these must stay in step with the section ids on index.html */
    "Fall 2026": "خريف 2026",
    "Spring 2026": "ربيع 2026",
    "Fall 2025": "خريف 2025",
    "Spring 2025": "ربيع 2025",
    "Fall 2024": "خريف 2024",

    /* course pages.
       ponytail: "ملف" / "ملفات" ignores Arabic's 3-10 vs 11+ number agreement
       ("14 ملفات" should strictly be "14 ملفاً"). Clear enough to read; add a
       real plural rule only if someone actually complains. */
    "file": "ملف",
    "files": "ملفات",
    "to download": "للتحميل",
    "Text Book": "الكتاب المنهجي",
    "Syllabus": "المفردات الدراسية",
    "Week": "الأسبوع",
    "Date": "التاريخ",
    "Covered Topics": "المواضيع المشمولة",
    "Comments": "ملاحظات",

    /* about me -- short labels only; the bio paragraphs are .en/.ar in the page */
    "Professor, College of Computer Science and Information Technology, Wasit University":
      "أستاذ في كلية علوم الحاسوب وتكنولوجيا المعلومات، جامعة واسط",
    "Developer & Professor": "مطوّر وأستاذ",
    "Abdul Hadi M. Alaidi": "عبد الهادي محمد العايدي",
    "Recent Publications": "أحدث المنشورات",
    "Authors": "المؤلفون",
    "Experience & Education": "الخبرات والمؤهلات العلمية",
    "Bachelor’s Degree in Computer Science": "بكالوريوس في علوم الحاسوب",
    "Science College, Mustansiriya University, Iraq": "كلية العلوم، الجامعة المستنصرية، العراق",
    "Master’s Degree in Computer Science": "ماجستير في علوم الحاسوب",
    "Engineering College, Bridgeport University, USA": "كلية الهندسة، جامعة بريدجبورت، الولايات المتحدة",
    "Assistant Lecturer": "مدرّس مساعد",
    "Academic Title": "اللقب العلمي",
    "Computer Center Director": "مدير مركز الحاسبة",
    "Wasit University": "جامعة واسط",
    "Lecturer": "مدرّس",
    "Electrical Department Coordinator": "مقرر قسم الهندسة الكهربائية",
    "College of Engineering, Wasit University": "كلية الهندسة، جامعة واسط",
    "Assistant Professor": "أستاذ مساعد",
    "Professor": "أستاذ",
    "Doctorate (PhD) in Information Technology": "دكتوراه في تقنية المعلومات",
    "Uniten, Malaysia": "جامعة تناغا الوطنية، ماليزيا",
    "Assistant Dean": "معاون العميد",
    "College of Computer Science and Information Technology, Wasit University":
      "كلية علوم الحاسوب وتكنولوجيا المعلومات، جامعة واسط",
    "2025-02-17 – Present": "2025-02-17 – حتى الآن",

    /* 404 */
    "Page not found": "الصفحة غير موجودة",
    "That address does not exist on this site. It may have moved when the site was rebuilt.":
      "هذا العنوان غير موجود في هذا الموقع. ربما تغيّر عند إعادة بناء الموقع.",
    "Go to the course list": "الذهاب إلى قائمة المقررات",

    /* built at query time by the search box on index.html, via window.t() */
    "result": "نتيجة",
    "results": "نتائج",
    "for": "عن",
    "Nothing matches": "لا توجد نتائج لـ",
    "Try a course name, a lecture title, or a topic.": "جرّب اسم مقرر أو عنوان محاضرة أو موضوعاً.",
    "Search is unavailable right now.": "البحث غير متاح حالياً."
  };

  var R = document.documentElement,
      text = [], attrs = [], node,
      walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

  /* snapshot every translatable text node once, so switching back is a restore
     rather than a reverse lookup (which would break on any shared translation) */
  while ((node = walk.nextNode()))
    if (D[node.data.trim()]) text.push([node, node.data]);

  ["aria-label", "placeholder"].forEach(function (a) {
    document.querySelectorAll("[" + a + "]").forEach(function (el) {
      if (D[el.getAttribute(a)]) attrs.push([el, a, el.getAttribute(a)]);
    });
  });

  var btn = document.querySelector("[data-lang-toggle]");

  function set(lang) {
    var ar = lang === "ar";
    R.lang = ar ? "ar" : "en";
    R.dir = ar ? "rtl" : "ltr";
    text.forEach(function (p) {
      /* keep the original padding: " — Abdul Hadi Web Site" must not lose its
         leading space or it collides with the <strong> before it */
      var m = p[1].match(/^(\s*)([\s\S]*?)(\s*)$/);
      p[0].data = ar ? m[1] + D[m[2]] + m[3] : p[1];
    });
    attrs.forEach(function (p) { p[0].setAttribute(p[1], ar ? D[p[2]] : p[2]); });
    if (btn) {
      btn.textContent = ar ? "EN" : "ع";
      btn.lang = ar ? "en" : "ar";
      btn.setAttribute("aria-label", ar ? "English" : "العربية");
    }
    try { localStorage.setItem("lang", R.lang); } catch (e) {}
  }

  if (btn) btn.addEventListener("click", function () {
    set(R.lang === "ar" ? "en" : "ar");
  });

  /* the inline <head> script has already set lang/dir to avoid a flash of the
     wrong direction; this fills in the text it could not reach that early */
  if (R.lang === "ar") set("ar");

  /* the home-page search builds its result strings after this has run */
  window.t = function (s) { return R.lang === "ar" && D[s] ? D[s] : s; };
})();
