let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
 let apiKey ="e8b8fdc0-a9d3-4a4a-ba87-8eae670cb639";
 let defBox = document.querySelector('.def');

 let notFound = document.querySelector('.not__found');
 let audioBox = document.querySelector('.audio');
let loading = document.querySelector('.loading');

searchBtn.addEventListener('click',function(e){
  e.preventDefault();

  audioBox.innerText = '';
  notFound.innerText = '';
  defBox.innerText = '';
  

//get input
let word = input.value ;

if(word === ''){
  alert('Word is required');
  return;
}
getData(word);

})

async function getData(word){

loading.style.display = 'block';
const response = await fetch(`https://dictionaryapi.com/api/v3/references/learners/json/${word}?key=e8b8fdc0-a9d3-4a4a-ba87-8eae670cb639`);

const data = await response.json();
// if empty result
if (!data.length){
  loading.style.display = 'none';

  notFound.innerText = 'No result found';
  return;
}

//console.log(data);
if(typeof data[0] === 'string'){
  loading.style.display = 'none';

  let heading = document.createElement('h3');
  heading.innerText = "Did you mean?";
  notFound.appendChild(heading);
  data.forEach(element =>{
    let suggestion = document.createElement('span');
    suggestion.classList.add('suggested');
    suggestion.innerText = element ;
    notFound.appendChild(suggestion);
  })
  return;
}


//result found
loading.style.display = 'none';

let definition = data[0].shortdef[0];
defBox.innerText = definition;


//sound
const soundName = data[0].hwi.prs[0].sound.audio;
if(soundName){
  renderSound(soundName);
}

console.log(data);

}
function renderSound(soundName) {
    // https://media.merriam-webster.com/soundc11
    let subFolder = soundName.charAt(0);
    let soundSrc =` https://media.merriam-webster.com/soundc11/${subFolder}/${soundName}.wav?key=${apiKey}`;

    let aud = document.createElement('audio');
    aud.src = soundSrc;
    aud.controls = true;
    audioBox.appendChild(aud);

}

//call api


//https://dictionaryapi.com/api/v3/references/learners/json/test?key=e8b8fdc0-a9d3-4a4a-ba87-8eae670cb639

//https://www.dictionaryapi.com/api/v3/references/learners/json/apple?key=your-api-key
