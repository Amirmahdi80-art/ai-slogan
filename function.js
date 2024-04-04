const API_KEY = "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";
const submitButton = document.getElementById("submit");
const outPut = document.getElementById("output");
const inputElement = document.querySelector('input');
const history = document.querySelector('.history')
async function getMessage() {
    // const category = "لباس مردانه"
    const result = document.getElementById("result");
    const loadingText = "در حال نوشتن ...";
    submitButton.textContent = loadingText;
    submitButton.disabled = true;
    const inputs = ["Write a product description in persian. " + inputElement.value + " " + " درباره" + " " + " . And how it can go with other items of clothing. Use cases (when and where we can wear it). Keep it short. Don't write more than 100 words. ایرادات لغوی و نگارشی متنی که میخواهی تولید کنی را تصحیح کن",
    "Write a product description in persian. " + inputElement.value + " " + " درباره" + " " + " . And how it can go with other items of clothing. Keep it short. Don't write more than 100 words. ایرادات لغوی و نگارشی متنی که میخواهی تولید کنی را تصحیح کن",
    "Write a product description in persian. " + inputElement.value + " " + " درباره" + " " + " . Use cases (when and where we can wear it). Keep it short. Don't write more than 100 words. ایرادات لغوی و نگارشی متنی که میخواهی تولید کنی را تصحیح کن"
    ];
       let randomInputs = Math.floor(Math.random()*inputs.length);
       let randomPrompts = inputs[randomInputs];
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            model: "gpt-3.5-turbo",
    messages: [
      
      {
        role: "user",
        content: randomPrompts
      }
    ],
    max_tokens: 1000
        }) 
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
      //  console.log(data);
      //  result.innerHTML = data.choices[0].message.content;
      outPut.textContent = data.choices[0].message.content
      if (data.choices[0].message.content) {
        const pElement = document.createElement('p')
        pElement.textContent = inputElement.value


        // Create a "Copy to Clipboard" button
        const copyButton = document.createElement('button');
        copyButton.textContent = 'کپی';
        copyButton.addEventListener('click', function () {
            copyTextToClipboard(data.choices[0].message.content);
        });

        history.append(pElement, copyButton);

        
      }
    } catch (error) {
        console.log(error);
    } finally {
      submitButton.textContent = '➢';
      submitButton.disabled = false;
    }
}

function copyTextToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  alert('Text copied to clipboard: ' + text);
}

submitButton.addEventListener('click', getMessage);
// getMessage();

// Listen for 'keypress' event on the input field
inputElement.addEventListener('keypress', function (event) {
  // Check if the pressed key is 'Enter'
  if (event.key === 'Enter') {
      // Prevent the default action of the 'Enter' key (form submission)
      event.preventDefault();
      
      // Call the getMessage function
      getMessage();
  }
});