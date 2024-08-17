document.getElementById('myForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission
  
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
  
    try {
      const response = await fetch('http://localhost:3000/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Form submitted successfully!');
        console.log(result);
      } else {
        alert('Error submitting form: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form');
    }
  });
  