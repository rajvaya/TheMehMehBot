const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');
const musakui = require('musakui');
const express = require('express')
var cors = require('cors')
var cron = require('node-cron')
const tags = require("./hashtags");


const app = express()


var port = process.env.PORT || 3000;
subreddits = ["wholesomememes", "shittyragecomics", "adhdmeme", "AccidentalComedy", "goddesses","MotivationalPics","DirtyMemesx ", "hmmm", "sexygirls","TheRawKnee", "insanepeoplefacebook","GoneMild", "AdviceAnimals", "Funnypics", "InternetStars","funny", "trippinthroughtime", "IndianDankMemes","InstagramSluts", "comedyheaven", "pewdiepiesubmissions", "raimimemes", "GetMotivated","memes", "dankmemes", "MemeEconomy", "comedyheaven", "comedynecromancy","starterpacks", "woooosh", "ComedyNecrophilia", "thememersclub", "lotrmemes", "PrequelMemes", "BikiniBottomTwitter", "IndianMeyMeys", "indiameme", "desimemes"] // list of subreddits 
var task = cron.schedule('*/9 * * * *', () => {
    console.log(`Posting Meme Every 9 Minute`);
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


const IG_USERNAME = "mehmehsome";
const IG_PASSWORD = "***REMOVED***";
const ig = new IgApiClient();



function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getMEME(subreddit) {
    console.log("fetching........ meme form " + subreddit);
    musakui(subreddit)
        .then(result => {
            console.log("found meme with this caption " + result.title);
            postOnInsta(result);
        }
        ).catch(error => {
            return console.log(error);
        });
}


var auth;
async function postOnInsta(data) {
    // console.log(data);
    try {
        ig.state.generateDevice(IG_USERNAME);
        if (auth == undefined) {
            auth = await ig.account.login(IG_USERNAME, IG_PASSWORD);
            console.log("Logged in as " + auth.username);
        }
        else {
            console.log("User Found as " + auth.username);
        }
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
            console.log("POSTED SUCCESFULLY");
            // await  ig.account.logout().then(console.log);
            // console.log("Logged Out");

        } else {
            console.log("Erorr in posting to Instagram.....")
            // await ig.account.logout().then(console.log);
            // console.log("Logged Out");
            getMEME(subreddits[getRandomInt(subreddits.length)]);

        }

    }
    catch (error) {
        console.log("got error but dont worry we are trying again");
        console.log(error);
        getMEME(subreddits[getRandomInt(subreddits.length)]);
    }


}




