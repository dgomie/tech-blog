document.getElementById('post-btn').addEventListener('click', function() {
    const formContainer = document.getElementById('form-container');
  
    const form = document.createElement('form');
    form.innerHTML = `
    <div class="blog-post-card>
      <label for="title">Title:</label><br>
      <input type="text" id="title" name="title"><br>
      <label for="content">Content:</label><br>
      <textarea id="content" name="content"></textarea><br>
      <input type="submit" value="Submit">
    </div>
    `;
  
    formContainer.appendChild(form);
  });