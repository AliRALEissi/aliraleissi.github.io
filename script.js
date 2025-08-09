
    // --- Dark mode toggle with localStorage ---
    (function(){
      const root = document.documentElement;
      const btn = document.getElementById('themeToggle');
      const icon = btn.querySelector('i');
      const stored = localStorage.getItem('theme') || 'light';
      if(stored === 'dark') document.body.classList.add('dark');
      const updateButton = ()=>{
        const isDark = document.body.classList.contains('dark');
        btn.setAttribute('aria-pressed', isDark);
        icon.className = isDark ? 'fa-solid fa-sun me-1' : 'fa-regular fa-moon me-1';
        btn.textContent = isDark ? ' Light' : ' Dark';
        btn.prepend(icon);
      };
      updateButton();
      btn.addEventListener('click', ()=>{
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
        updateButton();
      });
    })();

    // --- Project modal content ---
    (function(){
      const modal = document.getElementById('projectModal');
      modal.addEventListener('show.bs.modal', (e)=>{
        const button = e.relatedTarget;
        const key = button.getAttribute('data-project');
        const body = document.getElementById('projectModalBody');
        const codeBtn = document.getElementById('projectModalCode');
        const projects = {
          samco: {
            title: 'SAMCO Workflow Automation',
            desc: `
              <div class="mb-4">
                <h4>SAMCO Workflow Automation</h4>
                <p class="text-muted">Professional Project | Java, PHP, MySQL, Spring Boot</p>
              </div>
              
              <p>This full-stack web application was developed to streamline case management processes across multiple departments at SAMCO. By automating previously manual workflows, the system has significantly reduced processing time and eliminated common errors.</p>
              
              <h5 class="mt-4">Key Features</h5>
              <ul>
                <li>Automated case routing across 8+ departments</li>
                <li>Role-based access control for different user types</li>
                <li>Real-time status tracking and notifications</li>
                <li>Comprehensive audit trail for all case activities</li>
                <li>Custom reporting module with data export capabilities</li>
              </ul>
              
              <h5 class="mt-4">Technical Highlights</h5>
              <ul>
                <li>Backend: Java with Spring Boot framework</li>
                <li>Frontend: React.js with Material UI components</li>
                <li>Database: MySQL with optimized query performance</li>
                <li>Security: JWT authentication with role-based permissions</li>
              </ul>
              
              <div class="alert alert-info mt-4">
                <i class="fas fa-chart-line me-2"></i>
                <strong>Impact:</strong> Projected to reduce repetitive tasks by ~50% and save hundreds of man-hours annually.
              </div>
            `,
            code: 'https://github.com/your-github/samco'
          },
          kali: {
            title: 'Kali Linux Security Lab',
            desc: `
              <div class="mb-4">
                <h4>Kali Linux Security Lab</h4>
                <p class="text-muted">Cybersecurity Project | Kali Linux, Wireshark, Nmap, Metasploit</p>
              </div>
              
              <p>A sandbox environment designed for practicing ethical hacking techniques in a controlled setting. This lab includes a series of documented exercises that cover essential cybersecurity skills.</p>
              
              <h5 class="mt-4">Lab Components</h5>
              <ul>
                <li>Vulnerability scanning with Nmap and OpenVAS</li>
                <li>Penetration testing using Metasploit framework</li>
                <li>Network traffic analysis with Wireshark</li>
                <li>Password cracking techniques</li>
                <li>Web application security testing</li>
              </ul>
              
              <h5 class="mt-4">Learning Objectives</h5>
              <ul>
                <li>Understanding common vulnerabilities and attack vectors</li>
                <li>Developing secure coding practices</li>
                <li>Learning to analyze and interpret security logs</li>
                <li>Implementing security hardening techniques</li>
                <li>Creating comprehensive security reports</li>
              </ul>
              
              <div class="alert alert-info mt-4">
                <i class="fas fa-shield-alt me-2"></i>
                All exercises are conducted in isolated environments to ensure safe and ethical practice.
              </div>
            `,
            code: 'https://github.com/your-github/kali-lab'
          },
          surgipro: {
            title: 'Surgipro',
            desc: `
              <div class="mb-4">
                <h4>Surgipro - Surgical Room Booking System</h4>
                <p class="text-muted">Academic Project | PHP, MySQL, JavaScript, Bootstrap</p>
              </div>
              
              <p>Developed during my university studies, Surgipro is a comprehensive surgical room booking system designed to streamline operations in busy hospital environments. The system focuses on usability and data integrity to prevent scheduling conflicts and errors.</p>
              
              <h5 class="mt-4">System Features</h5>
              <ul>
                <li>Intuitive scheduling interface with calendar view</li>
                <li>Real-time availability checking for surgical rooms</li>
                <li>Staff assignment and resource management</li>
                <li>Automated conflict detection and resolution</li>
                <li>Customizable notification system</li>
                <li>Role-based access control</li>
              </ul>
              
              <h5 class="mt-4">Technical Implementation</h5>
              <ul>
                <li>Backend: PHP with custom MVC framework</li>
                <li>Database: MySQL with normalized schema design</li>
                <li>Frontend: JavaScript with Bootstrap UI components</li>
                <li>Validation: Comprehensive client-side and server-side validation</li>
              </ul>
              
              <div class="alert alert-info mt-4">
                <i class="fas fa-user-md me-2"></i>
                Designed with input from medical professionals to ensure usability for hospital staff.
              </div>
            `,
            code: 'https://github.com/your-github/surgipro'
          }
        };
        const p = projects[key] || {title:'Project', desc:'No details', code:'#'};
        document.getElementById('projectModalLabel').textContent = p.title;
        body.innerHTML = p.desc;
        codeBtn.href = p.code;
      });
    })();

    // --- Contact form: validation + mailto fallback ---
    (function(){
      const form = document.getElementById('contactForm');
      const copyBtn = document.getElementById('copyEmail');
      copyBtn.addEventListener('click', ()=>{
        navigator.clipboard.writeText('ali.r.aleissi@gmail.com').then(()=>{
          copyBtn.textContent='Copied!';
          setTimeout(()=>copyBtn.textContent='Copy Email',2000)
        })
      });

      form.addEventListener('submit', (e)=>{
        e.preventDefault();
        if(!form.checkValidity()){
          form.classList.add('was-validated');
          return;
        }
        // Build mailto fallback
        const name = document.getElementById('fullname').value;
        const email = document.getElementById('emailfield').value;
        const subject = document.getElementById('subject').value;
        const msg = document.getElementById('messagefield').value;
        
        const subjectEncoded = encodeURIComponent(subject);
        const body = encodeURIComponent(`Name: ${name}%0AEmail: ${email}%0A%0A${msg}`);
        
        // open user's email client
        window.location.href = `mailto:ali.r.aleissi@gmail.com?subject=${subjectEncoded}&body=${body}`;
      });
    })();
 