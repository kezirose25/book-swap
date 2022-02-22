DROP TABLE IF EXISTS books;

CREATE TABLE `Books` (
	`bookid` int NOT NULL AUTO_INCREMENT,
	`addedby` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`authors` varchar(255) NOT NULL,
	`imgurl` varchar(255),
	`genre` varchar(255),
	`description` varchar(255),
	`condition` varchar(255),
	PRIMARY KEY (`bookid`)
);

ALTER TABLE `Books` ADD CONSTRAINT `Books_fk0` FOREIGN KEY (`addedby`) REFERENCES `Users`(`userid`);

INSERT INTO Books (addedby, title, authors, imgurl) VALUES 
(1, "Red-Handed", "Peter Schweizer", "https://storage.googleapis.com/du-prd/books/images/9780063061149.jpg"),
(1, "The Nineties", "Chuck Klosterman", "https://storage.googleapis.com/du-prd/books/images/9780735217959.jpg"),
(1, "The Body Keeps the Score", "Bessel Ven der Kolk", "https://storage.googleapis.com/du-prd/books/images/9780670785933.jpg"),
(1, "The 1619 Project", "Nikole Hannah-Jones, Caitlin Roper, Ilena Silverman and Jake Silverstein (Eds)", "https://storage.googleapis.com/du-prd/books/images/9780593230572.jpg"),
(1, "Educated", "Tara Westover", "https://storage.googleapis.com/du-prd/books/images/9780399590504.jpg"),
(2, "Abandoned in Death", "JD Robb", "https://storage.googleapis.com/du-prd/books/images/9781250278210.jpg"),
(2, "It Ends With Us", "Colleen Hoover", "https://storage.googleapis.com/du-prd/books/images/9781501110375.jpg"),
(2, "City of the Dead", "Jonathan Kellerman", "https://storage.googleapis.com/du-prd/books/images/9780525618584.jpg"),
(2, "Verity", "Colleen Hoover", "https://storage.googleapis.com/du-prd/books/images/9781791392796.jpg"),
(2, "The Seven Husbands of Evelyn Hugo", "Taylor Jenkins Reid", "https://storage.googleapis.com/du-prd/books/images/9781501161933.jpg");



