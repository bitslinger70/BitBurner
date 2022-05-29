export class FileHandler {
 #file;
 #ns;

 constructor (ns, file) {
 this.#ns = ns;
 this.#file = file;
 }

 async newFile() {
 await this.#ns.write(this.#file, "", "w");
 }

 async write(data, mode="a") {
 await this.#ns.write(this.#file, JSON.stringify(data), mode);
 }

 async read() {
 let dataString = await this.#ns.read(this.#file);
 if (dataString.length > 1) {
 return JSON.parse(dataString);
 } else {
 return [];
 }
 }
}

/** @param {NS} ns */
export async function main(ns) {	
	var tmp = ns.read("all_servers.txt");
	var all_servers = tmp.split(",");
	ns.tprintf("%20s %12s %12s %12s %16s %16s %6s %6s %5s %9s\n","Server","GrowTime","HackTime","WeakenTime","MaxMoney","Money","MaxRam","MinSec","Ports","HackLevel");
	for(var index in all_servers){
		var sn = all_servers[index];
		ns.exec("server_stats.js","home",1,sn);
		var filename = sn + ".txt";
		let shandle = new FileHandler(ns,sn);
		var server = await shandle.read();
		var gt = server.GrowTime;
		var ht = server.HackTime;
		var wt = server.WeakenTime;
		var mm = server.moneyMax;
		var mr = server.maxRam;
		var ms = server.minDifficulty;
		var ma = server.moneyAvailable;
		var pr = server.numOpenPortsRequired;
		var hl = server.requiredHackingSkill;
		var hm = ns.hackAnalyze(sn) * ma / ht;
		var mmpx = mm/ma;
		if(mmpx == 0 || isNaN(mmpx)){mmpx = 1}
		var ga = 1;//ns.growthAnalyze(sn,mmpx,1);
		if (ns.getHackingLevel() >= hl){
			ns.tprintf("%20s %12.2f %12.2f %12.2f %16.2f %16.2f %6d %6d %5d %9d %9.2f %9d\n",sn,gt,ht,wt,mm,ma,mr,ms,pr,hl,hm,ga)
		}
	}
}
