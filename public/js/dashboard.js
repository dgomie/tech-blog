const form = document.createElement('form');
form.innerHTML = `
    <div class="blog-post-card">
    <div class="card-header">
    <h2 class="title post-label">Create New Post</h2>
    </div>
      <label class="post-label" for="title">Title:</label><br>
      <input type="text" id="title" name="title"><br>
      <label class="post-label" for="content">Content:</label><br>
      <textarea id="content" name="content"></textarea><br>
      <input id="submit-btn" type="submit" value="Create">
    </div>
    `;

if (!document.querySelector(".blog-post-card")) {
document.getElementById('post-btn').addEventListener('click', function() {
    const formContainer = document.getElementById('form-container');
  
    formContainer.appendChild(form);
  });
}

  document.getElementById('submit-btn').addEventListener('click', async function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
  
    const title = document.getElementById('title').value;
    const description = document.getElementById('content').value;
    const userId = req.session.userId;
  
    const data = { title, description, userId };
  
    try {
      const response = await fetch('/api/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const postData = await response.json();
      console.log('Success:', postData);
    } catch (error) {
      console.error('Error:', error);
    }
  });