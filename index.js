const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');
const musakui = require('musakui');


const IG_USERNAME = "themehmehbot";
const IG_PASSWORD = "***REMOVED***";

(async () => {

    var subreddits = ["memes", "Comedyhomicide", "dankmemes", "MemeEconomy", "comedyheaven", "comedynecromancy", "starterpacks", "woooosh", "ComedyNecrophilia", "ComedyCemetery", "madlads", "thememersclub", "lotrmemes", "PrequelMemes", "BikiniBottomTwitter", "IndianMeyMeys", "indiameme", "desimemes"] // list of subreddits 
    var sub = subreddits[getRandomInt(subreddits.length)]
    getMEME(sub);

})();


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




