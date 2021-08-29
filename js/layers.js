addLayer("$", {
    name: "$", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R-$", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFF6F",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "$", // Name of prestige currency
    baseResource: "时间", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
		doReset(resettingLayer) {
			let keep = [];
			if (resettingLayer=="s") keep.push("points","best","total","milestones","upgrades");
			if (resettingLayer=="a") keep.push("points","best","total","milestones","upgrades");
			if (resettingLayer=="bm") keep.push("points","best","total","milestones","upgrades");
			if (layers[resettingLayer].row > this.row) layerDataReset("$", keep)
		},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "$", description: "$: 重置$层", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
		upgrades: {
			11:{
			title: "开始",
			description: "你找到一款免费的增量游戏",
			cost: new Decimal(0),
			},
			12:{
			title: "java?",
			description: "你可以买一些咖啡来熬夜玩游戏树 (睡眠时长 12 小时> 9 小时).",
			cost: new Decimal(5),
			unlocked(){
				return hasUpgrade("$",11)
			},
			},
			13:{
			title: "不要在地狱睡觉！",
			description: "你可以买一张床来提升你的睡眠质量 (睡眠时长 9 小时> 6 小时).",
			cost: new Decimal(20),
			unlocked(){
				return hasUpgrade("$",12)
			},
			},
			14:{
			title: "肾上腺素",
			description: "你可以买一些肾上腺素来缩短睡眠市场 (睡眠时长 6 小时> 3 小时).",
			cost: new Decimal(200),
			unlocked(){
				return hasUpgrade("$",13)
			},
			},
			21:{
			title: "投资有风险",
			description: "你可以解锁一个里程碑",
			cost: new Decimal(25),
			unlocked(){
			return hasUpgrade("$",12)
			},
			},
			22:{
				title: "太多了？",
				description: "你可以买一些原木",
				cost: new Decimal(30),
			unlocked(){
				return hasUpgrade("$",13)
			},
			},
			23:{
				title: "朋友？",
				description: "你可以找到一些朋友。   。。。（？）(没做呢)",
				cost: new Decimal(1000),
			unlocked(){
				return hasUpgrade("$",11) && hasUpgrade("$",12) && hasUpgrade("$",13) && hasUpgrade("$",14) && hasUpgrade("$",21) && hasUpgrade("$",22)
			},
			},
			24:{
				title: "制作DLC",
				description: "你可以制作一下游戏树的DLCC(没做呢)",
				cost: new Decimal(10000),
			unlocked(){
				return hasUpgrade("$",11) && hasUpgrade("$",12) && hasUpgrade("$",13) && hasUpgrade("$",14) && hasUpgrade("$",21) && hasUpgrade("$",22)
			},
			},
		},
		milestones: {
		0: {
        requirementDescription: "50$",
        effectDescription: "每秒获得5%的$",
		unlocked(){return hasUpgrade("$",21)},
        done() {
		return player.$.points.gte(50) && hasUpgrade("$",21)},
		},
		
		},
				clickables: {
		11: {
        display() {return "3$ -> 5木头"},
		unlocked(){
		return hasUpgrade("$",22)
		},
		canClick() {
		let $c = player[this.layer].points
		if ($c >= 3) 
		if (!inChallenge('s',11))
		if (!inChallenge('s',12))
		if (!inChallenge('s',21))
		if (!inChallenge('s',22))
		return true
		},
		onClick(){
		player.$.points = player.$.points.sub(3)
		player.w.points = player.w.points.add(5)
		},
		},
		},
		passiveGeneration() { return hasMilestone("$", 0)?0.05:0 },
})


