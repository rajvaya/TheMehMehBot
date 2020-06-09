const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');
const musakui = require('musakui');
const express = require('express')
var cors = require('cors') 
var cron = require('node-cron')
const tags = require("./hashtags");


const app = express()


var port = process.env.PORT || 3000;
subreddits = ["wholesomememes","confusing_perspective", "SaimanSays","shittyragecomics","classicrage","adhdmeme","iiiiiiitttttttttttt","whothefuckup","AccidentalComedy","ragecomics","aSongOfMemesAndRage","hmmm","TheRawKnee","fffffffuuuuuuuuuuuu","Dogfort","insanepeoplefacebook","AdviceAnimals","Funnypics","funny","trippinthroughtime","IndianDankMemes","okbuddyretard", "antimeme","vertical", "blursedimages", "comedyheaven", "pewdiepiesubmissions", "raimimemes", "historymemes",   "memes", "Comedyhomicide", "dankmemes", "MemeEconomy", "comedyheaven", "comedynecromancy", "starterpacks", "woooosh", "ComedyNecrophilia",  "madlads", "thememersclub", "lotrmemes", "PrequelMemes", "BikiniBottomTwitter", "IndianMeyMeys", "indiameme", "desimemes"] // list of subreddits 
var task = cron.schedule('*/10 * * * *', () => {
    console.log(`Posting Meme Every 11 Minute`);
    getMEME(subreddits[getRandomInt(subreddits.length)]);
},
    { scheduled: false }
);

app.use(cors())

app.get('/', function (req, res) {
    res.send("This is Home Page for MehMehBot");
});


app.get('/start', function (req, res) {
    res.send("Task Started");
    task.start();
});

app.get('/stop', function (req, res) {
    res.send("Task Stopped");
    task.stop();
});




app.listen(port, function (req, res) {

    console.log("Running...");


});


const IG_USERNAME = "themehmehbot";
const IG_PASSWORD = "***REMOVED***";
const ig = new IgApiClient();



function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getMEME(subreddit) {
    console.log("fetching........ meme form " + subreddit);
    musakui(subreddit)
        .then(result => {
            console.log("found meme with this caption "+result.title);
            postOnInsta(result);
        }
        ).catch(error => {
            return console.log(error);
        });
}



async function postOnInsta(data) {
    // console.log(data);
    try {
        ig.state.generateDevice(IG_USERNAME);
        const auth = await ig.account.login(IG_USERNAME, IG_PASSWORD);
        console.log("Logged in as " + auth.username);
        var caption = data.title + ".\n.\n.\n.\n.\n.\n" + tags[getRandomInt(tags.length)];
        const imageBuffer = await get({
            url: data.media_url,
            encoding: null,
        });

        console.log("posting your meme");
        const publishResult = await ig.publish.photo({
            file: imageBuffer,
            caption: caption

        });

        if (publishResult.status == "ok") {
            publishResult
            console.log(publishResult)
            await  ig.account.logout().then(console.log);
            console.log("Logged Out");

        } else {
            console.log("Erorr in posting to Instagram.....")
            await ig.account.logout().then(console.log);
            console.log("Logged Out");
            getMEME(subreddits[getRandomInt(subreddits.length)]);

        }

    }
    catch (error) {

        console.log("got error but dont worry we are trying again")
        ig.account.logout().then(console.log);
        console.log("Logged Out");
        getMEME(subreddits[getRandomInt(subreddits.length)]);


    }


}




