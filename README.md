# VerboLingo - MERN

The goal is to create an application that allows users to register and create one or multiple decks. Each deck will contain vocabulary words added by the user and will be accessible only to them.

## Words

Words can be added, edited, and deleted from the deck. The same applies to the decks themselves.

## Flashcards

Each flashcard will have a front side containing a word in a foreign language, a back side with the translation into the user's native language, and finally, a status. The statuses will be:

1. **New word**
2. **Need to review**
3. **100%** (mastered)
4. **Don't know**

## Review Function

Each deck will have a review function similar to Anki. Reviewing means that the user will be presented with words from their deck's flashcards and will contemplate their meaning, then flip the card and select its status. Flashcards will be displayed based on their status. If a flashcard has a "100%" status, it will not be shown during reviews. The other variants are just for the user to keep track of their progress and will be included in the reviews.

## Pages

|  Page           |   Done     |
|----------       |  ----------
| Login page      | ✅✅❌    |
| Register page   | ✅✅✅    |
| Profile         | ❌❌❌    |
| Decks           | ❌❌❌    |
| Deck            | ❌❌❌    |
| Review          | ❌❌❌    |

## SQL tables

### users

|  Name              |   Data type       |
|----------          |  ----------       |
| user_id (PK, AI)   | int(11)           |
| nickname           | varchar(20)       |
| email              | varchar(40)       |
| pass               | varchar(255)  $!  |

### decks

|  Name              |   Data type           |
|----------          |  ----------           |
| deck_id (PK, AI)   | int(11)               |
| deck_name          | varchar(30)           |
| deck_owner         | int(FK, user.user_id) |

### cards

|  Name              |   Data type                     |
|----------          |  ----------                     |
| card_id            | int(11)                         |
| card_front         | varchar(60)                     |
| card_back          | varchar(60)                     |
| card_status        | varchar(30) - preset = new card |
| from_deck          | int(FK, decks.deck_id)          |


