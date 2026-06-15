const projectGrid = document.getElementById('projectGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const fadeElements = document.querySelectorAll('.fade-in-up');
const chatToggle = document.getElementById('chatToggle');
const chatPanel = document.getElementById('chatPanel');
const closeChat = document.getElementById('closeChat');
const chatForm = document.getElementById('chatForm');
const chatBody = document.getElementById('chatBody');
const universe = document.querySelector('.universe');

function filterProjects(filter) {
  const cards = projectGrid.querySelectorAll('.project-card');
  cards.forEach(card => {
    const categories = card.dataset.category.split(' ');
    const visible = filter === 'all' || categories.includes(filter);
    card.style.display = visible ? 'grid' : 'none';
  });
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    filterProjects(button.dataset.filter);
  });
});

function revealOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  fadeElements.forEach(element => observer.observe(element));
}

function addCursorLight(event) {
  const x = event.clientX;
  const y = event.clientY;
  universe.style.background = `radial-gradient(circle at ${x * 0.15}px ${y * 0.12}px, rgba(80, 180, 255, 0.16), transparent 14%),
                             radial-gradient(circle at ${x * 0.9}px ${y * 0.2}px, rgba(142, 95, 255, 0.12), transparent 11%),
                             radial-gradient(circle at ${x * 0.28}px ${y * 0.72}px, rgba(78, 241, 192, 0.1), transparent 16%);`;
}

chatToggle.addEventListener('click', () => {
  chatPanel.classList.toggle('open');
});

closeChat.addEventListener('click', () => {
  chatPanel.classList.remove('open');
});

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = chatForm.querySelector('input');
  const value = input.value.trim();
  if (!value) return;

  const userMessage = document.createElement('div');
  userMessage.className = 'message user';
  userMessage.textContent = value;
  chatBody.appendChild(userMessage);

  const botMessage = document.createElement('div');
  botMessage.className = 'message bot';
  botMessage.textContent = 'Processing your question...';
  chatBody.appendChild(botMessage);
  chatBody.scrollTop = chatBody.scrollHeight;
  input.value = '';

  setTimeout(() => {
    botMessage.textContent = `Srihari specializes in AI-driven web applications, gesture-based interfaces, and secure automation solutions. Ask about his projects, skills, or experience for more details.`;
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 900);
});

document.addEventListener('mousemove', addCursorLight);
window.addEventListener('DOMContentLoaded', () => {
  filterProjects('all');
  revealOnScroll();
});

const skillNodes = document.querySelectorAll('.skill-node');
skillNodes.forEach(node => {
  node.addEventListener('mousemove', (event) => {
    const rect = node.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    node.style.transform = `translate(${dx * 0.04}px, ${dy * 0.04}px)`;
  });
  node.addEventListener('mouseleave', () => {
    node.style.transform = '';
  });
});
