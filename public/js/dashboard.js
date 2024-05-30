document.addEventListener('DOMContentLoaded', (event) => {
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

  