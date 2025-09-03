var momEl = document.getElementById("mom");
let conversation = [
  "Shaurya: Mom I am going out for my girlfriends birthday.",
  "Mom: Wait Shaurya A black cat just crossed your path. You are not going anywhere.",
  "Shaurya: But Mom it is only a cat nothing will happen.",
  "Mom: No it is a bad omen. Something unfortunate might happen.",
  "Shaurya: Mom that is just superstition. Nothing will happen.",
  "Mom: Why do you never listen to me Shaurya You always ignore what I say.",
  "Mom: Enough I said no You will stay inside and listen to me.",
  "Shaurya: Please Mom this is important to me.",
  "Mom: Important?!..",
  "Mom: Do not argue with me I know what is right for you. Sit down and do not take another step out of this house."
];
var count = -1;

document.addEventListener("keydown", e => {
    if(e.key === "Enter"){
      count++;
      momEl.innerHTML += conversation[count] + "<br>";
    }
    if (count === conversation.length) {
        momEl.innerHTML = `<br><br>
        Shaurya is angry.<br>
        He has decided to catch all the black cats in the same night and punish them, ignoring his mothers warning about superstition.<br>
        (No this is not the beginning of his racist self, he is just an immature guy in love.)<br><br>
        But what Shaurya does not know is that his girlfriend <b>Kash</b> absolutely loves cats.<br><br>
        So... a mishap might be waiting to happen.`;
    }
    else if(count === conversation.length + 1){
      momEl.innerHTML = "use arrow keys for movement.<br>If you make noise, cat will run away!<br><br>[press enter to start the game...]"
    }

    else if(count === conversation.length + 2){
      window.location.href = "game.html";
    }

      
});





// Example: show mom's second line

