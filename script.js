const textarea = document.getElementById("inputUrls");
const urlCount = document.getElementById("url-count");

// Add a keydown event listener to the textarea
textarea.addEventListener("keydown", function (event) {
	const inputUrls = textarea.value;
	const URLs = inputUrls.split("\n");

	// Remove empty lines, as an extra line break at the end may result in an empty line
	const nonEmptyLines = URLs.filter((line) => line.trim() !== "");

	// Count the number of urls
	const numberOfUrls = nonEmptyLines.length;

	// Update value in DOM
	urlCount.innerText = numberOfUrls;
});

function generateSitemap() {
	const inputUrls = textarea.value;
	const urls = inputUrls.split("\n");
	const sitemapContent = generateSitemapContent(urls);
	downloadSitemap(sitemapContent);
}

function generateSitemapContent(urls) {
	let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
	sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
	urls.forEach((url) => {
		filteredUrl = url.trim();
		if (filteredUrl !== "") {
			sitemap += `   <url>\n      <loc>${filteredUrl}</loc>\n   </url>\n`;
		}
	});
	sitemap += "</urlset>";
	return sitemap;
}

function downloadSitemap(content) {
	const element = document.createElement("a");
	const file = new Blob([content], {
		type: "text/xml",
	});
	element.href = URL.createObjectURL(file);
	element.download = "sitemap.xml";
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}
