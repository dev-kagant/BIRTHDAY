# Birthday App

#### *Timer Started at 3:40pm on 11/3/2021*
#### *Timer Stopped at 6:18pm on 11/3/2021*

## **Tech Used**
### React
### JavaScript

## **Kerri's Many Thought**
#### Allow me to prefix this with although this is more than I submitted before, it is not completely optimized. I wanted to complete the project so you could see a better example of what I bring to the table.

## **Updates**
1. I was able to get data from the API nowbut it is not perfect unless you plan to get an API Key, its not happy about CORs otherwise, but I was really trying to do this without one. So some work arounds I found:
    * You can download this [Chrome Extension](https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc) if you are using chrome which allows you to bypass this feature. This is okay for development but not good so much for production code unless you plan to ask all you user to also download it and I found that even this feature gets stuck on fetches. This is the one I used but not ideal.
    * If you are brave you can turn off you browser security feature, not my recommended choice, opens you up to many more vulnerabilities
    * Or you can get an API Key from the CoinCap site and utilize that. If I were to start this project over again I would definitely do this. But it was an experience making API calls without one. Also be sure to paste "http://localhost:3000" with the "http://" in front while using this extension.
    * Lastly you can by pass the API all together and use the data files I added from the information I grabbed from the CoinCap site, just comment out the respective functions in the App.js file *refer to comments for clarification
2. I was able to add the rest of the requirements for the assessment
    * Getting increase and decreases in the last 24 hours
    * And sorting the data by that feature
3. I also have added some styling to the application, it is not a lot but differently looks better than the later. I chose purple because it is one of my favorite colors

## **Active Features**
* Displaying the exchange rates in USD
* Only seeing crypto currencies
* Sorting information by crypto name, A-Z and Z-A **Just click Twice
* Displaying daily increases and decreases in crypto rate
* Sorting information by daily increase/decrease in rate, ASC and DESC order **Just click Twice


## **How to Use**
1. After downloading the zip folder and extrating the files you will need to navigate to the Birthday-Challenge folder within your terminal
2. Run the following commands "npm install" or "yarn install" to download all dependencies
3. Once those are done: run "npm start" or "yarn start" to start the application and it should automatically open a web-browswer but if it doesn't just paste the following into your web-browser ["http://localhost:3000"](http://localhost:3000)
4. Once on the website you will see the information for the features listed above
5. To sort the information in currency alphabetically or 24 Hour Difference just click the arrow button next to their respective heading, and clicking them again will reverse the order.



## **Future Features**
1. Adding the use of an API Key
