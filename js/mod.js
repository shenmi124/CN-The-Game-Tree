let modInfo = {
	name: "The Game Tree",
	id: "Gamemodv0.3",
	author: "mysterious_124",
	pointsName: "time",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name


// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade("w", 11);
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	let gain = new Decimal(0.5)
		if (hasUpgrade('w', 11)) gain = new Decimal(0.5)
		if (hasUpgrade('w', 23)) gain = new Decimal(0.6)
		if (hasUpgrade('w', 25)) gain = new Decimal(0.75)
		if (hasUpgrade('w', 12)) gain = gain.times(upgradeEffect('w', 12))
		if (hasUpgrade('w', 24)) gain = gain.times(upgradeEffect('w', 24))
		if (hasUpgrade('w', 33)) gain = gain.times(upgradeEffect('w', 33))	
		if (hasUpgrade('s', 11)) gain = gain.times(upgradeEffect('s', 11))
		if (getBuyableAmount("b", 12).gte(1)) gain = gain.mul(buyableEffect('b',12))
		if (inChallenge('s',11)) gain = gain.mul(0.8)
		if (inChallenge('s',12)) gain = gain.mul(0.7)
		if (inChallenge('s',21)) gain = gain.mul(0.6)
		if (inChallenge('s',22)) gain = gain.mul(0.5)
		if (inChallenge('c',11)) gain = gain.mul(0.8)
		if (inChallenge('c',12)) gain = gain.mul(0.4)
		if (inChallenge('c',21)) gain = gain.mul(0.3)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function(){return"Current endgame: 1 iron"},
]

// Determines when the game "ends"
function isEndgame() {
	return player.i.points.gte(new Decimal("1"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

let VERSION = {
	num: "0.6",
	name: "Metal age",
}

let changelog = `<h1>Changelog:</h1><br>
<h2>Metal age</h2><br>
	<h3>v0.6</h3><br>
		- Now you can get iron<br>
		- Changed to much things<br>
		- Remove "$"<br>
<h2>Art</h2><br>
	<h3>v0.5.3.2</h3><br>
		- Changed to much things<br>
		- Remove "$"<br>
	<h3>v0.5.2.2</h3><br>
		- Fix bug<br>
		- Modify "a"<br>
	<h3>v0.5.1.2</h3><br>
		- Art!<br>
		- Added "d"<br>
		- Added some battery<br>
		- Changed some small things<br>
	<h3>v0.5.0.2</h3><br>
		- Changed some small things<br>
		- Remove V/R<br>
	<h3>v0.5.0.1</h3><br>
		- Changed some small things<br>
	<h3>v0.5</h3><br>
		- Art!!!<br>
		- Fix bug<br>
<h2>Achievement</h2><br>
	<h3>v0.4.1</h3><br>
		- What has been updated?<br>
	<h3>v0.4</h3><br>
		- Due to a bug, temporarily remove the effect of Rune 24.<br>
		- Added Hidden Achievements<br>
		- Fix some bugs<br>
<h2>Attack!</h2><br>
	<h3>v0.3.6.7</h3><br> 
		- Modified a lot of things<br>
	<h3>v0.3.6.6</h3><br> 
		- Fix some bugs<br>
	<h3>v0.3.6.5</h3><br>
		- Added "i"!But it cannot be unlocked at the moment<br>
		- Rune is ready<br>
		- Added and modified a lot<br>
	<h3>v0.3.5.5</h3><br>
		- Fix some bug.<br>
	<h3>v0.3.5.4</h3><br>
		- Added one rune.<br>
		- Added some upgrade.<br>
	<h3>v0.3.4.4</h3><br>
		- Change rune formula, increase rune effect display<br>
	<h3>v0.3.4.3</h3><br>
		- Made three new runes<br>
	<h3>v0.3.3.3</h3><br>
		- Balance the game<br>
	<h3>v0.3.3.2</h3><br>
		- Balance the game<br>
		- "Endurance Rune" I is ready<br>
	<h3>v0.3.3.1</h3><br>
		- Fix bugs where time cannot be produced<br>
		- Added rwo unescapes in "$"<br>
	<h3>v0.3.3</h3><br>
		- Added one buyables in "b"<br>
		- Added some upgrades<br>
		- Modify "s" challenge<br>
	<h3>v0.3.2</h3><br>
		- Added "bm"<br>
		- Added some upgrades<br>
		- "stone!" effect 150% -> 175%<br>
	<h3>v0.3.1</h3><br>
		- "a" little bit is added to the a layer<br>
		- Added "ATK" in "a"
	<h3>v0.3</h3><br>
		- Added "b"<br>
		- Added "a"<br>
		- Added "c"<br>
		- Modify "w" colour<br>
<h2>Getting an Upgrade</h2><br>
	<h3>v0.2.4.3</h3><br>
		- Fix three bugs<br>
		- Complete "w","$","s"<br>
	<h3>v0.2.4.2</h3><br>
		- Fix two bugs<br>
	<h3>v0.2.4.1</h3><br>
		- Modify a series of values<br>
		- Added one challenge in "s"<br>
		- Modify s21challenge effect<br>
		- Added two upgrades in "w"<br>
	<h3>v0.2.3.1</h3><br>
		- Fix the bug<br>
	<h3>v0.2.3</h3><br>
		- Added two upgrades in "w"<br>
		- Added one challenge in "s"<br>
	<h3>v0.2.2</h3><br>
		- Added one upgrade in "$"<br>
		- Modify a series of data<br>
		- Added one challenge in "s"<br>
		- Fix the bug “10wood -> 3$” cannot be purchased before 10wood<br>
	<h3>v0.2.1</h3><br>
		- “10wood -> 3$” effect modification<br>
		- Added s0milestone & one challenge in "s"<br>
		- Added one upgrades in "w"<br>
		- Modify a series of w upgrade costs<br>
	<h3>v0.2</h3><br>
		- Added s.<br>
		- $0milestone effectDescription correction<br>
<h2>Virtual and reality?</h2><br>
	<h3>v0.1.3.2</h3><br>
		- "w" upgrades 11&12 index +0.5<br>
	<h3>v0.1.3.1</h3><br>
		- "too much!" is ready<br>
	<h3>v0.1.2.1</h3><br>
		- Fix the bug that $0milestone has no effect<br>
		- Fix the display bug of w layer purchase<br>
	<h3>v0.1.2</h3><br>
		- "太多了!"拥有一个按钮,但是还不能点击<br>
		- 修复"工艺品"的bug并进行数值修改<br>
		- 在"$"层添加一个里程碑和升级<br>
	<h3>v0.1.1</h3><br>
	    - "w"价格公式放缓,“原木!”,“游戏树真的太棒了!(强调)”公式得到了改进 <br>
		- 在"w"层增加2个升级<br>
	<h3>v0.1</h3><br>
		- 增加$层<br>
		- 增加w层`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`