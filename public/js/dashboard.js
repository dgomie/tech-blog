const userPosts = document.createElement('user-posts');
userPosts.innerHTML = `
    <form class="max-w-sm mx-auto bg-gray-700 rounded-md p-2 my-2">
    <div>
    <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
    <input type="text" id="title" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    </div>
    <div class="mb-5">
      <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
      <input type="text" id="content" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
     </div>
     <input id="submit-btn" class="text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value="Create">

    </form>
    `;

if (!document.querySelector(".blog-post-card")) {
document.getElementById('post-btn').addEventListener('click', function() {
    const formContainer = document.getElementById('form-container');
    formContainer.appendChild(userPosts);

    document.getElementById('submit-btn').addEventListener('click', async function(event) {
      event.preventDefault(); // Prevent the form from submitting normally
    
      const title = document.getElementById('title').value;
      const description = document.getElementById('content').value;
      const userId = localStorage.getItem('userId');
    
      const data = { 
        'title': title, 
        'description': description,
        'user_id': userId
         };
    
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
        location.reload()
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });
}

  