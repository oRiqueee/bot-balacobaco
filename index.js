var twit = require("twit");
require("dotenv").config();

//Credenciais do Twitter
const Bot = new twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
})

//Pega tweet com a palavra "balacobaco"
function BotInit() {
    var query = {
  
      q: "balacobaco",
      result_type: "recent",
    };
     
     //Pega o último tweet
    Bot.get("search/tweets", query, BotGotLatestTweet);
  
     //Verifica se pegou o último tweet
    function BotGotLatestTweet(error, data, response) {
      if (error) {
        console.log("Tá dando erro aqui ó");
      } else {
        var id = {
          id: data.statuses[0].id_str,
        };
      }

      //Aqui ele dá RT e like no tweet
      Bot.post("statuses/retweet/:id", id, BotRetweeted);
      Bot.post("favorites/create", id, BotLiked);
  
      //Verifica se deu RT
      function BotRetweeted(error, response) {
        if (error) {
          console.log("Vish não deu RT: " + error);
        } else {
          console.log("Bot deu RT: " + id.id);
        }
    }

    //Verifica se deu like
        function BotLiked(error, response) {
            if (error) {
              console.log("Vish não deu like: " + error);
            } else {
              console.log("Bot deu like: " + id.id);
            }
      }
    }
  }
  
  //Intervalo que o bot vai rodar
  setInterval(BotInit, 2 * 60 * 1000);
  //Inicia o bglh todo
  BotInit();