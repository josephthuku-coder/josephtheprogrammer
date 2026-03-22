let attempts = 1;

function togglePassword(){
  const pass = document.getElementById("password");
  if(pass.type === "password"){
    pass.type = "text";
  } else {
    pass.type = "password";
  }
}

function login(){
  const password = document.getElementById("password").value.trim();
  const errorMessage = document.getElementById("error-message");
  
  // Debug: Show what was entered
  console.log("Password entered:", password);
  console.log("Password length:", password.length);
  console.log("Expected password:", "4997G9749@j");
  console.log("Does match?", password === "4997G9749@j");
  
  // Clear previous error
  errorMessage.innerHTML = "";
  errorMessage.style.display = "none";
  
  // Check password (exact match)
  if(password === "4997G9749@j"){
    // Success - redirect to dashboard
    alert("Welcome back Josee. Administrator access granted.");
    
    // Set login session
    sessionStorage.setItem('adminLoggedIn', 'true');
    sessionStorage.setItem('loginTime', new Date().toISOString());
    
    window.location.href = "admin-panel.html";
  } else {
    // Failed attempt
    attempts++;
    
    errorMessage.innerHTML = `❌ Incorrect password. Attempt ${attempts}/3<br><small>Entered: "${password}"</small>`;
    errorMessage.style.display = "block";
    
    if(attempts >= 3){
      errorMessage.innerHTML = "🚫 Too many failed attempts. Access temporarily blocked for 30 seconds.";
      
      // Disable login button temporarily
      const loginBtn = document.querySelector('button[onclick="login()"]');
      if (loginBtn) {
        loginBtn.disabled = true;
        loginBtn.textContent = "⏳ Please wait...";
        
        setTimeout(() => {
          attempts = 1; // Reset attempts
          loginBtn.disabled = false;
          loginBtn.textContent = "🔐 Login";
          errorMessage.innerHTML = "";
          errorMessage.style.display = "none";
        }, 30000);
      }
    }
  }
}

// Check if user is already logged in
window.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
  const loginTime = sessionStorage.getItem('loginTime');
  
  if (isLoggedIn === 'true' && loginTime) {
    const loginDate = new Date(loginTime);
    const now = new Date();
    const hoursSinceLogin = (now - loginDate) / (1000 * 60 * 60);
    
    // Auto-logout after 24 hours
    if (hoursSinceLogin < 24) {
      // User is still logged in, redirect to dashboard
      window.location.href = "admin-panel.html";
    } else {
      // Session expired
      sessionStorage.removeItem('adminLoggedIn');
      sessionStorage.removeItem('loginTime');
    }
  }
});

// Allow Enter key to submit login
document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('password');
  if (passwordInput) {
    passwordInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        login();
      }
    });
  }
});