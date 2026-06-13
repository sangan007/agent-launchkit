/* ----------------------------------------------------
   THE ONE-PERSON AGENCY LAUNCHKIT — INTERACTIVE ENGINE
   A fluid, light, and performance-optimized script.
   ---------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Elements ---
    const progressBar = document.getElementById('progress-bar');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const bodyElement = document.body;
    
    // Calculator Elements
    const inquiriesInput = document.getElementById('inquiries-input');
    const inquiriesVal = document.getElementById('inquiries-val');
    const timeInput = document.getElementById('time-input');
    const timeVal = document.getElementById('time-val');
    const paymentInput = document.getElementById('payment-input');
    const paymentVal = document.getElementById('payment-val');
    
    const hoursWastedText = document.getElementById('hours-wasted');
    const hoursSavedText = document.getElementById('hours-saved');
    const costSavedText = document.getElementById('cost-saved');
    
    // Checklist Elements
    const checklistCbs = document.querySelectorAll('.checklist-cb');
    const overallPercentageText = document.getElementById('overall-percentage');
    const overallProgressFill = document.getElementById('overall-progress-fill');

    // --- 1. Reading Progress Meter ---
    const updateScrollProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${scrollPercent}%`;
    };
    
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial check

    // --- 2. Stark Theme Toggle ---
    const initTheme = () => {
        const savedTheme = localStorage.getItem('launchkit-theme');
        
        if (savedTheme === 'light') {
            bodyElement.classList.remove('dark-mode');
            bodyElement.classList.add('light-mode');
        } else {
            // Default is Dark Mode
            bodyElement.classList.remove('light-mode');
            bodyElement.classList.add('dark-mode');
        }
    };

    themeToggleBtn.addEventListener('click', () => {
        if (bodyElement.classList.contains('dark-mode')) {
            bodyElement.classList.remove('dark-mode');
            bodyElement.classList.add('light-mode');
            localStorage.setItem('launchkit-theme', 'light');
        } else {
            bodyElement.classList.remove('light-mode');
            bodyElement.classList.add('dark-mode');
            localStorage.setItem('launchkit-theme', 'dark');
        }
    });

    initTheme();

    // --- 3. Interactive ROI Calculator ---
    const calculateROI = () => {
        const inquiries = parseInt(inquiriesInput.value, 10);
        const negotiationTime = parseInt(timeInput.value, 10);
        const billingTime = parseInt(paymentInput.value, 10);
        
        // Update slider numeric displays
        inquiriesVal.textContent = inquiries;
        timeVal.textContent = `${negotiationTime} mins`;
        paymentVal.textContent = `${billingTime} hrs`;
        
        // Math Engine
        // Monthly negotiation time in hours = (Inquiries * Negotiation Time) / 60
        const monthlyNegotiationHours = (inquiries * negotiationTime) / 60;
        // Total monthly administrative hours = negotiation hours + manual billing reconciliation hours
        const monthlyWastedHours = Math.round(monthlyNegotiationHours + billingTime);
        const annualSavedHours = monthlyWastedHours * 12;
        
        // Financial conversions (estimated standard rate of ₹1,500 / hr)
        const hourlyRateINR = 1500;
        const annualMoneySaved = annualSavedHours * hourlyRateINR;
        
        // Update dashboard values
        animateValueUpdate(hoursWastedText, parseInt(hoursWastedText.textContent, 10) || 0, monthlyWastedHours);
        animateValueUpdate(hoursSavedText, parseInt(hoursSavedText.textContent, 10) || 0, annualSavedHours);
        
        // Format Currency dynamically
        costSavedText.textContent = `₹${annualMoneySaved.toLocaleString('en-IN')}`;
    };

    // Smooth value counter transitions
    const animateValueUpdate = (element, start, end) => {
        if (start === end) return;
        const duration = 200; // ms
        const startTime = performance.now();
        
        const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = end;
            }
        };
        requestAnimationFrame(step);
    };

    // Listeners for sliders
    inquiriesInput.addEventListener('input', calculateROI);
    timeInput.addEventListener('input', calculateROI);
    paymentInput.addEventListener('input', calculateROI);
    
    // Run initial calculator logic
    calculateROI();

    // --- 4. Persistent Checklists & Overall Progress Dashboard ---
    const progressStorageKey = 'launchkit-progress';

    const getStoredProgress = () => {
        const stored = localStorage.getItem(progressStorageKey);
        return stored ? JSON.parse(stored) : {};
    };

    const saveProgress = (chapter, index, isChecked) => {
        const currentProgress = getStoredProgress();
        if (!currentProgress[chapter]) {
            currentProgress[chapter] = [];
        }
        currentProgress[chapter][index] = isChecked;
        localStorage.setItem(progressStorageKey, JSON.stringify(currentProgress));
    };

    const updateOverallProgress = () => {
        const totalItems = checklistCbs.length;
        let checkedItemsCount = 0;
        
        checklistCbs.forEach(cb => {
            if (cb.checked) {
                checkedItemsCount++;
            }
        });
        
        const percentage = totalItems > 0 ? Math.round((checkedItemsCount / totalItems) * 100) : 0;
        
        overallPercentageText.textContent = `${percentage}%`;
        overallProgressFill.style.width = `${percentage}%`;
    };

    const initChecklists = () => {
        const storedProgress = getStoredProgress();
        
        checklistCbs.forEach(cb => {
            const chapter = cb.closest('.checklist-items').getAttribute('data-chapter');
            const index = cb.getAttribute('data-index');
            
            if (storedProgress[chapter] && storedProgress[chapter][index] === true) {
                cb.checked = true;
            } else {
                cb.checked = false;
            }
            
            // Add click state listener
            cb.addEventListener('change', (e) => {
                saveProgress(chapter, index, e.target.checked);
                updateOverallProgress();
            });
        });
        
        updateOverallProgress();
    };

    initChecklists();

    // --- 5. Scroll Reveal Observer ---
    const initScrollReveal = () => {
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Stop observing once animated in
                    observer.unobserve(entry.target);
                }
            });
        };
        
        const revealObserver = new IntersectionObserver(revealCallback, {
            root: null,
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    };
    initScrollReveal();

    // --- 6. Local AI Launch-Strategist Engine ---
    const initAiStrategist = () => {
        const chatBody = document.getElementById('ai-chat-body');
        const chatControls = document.getElementById('ai-chat-controls');
        if (!chatBody || !chatControls) return;

        let userRole = '';
        let userBottleneck = '';

        const appendUserMessage = (text) => {
            const bubble = document.createElement('div');
            bubble.className = 'chat-message user-message';
            bubble.innerHTML = `
                <div class="avatar">ME</div>
                <div class="message-content">
                    <p>${text}</p>
                </div>
            `;
            chatBody.appendChild(bubble);
            chatBody.scrollTop = chatBody.scrollHeight;
        };

        const appendAiMessageWithTyping = (text, delayMs, onComplete) => {
            const typingBubble = document.createElement('div');
            typingBubble.className = 'chat-message ai-message';
            typingBubble.innerHTML = `
                <div class="avatar">AI</div>
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            `;
            chatBody.appendChild(typingBubble);
            chatBody.scrollTop = chatBody.scrollHeight;

            setTimeout(() => {
                if (chatBody.contains(typingBubble)) {
                    chatBody.removeChild(typingBubble);
                }

                const bubble = document.createElement('div');
                bubble.className = 'chat-message ai-message';
                bubble.innerHTML = `
                    <div class="avatar">AI</div>
                    <div class="message-content">
                        <p>${text}</p>
                    </div>
                `;
                chatBody.appendChild(bubble);
                chatBody.scrollTop = chatBody.scrollHeight;

                if (onComplete) onComplete();
            }, delayMs);
        };

        const loadQ1 = () => {
            chatControls.innerHTML = '';
            
            const roles = [
                "Design/Development Freelancer",
                "Content Creator",
                "Local Agency Owner"
            ];

            roles.forEach(role => {
                const btn = document.createElement('button');
                btn.className = 'ai-choice-btn';
                btn.textContent = role;
                btn.addEventListener('click', () => {
                    userRole = role;
                    appendUserMessage(role);
                    chatControls.innerHTML = '';
                    
                    // Trigger dynamic AI typing animation before next question
                    appendAiMessageWithTyping(
                        `Excellent, running automation models tailored for a <strong>${role}</strong> profile. Let's trace your main operational issue: what is currently your biggest bottleneck?`,
                        800,
                        loadQ2
                    );
                });
                chatControls.appendChild(btn);
            });
        };

        const loadQ2 = () => {
            chatControls.innerHTML = '';

            const bottlenecks = [
                "Clients ghosting before paying",
                "Spending hours in WhatsApp DMs",
                "No professional portfolio site"
            ];

            bottlenecks.forEach(bn => {
                const btn = document.createElement('button');
                btn.className = 'ai-choice-btn';
                btn.textContent = bn;
                btn.addEventListener('click', () => {
                    userBottleneck = bn;
                    appendUserMessage(bn);
                    chatControls.innerHTML = '';

                    // Trigger 1.5s live-simulation typing indicator
                    appendAiMessageWithTyping(
                        "Processing decision nodes... Generating custom Launch Blueprint recommendation.",
                        1500,
                        showRecommendation
                    );
                });
                chatControls.appendChild(btn);
            });
        };

        const showRecommendation = () => {
            let chTag = '';
            let chTitle = '';
            let chRecText = '';
            let borderHighlight = '';
            let scrollTargetId = '';
            let flashClass = '';

            if (userBottleneck === "No professional portfolio site") {
                chTag = "SHOPFRONT PRIORITY";
                borderHighlight = "highlight-gold";
                chTitle = "Deploy Your Digital Shopfront";
                chRecText = "AI Recommendation: Your immediate priority is deploying a high-speed digital shopfront using Hostinger to build immediate authority. A slow portfolio or drive link kills trust. Establish unified pricing tiers.";
                scrollTargetId = "chapter1";
                flashClass = "flash-gold";
            } else if (userBottleneck === "Spending hours in WhatsApp DMs") {
                chTag = "INQUIRY INTAKE AUTO";
                borderHighlight = "highlight-magenta";
                chTitle = "Automate Intake & Pre-Qualification";
                chRecText = "AI Recommendation: Automate your intake pipeline instantly. Your custom link for Jotform AI Agents is ready to capture and organize your client data automatically. Stop wasting hours with unqualified inquiries.";
                scrollTargetId = "chapter2";
                flashClass = "flash-magenta";
            } else {
                // Clients ghosting before paying
                chTag = "REVENUE ASSURANCE FLOW";
                borderHighlight = "highlight-cyan";
                chTitle = "Deploy Automated Payment Gateway";
                chRecText = "AI Recommendation: Lock in your revenue instantly. Use your customized Razorpay portal link to secure automated UPI deposits upfront. Eliminate bank screenshot verifications entirely.";
                scrollTargetId = "chapter3";
                flashClass = "flash-cyan";
            }

            // Append Recommendation Dashboard Box directly inside chat flow
            const recommendationBox = document.createElement('div');
            recommendationBox.className = `ai-summary-box ${borderHighlight}`;
            recommendationBox.innerHTML = `
                <span class="summary-tag">${chTag}</span>
                <h4 class="summary-title">${chTitle}</h4>
                <p class="summary-recommendation">${chRecText}</p>
                <span class="summary-cta-note">🚀 Initiating deep-link auto-scroll preview and highlights below...</span>
            `;
            chatBody.appendChild(recommendationBox);
            chatBody.scrollTop = chatBody.scrollHeight;

            // Trigger visual scrolling and glowing flashes
            const targetSection = document.getElementById(scrollTargetId);
            if (targetSection) {
                // Clear any lingering highlights
                document.querySelectorAll('.chapter-section').forEach(sect => {
                    sect.classList.remove('flash-gold', 'flash-magenta', 'flash-cyan');
                });

                setTimeout(() => {
                    // Smoothly scroll the user to the target chapter section
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Add targeted glow effect class
                    targetSection.classList.add(flashClass);
                }, 400);
            }

            // Provide restart action
            const restartBtn = document.createElement('button');
            restartBtn.className = 'ai-choice-btn';
            restartBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 1rem; height: 1rem; margin-right: 0.5rem; display: inline-block; vertical-align: middle;">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
                </svg>
                Restart Strategist Consultation
            `;
            restartBtn.addEventListener('click', () => {
                chatBody.innerHTML = `
                    <div class="chat-message ai-message">
                        <div class="avatar">AI</div>
                        <div class="message-content">
                            <p>Hey! I am your local Launch Strategist. Let's customize your 45-minute automation pipeline.</p>
                            <p style="margin-top: 0.5rem; font-weight: 500;">What is your primary business goal or role?</p>
                        </div>
                    </div>
                `;
                userRole = '';
                userBottleneck = '';
                // Remove existing flashes
                document.querySelectorAll('.chapter-section').forEach(sect => {
                    sect.classList.remove('flash-gold', 'flash-magenta', 'flash-cyan');
                });
                loadQ1();
            });
            chatControls.appendChild(restartBtn);
        };

        // Initialize first conversational node
        loadQ1();
    };

    initAiStrategist();

    // --- 7. Parallax Scrolling Glow Blobs ---
    const initParallaxGlows = () => {
        const blobs = document.querySelectorAll('.cinematic-glow-blob');
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            blobs.forEach((blob, index) => {
                const speed = (index % 2 === 0 ? 0.08 : -0.06);
                const yPos = scrolled * speed;
                // Add yPos but maintain standard floating animation if applicable
                blob.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        });
    };

    initParallaxGlows();

});
