/** @param {NS} ns */
export async function main(ns) {
	ns.rm("all_servers.txt");
	var all_servers = ["home"];
	var servers = ns.scan();
	while (servers.length > 0){
		var c_server = servers.shift();
		if(!all_servers.includes(c_server)){
			all_servers.push(c_server);
			var subscan = ns.scan(c_server);
			servers = servers.concat(subscan);
		}
	}
	ns.write("all_servers.txt",all_servers)
}
