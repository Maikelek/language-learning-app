# VerboLingo - MERN

The goal was to create an application that allows users to register and create one or multiple decks. Each deck contains vocabulary words added by the user and is accessible only to them.

## Words

Words can be added, edited, and deleted from the deck.

## Flashcards

Each flashcard will have a front side containing a word in a foreign language, a back side with the translation into the user's native language, and finally, a status. The statuses will be:

1. **New word**
2. **Easy**
3. **Medium** 
4. **Hard**
5. **Mastered**

## Review Function

Each deck will have a review function similar to Anki. Reviewing means that the user will be presented with words from their deck's flashcards and will contemplate their meaning, then flip the card and select its status. Flashcards will be displayed based on their status. If a flashcard has a "mastered" status, it will not be shown during reviews. The other variants are just for the user to keep track of their progress and will be included in the reviews.

# How to start the application ( DEVELOPMENT VERSION )
* Open 2 terminals


* In first terminal go into **client** folder
```
cd client/
```
* Download dependencies for react
```
npm i
```
* Start react development server with
```
npm start
```
* In second terminal go into **server** folder
```
cd server/
```
* Create there **.env** file 
```
PORT=8080

HOST=localhost
DEV=root
PASSWORD=
DATABASE=language_app

SESSION_SECRET=long_string_of_random_characters
```
* Download dependencies for Express
```
npm i
```
* Start the server
```
npm start
```