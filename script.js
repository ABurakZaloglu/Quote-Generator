// Get Qoutes From API
const quoteContainer =document.getElementById('quote-container');
const quoteText =document.getElementById('quote');
const authorText =document.getElementById('author');
const twitterBtn =document.getElementById('twitter');
const newQuoteBtn =document.getElementById('new-quote');
const loader=document.getElementById('loader');


let apiQuotes=[];


function loading(){
    loader.hidden =false;
    quoteContainer.hidden=true;
}
function complete(){
    loader.hidden=true;
    quoteContainer.hidden=false;
}
function newQuote(){
    loading();
    const quote =apiQuotes[Math.floor(Math.random() *apiQuotes.length)];
    if(quote.author===null){
        authorText.textContent="Unknown";
    }else{
        authorText.textContent=quote.author;
        
    }
    if(quote.text.length>120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    complete();
    quoteText.textContent=quote.text;
}
async function getQuotes(){
    loading();
    const apiUrl='https://type.fit/api/quotes';
    try{
        const response=await fetch(apiUrl);
        apiQuotes=await response.json();
        newQuote();
    }catch(error){
        alert(error)
        //Catch Error Here
    }
    complete();
}
// Tweet Quote
function tweetQuote(){
    const twitterUrl =`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//On load
getQuotes();

newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);
