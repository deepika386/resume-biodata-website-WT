$(function () {

  // Light / dark theme (remembered)
  if (localStorage.getItem('theme') === 'dark') $('body').addClass('dark');
  $('#theme').on('click', function () {
    $('body').toggleClass('dark');
    localStorage.setItem('theme', $('body').hasClass('dark') ? 'dark' : 'light');
  });

  // Header shadow on scroll
  $(window).on('scroll', function () {
    $('header').toggleClass('scrolled', $(this).scrollTop() > 10);
  });

  // Scroll reveal
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { $(e.target).addClass('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  $('.reveal').each(function () { io.observe(this); });

  // Animated counters
  $('.count').each(function () {
    var el = $(this),
        to = parseFloat(el.data('to')),
        dec = el.data('dec') || 0,
        suf = el.data('suf') || '';
    var co = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting) {
        $({ v: 0 }).animate({ v: to }, {
          duration: 1500,
          step: function (n) { el.text(n.toFixed(dec) + suf); }
        });
        co.disconnect();
      }
    });
    co.observe(this);
  });

  // Rotating role text on the home page
  var roles = ['Singer', 'Reader', 'Problem Solver', 'Lifelong Learner'];
  var r = 0;
  if ($('#role').length) {
    setInterval(function () {
      r = (r + 1) % roles.length;
      $('#role').fadeOut(300, function () { $(this).text(roles[r]).fadeIn(300); });
    }, 2400);
  }

  // Contact form: opens your mail app
  $('#send').on('click', function () {
    var n = $('#n').val().trim(), m = $('#m').val().trim();
    if (!n || !m) { $('#msg').text('Please fill in both fields.'); return; }
    location.href = 'mailto:deepika054@gmail.com?subject=' +
      encodeURIComponent('Message from ' + n) + '&body=' + encodeURIComponent(m);
  });

});