[Google Chrome Extension Tutorials: Hello World][0]
===================================

This is the first post in a series of tutorials on building Google Chrome extensions. Google Chrome has established itself as the browser of choice [boasting a 50%+ market share][2] since March. Part of its success is Google's willingness to let developers extend and improve it. I have been getting to know the extensions platform for some time now and I thought it would be a good idea to document my findings as I delve deeper into the abyss.

![Chrome Extension Tutorial][1]

In this first post I will explain a couple of the the basic concepts that you need to know in order to build a simple Hello World extension. I will also tell you what you need to do to get a local copy of your extension working in your browser. This will give us a solid foundation that we will expand upon as we go through the series.

<!--excerpt-->

The concepts we will be covering today are:

1.  [Manifest Files](#manifest)
2.  [Content Scripts](#contentscripts)
3.  [Loading Unpacked Extensions](#unpackedextensions)

Before we get started it is worth pointing out that creating Google Chrome extensions does require a fair level of JavaScript knowledge. If you are not familiar with JavaScript then take a look on [W3Schools][3] and work your way through the courses at [CodeAcademy][4].

<h2 id="manifest">Manifest Files</h2>

Think of this as the skeleton of your extension; it is where you tell Chrome everything it needs to know and where to load any resources it'll need. In reality it is nothing more than a JSON document called manifest.json that specifies all the important information about your extension. I am only going to cover a few of the fields that you can specify in in the manifest file. For an extensive list of what else is available take a look at the [Google API docs][5].

Before we get into the interesting bits we need to add a few required fields; **name** , **version** and **manifest_version**. The first two are pretty self explanatory and manifest_version just specifies which manifest schema is used. You want this to be **2** unless you are building for an old version of Chrome. It is also best practice to add **description**, **homepage_url** and **icons** but for simplicity I will be leaving the icons out.

	{
		"name" : "Chrome Extension Tutorial",
		"version" : "0.0.1",
		"description" : "A simple google chrome extension",
		"homepage_url": "http://www.macsentom.co.uk/",
		"manifest_version" : 2
	}

<h2 id="contentscripts">Content Scripts</h2>

Put very simply, content scripts give you the ability to read and manipulate data on web pages using your own custom JavaScript or CSS code. However there are a couple of important things to note. Content scripts are executed from within a sandboxed environment whilst maintaining access to the DOM. This means that they will execute on the page without interacting with any other scripts on the site. This also means that they cannot interact directly with other scripts within your extension. A process known as [message passing][6] needs to be used - but more on that later. 

In order to add a content script to your extension you need to update the manifest file.

	{
		"name" : "Chrome Extension Tutorial",
		"version" : "0.0.1",
		"description" : "A simple google chrome extension",
		"homepage_url": "http://www.macsentom.co.uk/",
		"content_scripts": [{
			"matches" : [
				"http://*/*",
				"https://*/*"
			],
			"js" : ["scripts/content.js"]
		}],
		"manifest_version" : 2
	}

The first thing that we've added is the **matches** field. This filters which urls will load the content scripts. Next we specify **js** which gives us the relative path to the JavaScript file(s). Now we just need to create the file and give it the following content:

	alert('Hello World!');

<h2 id="unpackedextensions">Loading unpacked extensions in Chrome</h2>

To load your new extension in to Chrome you need to go to the [extensions settings page][7]. First you'll need to make sure that Developer mode is ticked. This will reveal an option to "Load unpacked extension...". Here you want to navigate to the location of your manifest.json file.

![unpackaged extension][8]

Once loaded your new extension will show in the list displaying the details from manifest.json. To try it out simply open any web page - I suggest [this one][9].

Now I'll admit that this isn't doing anything impressive; it's not even doing anything useful, but hopefully it'll give you a basis to build upon later on in the series.

   [0]: http://www.macsdickinson.com/javascript/google-chrome-extension-tutorial-hello-world/
   [1]: http://www.macsdickinsons.com/images/Browser-War1.jpg
   [2]: http://www.w3schools.com/browsers/browsers_stats.asp (w3schools browser stats)
   [3]: http://www.w3schools.com/js/ (w3schools)
   [4]: http://www.codecademy.com/ (Code Academy)
   [5]: https://developer.chrome.com/extensions/ (manifest.html)
   [6]: https://developer.chrome.com/extensions/messaging.html (Message Passing)
   [7]: chrome://extensions/ (extensions)
   [8]: http://www.macsdickinsons.com/images/unpackaged-extension.png
   [9]: http://www.macsentom.co.uk "Macs Dickinson"