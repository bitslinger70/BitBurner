/** @param {NS} ns */
export async function main(ns) {
	while(ns.getServerMoneyAvailable("home") <200000){
		await ns.hack(ns.getHostname())
	}
}
