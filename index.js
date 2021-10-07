var twit = require("twit");


const Bot = new twit({
    consumer_key: "PoIfw8URUuURGvSAx6cklRz70",
    consumer_secret: "XyvOP8Lw2fdgtkB3p7XdU7nRiP5DyJWbvSKBcru6pmy8J2MfU7",
    access_token: "1395169815673950210-GN01Rze3GfJFAJOGP7n5GjpM7Mhj2n",
    access_token_secret: "CeFbrWEnoVZWr8YDMwp0Ov3DpZo8EFVtiZbvc5alTZcjp",
    timeout_ms: 60 * 1000,
})

function BotInit() {
    var query = {
  
      q: "balacobaco",
      result_type: "recent",
    };
  
    Bot.get("search/tweets", query, BotGotLatestTweet);
  
    function BotGotLatestTweet(error, data, response) {
      if (error) {
        console.log("Tá dando erro aqui ó");
      } else {
        var id = {
          id: data.statuses[0].id_str,
        };
      }
      // Neste método será retweetado o tweet localizado
      Bot.post("statuses/retweet/:id", id, BotRetweeted);
      Bot.post("favorites/create", id, BotLiked);
  
      function BotRetweeted(error, response) {
        if (error) {
          console.log("Vish não deu RT: " + error);
        } else {
          console.log("Bot deu RT: " + id.id);
        }
    }
        function BotLiked(error, response) {
            if (error) {
              console.log("Vish não deu like: " + error);
            } else {
              console.log("Bot deu like: " + id.id);
            }
      }
    }
  }
  
  setInterval(BotInit, 2 * 60 * 1000);
  BotInit();