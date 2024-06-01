document.addEventListener("DOMContentLoaded", (event) => {    
    const submitBtn = document.querySelector('#submitComment');
    submitBtn.addEventListener("click", function(event){
        event.preventDefault();

        const comment = document.querySelector('#commentInput').value.trim();
        const userId = localStorage.getItem('userId')

        if (comment && userId) {
            fetch('/', {
                method: 'POST',
                body: JSON.stringify({ comment, userId }),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to post comment');
                }
            })
            .then(data => {
                console.log(data);
                // document.location.reload();
            })
            .catch(error => {
                alert(error);
            });
        }
    })
});
  