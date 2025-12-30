// --- 1. DATA ---
const candidates = [
    { id: 1, name: "Sarah Johnson", party: "Future Party", image: "https://picsum.photos/seed/sarah/300/200", votes: 150 },
    { id: 2, name: "Mike Ross", party: "Green Alliance", image: "https://picsum.photos/seed/mike/300/200", votes: 120 },
    { id: 3, name: "Elena Gilbert", party: "Tech Forward", image: "https://picsum.photos/seed/elena/300/200", votes: 90 },
    { id: 4, name: "John Doe", party: "Independent", image: "https://picsum.photos/seed/john/300/200", votes: 60 }
];

let currentUser = null;
let hasVoted = false;

// --- 2. DOM ELEMENTS ---
const loginSection = document.getElementById('login-section');
const votingSection = document.getElementById('voting-section');
const resultsSection = document.getElementById('results-section');
const candidatesList = document.getElementById('candidates-list');
const resultsContainer = document.getElementById('results-container');
const voterIdInput = document.getElementById('voter-id');
const loginMsg = document.getElementById('login-msg');
const userInfo = document.getElementById('user-info');
const usernameDisplay = document.getElementById('username-display');
const toast = document.getElementById('toast');

// --- 3. FUNCTIONS ---

// Function to show toast notification
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function(){ toast.classList.remove('show'); }, 3000);
}

// Login Logic
function login() {
    const id = voterIdInput.value.trim();
    if (id === "") {
        loginMsg.textContent = "Please enter a Voter ID.";
        return;
    }
    
    currentUser = id;
    loginMsg.textContent = "";
    usernameDisplay.textContent = `Voter: ${id}`;
    userInfo.classList.remove('hidden');
    
    // Switch to Voting Section
    loginSection.classList.remove('active-section');
    loginSection.classList.add('hidden-section');
    
    votingSection.classList.remove('hidden-section');
    votingSection.classList.add('active-section');
    
    // Render Candidates
    renderCandidates();
}

// Logout Logic
function logout() {
    currentUser = null;
    hasVoted = false;
    voterIdInput.value = "";
    userInfo.classList.add('hidden');
    loginMsg.textContent = "";
    
    // Reset to Login
    resultsSection.classList.remove('active-section');
    resultsSection.classList.add('hidden-section');
    votingSection.classList.remove('active-section');
    votingSection.classList.add('hidden-section');
    
    loginSection.classList.remove('hidden-section');
    loginSection.classList.add('active-section');
}

// Render Candidate Cards
function renderCandidates() {
    candidatesList.innerHTML = "";
    candidates.forEach(candidate => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${candidate.image}" alt="${candidate.name}" class="card-img">
            <div class="card-body">
                <span class="party-name">${candidate.party}</span>
                <h3 class="candidate-name">${candidate.name}</h3>
                <button class="vote-btn" onclick="castVote(${candidate.id})">Vote</button>
            </div>
        `;
        candidatesList.appendChild(card);
    });
}

// Cast Vote Logic
function castVote(candidateId) {
    if (hasVoted) {
        showToast("You have already voted!");
        return;
    }

    // Find candidate and increment vote
    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate) {
        candidate.votes++;
        hasVoted = true;
        
        showToast(`Vote cast for ${candidate.name}`);
        
        // Disable all buttons
        const buttons = document.querySelectorAll('.vote-btn');
        buttons.forEach(btn => {
            btn.disabled = true;
            btn.textContent = "Voted";
        });

        // Wait 2 seconds then show results
        setTimeout(showResults, 1500);
    }
}

// Show Results Logic
function showResults() {
    votingSection.classList.remove('active-section');
    votingSection.classList.add('hidden-section');
    
    resultsSection.classList.remove('hidden-section');
    resultsSection.classList.add('active-section');
    
    renderResults();
}

// Render Progress Bars
function renderResults() {
    resultsContainer.innerHTML = "";
    
    // Calculate total votes
    const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);
    
    // Sort candidates by votes (descending)
    const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes);

    sortedCandidates.forEach(candidate => {
        const percentage = totalVotes === 0 ? 0 : Math.round((candidate.votes / totalVotes) * 100);
        
        const item = document.createElement('div');
        item.className = 'result-item';
        item.innerHTML = `
            <div style="display:flex; justify-content:space-between;">
                <strong>${candidate.name}</strong>
                <span>${candidate.votes} votes (${percentage}%)</span>
            </div>
            <div class="progress-container">
                <div class="progress-bar" style="width: 0%"></div>
            </div>
        `;
        
        resultsContainer.appendChild(item);
        
        // Animate width after append
        setTimeout(() => {
            item.querySelector('.progress-bar').style.width = percentage + "%";
        }, 100);
    });
}// DOM Elements
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Toggle Mobile Menu
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close Mobile Menu when a link is clicked
navLinks.forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Simple Scroll Effect for Navbar (Optional Polish)
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
    } else {
        navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    }
});