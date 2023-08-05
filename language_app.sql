SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `cards` (
  `card_id` int(11) NOT NULL,
  `card_front` varchar(60) NOT NULL,
  `card_back` varchar(60) NOT NULL,
  `card_status` varchar(30) NOT NULL DEFAULT 'new card',
  `from_deck` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `decks` (
  `deck_id` int(11) NOT NULL,
  `deck_name` varchar(30) NOT NULL,
  `deck_owner` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `email` varchar(40) NOT NULL,
  `pass` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `cards`
  ADD PRIMARY KEY (`card_id`);

ALTER TABLE `decks`
  ADD PRIMARY KEY (`deck_id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

ALTER TABLE `cards`
  MODIFY `card_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `decks`
  MODIFY `deck_id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;
