      // 1. Theme Switcher Logic
        function toggleDarkMode() {
            const html = document.documentElement;
            if (html.classList.contains('dark')) {
                html.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                html.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        }

        // Initialize Theme from localStorage or System Preference
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // 2. Mobile Navigation Toggle
        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }

        // 3. Category Filtering for Course Cards
        function filterCategory(category) {
            const cards = document.querySelectorAll('.course-card');
            const buttons = document.querySelectorAll('.cat-btn');

            buttons.forEach(btn => {
                btn.classList.remove('bg-sky-600', 'text-white');
                btn.classList.add('bg-slate-200', 'dark:bg-slate-700', 'text-slate-700', 'dark:text-slate-200');
            });

            event.target.classList.remove('bg-slate-200', 'dark:bg-slate-700', 'text-slate-700', 'dark:text-slate-200');
            event.target.classList.add('bg-sky-600', 'text-white');

            cards.forEach(card => {
                if (category === 'all' || card.classList.contains(category)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // 4. Flashcard & Mini-Quiz Interactivity
        function toggleCardAnswer(cardId, answerText) {
            const el = document.getElementById(cardId);
            if (el.dataset.revealed === "true") {
                if (cardId === 'flashcard-stem') {
                    el.innerHTML = '<span>Click to Reveal: What is Newton\'s 2nd Law?</span>';
                } else {
                    el.innerHTML = '<span>Translate: "El conocimiento es poder"</span>';
                }
                el.dataset.revealed = "false";
            } else {
                el.innerHTML = `<span class="font-bold text-sky-600 dark:text-sky-400">${answerText}</span>`;
                el.dataset.revealed = "true";
            }
        }

        function checkMiniQuiz(button, isCorrect) {
            const container = button.closest('div');
            const feedback = container.parentElement.querySelector('.quiz-feedback');
            
            if (isCorrect) {
                feedback.textContent = "Correct! Great job!";
                feedback.className = "quiz-feedback text-xs mt-2 font-semibold text-center text-emerald-500 block";
            } else {
                feedback.textContent = "Incorrect. Try again!";
                feedback.className = "quiz-feedback text-xs mt-2 font-semibold text-center text-rose-500 block";
            }
        }

        // 5. Pomodoro Timer Logic
        let timerInterval = null;
        let totalSeconds = 25 * 60;

        function updateTimerDisplay() {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            document.getElementById('timer-display').textContent = display;
        }

        function startTimer() {
            if (timerInterval) return;
            timerInterval = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    alert('Pomodoro session completed! Time for a break.');
                }
            }, 1000);
        }

        function pauseTimer() {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        function resetTimer() {
            pauseTimer();
            totalSeconds = 25 * 60;
            updateTimerDisplay();
        }

        // 6. Quote Generator
        const quotes = [
            { quote: "Education is not the learning of facts, but the training of the mind to think.", author: "Albert Einstein" },
            { quote: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
            { quote: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
            { quote: "Investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
            { quote: "Tell me and I forget. Teach me and I remember. Involve me and I learn.", author: "Benjamin Franklin" }
        ];

        function generateRandomQuote() {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const selected = quotes[randomIndex];
            document.getElementById('quote-text').textContent = `"${selected.quote}"`;
            document.getElementById('quote-author').textContent = `— ${selected.author}`;
        }

        // 7. Search and Resource Filtering
        function filterContent() {
            const query = (document.getElementById('global-search').value || document.getElementById('mobile-search').value).toLowerCase();
            const cards = document.querySelectorAll('.course-card');

            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = text.includes(query) ? 'flex' : 'none';
            });
        }

        function filterResources() {
            const query = document.getElementById('resource-search').value.toLowerCase();
            const items = document.querySelectorAll('.resource-item');

            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(query) ? 'block' : 'none';
            });
        }

        // 8. Resource Modal & Simulated Download
        function openResourceModal(title, description) {
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-body').textContent = description;
            const modal = document.getElementById('resource-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }

        function closeResourceModal() {
            const modal = document.getElementById('resource-modal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }

        function downloadSimulatedFile(filename) {
            const dummyContent = "Simulated document content for: " + filename;
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(dummyContent));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }

        // 9. Newsletter Handler
        function handleNewsletter(event) {
            event.preventDefault();
            const emailInput = document.getElementById('newsletter-email');
            const msg = document.getElementById('newsletter-msg');
            if (emailInput.value) {
                msg.textContent = "Thank you for subscribing!";
                msg.classList.remove('hidden');
                emailInput.value = '';
                setTimeout(() => msg.classList.add('hidden'), 4000);
            }
        }
const openSidebarBtn = document.getElementById('open-sidebar-btn');
        const closeSidebarBtn = document.getElementById('close-sidebar-btn');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebar-overlay');
        const coursesToggle = document.getElementById('courses-toggle');
        const coursesDropdown = document.getElementById('courses-dropdown');

        function openSidebar() {
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
        }

        function closeSidebar() {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        }

        if (openSidebarBtn) openSidebarBtn.addEventListener('click', openSidebar);
        if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);