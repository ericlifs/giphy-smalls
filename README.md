# How to run the solution

The first thing you will have to do is pull the repo code from github:

```
git clone https://github.com/ericlifs/giphy-smalls.git
```

After you have downloaded the code, cd to the project folder:

```
cd giphy-smalls
```

(In case you have downloaded the repo in a different folder, just replace `giphy-smalls` with the name of the folder you have used).

Install dependencies:

```
yarn install
```

And finally run the project, a new browser tab will be open:

```
yarn start
```

# Environment Variables

In order to use the Giphy API you have to first create a Giphy App on their dev platform. By doing so, you will obtain a API Token which will be mandatory for doing any request to their API. As this project was not created as a deployable project I added that "private" information as part of the yarn `start` and `build` commands trying to emulate env variables. The idea is that whenever this project gets deployed, that information that lives within the repo codebase will be removed and it will be replaced by env variables injected by the server running the app, that way we will not have any sensitive information living within the repo.

# Why did I use CRA (Create React App)?

I decided to use CRA because I think it's the best React scaffolding project if you don't need Server Side Rendering (in that case I would go with Razzle or NextJS).

I could have chosen to implement the same project with Server Side Rendering but I didn't find any technical limitation on the exam such as fastest load as possible, SEO, Social Sharing or Dynamic URLs (landing pages for example) which led me to make that decision. In this scenario I would have to change the approach on how the favorites are persisted:

- persist the favorites in another place since localStorage is not available on the server side
- do not have the favorites list server side rendered and instead have a spinner until the app is re-rendered on the client side

# Why did I use Typescript?

I think once you start using typescript you can't go back. TS makes me feel more confident in my code since it adds one more layer for static type checking. Also this type of checking drives the development because you already know the data structure you have and therefore there is no much room to go wrong. This way you forget of have this kind of _dumb_ errors like reading values from an undefined object.

Also as the project is developed thinking that it will start having more features, typescript is key when many devs will be working and modifying the same codebase since just by changing a property from an object can break the whole app (if you also don't have tests).

# Why did I use Mobx?

I chose to use Mobx because with Redux and React Context there is a lot of boilerplate code for accomplishing the same thing: with Redux you have to create actions, action types, reducers and with Context you have to create Providers and Reducers. Instead by using Mobx you only write your class store and that's it.

Also Mobx comes with some very useful tools like computed properties. I think that combining Mobx with React Context is the most straightforward way of integrating a state management library.

Also I want to start using [zustand](https://github.com/react-spring/zustand) more and more (I have already started using it) in order to continue learning it and gaining experience in order to have it as my first option. As I don't feel very confident with my knowledge about it I didn't want to use it in this project.

# Why didn't I create a new page for showing gifs?

While reading the exam I found this statement a little bit confusing: "When clicking on an image, the GIF will open on a **new window**". It wasn't clear for me if I that new window should be part of my app or not.

I decided to don't have it as part of my app because Giphy already had that gif page done. If it was originally intended to be part of the app, I would add react-router (or reach-router) and create a new page for seeing a particular gif (the page will need a dynamic id param as part of the url).

# How I decided when should the search be done?

While reading the exam I found this statement a little bit confusing: "When the user types a **word** on the search box". It wasn't clear for me if I should perform the search only when a space was added within the Search Bar.

I first implemented it that way, but the user experience wasn't good enough: the user won't see anything happening until he/she decided to add a space char (which is something that may never occur).

Then I decided to go with performing the search whenever the user types something within the Search Bar. But instead of doing a "sync" search, I added a debounce function for performing the search when there is a frame of 600 milliseconds between keys being pressed. This way I have improved the performance by removing unnecessary searches and also get rid of that flickering behavior in the DOM due to images mounting and getting unmounted because the term has changed.

# Why did I decided to pass onImageClick as a prop?

I decided to pass onImageClick as a prop to the GifImage component in order to keep it more extensible. It's true that on our first iteration the image will always do the same thing (open a new tab with the gif's image url) but if I have it within the Gif component there will be a tight couple between UI and logical behavior. In the future we might want to have a different action upon image clicking, if we have it as part of the component we will have to start modifying every GifImage usage or pass a new prop in order to decide which action must take place.

# If this solution has to serve millions of users, what would I add? How would I handle scaling?

In terms of code, I would probably port the solution to start using react-native and react-native-web, this way with just one codebase we cover web and ios & android apps very easily. This is not a decision taken just based in this new popularity driver, I would recommend take this approach for covering as much platforms as possible.

I think this "restriction" affects the solution infrastructure wise than the app itself. One approach I can take is instead of having just one server where the app will be served, have a couple of them where a load-balancer will be splitting the necessary work between these group of servers so they can respond accordingly based on the amount of traffic on each particular moment. Obviously this will involve a bigger monetary cost due to this new architecture and new servers being included as part of the solution.

In order to reduce this cost I'd recommend instead of having a fixed quantity of servers that you pay monthly/annually no matter the traffic it has, instead go with a server less architecture where the servers will be switching between being on and off depending on the traffic reaching our application, this way we will have a "pay for what you use".

# How do I approach giving feedback?

I prefer giving feedback as direct as possible. I'd start by thinking if it's a technical or behavioral aspect the one that does not match with the rest of the team.

In both cases I try to gather as much evidence as possible, so the other colleague knows why and when did I feel uncomfortable and he/she doesn't feel attacked by the feedback given.

If it's a technical topic, I start by pointing out things during the code review phase. Also I try to provide any article or documentation so the colleague can learn and understand why are doing things in another way. This way he/she can also tell us why he/she implemented things in that way and we can try to understand better her/his insights and thoughts.

If it's a behavioral topic and it's the first time that something happens, I wait for the next time that the issue occurs. Maybe he/she that particular day had a personal issue or something went wrong. As soon as that situation starts repeating and being something constant, I organize a meeting so we can chat about that.

Also I'd try to be open minded and ready to listen to the other point of view, obviously we don't know everything.

# If I'm near mid sprint and I know you will not reach the goal, what do I do?

I would start by asking the Scrum Master/PO if the stories I'm working on (which I know I will not be able to finish) are key for the current sprint in terms of any agreement made with the client or if it can be carried over to the next sprint with no major issues.

If it's the first scenario, I would ask the team if someone has some spare time so we can organize our remaining work and tackle together those stories in parallel. Another thing I would do is asking if there is a way of making the story "more achievable", for example if I have to integrate my frontend with an API which is being done at the same time, instead of waiting for the API to be finished (which is a blocker) start by integrating it first with a mock data. This way, the client will perceive that the team is continuously working together, notice that we have a good communication, get a first experience with the feature implemented and decide if they want to make any change.

Another key part is rising your hand ASAP, we are constantly doing estimations so whenever that alarm in our heads starts ringing we should communicate with the rest of the team and we should not wait to the last day of the sprint.

# If I am asked to point out a task that you are not certain of the complexity, what do you do? E.g.: Interface with a 3rd party API

I would start saying that any estimation I do will not be very accurate since I have not worked with that in the past. Also, I would ask if the team had implemented a similar task already or any member of the team had done something similar in the past.

If anyone from the team has already worked in something similar, I would ask if we can transform this task to a spike story, so the investigation and knowledge gaining part of the task is already considered as part of the task. This way we will also "formalize" that part of the team will dedicate time of the sprint to investigate which will make the next estimations and tasks easier to accomplish.
