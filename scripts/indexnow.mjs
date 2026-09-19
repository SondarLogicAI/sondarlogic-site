// Tell search engines a page changed, without anyone logging in.
//
// IndexNow is a push protocol: you host a key file at the site root and
// POST a list of URLs. Bing, Yandex, Seznam and Naver honour it. Google
// does not, so Google still needs "Request indexing" in Search Console
// by hand, which is the one part of this that cannot be automated.
//
// Bing matters here beyond Bing: ChatGPT's browsing leans on its index,
// and SondarLogic was invisible there.
//
// Runs after every deploy via the build script, so a changed page is
// announced without anyone remembering to do it.

const KEY = "5000419085f067e923fe4cb741acf201";
const HOST = "www.sondarlogic.com";

const URLS = [
  "", "/rebate-processing", "/instant-rebates", "/receipt-validation",
  "/automotive-rebates", "/cpg-rebates", "/paint-rebates",
  "/pipeda-compliance", "/security", "/privacy", "/terms",
].map((p) => `https://${HOST}${p}`);

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList: URLS,
};

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

// 200 and 202 both mean accepted. 422 usually means the key file is not
// reachable yet, which happens if this runs before the deploy lands.
console.log(`IndexNow: ${res.status} ${res.statusText} for ${URLS.length} URLs`);
if (res.status >= 400) console.log(await res.text());
