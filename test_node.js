console.log("NODE IS WORKING Fine");
const fs = require("fs");
try {
	fs.writeFileSync("test_node.txt", "it works");
	console.log("File written");
} catch (e) {
	console.error("File write error:", e);
}
