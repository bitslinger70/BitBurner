/** @param {NS} ns */
export async function main(ns) {	
	var tmp = ns.read("all_servers.txt");
	var all_servers = tmp.split(",");
	ns.tprintf("%20s %12s %12s %12s %16s %16s %6s %6s %5s %9s\n","Server","GrowTime","HackTime","WeakenTime","MaxMoney","Money","MaxRam","MinSec","Ports","HackLevel");
	for(var index in all_servers){
		var sn = all_servers[index];
		var gt = ns.getGrowTime(sn);
		var ht = ns.getHackTime(sn);
		var wt = ns.getWeakenTime(sn);
		var mm = ns.getServerMaxMoney(sn);
		var mr = ns.getServerMaxRam(sn);
		var ms = ns.getServerMinSecurityLevel(sn);
		var ma = ns.getServerMoneyAvailable(sn);
		var pr = ns.getServerNumPortsRequired(sn);
		var hl = ns.getServerRequiredHackingLevel(sn);
		var hm = ns.hackAnalyze(sn) * ma /ht;
		var mmpx = mm/ma;
		if(mmpx == 0 || isNaN(mmpx)){mmpx = 1}
		var ga = ns.growthAnalyze(sn,mmpx,1);
		var wa = ns.weakenAnalyze(1,1);
		if (ns.getHackingLevel() >= hl){
			ns.tprintf("%20s %12.2f %12.2f %12.2f %16.2f %16.2f %6d %6d %5d %9d %9.2f %9d\n",sn,gt,ht,wt,mm,ma,mr,ms,pr,hl,hm,ga)
		}
	}
}
