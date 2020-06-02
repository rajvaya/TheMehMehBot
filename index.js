const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');
var getJSON = require('get-json')
const musakui = require('musakui');


const IG_USERNAME = "themehmehbot";
const IG_PASSWORD = "***REMOVED***";


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getMEME(subreddit) {
    console.log("fetching........ meme form " + subreddit);
    musakui(subreddit)
        .then(result => {
            console.log(result);
            console.log(result.title);
            postOnInsta(result);
        }

        )
        .catch(error => console.log(error));
}



async function postOnInsta(data) {
    console.log(data);
    const ig = new IgApiClient();
    ig.state.generateDevice(IG_USERNAME);
    const auth = await ig.account.login(IG_USERNAME, IG_PASSWORD);
    console.log(JSON.stringify(auth));
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
    } else {
        console.log("Erorr in posting to Instagram.....")
    }






}
(async () => {

    var subreddits = ["memes", "Comedyhomicide", "dankmemes", "MemeEconomy", "comedyheaven", "comedynecromancy", "starterpacks", "woooosh", "ComedyNecrophilia", "ComedyCemetery", "madlads", "thememersclub", "lotrmemes", "PrequelMemes", "BikiniBottomTwitter", "IndianMeyMeys", "indiameme", "desimemes"] // list of subreddits 
    var sub = subreddits[getRandomInt(subreddits.length)]
    console.log(sub);
    getMEME(sub);

    /// get a random subreddit

    // console.log(JSON.stringify(auth));
    // getJSON(url, function(error, response) {
    //     global.data = response;
    // }).then(function() {
    //     console.log(global.data);
    //     (async() => {

    //         var caption = "THIS POST IS AUTOMETED USING NODEJS BOT "+ data.title + " \n\n\n \t\t\t Orignal post in " +
    //             data.subreddit + " : " +
    //             data.postLink +
    //             " Follow us for the most dank memes on Instagram. 🔥🔥🔥 " +
    //             "#meme #memes #bestmemes #instamemes #funny #funnymemes #dankmemes #edgymemes #spicymemes #nichememes #memepage #funniestmemes #dank #memesdaily #jokes #memesrlife #memestar #memesquad #humor #lmao #igmemes #lol #memeaccount #memer #relatablememes #funnyposts #sillymemes #nichememe #memetime";

    //         const imageBuffer = await get({
    //             url: data.url,
    //             encoding: null,
    //         });

    //         //publish post
    //         const publishResult = await ig.publish.photo({
    //             file: imageBuffer,
    //             caption: caption

    //         });

 


    //     })();

    // })


})();




