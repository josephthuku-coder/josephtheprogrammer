const container = document.getElementById("documentsContainer");

function loadDocuments() {
  let docs = JSON.parse(localStorage.getItem("documents")) || [];
  
  container.innerHTML = "";
  
  if (docs.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <h3>No documents found</h3>
        <p>Start by uploading your professional documents to the vault.</p>
        <button onclick="focusUpload()">Add First Document</button>
      </div>
    `;
    updateStats();
    return;
  }
  
  docs.forEach((doc, index) => {
    const card = document.createElement("div");
    card.classList.add("doc-card");
    
    const categoryIcons = {
      'CV': '📄',
      'ID': '🆔',
      'Certificate': '🏆',
      'Transcript': '📊',
      'Other': '📁'
    };
    
    card.innerHTML = `
      <h3>${categoryIcons[doc.category] || '📁'} ${doc.name}</h3>
      <div class="doc-category">${doc.category}</div>
      <div class="doc-actions">
        <button class="btn-open" onclick="window.open('${doc.link}', '_blank')">Open</button>
        <button class="btn-send" onclick="sendDocument('${doc.name}', '${doc.link}')">Send</button>
        <button class="btn-delete" onclick="deleteDocument(${index})">Delete</button>
      </div>
    `;
    
    container.appendChild(card);
  });
  
  updateStats();
}

function updateStats() {
  let docs = JSON.parse(localStorage.getItem("documents")) || [];
  
  const totalDocs = docs.length;
  const cvCount = docs.filter(doc => doc.category === 'CV').length;
  const certCount = docs.filter(doc => doc.category === 'Certificate').length;
  const otherCount = docs.filter(doc => !['CV', 'Certificate'].includes(doc.category)).length;
  
  // Animate counter updates
  animateCounter('totalDocs', totalDocs);
  animateCounter('cvCount', cvCount);
  animateCounter('certCount', certCount);
  animateCounter('otherCount', otherCount);
}

function animateCounter(id, target) {
  const element = document.getElementById(id);
  const current = parseInt(element.textContent) || 0;
  const increment = target > current ? 1 : -1;
  const steps = Math.abs(target - current);
  
  if (steps === 0) return;
  
  let count = current;
  const duration = 500; // ms
  const stepTime = duration / steps;
  
  const timer = setInterval(() => {
    count += increment;
    element.textContent = count;
    
    if (count === target) {
      clearInterval(timer);
    }
  }, stepTime);
}

function saveDocument() {
  const name = document.getElementById("docName").value.trim();
  const link = document.getElementById("docLink").value.trim();
  const category = document.getElementById("docCategory").value;
  
  if (!name || !link) {
    showNotification('Please fill in all fields', 'error');
    return;
  }
  
  // Validate URL
  try {
    new URL(link);
  } catch (e) {
    showNotification('Please enter a valid URL', 'error');
    return;
  }
  
  let docs = JSON.parse(localStorage.getItem("documents")) || [];
  
  // Check for duplicate names
  if (docs.find(doc => doc.name.toLowerCase() === name.toLowerCase())) {
    showNotification('A document with this name already exists', 'error');
    return;
  }
  
  docs.push({
    name,
    link,
    category,
    createdAt: Date.now()
  });
  
  localStorage.setItem("documents", JSON.stringify(docs));
  
  // Clear form
  document.getElementById("docName").value = "";
  document.getElementById("docLink").value = "";
  document.getElementById("docCategory").selectedIndex = 0;
  
  showNotification('Document saved successfully!', 'success');
  loadDocuments();
}

function deleteDocument(index) {
  if (confirm('Are you sure you want to delete this document?')) {
    let docs = JSON.parse(localStorage.getItem("documents"));
    
    const deletedDoc = docs[index];
    docs.splice(index, 1);
    
    localStorage.setItem("documents", JSON.stringify(docs));
    
    showNotification(`"${deletedDoc.name}" deleted successfully`, 'success');
    loadDocuments();
  }
}

function sendDocument(name, link) {
  const email = prompt("Enter recipient email address:");
  
  if (!email || !email.trim()) {
    return;
  }
  
  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    showNotification('Please enter a valid email address', 'error');
    return;
  }
  
  // Send using EmailJS
  emailjs.send("service_batxtzs", "template_gpco35g", {
    to_email: email.trim(),
    document_name: name,
    document_link: link,
    from_name: "Josee's Professional Vault"
  })
  .then(function(response) {
    showNotification(`Document "${name}" sent successfully to ${email}`, 'success');
  })
  .catch(function(error) {
    console.error('EmailJS error:', error);
    // Fallback: copy link to clipboard
    navigator.clipboard.writeText(link).then(() => {
      showNotification(`Link copied to clipboard. Share it with ${email}`, 'info');
    });
  });
}

function searchDocuments() {
  const search = document.getElementById("searchDoc").value.toLowerCase();
  let docs = JSON.parse(localStorage.getItem("documents")) || [];
  
  container.innerHTML = "";
  
  const searchResults = docs.filter(doc => 
    doc.name.toLowerCase().includes(search) || 
    doc.category.toLowerCase().includes(search)
  );
  
  if (searchResults.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <h3>No documents found</h3>
        <p>No documents match "${search}"</p>
        <button onclick="clearSearch()">Clear Search</button>
      </div>
    `;
    return;
  }
  
  const categoryIcons = {
    'CV': '📄',
    'ID': '🆔',
    'Certificate': '🏆',
    'Transcript': '📊',
    'Other': '📁'
  };
  
  searchResults.forEach((doc, index) => {
    const originalIndex = docs.findIndex(d => d.name === doc.name && d.link === doc.link);
    
    const card = document.createElement("div");
    card.classList.add("doc-card");
    
    card.innerHTML = `
      <h3>${categoryIcons[doc.category] || '📁'} ${doc.name}</h3>
      <div class="doc-category">${doc.category}</div>
      <div class="doc-actions">
        <button class="btn-open" onclick="window.open('${doc.link}', '_blank')">Open</button>
        <button class="btn-send" onclick="sendDocument('${doc.name}', '${doc.link}')">Send</button>
        <button class="btn-delete" onclick="deleteDocument(${originalIndex})">Delete</button>
      </div>
    `;
    
    container.appendChild(card);
  });
}

function clearSearch() {
  document.getElementById("searchDoc").value = "";
  loadDocuments();
}

function focusUpload() {
  document.getElementById("docName").focus();
  document.getElementById("docName").scrollIntoView({ behavior: 'smooth' });
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
  `;
  
  // Set color based on type
  const colors = {
    success: 'linear-gradient(135deg, #00f7ff, #00ff9f)',
    error: 'linear-gradient(135deg, #ff6b6b, #ff8e53)',
    info: 'linear-gradient(135deg, #4a90e2, #7b68ee)'
  };
  
  notification.style.background = colors[type] || colors.info;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  loadDocuments();
});