addLayer("w", {
    name: "wood",
    symbol: "V-W",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#A23400",
    requires:function (){
		let wr = new Decimal(5);
		if (hasUpgrade('w',22)) wr = wr.sub(1)
		return wr
	},
    resource: "原木",
    baseResource: "时间", 
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,
		doReset(resettingLayer) {
			let keep = [];
			if (hasUpgrade("w", 25)) keep.push("upgrades");
			if (resettingLayer=="a") keep.push("points","best","total","milestones","upgrades");
			if (resettingLayer=="bm") keep.push("points","best","total","milestones","upgrades");
			if (layers[resettingLayer].row > this.row) layerDataReset("w", keep);
		},
    gainMult() {
        let mult = new Decimal(1)
			if(inChallenge('s',12)) mult = mult.mul(0.5)
			if(inChallenge('s',21)) mult = mult.mul(0.5)
			if(inChallenge('s',22)) mult = mult.mul(0.5)
        return mult
    },
    gainExp() { 
		let exp = new Decimal(1)
			if(hasMilestone('s',0)) exp = exp.mul(1.5)
			if(hasUpgrade("s" ,12)) exp = exp.add(0.5)
        return exp
    },
    row: 0, 
    hotkeys: [
        {key: "w", description: "w: 重置w层", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
		upgrades:{
		11:{
		title: "原木!",
		description: "你获得了原木，这让你感到兴奋，你想花更多的时间玩这个游戏",
		cost: new Decimal(3),
		effect() {
			let eff = player[this.layer].points.add(1).pow(0.19)
			if (hasUpgrade("w", 12)) eff = player[this.layer].points.add(1).pow(0.3);
			if (hasUpgrade('w', 13)) eff = eff.times(upgradeEffect('w', 13));
			if (hasUpgrade('w', 21)) eff = eff.times(upgradeEffect('w', 21));
			eff = softcap(eff,new Decimal(5),0.2)
			eff = softcap(eff,new Decimal(10),0.11)
			eff = softcap(eff,new Decimal(20),0.05)
			return eff
		},
		effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
		},
		12:{
		title: "工艺品",
		description: "这个升级左右方向的升级效果增加0.7次方",
		cost: new Decimal(10),
		unlocked(){
		return hasUpgrade("w",13)
		},
		},
		13:{
		title: "游戏树真的太棒了!（强调）",
		description: "“原木！”再一次" ,
		cost: new Decimal(5),
		unlocked(){
		return hasUpgrade("w",11)
		},
		effect() {
        let eff = player[this.layer].points.add(1).pow(0.08)
		if (hasUpgrade("w", 12)) eff = player[this.layer].points.add(1).pow(0.15);
		if (hasUpgrade('w', 21)) eff = eff.times(upgradeEffect('w', 21));
		return eff
		},
		effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
		},
		14:{
		title: "只用三次",
		description: "制作一把木镐",
		cost: new Decimal(20),
		unlocked(){
		return hasUpgrade("w",13)
		},
		},
		15:{
		title: "太多了!",
		description: "你可以卖掉你的原木",
		cost: new Decimal (30),
		unlocked(){
		return hasUpgrade("w",13)
		},
		},
		21:{
		title: "太多太多了",
		description: "增强 “原木！” 和 ”游戏树真的太棒了!（强调）“",
		effect() {
			let eff = player[this.layer].points.add(1).pow(0.035)
			return eff
		},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
		cost: new Decimal (40),
		unlocked(){
			return hasChallenge("s",11)
		},
		},
		22:{
		title: "快!",
		description: "原木购买底数 - 1",
		cost: new Decimal (45),
		unlocked(){
			return hasChallenge("s",12)
		},
		},
		23:{
		title: "真的太多了！",
		description: "你可以卖掉你的原木，但是效果更好",
		cost: new Decimal (77),
		unlocked(){
			return hasChallenge("s",12)
		},
		},
		24:{
		title: "很坏",
		description: "每个原木层升级增加0.5倍时间产出",
		cost: new Decimal (88),
		unlocked(){
			return hasChallenge("s",21)
		},
		effect() {
			let eff = player.w.upgrades.length * 0.05 + 1
			return eff
		},
		effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 
		},
		25:{
		title: "结束了？",
		description: "保留原木升级",
		cost: new Decimal (233),
		unlocked(){
			return hasChallenge("s",21)
		}, 
		},
		},
		clickables: {
		11: {
        display() {return "5原木 -> 2$"},
		unlocked(){
		return hasUpgrade("w",15)
		},
		canClick() {
		let wc = player[this.layer].points
		if (wc >= 5) 
		return true
		},
		onClick(){
		player.w.points = player.w.points.sub(5)
		player.$.points = player.$.points.add(2)
		},
		},
		12: {
        display() {return "25原木 -> 13$"},
		unlocked(){
		return hasUpgrade("w",23)
		},
		canClick() {
		let wc = player[this.layer].points
		if (wc >= 25) 
		return true
		},
		onClick(){
		player.w.points = player.w.points.sub(25)
		player.$.points = player.$.points.add(13)
		},
		},
		},
})


addLayer("s", {
    name: "stone",
    symbol: "V-S",
    position: 0,
    startData() { return {
        unlocked:false,
		points: new Decimal(0),
    }},
    color: "#ADADAD",
    requires:new Decimal(20),
    resource: "圆石",
    baseResource: "原木", 
    baseAmount() {return player.w.points},
    type: "normal",
    exponent: 0.5,
	branches: ["w"],
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    row: 1, 
    hotkeys: [
        {key: "s", description: "s: 重置s层", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player[this.layer].unlocked || (hasUpgrade("w",14))},
			milestones: {
		0: {
			requirementDescription: "1圆石",
			effectDescription: "解锁一个新圆石挑战，且原木获取变成1.5倍",
		done() {
			return player.s.points.gte(1)},
		},
		},
			challenges: {
		11: {
			name: "没有原木在矿洞里",
			challengeDescription: "这让你消极，时间获取只有75%",
			unlocked() { return hasMilestone("s",0) },
			canComplete: function() {return player.w.points.gte(20)},
			goalDescription:"20 原木",
			rewardDescription: "解锁一个新原木升级",
			},
		12: {
			name: "没有原木在矿洞里2.0",
			challengeDescription: "这让你消极，时间获取只有65%，原木获取底数*4",
			unlocked() { return hasChallenge("s",11) },
			canComplete: function() {return player.w.points.gte(20)},
			goalDescription:"20 原木",
			rewardDescription: "解锁两个新原木升级",
			},
		21: {
			name: "没有原木在矿洞里3.0",
			challengeDescription: "这让你消极，时间获取只有55%，原木获取底数*4",
			unlocked() { return hasChallenge("s",12) },
			canComplete: function() {return player.w.points.gte(35)},
			goalDescription:"35 原木",
			rewardDescription: "解锁两个新原木升级",
			},
		22: {
			name: "没有原木在矿洞里4.0",
			challengeDescription: "这让你消极，时间获取只有45%，原木获取底数*4",
			unlocked() { return hasChallenge("s",21) },
			canComplete: function() {return player.w.points.gte(60)},
			goalDescription:"60 原木",
			rewardDescription: "解锁三个新层",
			},
			},
			upgrades:{
		11:{
			title: "圆石！",
			description: "你获得了圆石，这让你感到兴奋，你想花更多的时间玩这个游戏（时间获取2倍）",
			cost: new Decimal(1),
		},
		12:{
			title: "斧头",
			description: "制作一把石斧（原木获取公式更好）",
			cost: new Decimal(3),
		},
			}
})


addLayer("a", {
    name: "攻击",
    symbol: "V-A",
    position: 1,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		atk: new Decimal(0),
    }},
    color: "#FFB5B5",
    requires: new Decimal(1), 
    resource: "攻击",
    baseResource: "石头", 
    baseAmount() {return player.s.points},
    type: "static",
    exponent: 1,
	base:10,
	branches: ["b"],
	update(diff) {
		player.a.atk = player.a.atk.add(new Decimal((player.a.points.add((buyableEffect('b',14))).pow(2))).mul(diff));
	},
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    row: 1, 
    hotkeys: [
        {key: "a", description: "a: Reset for a points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player[this.layer].unlocked || (hasChallenge("s",22))},
		clickables: {
			11: {
				display() {return  '你有 ' + format(player.a.atk) + " 攻击力 <br> 你可以获取 " + format(player.a.points.add((buyableEffect('b',14))).pow(2))+ "/秒"},
			},
			21: {
				title:"杀死他！ * 1 ",
				display() {return  "- 100 攻击力<br>获得 0~100 血<br>0.1% 获得铜"},
				canClick() {
					let ac = player.a.atk
					if (ac >= 100) 
					return true
					},
				onClick(){
					let bm = Math.floor(Math.random() * 101)
					let cm = Math.floor(Math.random() * 1000)
					player.a.atk = player.a.atk.sub(100)
					player.b.points = player.b.points.add(bm);
					if (cm == 0) {player.c.points = player.c.points.add(1)};
				},
			},
			22: {
				title:"杀死他！ *10 ",
				display() {return  "- 1000 攻击力<br>获得 0~1000 血<br>1% 获得铜"},
				canClick() {
					let ac = player.a.atk
					if (ac >= 1000) 
					return true
					},
				onClick(){
					let bm = Math.floor(Math.random() * 1001)
					let cm = Math.floor(Math.random() * 100)
					player.a.atk = player.a.atk.sub(1000)
					player.b.points = player.b.points.add(bm);
					if (cm == 0) {player.c.points = player.c.points.add(1)};
				},
			},
			23: {
				title:"杀死他！ *100 ",
				display() {return  "- 10000 攻击力<br>获得 0~10000 血<br>10% 获得铜"},
				canClick() {
					let ac = player.a.atk
					if (ac >= 10000) 
					return true
					},
				onClick(){
					let bm = Math.floor(Math.random() * 10001)
					let cm = Math.floor(Math.random() * 10)
					player.a.atk = player.a.atk.sub(10000)
					player.b.points = player.b.points.add(bm);
					if (cm == 0) {player.c.points = player.c.points.add(1)};
				},
			},
			24: {
				title:"杀死他！ *1000 ",
				display() {return  "- 100000 攻击力<br>获得 0~100000 血<br>100% 获得铜"},
				canClick() {
					let ac = player.a.atk
					if (ac >= 100000) 
					return true
					},
				onClick(){
					let bm = Math.floor(Math.random() * 100001)
					player.a.atk = player.a.atk.sub(100000)
					player.b.points = player.b.points.add(bm);
					player.c.points = player.c.points.add(1);
				},
				unlocked(){
					return getBuyableAmount("b", 11).gte(1)
				},
			},
			25: {
				title:"杀死他！ *10000 ",
				display() {return  "- 1000000 攻击力<br>获得 0~1000000 血<br>1000% 获得铜"},
				canClick() {
					let ac = player.a.atk
					if (ac >= 1000000) 
					return true
					},
				onClick(){
					let bm = Math.floor(Math.random() * 1000001)
					player.a.atk = player.a.atk.sub(1000000)
					player.b.points = player.b.points.add(bm);
					player.c.points = player.c.points.add(10);
				},
				unlocked(){
					return getBuyableAmount("b", 11).gte(2)
				},
			},
		},
})


addLayer("b", {
    name: "blood",
    symbol: "V-B",
    position: 0.1,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
	resource: "血",
		doReset(resettingLayer) {
			let keep = [];
			if (hasUpgrade("bm", 12)) keep.push("buyables","upgrades");
			if (resettingLayer=="s") keep.push("points","best","total","milestones","upgrades","buyables");
			if (layers[resettingLayer].row > this.row) layerDataReset("b", keep)
		},
    color: "#CE0000",
    type: "none",
    row: 0, 
    layerShown(){ return (hasChallenge("s",22))},
	upgrades:{
		11:{
			title: "魔法？",
			description: "血，血，我需要血。哦！我还需要一个祭坛",
			cost: new Decimal(666),
		},
	},
	buyables: {
		11: {
			cost(x) { 
				return new Decimal(1000).add(99000*x)
			},
			title:"效率符文 I",
			display() { return "获得格外的 ”杀死他！“<br>"+"花费:"+format(this.cost())+"<br>"+format(getBuyableAmount(this.layer, this.id))+"/2<br>"+"效果:+"+format(getBuyableAmount(this.layer, this.id))+" “杀死他！”"},
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			purchaseLimit: 2,
			unlocked(){return hasUpgrade("bm",31)},
		},
		12: {
			cost(x) { 
				return new Decimal(1000).add(99000*x)
			},
			title:"耐力符文 I",
			display() { return "根据血增加时间获取<br>"+"花费:"+format(this.cost())+"<br>"+format(getBuyableAmount(this.layer, this.id))+"/2<br>"+"效果:"+format(this.effect())+"x"},
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			purchaseLimit: 2,
			unlocked(){return hasUpgrade("bm",32)},
			effect:function(x){
					{
						let eff = new Decimal(1).add(1*(x-1)).mul(player[this.layer].points*0.00022*(x+1))
						eff = softcap(eff,new Decimal(5),0.15)
						eff = softcap(eff,new Decimal(15),0.1)
						eff = softcap(eff,new Decimal(25),0.05)
						return eff
					}
				
				},
		},
		13: {
			cost(x) { 
				return new Decimal(1000).add(99000*x)
			},
			title:"速度符文 I",
			display() { return "减少血魔法获取底数<br>"+"花费:"+format(this.cost())+"<br>"+format(getBuyableAmount(this.layer, this.id))+"/2<br>"+"效果:-"+format(this.effect())},
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			purchaseLimit: 2,
			unlocked(){return hasUpgrade("bm",33)},
			effect:function(x){
				{
					let eff = new Decimal(100*x)
					return eff
				}
				
			},
		},
		14: {
			cost(x) { 
				return new Decimal(1000).add(99000*x)
			},
			title:"力量 I",
			display() { return "根据血增加攻击力底数<br>"+"花费:"+format(this.cost())+"<br>"+format(getBuyableAmount(this.layer, this.id))+"/2<br>"+"效果:+"+format(this.effect())},
			canAfford() { return player[this.layer].points.gte(this.cost()) },
			buy() {
				player[this.layer].points = player[this.layer].points.sub(this.cost())
				setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
			},
			purchaseLimit: 2,
			unlocked(){return hasUpgrade("bm",34)},
			effect:function(x){
				{
					let eff = new Decimal(1*x).mul(player[this.layer].points*0.00003*(x+1))
					eff = softcap(eff,new Decimal(1),0.8)
					eff = softcap(eff,new Decimal(2),0.7)
					eff = softcap(eff,new Decimal(3),0.6)
					eff = softcap(eff,new Decimal(4),0.5)
					eff = softcap(eff,new Decimal(5),0.4)
					eff = softcap(eff,new Decimal(6),0.3)
					eff = softcap(eff,new Decimal(7),0)
					return eff
				}
			},
		},
	}
})


addLayer("bm", {
    name: "blood magic",
    symbol: "V-BM",
    position: 2,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#842a84",
    requires:function (){
		let bmr = new Decimal(500)
		if (getBuyableAmount("b", 13).gte(1)) bmr = bmr.sub(buyableEffect('b',13))
		return bmr
	},
    resource: "血魔法",
    baseResource: "血", 
    baseAmount() {return player.b.points},
    type: "normal",
    exponent: 1,
	branches: ["b"],
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    row: 1, 
    hotkeys: [
        {key:"B", description: "shift+b：重置bm层", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player[this.layer].unlocked || (hasUpgrade("b",11))},
	upgrades:{
		11:{
			title: "喝？",
			description: "不，不，不。但也许我可以制作一些血符文",
			cost: new Decimal(1),
		},
		12:{
			title: "不朽",
			description: "保留血升级和重复购买项",
			cost: new Decimal(30),
		},
		31:{
			title: "效率符文 I",
			description: "解锁效率符文I",
			cost: new Decimal(2),
			unlocked(){
				return (hasUpgrade("bm",11))
			},
		},
		32:{
			title: "耐力符文 I",
			description: "解锁耐力符文 I",
			cost: new Decimal(2),
			unlocked(){
				return (hasUpgrade("bm",11))
			},
		},
		33:{
			title: "速度符文 I",
			description: "解锁速度符文 I",
			cost: new Decimal(2),
			unlocked(){
				return (hasUpgrade("bm",11))
			},
		},
		34:{
			title: "力量符文 I",
			description: "解锁力量符文I I",
			cost: new Decimal(2),
			unlocked(){
				return (hasUpgrade("bm",11))
			},
		},
		41:{
			title: "效率符文 II",
			description: "解锁效率符文 II",
			cost: new Decimal(20),
			unlocked(){
				return ((getBuyableAmount("b", 11).gte(2)) && (getBuyableAmount("b", 12).gte(2)) && (getBuyableAmount("b", 13).gte(2)) && (getBuyableAmount("b", 14).gte(2)))
			},
		},
		42:{
			title: "耐力符文 II",
			description: "解锁耐力符文 II",
			cost: new Decimal(20),
			unlocked(){
				return ((getBuyableAmount("b", 11).gte(2)) && (getBuyableAmount("b", 12).gte(2)) && (getBuyableAmount("b", 13).gte(2)) && (getBuyableAmount("b", 14).gte(2)))
			},
		},
		43:{
			title: "速度符文 II",
			description: "解锁速度符文 II",
			cost: new Decimal(20),
			unlocked(){
				return ((getBuyableAmount("b", 11).gte(2)) && (getBuyableAmount("b", 12).gte(2)) && (getBuyableAmount("b", 13).gte(2)) && (getBuyableAmount("b", 14).gte(2)))
			},
		},
		44:{
			title: "力量符文 II",
			description: "解锁力量符文 II",
			cost: new Decimal(20),
			unlocked(){
				return ((getBuyableAmount("b", 11).gte(2)) && (getBuyableAmount("b", 12).gte(2)) && (getBuyableAmount("b", 13).gte(2)) && (getBuyableAmount("b", 14).gte(2)))
			},
		},
	}
})


addLayer("c", {
    name: "copper",
    symbol: "V-C",
    position: 1,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FF9224",
    requires: new Decimal(0), 
    resource: "铜",
    type: "none",
    row: 2, 
	branches: ["s","a"],
    layerShown(){return (hasChallenge("s",22))},
})