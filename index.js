const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');
const musakui = require('musakui');
const express = require('express')
var cors = require('cors')
var cron = require('node-cron')

const app = express()


var port =  process.env.PORT || 3000;
cron.schedule("1 * * * *", () => {
    console.log(`this message logs every minute`);
    subreddits = ["memes", "Comedyhomicide", "dankmemes", "MemeEconomy", "comedyheaven", "comedynecromancy", "starterpacks", "woooosh", "ComedyNecrophilia", "ComedyCemetery", "madlads", "thememersclub", "lotrmemes", "PrequelMemes", "BikiniBottomTwitter", "IndianMeyMeys", "indiameme", "desimemes"] // list of subreddits 
    var sub = subreddits[getRandomInt(subreddits.length)] 
    getMEME(sub); 
  });

app.use(cors())
 
app.get('/', function (req, res) {
  res.send("Hellow from MEHMEH Bot");
  
});



app.listen(port,function(req,res){

    console.log("Running...");


    });


const IG_USERNAME = "themehmehbot";
const IG_PASSWORD = "***REMOVED***";



function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getMEME(subreddit) {
    console.log("fetching........ meme form " + subreddit);
    musakui(subreddit)
        .then(result => {
            console.log(result.title);
            postOnInsta(result);
        }

        )
        .catch(error => console.log(error));
}



async function postOnInsta(data) {
   // console.log(data);
    const ig = new IgApiClient();
    ig.state.generateDevice(IG_USERNAME);
    const auth = await ig.account.login(IG_USERNAME, IG_PASSWORD);
    var caption = data.title + "\n\n\n\n\n\n\n\n" + "#meme #memes #funny #dankmemes #memesdaily #funnymemes #lol #dank #follow #humor #like #dankmeme #love #lmao #ol #comedy #instagram #tiktok #dailymemes #anime #edgymemes #fun #offensivememes #memepage #funnymeme #memestagram #memer #fortnite #haha #bhfyp";
    const imageBuffer = await get({
        url: data.media_url,
        encoding: null,
    });

    const publishResult = await ig.publish.photo({
        file: imageBuffer,
        caption: caption

    });

    console.log(publishResult);

    if (publishResult.status == "ok") {
        console.log("Posted succesfully!!!")
        ig.account.logout().then(console.log);
    } else {
        console.log("Erorr in posting to Instagram.....")
        ig.account.logout().then(console.log);

    }




}




