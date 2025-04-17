// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Khởi tạo các biến
  const startDate = new Date('2024-07-15');
  let currentSlide = 0;
  let audioPlaying = false; // Theo dõi trạng thái phát nhạc

  // ========== Hàm tiện ích ==========
  function getRandom(min, max) {
      return Math.random() * (max - min) + min;
  }

  // ========== Xử lý chuyển tab hành tinh ==========
  const planetBtns = document.querySelectorAll('.planet-btn');
  const planetContents = document.querySelectorAll('.planet-content');
  const planets = document.querySelectorAll('.planet');

  planetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
          // Xóa active class
          planetBtns.forEach(b => b.classList.remove('active'));
          planetContents.forEach(c => c.classList.remove('active'));
          planets.forEach(p => p.classList.remove('active'));

          // Thêm active class
          btn.classList.add('active');
          const targetContent = document.getElementById(`${btn.dataset.target}-content`);
          targetContent.classList.add('active');

          // Hiệu ứng chuyển động hành tinh
          planets.forEach(planet => {
              if (planet.dataset.planet === btn.dataset.target) {
                  planet.classList.add('active');
                  // Thêm hiệu ứng rung nhẹ khi chuyển hành tinh
                  planet.classList.add('animate__animated', 'animate__headShake');
                  setTimeout(() => planet.classList.remove('animate__animated', 'animate__headShake'), 1000);
              }
          });

          // Lưu trạng thái tab vào localStorage
          localStorage.setItem('lastVisitedPlanet', btn.dataset.target);
      });
  });

  // Tải trạng thái tab cuối cùng đã xem khi tải trang
  const lastVisitedPlanet = localStorage.getItem('lastVisitedPlanet');
  if (lastVisitedPlanet) {
      const targetBtn = document.querySelector(`.planet-btn[data-target="${lastVisitedPlanet}"]`);
      if (targetBtn) {
          targetBtn.click(); // Simulate a click to activate the tab
      }
  } else {
      // Mặc định hiển thị Trái Đất nếu chưa có trạng thái lưu
      document.querySelector('.planet-btn[data-target="earth"]').click();
  }

  // ========== Tạo sao băng ngẫu nhiên ==========
  function createShootingStar() {
      const star = document.createElement('div');
      star.className = 'shooting-star animate__animated animate__faster';
      const size = getRandom(2, 5);
      star.style.cssText = `
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          width: ${size}px;
          height: ${size}px;
          animation-delay: ${Math.random() * 5}s;
          animation-duration: ${getRandom(1, 3)}s;
      `;
      document.querySelector('.shooting-stars').appendChild(star);

      setTimeout(() => star.remove(), 5000);
  }
  setInterval(createShootingStar, 1500); // Tăng tần suất sao băng

  // ========== Hiệu ứng lấp lánh cho các vì sao ==========
  function createTwinklingStar() {
      const star = document.createElement('div');
      star.className = 'twinkling-star';
      const size = getRandom(1, 3);
      star.style.cssText = `
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          width: ${size}px;
          height: ${size}px;
          animation-delay: ${Math.random() * 5}s;
      `;
      document.querySelector('.stars').appendChild(star);
      setTimeout(() => star.remove(), 10000); // Thời gian tồn tại lâu hơn
  }
  setInterval(createTwinklingStar, 500);

  // ========== Xử lý carousel Mặt Trăng ==========
  const moonCarousel = document.getElementById('moon-carousel');
  const moonSlides = document.querySelectorAll('.moon-slide');
  const moonPrev = document.querySelector('.prev-moon');
  const moonNext = document.querySelector('.next-moon');

  function updateMoonCarousel() {
      const slideWidth = moonSlides[0].offsetWidth;
      moonCarousel.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  }

  moonPrev.addEventListener('click', () => {
      currentSlide = Math.max(currentSlide - 1, 0);
      updateMoonCarousel();
      // Thêm hiệu ứng nảy nhẹ
      moonCarousel.classList.add('animate__animated', 'animate__bounceInLeft');
      setTimeout(() => moonCarousel.classList.remove('animate__animated', 'animate__bounceInLeft'), 500);
  });

  moonNext.addEventListener('click', () => {
      currentSlide = Math.min(currentSlide + 1, moonSlides.length - 1);
      updateMoonCarousel();
      // Thêm hiệu ứng nảy nhẹ
      moonCarousel.classList.add('animate__animated', 'animate__bounceInRight');
      setTimeout(() => moonCarousel.classList.remove('animate__animated', 'animate__bounceInRight'), 500);
  });

  // Swipe functionality for moon carousel (optional, requires touch support)
  let touchStartX = null;
  moonCarousel.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
  });

  moonCarousel.addEventListener('touchend', (e) => {
      if (touchStartX === null) {
          return;
      }

      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchStartX - touchEndX;

      if (deltaX > 50) { // Swipe left
          moonNext.click();
      } else if (deltaX < -50) { // Swipe right
          moonPrev.click();
      }
      touchStartX = null;
  });

  // ========== Bộ đếm thời gian yêu nhau ==========
  const daysElement = document.getElementById('days');
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');

  function updateCountdown() {
      const now = new Date();
      const diff = now - startDate;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      daysElement.textContent = days;
      hoursElement.textContent = hours.toString().padStart(2, '0');
      minutesElement.textContent = minutes.toString().padStart(2, '0');
      secondsElement.textContent = seconds.toString().padStart(2, '0');

      // Thêm hiệu ứng nhịp tim cho bộ đếm thời gian
      daysElement.classList.add('animate__animated', 'animate__pulse');
      hoursElement.classList.add('animate__animated', 'animate__pulse');
      minutesElement.classList.add('animate__animated', 'animate__pulse');
      secondsElement.classList.add('animate__animated', 'animate__pulse');
      setTimeout(() => {
          daysElement.classList.remove('animate__animated', 'animate__pulse');
          hoursElement.classList.remove('animate__animated', 'animate__pulse');
          minutesElement.classList.remove('animate__animated', 'animate__pulse');
          secondsElement.classList.remove('animate__animated', 'animate__pulse');
      }, 1000);
  }
  setInterval(updateCountdown, 1000);
  updateCountdown();

  // ========== Xử lý trình phát nhạc ==========
  const audio = document.getElementById('bgMusic');
  const playBtn = document.getElementById('play-btn');
  const volumeControl = document.getElementById('volume');
  const songTitleElement = document.querySelector('.song-title');
  const progressBar = document.querySelector('.progress-bar');
  const progress = document.querySelector('.progress');

  playBtn.addEventListener('click', () => {
      if (audio.paused) {
          audio.play();
          playBtn.innerHTML = '<i class="fas fa-pause"></i>';
          audioPlaying = true;
      } else {
          audio.pause();
          playBtn.innerHTML = '<i class="fas fa-play"></i>';
          audioPlaying = false;
      }
  });

  volumeControl.addEventListener('input', (e) => {
      audio.volume = e.target.value;
  });

  // Cập nhật thanh tiến trình nhạc
  audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
          const progressPercent = (audio.currentTime / audio.duration) * 100;
          progress.style.width = `${progressPercent}%`;
      }
  });

  // Tua nhạc khi click vào thanh tiến trình
  progressBar.addEventListener('click', (e) => {
      const progressBarWidth = progressBar.offsetWidth;
      const clickPosition = e.offsetX;
      const seekTime = (clickPosition / progressBarWidth) * audio.duration;
      audio.currentTime = seekTime;
  });

  // Hiển thị tên bài hát (you might want to fetch this dynamically)
  songTitleElement.textContent = "Bài Hát Tình Yêu Của Chúng Ta";

  // ========== Xử lý gửi tin nhắn ==========
  const messageBtn = document.getElementById('send-message');
  const messagesContainer = document.getElementById('messages-container');

  messageBtn.addEventListener('click', () => {
      const messageInput = document.querySelector('.capsule-form textarea');
      const message = messageInput.value.trim();
      if (message) {
          const messageElement = document.createElement('div');
          messageElement.className = 'message-bubble animate__animated animate__fadeInUp';
          messageElement.textContent = message;
          messagesContainer.appendChild(messageElement);

          // Hiệu ứng message bay lên và mờ dần
          setTimeout(() => {
              messageElement.classList.add('animate__animated', 'animate__fadeOut', 'flying-message');
              setTimeout(() => messageElement.remove(), 1000); // Thời gian bay và mờ dần
          }, 2000); // Hiển thị tin nhắn trong 2 giây trước khi bay

          // Xóa nội dung textarea
          messageInput.value = '';

          // Lưu tin nhắn vào localStorage (tùy chọn)
          let savedMessages = localStorage.getItem('loveMessages');
          savedMessages = savedMessages ? JSON.parse(savedMessages) : [];
          savedMessages.push({ text: message, timestamp: new Date().toLocaleString() });
          localStorage.setItem('loveMessages', JSON.stringify(savedMessages));
      }
  });

  // Hiển thị tin nhắn đã lưu (tùy chọn)
  function displaySavedMessages() {
      const savedMessages = localStorage.getItem('loveMessages');
      if (savedMessages) {
          JSON.parse(savedMessages).forEach(msg => {
              const messageElement = document.createElement('div');
              messageElement.className = 'message-bubble saved'; // Add a class for saved messages
              messageElement.textContent = msg.text;
              messagesContainer.appendChild(messageElement);
          });
      }
  }
  // displaySavedMessages(); // Uncomment this line to show saved messages on load

  // ========== Hiệu ứng hover cho các feature ==========
  document.querySelectorAll('.feature').forEach(feature => {
      feature.addEventListener('mouseenter', () => {
          feature.style.transform = 'rotateY(180deg)';
          // Thêm hiệu ứng phóng to nhẹ
          feature.classList.add('animate__animated', 'animate__pulse');
      });
      feature.addEventListener('mouseleave', () => {
          feature.style.transform = 'rotateY(0deg)';
          feature.classList.remove('animate__animated', 'animate__pulse');
      });
  });

  // ========== Hiệu ứng parallax cho các hành tinh ==========
  window.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      document.querySelectorAll('.planet').forEach(planet => {
          const speed = parseFloat(planet.dataset.speed) || 0.03; // Thêm thuộc tính data-speed cho từng hành tinh để điều chỉnh tốc độ
          const xOffset = (x - 0.5) * speed * 50; // Giảm biên độ để hiệu ứng tinh tế hơn
          const yOffset = (y - 0.5) * speed * 50;
          planet.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
  });

  // Thêm thuộc tính data-speed vào các hành tinh trong HTML để điều chỉnh tốc độ parallax
  // Ví dụ: <div class="planet earth" data-planet="earth" data-speed="0.02"></div>
  //        <div class="planet moon" data-planet="moon" data-speed="0.05"></div>

  // ========== Hiệu ứng đặc biệt cho tàu vũ trụ khi hover ==========
  const spaceship = document.querySelector('.spaceship');
  spaceship.addEventListener('mouseenter', () => {
      spaceship.classList.add('animate__animated', 'animate__swing');
  });
  spaceship.addEventListener('mouseleave', () => {
      spaceship.classList.remove('animate__animated', 'animate__swing');
  });

  // ========== Hiệu ứng "ngôi sao băng" đặc biệt khi click vào tiêu đề ==========
  const headerTitle = document.querySelector('.glowing-text');
  headerTitle.addEventListener('click', () => {
      for (let i = 0; i < 5; i++) { // Tạo nhiều sao băng hơn
          setTimeout(createSpecialShootingStar, i * 200); // Tạo hiệu ứng so le
      }
  });

  function createSpecialShootingStar() {
      const specialStar = document.createElement('div');
      specialStar.className = 'shooting-star special animate__animated animate__faster';
      const startX = getRandom(10, 90);
      const startY = getRandom(10, 30);
      const size = getRandom(4, 8);
      const duration = getRandom(1, 2);
      const angle = getRandom(-30, 30); // Góc bay ngẫu nhiên

      specialStar.style.cssText = `
          left: ${startX}vw;
          top: ${startY}vh;
          width: ${size}px;
          height: ${size}px;
          animation-duration: ${duration}s;
          transform: rotate(${angle}deg);
      `;
      document.querySelector('.shooting-stars').appendChild(specialStar);
      setTimeout(() => specialStar.remove(), duration * 1000 + 1000);
  }

  // ========== Hiệu ứng nhấp nháy nhẹ cho tiêu đề ==========
  setInterval(() => {
      headerTitle.classList.toggle('animate__animated');
      headerTitle.classList.toggle('animate__flash');
      setTimeout(() => {
          headerTitle.classList.toggle('animate__animated');
          headerTitle.classList.toggle('animate__flash');
      }, 1000);
  }, 5000);

  // Thêm thư viện Animate.css để có các hiệu ứng đẹp mắt
  // Bạn cần thêm link vào phần <head> của file HTML:
  // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
});